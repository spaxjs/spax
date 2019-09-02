export default [
    "Level",
    [],
    ({ parse }, option) => {
        parse.tap((current, parent) => {
            return {
                ...current,
                level: parent.level ? parent.level + 1 : 1,
            };
        });
    },
];
