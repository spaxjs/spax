declare const _default: {
    path: string;
    title: string;
    lazy: () => Promise<any>;
    blocks: {
        path: string;
        title: string;
        lazy: () => Promise<any>;
        blocks: {
            path: string;
            title: string;
            lazy: () => Promise<any>;
        }[];
    }[];
};
/**
 * path 为空字符串，
 * 表示与父级拥有同样的 path，
 * 意味着会一同显示。
 */
export default _default;
