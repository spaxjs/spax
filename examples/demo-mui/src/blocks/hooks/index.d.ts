/// <reference types="react" />
import UI from "./UI";
declare const _default: {
    path: string;
    title: string;
    icon: import("react").ComponentType<import("@material-ui/core/SvgIcon").SvgIconProps>;
    description: string;
    component: typeof UI;
    blocks: Promise<typeof import("./search")>[];
};
export default _default;
