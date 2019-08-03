# 🐢 wugui

:construction: 原型阶段

使用 **React**，
使用 **TypeScript**，
基于 **插件化**，
基于 **渐进式**，
满足不同规模下的业务开发。

## :pushpin: 设计原则 principle

### 插件化

遵循 **单一职责原则**，围绕 **模块解析** 与 **组件渲染** 两个核心钩子函数，开发功能插件。

### 渐进式

框架演进路径：功能糅合于业务 -> 抽象成 **业务** 插件 -> 抽象成 **通用** 插件 -> 沉淀到 **框架**。

## :hammer_and_wrench: 使用 usage

### 安装

```bash
yarn add global @wugui/cli
```

### 创建项目

```bash
wugui init my_wugui_app
```

## :nut_and_bolt: 插件 plugins

- [@wugui/plugin-lazy](packages/plugin-lazy) 提供异步组件支持
- [@wugui/plugin-path](packages/plugin-path) 规范化模块路由地址
- [@wugui/plugin-router](packages/plugin-router) 简单的基于 hooks 的路由

## :card_file_box: 框架 frameworks

- [@wugui/framework-simple](packages/framework-simple) 基础框架，集成常见插件

## :anchor: 钩子 hooks

- [@wugui/hooks](packages/hooks) 一些常用的 hooks

## :rocket: 示例 examples

- [boilerplate-simple](packages/boilerplate-simple)
  - craco
  - react-scripts
  - antd
  - styled-components
