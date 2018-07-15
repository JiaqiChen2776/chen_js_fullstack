# webpack

## 了解
webpack 是一个打包（build）工具
为什么要打包？
    常规的（落后的）开发方式，jQuery html css 交给后端上线
    MVVM 开发时代，一切皆可打包

webpack 将现代 js 开发中的各种新型有用技术，集合打包  （等待打包的静态资源  -->  目标项目）
打包前 无法运行
 （ js es6 module stylus 不支持浏览器直接执行
  .hbs --> 模板编译
  .vue --> webpack 可识别它，并加载各种各样的 loader ） 在目标容器上运行

## 配置

webpack 配置： webpack.config.js
1、entry
2、output: {
    path: path.resolve(__dirname, 'dist'),   // 输出目录
    filename: '[name].js'
}
    path  node.js的一个模块
    path.resolve  系统路径

3、loader
    在entry 和 ouput 之间，进行文件引用 顺序打包文件，依赖
    引入了样式文件后，使用 loader 的方式来编译/处理/打包 style.less

    安装:
    yarn add less -D
    yarn add css-loader less-loader style-loader -D

    配置：
    module: {
        rules: [
            {test: /\.less$/, use: ['css-loader', 'less-loader']}
        ]
    }

    打包后：将 css 打包到了 js 中，如何分开打包，使用 plugin.

4、plugin
    安装：yarn add extract-text-webpack-plugin -D
    指定为最新版本: yarn add extract-text-webpack-plugin@last --> 选择 4.0.0-beta.0

    (1) css 的打包 (.css / .less)
    安装：yarn add extract-text-webpack-plugin -D
         yarn add css-loader less-loader style-loader -D （已安装）
    配置：
        const ExtractTextPlugin = require('extract-text-webpack-plugin');    
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: [ 'css-loader']
                    })
                },
                {
                    test: /\.less$/,
                    use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: [
                            'css-loader',
                            'less-loader'
                        ]
                    })
                }
            ]
        },
        plugins: [
            new ExtractTextPlugin('[name].css')
        ]

        index.js 文件：
            require('./styles/normalize')   // .css文件
            require('./styles/index')   // .less文件

    (2) 模块化
    模块化，浏览器不支持commonjs模块化机制，可通过打包（babel）转变成nodejs require模块化机制

    安装：yarn add babel-core babel-loader babel-preset-env -D
    配置：
        rules: [
            {
                test: /\.js$/,
                // include 指定 loader 目录,  exclude  
                include: [
                    path.resolve(__dirname, 'src')
                ],
                use: 'babel-loader'
            }]

        .babelrc 文件：
            {
                "presets": ["env"]
            }

    (3) html 打包
    （打包 src 中的index.html，自动将 css js 引入到 html 中）
    （进入 dist 目录，live-server命令可查看效果）

    安装：yarn add html-webpack-plugin -D
    配置：
        const HtmlWebpackPlugin = require('html-webpack-plugin');
        plugins: [
            new HtmlWebpackPlugin({
                file: 'index.html',
                template: 'src/index.html'
            })
        ]
    注：HtmlWebpackPlugin的其它配置
        minify:{
            removeAttributeQuotes:true
        },
        hash:true
        ------------
        minify：对html文件进行压缩，removeAttrubuteQuotes是去掉属性的双引号；
        hash:为了开发中js有缓存效果，所以加入hash，这样可以有效避免缓存JS。

    (4) 加载文件（图片）
    安装：yarn add file-loader -D
    配置：
        {
            test: /\.(png|jpg|gif)$/,
            use: [
                {
                    loader: 'file-loader'   // 根据文件地址加载文件
                }
            ]
        }
    注：
    1) url-loader: 若图片过多，会发送很多http请求，将降低页面性能。可通过 url-loader解决。url-loader会将引入的图片编码，生成dataURL，若图片较大，编码会消耗性能。url-loader提供了一个limit参数，小于limit字节的文件会被转为DataURL，大于limit的使用file-loader进行copy。（url-loader内置了file-loader）
        use:[{
            loader:'url-loader',
            options:{
                limit:500000,
                // 将图片打包到指定文件夹里
                outputPath: 'images/
            }
        }]
    2) 图片路径问题：publicPath解决，作用就是处理静态文件路径（output选项中设置）。
    声明 --> var website = { publicPath: "http://127.0.0.1:1314/" }
    配置 --> publicPath:website.publicPath
    3) 打包 html 中的图片
    安装：yarn add html-withimg-loader -D
    配置：
        {
            test: /\.(htm|html)$/i,
            use:[ 'html-withimg-loader'] 
        }


    (5) 复制文件
    安装：yarn add copy-webpack-plugin -D
    配置：
        const CopyWebpackPlugin = require('copy-webpack-plugin');
        plugins: [
            new CopyWebpackPlugin([
                { from: 'src/assets/favicon.ico', to: 'favicon.ico'}
            ])
        ]    

    (6) 热更新
    配置脚本： package.json
    "scripts": {
        "build": "webpack --mode production",
        "start": "webpack-dev-server --mode development"
    }

    安装：yarn add webpack-dev-server
    配置webpack: webpack.config.js
        devServer: {
            port: '1314',
            before(app) {
                // 挂载之前运行
                // 创造一个路由，请求此地址，启动一个 webserver，在浏览器打开，入口文件为 main.js
                app.get('/api/test.json', (req, res) => {
                    res.json({
                        code: 200,
                        message: 'hello world'
                    })
                })
            }
        }
    启动命令：npm run start

    (7) 路径别名
    配置：
        resolve: {
            alias: {
                utils: path.resolve(__dirname, 'src/utils')
            },
            extensions: ['.js', '.json', '.css', '.less']
        }

        format.js 文件： （样式化）
        module.exports = function format(chars) {
            return chars.toUpperCase()
        }

        index.js 文件：
            const format = require('utils/format')
            log(format('hello world!!!'))
        // utils 相当于 vue 中的 @，设置路径别名，可直接获得文件的物理路径
        // log 为模块化的方法
        // 打印结果为： HELLO WORLD!!!

    (8) lodash
    安装：yarn add lodash
    配置：
        const webpack = require('webpack');
        plugins: [
            new webpack.ProvidePlugin({
                '_': 'lodash'
            })
        ]

        index.js 文件：
        log(_.map([1,2,3], (item) => item * 2))
        // 使用 lodash 里的数组 map 方法
        // 结果为：[2, 4, 6]

    注：ProvidePlugin 将一个库引入进来 (webpack 自带，无需安装)
        lodash 作为工具，是很多组件会使用的，省去了到处 import


注：
- devServer

devServer:{
    //设置基本目录结构
    contentBase:path.resolve(__dirname,'dist'),
    //服务器的IP地址，可以使用IP也可以使用localhost
    host:'localhost',
    //服务端压缩是否开启
    compress:true,
    //配置服务端口号
    port:1717
}

- loader

test：用于匹配处理文件的扩展名的表达式，这个选项是必须进行配置的；
use：loader名称，就是你要使用模块的名称，这个选项也必须进行配置，否则报错；
include/exclude:手动添加必须处理的文件（文件夹）或屏蔽不需要处理的文件（文件夹）（可选）；
query：为loaders提供额外的设置选项（可选）。

- 压缩 JS 代码
虽然uglifyjs是插件，但是webpack版本里默认已经集成，不需要再次安装。
配置:
const uglify = require('uglifyjs-webpack-plugin');
plugins:[
    new uglify()
]
注：Alt+Z 文件自动换行
JS压缩和devServer的冲突：生产环境中才会压缩JS代码，用于加快程序的工作效率。devServer用于开发环境，而压缩JS用于生产环境，在开发环境中作生产环境的事情所以Webpack设置了冲突报错。
实际开发中，开发环境与生产环境中的webpack配置文件是分开的。

    
