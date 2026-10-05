module.exports = function (api) {
  api.cache(true);
  return {
    // nativewind v4: className support comes from the JSX runtime, not a babel plugin.
    // babel-preset-expo also adds the Reanimated/worklets plugin automatically.
    presets: [["babel-preset-expo", { jsxImportSource: "nativewind" }], "nativewind/babel"],
  };
};
