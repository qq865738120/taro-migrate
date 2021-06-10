const babel = require("@babel/core");

/**
 * 转换import代码
 *
 * @returns
 */
function importTransform({ types: t }) {
  return {
    visitor: {
      Identifier(path) {
        // 在这个例子里我们将所有变量 `n` 变为 `x`
        if (path.isIdentifier({ name: "n" })) {
          path.node.name = "x";
        }
      },
    },
  };
}

/**
 * 转换代码
 *
 * @export
 * @param {string} code 源码
 * @returns
 */
export default function transform(code: string) {
  return babel.transformSync(code, {
    plugins: [importTransform],
  });
}
