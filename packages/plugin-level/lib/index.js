export default {
    name: "Level",
    plug: ({ parse }) => {
        parse.tap((current, parent) => {
            return {
                ...current,
                level: parent.level ? parent.level + 1 : 1,
            };
        });
    },
};
