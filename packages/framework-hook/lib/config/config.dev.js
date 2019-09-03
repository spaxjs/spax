export default {
    version: "0.0.1",
    plugins: {
        auth: {
            Forbidden: require("../components/exception/Forbidden").default,
        },
        router: {
            NotFound: require("../components/exception/NotFound").default,
        },
    },
};
