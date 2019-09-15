/// <reference types="react" />
declare const _default: {
    path: string;
    title: string;
    icon: import("react").ComponentType<import("@material-ui/core/SvgIcon").SvgIconProps>;
    lazy: () => Promise<typeof import("./components/UI")>;
    blocks: (Promise<typeof import("./blocks/c1")> | {
        path: string;
        lazy: () => Promise<typeof import("./components/NotFound")>;
    })[];
};
export default _default;
