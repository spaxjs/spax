import { debug, error } from "@spax/debug";
import cache from "./cache";
import { InitHook, ParseHook, RenderHook } from "./hooks";
import { ICH, ICO, IMD, IPO, TCP } from "./types";

const KEY_HOOKS = "hooks";
const KEY_PLUGINS = "plugins";
const KEY_OPTIONS = "options";
const KEY_PARSED = "parsed";
const KEY_RENDERED = "rendered";

export const DEFAULT_SCOPE = "🚀";

export async function run(plugins: TCP[] = [], options: ICO = {}): Promise<any> {
  const { scope = DEFAULT_SCOPE } = options;

  if (cache.has("run", scope)) {
    error("Scope `%s` already taken. Please set use a different string.", scope);
    return;
  }

  // 标识已加载，不允许重复执行
  cache.set("run", 1, scope);

  // 存储以备外部调用
  cache.set(KEY_PLUGINS, plugins, scope);
  cache.set(KEY_OPTIONS, options, scope);

  const hooks: ICH = {
    init: new InitHook(scope),
    parse: new ParseHook(scope),
    render: new RenderHook(scope),
  };

  // 存储以备外部调用
  cache.set(KEY_HOOKS, hooks, scope);

  /* istanbul ignore next */
  if (process.env.NODE_ENV === "development") {
    debug("Hooks created: %O", hooks);
  }

  // 插件
  plugins.forEach((plugin) => plugin(hooks));

  /* istanbul ignore next */
  if (process.env.NODE_ENV === "development") {
    debug("Plugins enabled: %O", plugins);
  }

  // 初始化
  await hooks.init.run(pluginOptionGetter, options, "pre");
  await hooks.init.run(pluginOptionGetter, options, "post");

  // 直接返回
  return getRenderedModules(scope, options.modules);
}

/**
 * 未来，此处有可能是 Reactive 的
 */
export function useParsed(scope: string = DEFAULT_SCOPE): [IMD[]] {
  return [cache.get(KEY_PARSED, scope)];
}

/**
 * 未来，此处有可能是 Reactive 的
 */
export function useRendered(scope: string = DEFAULT_SCOPE): [any] {
  return [cache.get(KEY_RENDERED, scope)];
}

async function getRenderedModules(scope: string = DEFAULT_SCOPE, modules?: IMD[]): Promise<any> {
  if (!modules) {
    return null;
  }

  const parsedModules = await parseModules(scope, modules);

  // 存储以备外部调用
  cache.set(KEY_PARSED, parsedModules, scope);

  /* istanbul ignore next */
  if (process.env.NODE_ENV === "development") {
    debug("Modules parsed: %O", parsedModules);
  }

  const renderedModules = await renderModules(scope, parsedModules);

  // 存储以备外部调用
  cache.set(KEY_RENDERED, renderedModules, scope);

  /* istanbul ignore next */
  if (process.env.NODE_ENV === "development") {
    debug("Modules rendered: %O", renderedModules);
  }

  return renderedModules;
}

/**
 * 渲染模块树
 */
async function renderModules(scope: string = DEFAULT_SCOPE, parsedModules: IMD[]): Promise<any> {
  const { render } = cache.get(KEY_HOOKS, scope);
  const options = cache.get(KEY_OPTIONS, scope);
  let renderedModules: any = parsedModules;

  // 前置处理
  renderedModules = await render.run(renderedModules, pluginOptionGetter, options, "pre");

  // 后置处理
  renderedModules = await render.run(renderedModules, pluginOptionGetter, options, "post");

  return renderedModules;
}

function pluginOptionGetter(scope: string = DEFAULT_SCOPE, name: string): IPO {
  const { plugins: c }: ICO = cache.get(KEY_OPTIONS, scope);
  return c ? c[name] || c[name.toLowerCase()] || {} : {};
}

/**
 * 递归处理模块，顺序执行 parser
 * @example
 * // modules: [m1, m2]
 * // parsers: [p1, p2]
 * p1.pre(m1) -> p2.pre(m1) -> p2.post(m1) -> p1.post(m1)
 * p1.pre(m2) -> p2.pre(m2) -> p2.post(m2) -> p1.post(m2)
 * // 如果有子模块（深度优先）
 * p1.pre(m1) -> p2.pre(m1) -> (子模块流程，同父模块) -> p2.post(m1) -> p1.post(m1)
 */
async function parseModules(scope: string = DEFAULT_SCOPE, modules: IMD[], parent: IMD = {}): Promise<IMD[]> {
  modules = await Promise.all(modules.map(async (mc: IMD) => {
    mc = await interopDefaultExports(mc);

    if (Array.isArray(mc)) {
      mc = await Promise.all(mc.map((_mc) => parseModule(scope, _mc, parent)));
      return mc;
    }

    return parseModule(scope, mc, parent);
  }));

  return modules.flat();
}

async function parseModule(scope: string = DEFAULT_SCOPE, mc: IMD, parent: IMD): Promise<IMD> {
  const { parse } = cache.get(KEY_HOOKS, scope);
  const options = cache.get(KEY_OPTIONS, scope);

  // pre
  mc = await parse.run(mc, parent, pluginOptionGetter, options, "pre");

  // 子模块在 pre 之后、post 之前处理掉
  if (mc.modules) {
    mc.modules = await parseModules(scope, mc.modules, mc);
  }

  // post
  mc = await parse.run(mc, parent, pluginOptionGetter, options, "post");

  return mc;
}

// 对于使用 import() 引入的模块，需要转换
async function interopDefaultExports(m: any): Promise<any> {
  const _ = await m;

  if ("default" in _) {
    return _.default;
  }

  return _;
}
