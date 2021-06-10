const pkg = require("../../package.json");

/**
 * cli信息打印
 *
 * @export
 */
export function cliInfo() {
  console.log(`👽 Taro-Migrate v${pkg.version}`);
}
