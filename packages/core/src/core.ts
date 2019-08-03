import { debug } from "@wugui/utils";
import { ReactElement } from "react";
import * as ReactDOM from "react-dom";
import { InitHook, ParseHook, RenderHook } from "./Hook";
import { ICoreHooks, IFrameworkOptions, IModule, IPluginOption, TPluginFunction } from "./types";

const hooks: ICoreHooks = {
  init: new InitHook(),
  parse: new ParseHook(),
  render: new RenderHook(),
};

const cache: Map<string, any> = new Map();

export async function mount(plugins: TPluginFunction[], options: IFrameworkOptions): Promise<void> {
  // 存到本地
  cache.set("plugins", plugins);
  cache.set("options", options);

  if (process.env.NODE_ENV !== "production")
    debug("Hooked plugins: %O", plugins);

  // 插件
  plugins.forEach((plugin) => plugin(hooks));

  // 初始化
  await hooks.init.run(getPluginOption, "pre");
  await hooks.init.run(getPluginOption, "post");

  // 模块
  const renderedModules: any = await getRenderedModules(options.modules);

  // 挂载点
  const mountingElement: HTMLElement = typeof options.container === "string"
    ? document.querySelector(options.container) : options.container;

    // 挂载
  ReactDOM.render(renderedModules, mountingElement, () => {
    if (process.env.NODE_ENV !== "production")
      debug("Mounted to container: %O", options.container);
  });
}

/**
 * 未来，此处有可能是 Reactive 的
 */
export function useParsed() {
  return [cache.get("parsedModules")];
}

async function getParsedModules(modules?: IModule[]): Promise<IModule[]> {
  if (cache.has("parsedModules")) {
    return cache.get("parsedModules");
  }

  if (!modules) {
    return [];
  }

  const parsedModules = await parseModules(modules);

  // 存储以备外部调用
  cache.set("parsedModules", parsedModules);

  if (process.env.NODE_ENV !== "production")
    debug("Parsed modules: %O", parsedModules);

  return parsedModules;
}

/**
 * 未来，此处有可能是 Reactive 的
 */
export function useRendered() {
  return [cache.get("renderedModules")];
}

async function getRenderedModules(modules?: IModule[]): Promise<ReactElement | ReactElement[] | null> {
  if (cache.has("renderedModules")) {
    return cache.get("renderedModules");
  }

  if (!modules) {
    return null;
  }

  const parsedModules = await getParsedModules(modules);
  const renderedModules = await renderModules(parsedModules);

  // 存储以备外部调用
  cache.set("renderedModules", renderedModules);

  if (process.env.NODE_ENV !== "production")
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
async function parseModules(modules: any[], parent: any = {}): Promise<any[]> {
  modules = await Promise.all(modules.map(async (mc: any) => {
    mc = await interopDefaultExports(mc);

    if (Array.isArray(mc)) {
      mc = await Promise.all(mc.map((_mc) => runParse(_mc, parent)));
      return mc;
    }

    return runParse(mc, parent);
  }));

  return modules.flat();
}

async function runParse(mc: any, parent: any): Promise<any> {
  // pre
  mc = await hooks.parse.run(mc, parent, getPluginOption, "pre");

  // 子模块在 pre 之后、post 之前处理掉
  if (mc.modules) {
    mc.modules = await parseModules(mc.modules, mc);
  }

  // post
  mc = await hooks.parse.run(mc, parent, getPluginOption, "post");

  return mc;
}

/**
 * 渲染模块树
 */
async function renderModules(parsedModules: any[]): Promise<any> {
  let renderedModules: any = parsedModules;

  // 前置处理
  renderedModules = await hooks.render.run(renderedModules, getPluginOption, "pre");

  // 后置处理
  renderedModules = await hooks.render.run(renderedModules, getPluginOption, "post");

  return renderedModules;
}

function getPluginOption(name: string): IPluginOption {
  const { plugins }: IFrameworkOptions = cache.get("options");
  return plugins ? plugins[name] || plugins[name.toLowerCase()] || {} : {};
}

// 对于使用 import() 引入的模块，需要转换
async function interopDefaultExports(m: any): Promise<any> {
  const _ = await m;

  if ("default" in _) {
    return _.default;
  }

  return _;
}
