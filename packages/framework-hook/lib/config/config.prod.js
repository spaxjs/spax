export default {
    version: "0.0.1",
    plugins: {
        router: {
            NotFound: require("framework/components/exception/NotFound").default,
            Forbidden: require("framework/components/exception/Forbidden").default,
        },
    },
};
