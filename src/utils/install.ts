const ora = require("ora");
const child_process = require("child_process");
const util = require("util");
// const inquirer = require("inquirer");

/**
 * 安装新的依赖
 *
 * @export
 */
export async function installUpdate() {
  console.log();
  const spinner = ora("更新依赖...").start();
  spinner.color = "green";
  const exec = util.promisify(child_process.exec);
  const { error } = await exec("npm install @tarojs/cli@next --save-dev");
  if (error) {
    spinner.fail("更新失败");
    process.exit();
  }
  const result = await exec(
    "npm install @tarojs/runtime@next @tarojs/mini-runner@next @tarojs/components@next @tarojs/taro@next @tarojs/react@next"
  );
  if (result.error) {
    spinner.fail("更新失败");
    process.exit();
  }
  spinner.succeed("更新完成");
}
