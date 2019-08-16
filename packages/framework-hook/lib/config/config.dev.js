export default {
    version: "0.0.1",
    plugins: {
        router: {
            NotFound: require("../components/exception/NotFound").default,
            Forbidden: require("../components/exception/Forbidden").default,
        },
    },
};
