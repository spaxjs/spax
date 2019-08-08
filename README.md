# 🐢 wugui

:construction: 原型阶段

:fist_raised: 用于开发框架的框架：使用 React、TypeScript，可扩展、插件化、渐进式，满足各种规模的业务开发。

![Travis (.org)](https://img.shields.io/travis/crossjs/wugui)
![Codecov](https://img.shields.io/codecov/c/github/crossjs/wugui)

## :open_book: 名词解释 Glossary

- 框架：特指 [@wugui/core](packages/core)
- 业务框架：比如 [@wugui/framework-simple](packages/framework-simple)
- 模块：业务模块声明，可能包含 path, component 等信息

## :pushpin: 设计原则 principle

### 可扩展

核心框架仅提供必要的插件与模块管理能力，其它技术栈不做限制。

### 插件化

围绕插件初始化、模块解析、组件渲染等钩子函数，开发功能插件。

### 渐进式

业务框架演进路径：糅合于业务 -> 抽象成插件 -> 沉淀到框架。

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
- [@wugui/plugin-level](packages/plugin-level) 添加模块层级标记
- [@wugui/plugin-path](packages/plugin-path) 规范化模块路由地址
- [@wugui/plugin-router](packages/plugin-router) 简单的基于 hooks 的路由

## :card_file_box: 框架 frameworks

- [@wugui/framework-simple](packages/framework-simple) 基础框架，集成常见插件

## :anchor: 钩子 hooks

- [@wugui/hooks](packages/hooks) 一些常用的 hooks

## :rocket: 示例 examples

以下示例使用的技术栈非必选，实际应用时可根据自身偏好选择。

### [boilerplate-grommet](packages/boilerplate-grommet)

- craco
- react-scripts
- styled-components
- grommet

### [boilerplate-mui](packages/boilerplate-mui)

- craco
- react-scripts
- styled-components
- material-ui
