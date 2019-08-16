# :rocket: spax

:construction: 原型阶段

> :fist_raised: 使用 React、TypeScript，可扩展、插件化、渐进式，满足各种规模的业务开发。

[![Build Status](https://travis-ci.org/crossjs/spax.svg?branch=master)](https://travis-ci.org/crossjs/spax)
[![codecov](https://codecov.io/gh/crossjs/spax/branch/master/graph/badge.svg)](https://codecov.io/gh/crossjs/spax)
[![jest](https://jestjs.io/img/jest-badge.svg)](https://github.com/facebook/jest)

## :open_book: 名词解释 Glossary

- 框架：特指 [@spax/core](packages/core) 与 [@spax/framework](packages/framework)
- 业务框架：比如 [@spax/framework-hook](packages/framework-hook)
- 模块：业务模块声明，可能包含 path, component 等信息

## :pushpin: 设计原则 principle

- 可扩展
  - 核心框架仅提供必要的插件与模块管理能力，其它技术栈不做限制。
- 插件化
  - 围绕插件初始化、模块解析、组件渲染等钩子函数，开发功能插件。
- 渐进式
  - 业务框架演进路径：糅合于业务 -> 抽象成插件 -> 沉淀到框架。

## :nut_and_bolt: 插件 plugins

- [@spax/plugin-i18n](packages/plugin-i18n) 支持多语言
- [@spax/plugin-lazy](packages/plugin-lazy) 支持异步组件
- [@spax/plugin-level](packages/plugin-level) 标记模块层级
- [@spax/plugin-path](packages/plugin-path) 规范化模块路由地址
- [@spax/plugin-router](packages/plugin-router) 提供路由支持

## :card_file_box: 框架 frameworks

- [@spax/framework](packages/framework) 框架基类
- [@spax/framework-hook](packages/framework-hook) 基础框架，集成常见插件

## :ant: 配件 assets

- [@spax/history](packages/history) [history](https://github.com/ReactTraining/history) 的 React Hook 封装
- [@spax/hooks](packages/hooks) 一些常用的 React Hooks
- [@spax/i18n](packages/i18n) [i18next](https://github.com/i18next/i18next) 的封装
- [@spax/router](packages/router) 基于 React Hook 的路由实现

## :sparkler: 示例 examples

> 以下示例使用的技术栈非必选，实际应用时可根据自身偏好灵活调整。

- [boilerplate-mui](packages/boilerplate-mui)
  - craco
  - react-scripts
  - styled-components
  - material-ui

## :bulb: 心得 tips

- React Hook 等会触发 re-render 的逻辑，应尽量减少影响范围，尽量放到最靠近需要它的作用域。
