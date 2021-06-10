type fileNode = {
  path: string;
  name: string;
  type: "directory" | "file";
  deep?: number;
  children?: fileNode[];
};

/**
 * 生成目录树
 *
 * @export
 * @param {*} dir
 * @param {string[]} filter
 * @returns
 */
export function getFileTree(dir: any, filter: string[]) {
  let path = require("path");
  let fs = require("fs");
  var filesNameArr: fileNode[] = [];
  // 用个hash队列保存每个目录的深度
  var mapDeep: any = {};
  mapDeep[dir] = 0;
  // 先遍历一遍给其建立深度索引
  function getMap(dir: any, curIndex: any) {
    var files = fs.readdirSync(dir); //同步拿到文件目录下的所有文件名
    files.map(function(file: any) {
      if (filter.includes(file)) {
        return;
      }
      //var subPath = path.resolve(dir, file) //拼接为绝对路径
      var subPath = path.join(dir, file); //拼接为相对路径
      var stats = fs.statSync(subPath); //拿到文件信息对象
      // 必须过滤掉不需要的文件夹
      mapDeep[file] = curIndex + 1;
      if (stats.isDirectory()) {
        //判断是否为文件夹类型
        return getMap(subPath, mapDeep[file]); //递归读取文件夹
      }
    });
  }

  getMap(dir, mapDeep[dir]);

  function readdirs(dir: any, folderName: any) {
    var result: fileNode = {
      //构造文件夹数据
      path: dir,
      type: "directory",
      name: path.basename(dir),
      deep: mapDeep[folderName],
    };
    var files = fs.readdirSync(dir); //同步拿到文件目录下的所有文件名
    result.children = files.map(function(file: any) {
      if (filter.includes(file)) {
        return;
      }

      //var subPath = path.resolve(dir, file) //拼接为绝对路径
      var subPath = path.join(dir, file); //拼接为相对路径
      var stats = fs.statSync(subPath); //拿到文件信息对象
      if (stats.isDirectory()) {
        //判断是否为文件夹类型
        return readdirs(subPath, file); //递归读取文件夹
      }
      return {
        //构造文件数据
        path: subPath,
        type: "file",
        name: file,
      };
    }).filter(Boolean);
    return result; //返回数据
  }
  filesNameArr.push(readdirs(dir, dir));
  return filesNameArr;
}

/**
 * 遍历文件树
 *
 * @export
 * @param {fileNode} node 根节点
 * @param {(node?: fileNode) => any} action 回调函数
 * @returns
 */
export function traverseFileTree(
  node: fileNode,
  action: (node: fileNode) => any
) {
  if (!node || !node.children) {
    return;
  }
  var _queue: fileNode[] = []; // 借助一个队列
  _queue.push(node);
  while (_queue.length) {
    let _curNode = _queue.shift(); // 推出队头元素
    if (_curNode) {
      action(_curNode);
    }
    // 将子节点依次推入队列中
    // _curNode.children.forEach(function (item, index) {
    // 	_queue.push(item);
    // })
    if (_curNode && _curNode?.children && _curNode?.children.length) {
      _queue = _queue.concat(_curNode.children);
    }
  }
}
