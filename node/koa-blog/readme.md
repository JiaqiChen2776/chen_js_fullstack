

安装准备：
yarn add config-lite ejs koa koa-body-parser koa-mysql-session koa-router koa-session koa-static koa-views markdown-it md5 moment

koa-static 指定public目录为静态服务器
koa-static-cache  静态文件缓存（打开、读取、返回文件，性能消耗大）将文件缓存，从内存中读取（在一定的时间之内，不更新页面，直接从缓存中读取数据）
markdown-it 将markdown转换成html
md5 传输加密