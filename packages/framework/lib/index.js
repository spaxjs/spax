import { run } from "@spax/core";
import { debug, error, fatal, warn } from "@spax/debug";
import isPlainObject from "lodash/isPlainObject";
import mergeWith from "lodash/mergeWith";
import * as ReactDOM from "react-dom";
export default class Framework {
    constructor(options = {}) {
        this.plugins = [];
        this.options = {};
        if (process.env.NODE_ENV !== "test") {
            debug(`
   _____ ____  ___   _  __
  / ___// __ \\/   | | |/ /
  \\__ \\/ /_/ / /| | |   /
 ___/ / ____/ ___ |/   |
/____/_/   /_/  |_/_/|_|`);
        }
        if (process.env.NODE_ENV === "development") {
            warn("Looks like we are in development mode!");
        }
        this.initialize(options);
    }
    async mount(callback) {
        try {
            const { plugins, options } = this;
            // 解析
            const rendered = await run(plugins, options);
            // 挂载点
            const mountingElement = typeof options.container === "string"
                ? document.querySelector(options.container) : options.container;
            if (!mountingElement) {
                fatal(`${options.container} is not a valid HTMLElement`);
            }
            // 转字符串，避免出错
            const renderElement = Array.isArray(rendered) ? JSON.stringify(rendered) : rendered;
            // 挂载
            ReactDOM.render(renderElement, mountingElement, () => {
                if (process.env.NODE_ENV === "development")
                    debug("Mounted to container: %O", options.container);
                if (callback) {
                    callback();
                }
            });
        }
        catch (e) {
            error(e);
        }
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
        if (process.env.NODE_ENV === "development")
            debug("Initialize Framework with options: %O, plugins: %O", this.options, this.plugins);
    }
}
// 插件
Framework.plugins = [];
// 选项
Framework.options = {
    scope: "🚀",
    version: "1.0.0",
    // 插件选项
    plugins: {},
    // 业务模块
    modules: [],
    container: "#root",
};
/**
 * 对象：深拷贝
 * 数组：合并
 */
function merge(...args) {
    return mergeWith({}, ...args, (obj, src) => {
        // 合并数组
        if (Array.isArray(src)) {
            if (Array.isArray(obj)) {
                return obj.concat(src);
            }
        }
        // 合并对象
        if (isPlainObject(src)) {
            if (isPlainObject(obj)) {
                return merge(obj, src);
            }
        }
        // 其它，直接覆盖
        return src;
    });
}
