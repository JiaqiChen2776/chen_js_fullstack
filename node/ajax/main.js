const http = require('http');

// 读取 index.html 需要引入 fs 文件系统，拥有http的能力
const fs = require('fs');
const indexFile = fs.createReadStream('./index.html');  //创建一个可读流，读取文件
// 提供一个 http 服务
// 创建一个web服务器  createServer,接受一个 callback
// req 请求的地址等，res 数据
const server = http.createServer((req, res) => {
    // node.js 提供了一个webserver
    // http内置模块，在某一端口（8081）进行伺服
    // 每一次访问，createServer 都会返回 'hello world'

    // 
    
    // 怎么得到index.html? 引入 fs. 根据 url 的不同，作不同的请求响应
    if (req.url == '/') {   // 斜杠代表 首页
        const indexFile = fs.createReadStream('./index.html');
        //http 响应头 --> 200 http状态码， content-type 文件格式 返回给浏览器
        // 如何去解析这次的请求的到达，根据 text/html   text/plain 纯文本  text/json ...
        res.writeHead(200,{
            'Content-Type': 'text/html;charset=utf8'
        })   
        indexFile.pipe(res)   // 传送数据，结束后即可在浏览器中显示
    } else if (req.url == '/info') {
        // api 后端  响应请求
        const info = {
            "name": "曾凯",
            "desc": "身骑白马"
        };
        res.writeHead(200, {
            "Content_Type": 'text/plain;charset=utf8'
        })
        // 将纯文本转换成json
        res.end(JSON.stringify(info));  
    }
    console.log('那个家伙又来了');
    // res.end('hello world, 你要的反正不是首页');  //根据用户请求返回资源
});

// 监听服务 端口号
server.listen(8081);
