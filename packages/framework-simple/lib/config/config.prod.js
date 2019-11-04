export default {
    auth: {
        Forbidden: require("../components/exception/Forbidden").default,
    },
    router: {
        NotFound: require("../components/exception/NotFound").default,
    },
};
