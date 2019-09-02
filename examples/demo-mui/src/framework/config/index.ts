export default process.env.NODE_ENV === "production"
  ? require("./config.prod").default
  : require("./config.dev").default;
