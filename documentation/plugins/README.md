# 插件 Plugins

`SPAX` 是基于插件的框架。虽然在没有插件的情况下，框架也能正常运行，但在实际应用中，我们总是需要添加一些插件以实现某些功能，比如引入 `路由插件` 来管理 `组件/模块` 的显示与隐藏。

`SPAX` 官方仅提供了一些常用的功能插件，有能力的个人或团队，可以自行开发更符合需求的插件。我们欢迎大家贡献优质的插件，一起来完善 `SPAX` 的生态，提高使用 `SPAX` 开发的工作效率与代码质量。

## 开发插件 Development

```typescript
// 引入类型声明（我们推荐使用 Typescript 开发）
import { ISlots, IOptions, IBlock, IPO } from "@spax/core";

const PluginName = "SomePlugin";
const PluginDeps = ["ElsePlugin"];

// 框架向插件注入了三个事件插槽
export default [
  PluginName,
  PluginDeps,
  // option 当前插件配置项；options 全局配置项
  ({ init, parse, render }: ISlots, option: IPO, options: IOptions) => {
    init.tap(
      PluginName,
      () => {
        // 做一些初始化的操作
      }
    );

    parse.tap(
      PluginName,
      (current: IBlock, parent: IBlock) => {
        // 挨个处理业务模块，返回值作为下一个插件的输入值
      }
    );

    render.tap(
      PluginName,
      (blocks: IBlock[]) => {
        // 处理业务模块树，返回值作为下一个插件的输入值
      }
    );
  }
];
```

## 使用插件 Usage

在框架中引入，参见 [框架基类 Framework](../core/framework.md)
