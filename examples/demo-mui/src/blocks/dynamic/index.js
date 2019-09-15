import { SettingsInputSvideo } from "@material-ui/icons";
export default {
    path: "dynamic",
    title: "Dynamic",
    icon: SettingsInputSvideo,
    lazy: () => import("./UI"),
    data: {
        description: "dynamic",
    },
};
