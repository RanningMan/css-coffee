const configs = {
  endpoint:
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://csscoffee.dev",
};

export default configs;
