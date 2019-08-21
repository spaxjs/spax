import { debug, error } from "@spax/debug";
import cache from "./cache";
import { InitHook, ParseHook, RenderHook } from "./hooks";
const KEY_HOOKS = "hooks";
const KEY_PLUGINS = "plugins";
const KEY_OPTIONS = "options";
const KEY_PARSED = "parsed";
const KEY_RENDERED = "rendered";
const pluginOptionGetter = (scope = DEFAULT_SCOPE, name) => {
    const { plugins: c } = cache.get(KEY_OPTIONS, scope);
    return c ? c[name] || c[name.toLowerCase()] || {} : {};
};
export const DEFAULT_SCOPE = "🚀";
export async function run(plugins = [], options = {}) {
    const { scope = DEFAULT_SCOPE } = options;
    if (cache.has("run", scope)) {
        error("Scope `%s` already taken. Please set use a different string.", scope);
        return;
    }
    // 标识已加载，不允许重复执行
    cache.set("run", 1, scope);
    // 存储以备外部调用
    cache.set(KEY_PLUGINS, plugins, scope);
    cache.set(KEY_OPTIONS, options, scope);
    const hooks = {
        init: new InitHook(scope),
        parse: new ParseHook(scope),
        render: new RenderHook(scope),
    };
    // 存储以备外部调用
    cache.set(KEY_HOOKS, hooks, scope);
    /* istanbul ignore next */
    if (process.env.NODE_ENV === "development") {
        debug("Hooks created: %O", hooks);
    }
    // 插件
    plugins.forEach((plugin) => plugin(hooks));
    /* istanbul ignore next */
    if (process.env.NODE_ENV === "development") {
        debug("Plugins enabled: %O", plugins);
    }
    // 初始化
    await hooks.init.run(pluginOptionGetter, options, "pre");
    await hooks.init.run(pluginOptionGetter, options, "post");
    // 直接返回
    return getRenderedBlocks(options.blocks, scope);
}
/**
 * 未来，此处有可能是 Reactive 的
 */
export function useParsed(scope = DEFAULT_SCOPE) {
    return [cache.get(KEY_PARSED, scope)];
}
/**
 * 未来，此处有可能是 Reactive 的
 */
export function useRendered(scope = DEFAULT_SCOPE) {
    return [cache.get(KEY_RENDERED, scope)];
}
/**
 * 递归处理模块，顺序执行 parser
 * @example
 * // blocks: [m1, m2]
 * // parsers: [p1, p2]
 * p1.pre(m1) -> p2.pre(m1) -> p2.post(m1) -> p1.post(m1)
 * p1.pre(m2) -> p2.pre(m2) -> p2.post(m2) -> p1.post(m2)
 * // 如果有子模块（深度优先）
 * p1.pre(m1) -> p2.pre(m1) -> (子模块流程，同父模块) -> p2.post(m1) -> p1.post(m1)
 */
export async function parseBlocks(blocks, parent = {}, scope = DEFAULT_SCOPE) {
    blocks = await Promise.all(blocks.map(async (mc) => {
        mc = await interopDefaultExports(mc);
        if (Array.isArray(mc)) {
            mc = await Promise.all(mc.map((_mc) => parseModule(_mc, parent, scope)));
            return mc;
        }
        return parseModule(mc, parent, scope);
    }));
    return blocks.flat();
}
async function parseModule(mc, parent, scope = DEFAULT_SCOPE) {
    const { parse } = cache.get(KEY_HOOKS, scope);
    const options = cache.get(KEY_OPTIONS, scope);
    // pre
    mc = await parse.run(mc, parent, pluginOptionGetter, options, "pre");
    // 子模块在 pre 之后、post 之前处理掉
    if (mc.blocks) {
        mc.blocks = await parseBlocks(mc.blocks, mc, scope);
    }
    // post
    mc = await parse.run(mc, parent, pluginOptionGetter, options, "post");
    return mc;
}
async function getRenderedBlocks(blocks = [], scope = DEFAULT_SCOPE) {
    const parsedBlocks = await parseBlocks(blocks, {}, scope);
    // 存储以备外部调用
    cache.set(KEY_PARSED, parsedBlocks, scope);
    /* istanbul ignore next */
    if (process.env.NODE_ENV === "development") {
        debug("Blocks parsed: %O", parsedBlocks);
    }
    const renderedBlocks = await renderBlocks(parsedBlocks, scope);
    // 存储以备外部调用
    cache.set(KEY_RENDERED, renderedBlocks, scope);
    /* istanbul ignore next */
    if (process.env.NODE_ENV === "development") {
        debug("Blocks rendered: %O", renderedBlocks);
    }
    return renderedBlocks;
}
/**
 * 渲染模块树
 */
async function renderBlocks(parsedBlocks, scope = DEFAULT_SCOPE) {
    const { render } = cache.get(KEY_HOOKS, scope);
    const options = cache.get(KEY_OPTIONS, scope);
    let renderedBlocks = parsedBlocks;
    // 前置处理
    renderedBlocks = await render.run(renderedBlocks, pluginOptionGetter, options, "pre");
    // 后置处理
    renderedBlocks = await render.run(renderedBlocks, pluginOptionGetter, options, "post");
    return renderedBlocks;
}
// 对于使用 import() 引入的模块，需要转换
async function interopDefaultExports(m) {
    const _ = await m;
    if ("default" in _) {
        return _.default;
    }
    return _;
}
