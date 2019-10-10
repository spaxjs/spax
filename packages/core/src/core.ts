import { debug } from "@spax/debug";
import { cache } from "./cache";
import {
  KEY_INIT,
  KEY_OPTIONS,
  KEY_PARSED,
  KEY_PLUGINS,
  KEY_RENDERED,
  KEY_SLOTS,
} from "./constants";
import { InitSlot, ParseSlot, RenderSlot } from "./slots";
import { IBlock, IOptions, IPlugin, IPO, ISlots } from "./types";

export async function run(
  plugins: IPlugin[] = [],
  options: IOptions = {},
): Promise<React.ReactNode> {
  if (cache.has(KEY_INIT)) {
    cache.clear();
  }

  await runInit(plugins, options);

  // 标识已加载
  cache.set(KEY_INIT, 1);

  return runRender(await runParse(options.blocks || []));
}

/**
 * parse 函数允许重复执行，
 * 生成的数据将会覆盖原有数据。
 */
async function runParse(blocks: IBlock[]): Promise<IBlock[]> {
  const parsedBlocks = await parseBlocks(blocks, {});

  /* istanbul ignore next */
  if (process.env.NODE_ENV === "development") {
    debug("Blocks parsed: %O", parsedBlocks);
  }

  // 存储以备外部调用
  cache.set(KEY_PARSED, parsedBlocks);

  return parsedBlocks;
}

/**
 * render 函数允许重复执行，
 * 生成的数据将会覆盖原有数据。
 */
async function runRender(blocks: IBlock[]): Promise<React.ReactNode> {
  const renderedBlocks = await renderBlocks(blocks);

  /* istanbul ignore next */
  if (process.env.NODE_ENV === "development") {
    debug("Blocks rendered: %O", renderedBlocks);
  }

  // 存储以备外部调用
  cache.set(KEY_RENDERED, renderedBlocks);

  return renderedBlocks;
}

async function parseBlocks(
  blocks: IBlock[],
  parent: IBlock,
): Promise<IBlock[]> {
  blocks = await Promise.all(
    blocks.map(async (mc: IBlock) => {
      mc = await interopDefaultExports(mc);

      if (Array.isArray(mc)) {
        mc = await Promise.all(mc.map(_mc => parseBlock(_mc, parent)));
        return mc;
      }

      return parseBlock(mc, parent);
    }),
  );

  blocks = blocks.flat();

  return blocks;
}

async function parseBlock(mc: IBlock, parent: IBlock): Promise<IBlock> {
  const { parse } = cache.get(KEY_SLOTS);

  // pre
  mc = await parse.run(mc, parent, "pre");

  // 子模块在 pre 之后、post 之前处理掉
  if (mc.blocks) {
    mc.blocks = await parseBlocks(mc.blocks, mc);
  }

  // post
  mc = await parse.run(mc, parent, "post");

  return mc;
}

/**
 * 渲染模块树
 */
async function renderBlocks(parsedBlocks: IBlock[]): Promise<React.ReactNode> {
  const { render } = cache.get(KEY_SLOTS);
  let renderedBlocks: any = parsedBlocks;

  // 前置处理
  renderedBlocks = await render.run(renderedBlocks, "pre");

  // 后置处理
  renderedBlocks = await render.run(renderedBlocks, "post");

  return renderedBlocks;
}

async function runInit(plugins: IPlugin[], options: IOptions): Promise<void> {
  // 存储以备外部调用
  cache.set(KEY_PLUGINS, plugins);
  cache.set(KEY_OPTIONS, options);

  // 初始化三个插槽
  const slots: ISlots = {
    init: new InitSlot(),
    parse: new ParseSlot(),
    render: new RenderSlot(),
  };

  // 存储以备外部调用
  cache.set(KEY_SLOTS, slots);

  /* istanbul ignore next */
  if (process.env.NODE_ENV === "development") {
    debug("Hook slots created: %O", slots);
  }

  // 加载插件
  await loadPlugins(plugins, options, slots);

  // 执行插件的初始化钩子
  await slots.init.run("pre");
  await slots.init.run("post");
}

async function loadPlugins(
  plugins: IPlugin[],
  options: IOptions,
  slots: ISlots,
) {
  const ordererPlugins: IPlugin[] = [];
  const pluginNameMap: Map<string, number> = new Map();

  plugins.forEach(plugin => {
    const { name, deps } = plugin;
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
    ordererPlugins.map(({ name, plug }) =>
      plug(slots, getPluginOption(name), options),
    ),
  );
}

function getPluginOption(name: string): IPO {
  const { plugins }: IOptions = cache.get(KEY_OPTIONS);
  return plugins ? plugins[name] || plugins[name.toLowerCase()] || {} : {};
}

// 对于使用 import()/require() 引入的模块，需要转换
async function interopDefaultExports(m: any): Promise<any> {
  const _ = await m;

  if ("default" in _) {
    return _.default;
  }

  return _;
}
