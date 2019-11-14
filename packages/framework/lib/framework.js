import { Core } from "@spax/core";
import { group, groupEnd, log, warn } from "@spax/debug";
import isPlainObject from "lodash/isPlainObject";
import mergeWith from "lodash/mergeWith";
import React from "react";
import { Context } from "./context";
export class Framework {
    constructor(options = {}) {
        this.plugins = [];
        this.options = {};
        /* istanbul ignore next */
        if (process.env.NODE_ENV !== "test") {
            log(`
   _____ ____  ___   _  __
  / ___// __ \\/   | | |/ /
  \\__ \\/ /_/ / /| | |   /
 ___/ / ____/ ___ |/   |
/____/_/   /_/  |_/_/|_|`);
        }
        /* istanbul ignore next */
        if (process.env.NODE_ENV === "development") {
            warn("Looks like we are in development mode!");
        }
        /* istanbul ignore next */
        if (process.env.NODE_ENV === "development") {
            group("Framework.Initialize");
        }
        this.initialize(options);
        /* istanbul ignore next */
        if (process.env.NODE_ENV === "development") {
            groupEnd();
        }
        this.core = new Core(this.plugins, this.options);
    }
    async createApp(blocks) {
        // 解析
        const parsed = await this.core.parse(blocks);
        const rendered = await this.core.render(parsed);
        const App = () => {
            return (React.createElement(Provider, { value: { parsed, rendered } }, Array.isArray(rendered)
                ? JSON.stringify(rendered)
                : rendered));
        };
        return App;
    }
    /**
     * 通过原型链实现递归合并
     */
    initialize(ctorOptions) {
        let ctr = this.constructor;
        // 静态属性 plugins
        const plugins = [ctr.plugins];
        // 静态属性 options
        const options = [ctr.options];
        // 自动继承父类的 静态属性 plugins
        // 自动继承父类的 静态属性 options
        // tslint:disable-next-line
        while (ctr && (ctr = Object.getPrototypeOf(ctr))) {
            if (ctr.plugins) {
                // 父类的插件在前
                plugins.unshift(ctr.plugins);
            }
            if (ctr.options) {
                // 父类的选项在前
                options.unshift(ctr.options);
            }
        }
        // 拍平
        this.plugins = plugins.flat();
        // 合并
        this.options = merge(...options, ctorOptions);
        /* istanbul ignore next */
        if (process.env.NODE_ENV === "development") {
            log("with plugins: %O", this.plugins);
            log("with options: %O", this.options);
        }
    }
}
// 插件
Framework.plugins = [];
// 选项
Framework.options = {};
function Provider({ value, ...props }) {
    const [state, setState] = React.useState({});
    let prevState = {};
    const setContext = React.useCallback((v) => {
        const nextState = { ...prevState, ...v };
        setState(nextState);
        prevState = nextState;
    }, [setState]);
    return (React.createElement(Context.Provider, Object.assign({}, props, { value: {
            ...value,
            ...state,
            setContext,
        } })));
}
/**
 * 合并对象与数组
 */
function merge(...args) {
    return mergeWith({}, ...args, (obj, src) => {
        // 合并数组
        if (Array.isArray(src) && Array.isArray(obj)) {
            return obj.concat(src);
        }
        // 合并对象
        if (isPlainObject(src) && isPlainObject(obj)) {
            return merge(obj, src);
        }
        // 其它，直接覆盖
        return src;
    });
}
