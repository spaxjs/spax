import { debug, error, warn } from "@spax/debug";
import { cache, useCached } from "./cache";
import { InitHook, ParseHook, RenderHook } from "./hooks";
import { IBlock, IHooks, IOptions, IPO, TPlugin } from "./types";

const KEY_HOOKS = "hooks";
const KEY_PLUGINS = "plugins";
const KEY_OPTIONS = "options";
const KEY_PARSED = "parsed";
const KEY_RENDERED = "rendered";

const pluginOptionGetter = (name: string): IPO => {
  const { plugins: c }: IOptions = cache.get(KEY_OPTIONS);
  return c ? c[name] || c[name.toLowerCase()] || {} : {};
};

export async function run(plugins: TPlugin[] = [], options: IOptions = {}): Promise<any> {
  if (cache.has("init")) {
    cache.clear();
  }

  await runInit(plugins, options);

  // 标识已加载
  cache.set("init", 1);

  return runRender(await runParse(options.blocks, false), false);
}

/**
 * parse 函数允许重复执行，
 * 生成的数据将会覆盖原有数据。
 */
export async function runParse(blocks: IBlock[] = [], shouldEmit: boolean = true) {
  const parsedBlocks = await parseBlocks(blocks, {}, true);

  /* istanbul ignore next */
  if (process.env.NODE_ENV === "development") {
    debug("Blocks parsed: %O", parsedBlocks);
  }

  // 存储以备外部调用
  cache.set(KEY_PARSED, parsedBlocks, shouldEmit);

  return parsedBlocks;
}

/**
 * render 函数允许重复执行，
 * 生成的数据将会覆盖原有数据。
 */
export async function runRender(blocks: IBlock[] = [], shouldEmit: boolean = true) {
  const renderedBlocks = await renderBlocks(blocks);

  /* istanbul ignore next */
  if (process.env.NODE_ENV === "development") {
    debug("Blocks rendered: %O", renderedBlocks);
  }

  // 存储以备外部调用
  cache.set(KEY_RENDERED, renderedBlocks, shouldEmit);

  return renderedBlocks;
}

export function useParsed(): [IBlock[], (v: IBlock[]) => void] {
  return useCached<IBlock[]>(KEY_PARSED);
}

export function useRendered(): [any, (v: any) => void] {
  return useCached<any>(KEY_RENDERED);
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
  blocks: IBlock[] = [],
  parent: IBlock,
  fromInnerCall: boolean = false,
): Promise<IBlock[]> {
  if (!cache.has("init")) {
    error("Please call `run` first.");
    return [];
  }

  blocks = await Promise.all(blocks.map(async (mc: IBlock) => {
    mc = await interopDefaultExports(mc);

    if (Array.isArray(mc)) {
      mc = await Promise.all(mc.map((_mc) => parseBlock(_mc, parent)));
      return mc;
    }

    return parseBlock(mc, parent);
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

async function parseBlock(mc: IBlock, parent: IBlock): Promise<IBlock> {
  const { parse } = cache.get(KEY_HOOKS);

  if (!mc.$$parsed) {
    // pre
    mc = await parse.run(mc, parent, "pre");
  }

  // 子模块在 pre 之后、post 之前处理掉
  if (mc.blocks) {
    mc.blocks = await parseBlocks(mc.blocks, mc, true);
  }

  if (!mc.$$parsed) {
    // post
    mc = await parse.run(mc, parent, "post");
  }

  return mc;
}

/**
 * 渲染模块树
 */
async function renderBlocks(parsedBlocks: IBlock[]): Promise<any> {
  const { render } = cache.get(KEY_HOOKS);
  let renderedBlocks: any = parsedBlocks;

  // 前置处理
  renderedBlocks = await render.run(renderedBlocks, "pre");

  // 后置处理
  renderedBlocks = await render.run(renderedBlocks, "post");

  return renderedBlocks;
}

async function runInit(plugins: TPlugin[], options: IOptions) {
  // 存储以备外部调用
  cache.set(KEY_PLUGINS, plugins);
  cache.set(KEY_OPTIONS, options);

  // 初始化三个插槽
  const hooks: IHooks = {
    init: new InitHook(),
    parse: new ParseHook(),
    render: new RenderHook(),
  };

  // 存储以备外部调用
  cache.set(KEY_HOOKS, hooks);

  /* istanbul ignore next */
  if (process.env.NODE_ENV === "development") {
    debug("Hooks created: %O", hooks);
  }

  // 加载插件
  await loadPlugins(plugins, options, hooks);

  // 执行插件的初始化钩子
  await hooks.init.run("pre");
  await hooks.init.run("post");
}

async function loadPlugins(plugins: TPlugin[], options: IOptions, hooks: IHooks) {
  const ordererPlugins = [];
  const pluginNameMap = new Map();

  plugins.forEach((plugin) => {
    const [name, deps] = plugin;
    // 如果存在，说明当前插件被依赖
    if (pluginNameMap.has(name)) {
      // 插入到依赖项之前
      // 当前插件的依赖项的索引值
      const index = pluginNameMap.get(name);
      ordererPlugins.splice(index, 0, plugin);
      // 前面被插入后，依赖项的索引值增大
      pluginNameMap.set(name, index + 1);
    } else {
      // 暂未检测到被其它插件依赖，则直接插入到列表最后
      ordererPlugins.push(plugin);
    }
    // 如果存在依赖项，则建立依赖项与当前项的索引关系
    if (deps && deps.length) {
      deps.forEach((dep: string) => {
        if (!pluginNameMap.has(dep)) {
          // 如果依赖项不与其他插件存在索引关系，则使用当前项在队列的索引值
          pluginNameMap.set(dep, ordererPlugins.length - 1);
        }
        // 如果已存在索引值，则不作更新，
        // 因为该索引值必然小于新索引值，
        // 选择沿用旧的值，可以保证依赖项插入的顺序足够靠前。
      });
    }
  });

  /* istanbul ignore next */
  if (process.env.NODE_ENV === "development") {
    debug("Plugins enabled: %O", ordererPlugins);
  }

  return Promise.all(
    ordererPlugins.map(([name, , plugin]) => plugin(hooks, pluginOptionGetter(name), options)),
  );
}

// 对于使用 import()/require() 引入的模块，需要转换
async function interopDefaultExports(m: any): Promise<any> {
  const _ = await m;

  if ("default" in _) {
    return _.default;
  }

  return _;
}
