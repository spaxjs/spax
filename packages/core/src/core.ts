import { group, groupEnd, log } from "@spax/debug";
import { InitHook, ParseHook, RenderHook } from "./hooks";
import { IBlock, IHooks, IOptions, IPlugin } from "./types";

export class Core {
  private hooks: IHooks;

  constructor(private plugins: IPlugin[] = [], private options: IOptions = {}) {
    /* istanbul ignore next */
    if (process.env.NODE_ENV === "development") {
      group("Core.Initialize");
    }

    this.initialize();

    /* istanbul ignore next */
    if (process.env.NODE_ENV === "development") {
      groupEnd();
    }
  }

  public async run(blocks?: IBlock[]) {
    return this.render(await this.parse(blocks));
  }

  public async parse(blocks: IBlock[] = []) {
    return this.parseBlocks(blocks, {});
  }

  public async render(blocks: IBlock[] = []) {
    return this.hooks.render.run(
      await this.hooks.render.run(blocks, "pre"),
      "post",
    );
  }

  private initialize(): void {
    this.initHooks();

    // 加载插件
    this.initPlugins();

    // 前置处理
    this.hooks.init.run("pre");
    // 后置处理
    this.hooks.init.run("post");
  }

  private initHooks(): void {
    // 初始化三个插槽
    this.hooks = {
      init: new InitHook(),
      parse: new ParseHook(),
      render: new RenderHook(),
    };

    /* istanbul ignore next */
    if (process.env.NODE_ENV === "development") {
      log("with hooks: %O", this.hooks);
    }
  }

  private initPlugins(): void {
    const ordererPlugins: IPlugin[] = [];
    const pluginNameMap: Map<string, number> = new Map();

    this.plugins.forEach(plugin => {
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

    ordererPlugins.map(({ name, plug }) => {
      const option =
        this.options[name] || this.options[name.toLowerCase()] || {};
      return plug(this.hooks, option, this.options);
    });

    /* istanbul ignore next */
    if (process.env.NODE_ENV === "development") {
      log("plug plugins: %O", ordererPlugins);
    }
  }

  private async parseBlocks(
    blocks: IBlock[],
    parent: IBlock,
  ): Promise<IBlock[]> {
    const parsedBlocks = await Promise.all(
      blocks.map(async (block: IBlock) => {
        block = await interopDefaultExports(block);

        if (Array.isArray(block)) {
          return this.parseBlocks(block, parent);
        }

        return this.parseBlock(block, parent);
      }),
    );

    return parsedBlocks.flat();
  }

  private async parseBlock(block: IBlock, parent: IBlock): Promise<IBlock> {
    // pre
    let parsedBlock = await this.hooks.parse.run(block, parent, "pre");

    // 子模块在 pre 之后、post 之前处理掉
    if (parsedBlock.blocks) {
      parsedBlock.blocks = await this.parseBlocks(
        parsedBlock.blocks,
        parsedBlock,
      );
    }

    // post
    parsedBlock = await this.hooks.parse.run(parsedBlock, parent, "post");

    return parsedBlock;
  }
}

// 对于使用 import()/require() 引入的模块，需要转换
async function interopDefaultExports(m: any): Promise<any> {
  const _ = await m;

  if ("default" in _) {
    return _.default;
  }

  return _;
}
