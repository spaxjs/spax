export default ({ parse }) => {
    parse.tap("Level", [], (current, parent, option) => {
        return {
            ...current,
            level: parent.level ? parent.level + 1 : 1,
        };
    });
};
