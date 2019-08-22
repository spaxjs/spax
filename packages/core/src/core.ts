import { debug, error, warn } from "@spax/debug";
import { useEffect, useState } from "react";
import cache from "./cache";
import { InitHook, ParseHook, RenderHook } from "./hooks";
import { IBlock, IHooks, IOptions, IPO, TPlugin } from "./types";

const KEY_HOOKS = "hooks";
const KEY_PLUGINS = "plugins";
const KEY_OPTIONS = "options";
const KEY_PARSED = "parsed";
const KEY_RENDERED = "rendered";

const pluginOptionGetter = (scope: string, name: string): IPO => {
  const { plugins: c }: IOptions = cache.get(KEY_OPTIONS, scope);
  return c ? c[name] || c[name.toLowerCase()] || {} : {};
};

export const DEFAULT_SCOPE = "🚀";

export async function run(plugins: TPlugin[] = [], options: IOptions = {}): Promise<any> {
  const { scope = DEFAULT_SCOPE } = options;

  if (cache.has("run", scope)) {
    error("Scope `%s` already taken. Please use a different string.", scope);
    return;
  }

  // 标识已加载，不允许重复执行
  cache.set("run", 1, scope);

  // 存储以备外部调用
  cache.set(KEY_PLUGINS, plugins, scope);
  cache.set(KEY_OPTIONS, options, scope);

  const hooks: IHooks = {
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
  return getRenderedBlocks(options.blocks, scope);
}

export function useParsed(scope: string = DEFAULT_SCOPE): [IBlock[]] {
  const [state, setState] = useState([]);

  useEffect(() => {
    setState(cache.get(KEY_PARSED, scope));
    cache.on(KEY_PARSED, setState, scope);
    return () => {
      cache.off(KEY_PARSED, setState, scope);
    };
  }, []);

  return [state];
}

/**
 * 未来，此处有可能是 Reactive 的
 */
export function useRendered(scope: string = DEFAULT_SCOPE): [any] {
  return [cache.get(KEY_RENDERED, scope)];
}

/**
 * 递归处理模块，顺序执行 parser
 * @example
 * // blocks: [m1, m2]
 * // parsers: [p1, p2]
 * p1.pre(m1) -> p2.pre(m1) -> p2.post(m1) -> p1.post(m1)
 * p1.pre(m2) -> p2.pre(m2) -> p2.post(m2) -> p1.post(m2)
 * // 如果有子模块（深度优先）
 * p1.pre(m1) -> p2.pre(m1) -> (子模块流程，同父模块) -> p2.post(m1) -> p1.post(m1)
 */
export async function parseBlocks(
  blocks: IBlock[],
  parent: IBlock,
  scope: string = DEFAULT_SCOPE,
  fromInnerCall: boolean = false,
): Promise<IBlock[]> {
  if (!cache.has("run", scope)) {
    error("Scope `%s` has not initialized yet. Please call `run` first.", scope);
    return;
  }

  blocks = await Promise.all(blocks.map(async (mc: IBlock) => {
    mc = await interopDefaultExports(mc);

    if (Array.isArray(mc)) {
      mc = await Promise.all(mc.map((_mc) => parseBlock(_mc, parent, scope)));
      return mc;
    }

    return parseBlock(mc, parent, scope);
  }));

  blocks = blocks.flat();

  // 外部调用时，需要更新 parent.blocks
  if (!fromInnerCall) {
    /* istanbul ignore next */
    if (process.env.NODE_ENV === "development") {
      // 如果已存在，则告警
      if (parent.blocks && parent.blocks.length) {
        warn("Override blocks of parent which is not empty");
      }
    }
    parent.blocks = blocks;
  }

  return blocks;
}

async function parseBlock(mc: IBlock, parent: IBlock, scope: string): Promise<IBlock> {
  const { parse } = cache.get(KEY_HOOKS, scope);
  const options = cache.get(KEY_OPTIONS, scope);

  // pre
  mc = await parse.run(mc, parent, pluginOptionGetter, options, "pre");

  // 子模块在 pre 之后、post 之前处理掉
  if (mc.blocks) {
    mc.blocks = await parseBlocks(mc.blocks, mc, scope, true);
  }

  // post
  mc = await parse.run(mc, parent, pluginOptionGetter, options, "post");

  return mc;
}

async function getRenderedBlocks(blocks: IBlock[] = [], scope: string): Promise<any> {
  const parsedBlocks = await parseBlocks(blocks, {}, scope, true);

  // 存储以备外部调用
  cache.set(KEY_PARSED, parsedBlocks, scope);

  /* istanbul ignore next */
  if (process.env.NODE_ENV === "development") {
    debug("Blocks parsed: %O", parsedBlocks);
  }

  const renderedBlocks = await renderBlocks(parsedBlocks, scope);

  // 存储以备外部调用
  cache.set(KEY_RENDERED, renderedBlocks, scope);

  /* istanbul ignore next */
  if (process.env.NODE_ENV === "development") {
    debug("Blocks rendered: %O", renderedBlocks);
  }

  return renderedBlocks;
}

/**
 * 渲染模块树
 */
async function renderBlocks(parsedBlocks: IBlock[], scope: string): Promise<any> {
  const { render } = cache.get(KEY_HOOKS, scope);
  const options = cache.get(KEY_OPTIONS, scope);
  let renderedBlocks: any = parsedBlocks;

  // 前置处理
  renderedBlocks = await render.run(renderedBlocks, pluginOptionGetter, options, "pre");

  // 后置处理
  renderedBlocks = await render.run(renderedBlocks, pluginOptionGetter, options, "post");

  return renderedBlocks;
}

// 对于使用 import() 引入的模块，需要转换
async function interopDefaultExports(m: any): Promise<any> {
  const _ = await m;

  if ("default" in _) {
    return _.default;
  }

  return _;
}
