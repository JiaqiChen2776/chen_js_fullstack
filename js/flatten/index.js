// 1. flatten 功能以后慢慢学
// 2. 数组的一些朝纲但常用，npm 包提供了这种功能
// lodash uderscore
// 3. 代码的宿主环境是 命令行（通过 npm 包来引入）
// 4. npm init -y package.json
// 5. yarn add lodash
// 6. 在当前文件中，引入node_modules下的lodash--->require
// 7. 使用它完成flattern,看文档

const arr = [1,2,[3,4],[5,[6,7]]];
const arr1 = [1,1,4,2,5,8,4,2,5]
// lodash 是在 nodemodules (本地项目中) npm 包，模块
let _ = require("lodash");
console.log(_.flattenDeep(arr));
console.log(_.uniq(arr1));
