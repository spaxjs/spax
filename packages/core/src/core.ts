import { debug, error } from "@wugui/debug";
import { InitHook, ParseHook, RenderHook } from "./hooks";
import { ICH, ICO, IMD, IPO, TCP } from "./types";

const cache: Map<string, any> = new Map();

const KEY_PARSED = "parsed";
const KEY_RENDERED = "rendered";

export const DEFAULT_SCOPE = "🐢";

export async function run(plugins: TCP[] = [], options: ICO = {}): Promise<any> {
  const { scope = DEFAULT_SCOPE } = options;

  if (cache.has(scope)) {
    error("Scope `%s` already taken. Please set use a different string.", scope);
    return;
  }

  cache.set(scope, 1);

  const PARSED = `${scope}&${KEY_PARSED}`;
  const RENDERED = `${scope}&${KEY_RENDERED}`;

  const hooks: ICH = {
    init: new InitHook(),
    parse: new ParseHook(),
    render: new RenderHook(),
  };

  async function getParsedModules(modules?: IMD[]): Promise<IMD[]> {
    if (!modules) {
      return [];
    }

    const parsedModules = await parseModules(modules);

    // 存储以备外部调用
    cache.set(PARSED, parsedModules);

    if (process.env.NODE_ENV === "development")
      debug("Parsed modules: %O", parsedModules);

    return parsedModules;
  }

  async function getRenderedModules(modules?: IMD[]): Promise<any> {
    if (!modules) {
      return null;
    }

    const parsedModules = await getParsedModules(modules);
    const renderedModules = await renderModules(parsedModules);

    // 存储以备外部调用
    cache.set(RENDERED, renderedModules);

    if (process.env.NODE_ENV === "development")
      debug("Rendered modules: %O", renderedModules);

    return renderedModules;
  }

  /**
   * 递归处理模块，顺序执行 parser
   * @todo 动态注册的模块，是否需要合并到现有模块树？
   * @example
   * // modules: [m1, m2]
   * // parsers: [p1, p2]
   * p1.pre(m1) -> p2.pre(m1) -> p2.post(m1) -> p1.post(m1)
   * p1.pre(m2) -> p2.pre(m2) -> p2.post(m2) -> p1.post(m2)
   * // 如果有子模块（深度优先）
   * p1.pre(m1) -> p2.pre(m1) -> (子模块流程，同父模块) -> p2.post(m1) -> p1.post(m1)
   */
  async function parseModules(modules: IMD[], parent: IMD = {}): Promise<IMD[]> {
    modules = await Promise.all(modules.map(async (mc: IMD) => {
      mc = await interopDefaultExports(mc);

      if (Array.isArray(mc)) {
        mc = await Promise.all(mc.map((_mc) => parseModule(_mc, parent)));
        return mc;
      }

      return parseModule(mc, parent);
    }));

    return modules.flat();
  }

  async function parseModule(mc: IMD, parent: IMD): Promise<IMD> {
    // pre
    mc = await hooks.parse.run(mc, parent, getPluginOption, options, "pre");

    // 子模块在 pre 之后、post 之前处理掉
    if (mc.modules) {
      mc.modules = await parseModules(mc.modules, mc);
    }

    // post
    mc = await hooks.parse.run(mc, parent, getPluginOption, options, "post");

    return mc;
  }

  /**
   * 渲染模块树
   */
  async function renderModules(parsedModules: IMD[]): Promise<any> {
    let renderedModules: any = parsedModules;

    // 前置处理
    renderedModules = await hooks.render.run(renderedModules, getPluginOption, options, "pre");

    // 后置处理
    renderedModules = await hooks.render.run(renderedModules, getPluginOption, options, "post");

    return renderedModules;
  }

  function getPluginOption(name: string): IPO {
    const { plugins: c }: ICO = options;
    return c ? c[name] || c[name.toLowerCase()] || {} : {};
  }

  if (process.env.NODE_ENV === "development")
    debug("Hooked plugins: %O", plugins);

  // 插件
  plugins.forEach((plugin) => plugin(hooks));

  // 初始化
  await hooks.init.run(getPluginOption, options, "pre");
  await hooks.init.run(getPluginOption, options, "post");

  // 模块
  const rendered: any = await getRenderedModules(options.modules);

  // 直接返回
  return rendered;
}

/**
 * 未来，此处有可能是 Reactive 的
 */
export function useParsed(scope: string = DEFAULT_SCOPE) {
  return [cache.get(`${scope}&${KEY_PARSED}`)];
}

/**
 * 未来，此处有可能是 Reactive 的
 */
export function useRendered(scope: string = DEFAULT_SCOPE) {
  return [cache.get(`${scope}&${KEY_RENDERED}`)];
}

// 对于使用 import() 引入的模块，需要转换
async function interopDefaultExports(m: any): Promise<any> {
  const _ = await m;

  if ("default" in _) {
    return _.default;
  }

  return _;
}
