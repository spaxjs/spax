import { Search } from "@material-ui/icons";
export default {
    path: "search",
    title: "useSearch",
    icon: Search,
    lazy: () => import("./UI"),
    data: {
        description: "使用 <location>.search",
    },
};
