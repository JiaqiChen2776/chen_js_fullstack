性能优化

http createServer (req,res) => {callback}
web server 一切皆资源 (html, css, json, img)  createReadStream  可读流
将资源"传输"到客户端 client proxy

优化空间？
传输体积减小 --> gzip 压缩
服务器端是可以进行文件操作的 （可写、压缩、添加权限、遍历文件夹
客户端
res.writeHead(200,{
    // 发送响应头
    'Content-Type': 'text/html;charset=utf8'
})
带有压缩的字段， unzip

减小传输体积的优点：快、省带宽（针对服务器）



模拟请求


