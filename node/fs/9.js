const fs = require('fs');
const path = require('path');    // 引入路径
const getFilesInDir = function(dir) {
    // 列出目录下的文件
    // path.resolve(dir)  得到文件的 物理路径
    // console.log(path.resolve(dir));   //文件的物理路径
    let results = [path.resolve(dir)];
    // readdir 读取目录
    const files = fs.readdirSync(dir,'utf8');
    console.log(files);  // 该目录下的所有文件及文件夹（数组）
    files.forEach(file => {
        // console.log(file);   // 文件名
        const fileName = file;
        // 用 目录名+文件名 生成一个文件的物理路径
        file = path.resolve(dir, file);
        // console.log(file);
        const stats = fs.statSync(file);   // 文件的信息
        // console.log(stats);
        if (stats.isFile()) {  
            results.push(file);
        } else if (stats.isDirectory()){
            // 如果是文件夹，则 递归，并将二维目录通过 concat 显示为一维数组
            results = results.concat(getFilesInDir(file));
        }
        
    })
    return results;
}
const files = getFilesInDir('./txt');
console.log(files);