// import { installUpdate } from "./utils/install";
import { createFileTree } from "./utils/file";
import { traverseFileTree } from "./utils/tools";
// import transform from "./utils/transform";
import { cliInfo } from "./utils/ui";
// const util = require("util");

/**
 * 初始化
 *
 * @export
 */
export async function init() {
  cliInfo();
  // await installUpdate();
  const fileTree = createFileTree();
  fileTree.map((item) =>
    traverseFileTree(item, (node) => {
      console.log("node", node);
    })
  );
  // console.log("fileTree", util.inspect(fileTree, { depth: 3 }));
  // const result = transform("const n = 1");
  // console.log("result", result);
}

init();

process.on("SIGTERM", () => {
  console.log("进程已终止");
});
