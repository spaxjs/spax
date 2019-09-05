export default [
    "Level",
    [],
    ({ parse }) => {
        parse.tap((current, parent) => {
            return {
                ...current,
                level: parent.level ? parent.level + 1 : 1,
            };
        });
    },
];
