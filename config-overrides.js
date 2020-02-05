<<<<<<< HEAD
const { useBabelRc, override } = require("customize-cra");
module.exports = override(useBabelRc());
=======
const {
  override,
  disableEsLint,
  overrideDevServer,
  watchAll
} = require("customize-cra");

module.exports = {
  webpack: override(
    // usual webpack plugin
    disableEsLint()
  ),
  devServer: overrideDevServer(
    // dev server plugin
    watchAll()
  )
};
>>>>>>> 305b566b399d5359c0d9611eba254e80bb525b38
