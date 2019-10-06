# 主页 Home

🚀 使用 React、TypeScript，可扩展、插件化、渐进式，满足各种规模的业务开发。

[![Actions Status](https://github.com/crossjs/spax/workflows/Node%20CI/badge.svg)](https://github.com/crossjs/spax/actions) &nbsp;
[![Build Status](https://travis-ci.org/crossjs/spax.svg?branch=master)](https://travis-ci.org/crossjs/spax) &nbsp;
[![codecov](https://codecov.io/gh/crossjs/spax/branch/master/graph/badge.svg)](https://codecov.io/gh/crossjs/spax) &nbsp;
[![DevDependencies](https://img.shields.io/david/dev/crossjs/spax.svg)](https://david-dm.org/crossjs/spax?type=dev)

<p id="buttons">
  <a href="https://github.com/crossjs/spax" id="button-github">
    <i class="fa fa-github" aria-hidden="true"></i> Github</a>
  <a href="https://spax.crossjs.com" id="button-preview">
    <i class="fa fa-eye" aria-hidden="true"></i> Preview</a>
</p>

## 立即使用 StarterKit

执行以下命令：

```bash
$ npx @spax/spax-cli <project-name>
```

马上开始一段奇妙的旅程。

## 名词解释 Glossary

* 框架：特指 [core](core/core.md) 与 [framework](core/framework.md)
* 业务框架：比如 [framework-simple](frameworks/framework-simple.md)
* 模块：业务模块声明，可能包含 `path`, `component`, `data` 等信息

## 设计原则 Principle

* 可扩展
  * 核心框架仅提供必要的插件与模块管理能力，其它技术栈不做限制。
* 插件化
  * 围绕插件初始化、模块解析、组件渲染等钩子函数，开发功能插件。
* 渐进式
  * 业务框架演进路径：糅合于业务 -&gt; 抽象成插件 -&gt; 沉淀到框架。
