# :rocket: spax

> :fist_raised: 使用 React、TypeScript，可扩展、插件化、渐进式，满足各种规模的业务开发。

[![Actions Status](https://github.com/crossjs/spax/workflows/Node%20CI/badge.svg)](https://github.com/crossjs/spax/actions)
[![Build Status](https://travis-ci.org/crossjs/spax.svg?branch=master)](https://travis-ci.org/crossjs/spax)
[![codecov](https://codecov.io/gh/crossjs/spax/branch/master/graph/badge.svg)](https://codecov.io/gh/crossjs/spax)
[![DevDependencies](https://img.shields.io/david/dev/crossjs/spax.svg)](https://david-dm.org/crossjs/spax?type=dev)
[![jest](https://jestjs.io/img/jest-badge.svg)](https://github.com/facebook/jest)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

## :coffee: 立即使用 StarterKit

执行以下命令：

```bash
$ npx @spax/spax-cli <project-name>
```

马上开始一段奇妙的旅程。

## :open_book: 名词解释 Glossary

- 引擎：特指 [@spax/core](packages/core)
- 框架
  - 基础框架：[@spax/framework](packages/framework)
  - 业务框架：基础框架的子类，比如 [@spax/framework-hook](packages/framework-hook)
- Block：业务模块声明，可能包含 path, component 等信息

## :pushpin: 设计原则 Principle

- 可扩展
  - 核心框架仅提供必要的插件与模块管理能力，其它技术栈不做限制。
- 插件化
  - 围绕插件初始化、模块解析、组件渲染等钩子函数，开发功能插件。
- 渐进式
  - 业务框架演进路径：糅合于业务 -> 抽象成插件 -> 沉淀到框架。

## :nut_and_bolt: 插件 Plugins

- [@spax/plugin-auth](packages/plugin-auth) 支持权限控制
- [@spax/plugin-i18n](packages/plugin-i18n) 支持多语言
- [@spax/plugin-lazy](packages/plugin-lazy) 支持异步组件
- [@spax/plugin-level](packages/plugin-level) 标记模块层级
- [@spax/plugin-path](packages/plugin-path) 规范化模块路由地址
- [@spax/plugin-router](packages/plugin-router) 提供路由支持

## :card_file_box: 框架 Frameworks

- [@spax/framework](packages/framework) 框架基类
- [@spax/framework-hook](packages/framework-hook) 基础框架，集成常见插件

## :ant: 配件 Assets

- [@spax/history](packages/history) [history](https://github.com/ReactTraining/history) 的 React Hook 封装
- [@spax/hooks](packages/hooks) 一些常用的 React Hooks
- [@spax/i18n](packages/i18n) [i18next](https://github.com/i18next/i18next) 的封装
- [@spax/router](packages/router) 基于 React Hook 的路由实现

## :sparkler: 示例 Examples

> 以下示例使用的技术栈非必选，实际应用时可根据自身偏好灵活调整。

- [demo with mui](examples/demo-mui)
  - craco
  - react-scripts
  - material-ui
  - i18next

- [demo for single-spa](examples/demo-single-spa)
  - craco
  - react-scripts
  - single-spa
