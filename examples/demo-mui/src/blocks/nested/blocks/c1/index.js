export default {
    path: "c1",
    title: "C1",
    // description: "C1 from Nested",
    lazy: () => import("blocks/nested/components/UI"),
    blocks: [
        import("./blocks/c0"),
        import("./blocks/c1"),
        import("./blocks/c2"),
    ],
};
