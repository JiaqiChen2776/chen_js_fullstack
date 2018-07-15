const path = require('path');
const webpack = require('webpack');
// 抽离文本：从打包后的文件中抽离出一部分代码
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// 打包 html
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
// console.log(path.resolve(__dirname, 'dist'));
module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                // include 指定 loader 目录,  exclude  
                include: [
                    path.resolve(__dirname, 'src')
                ],
                use: 'babel-loader'
            },
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
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        // 根据文件地址加载文件
                        loader: 'file-loader'
                    }
                ]
            }
        ]
    },
    resolve: {
        alias: {
            utils: path.resolve(__dirname, 'src/utils')
        },
        extensions: ['.js', '.json', '.css', '.less']
    },
    plugins: [
        new ExtractTextPlugin('[name].css'),
        new HtmlWebpackPlugin({
            file: 'index.html',
            template: 'src/index.html'
        }),
        new CopyWebpackPlugin([
            { from: 'src/assets/favicon.ico', to: 'favicon.ico'}
        ]),
        new webpack.ProvidePlugin({
            // ProvidePlugin 将一个库引入进来
            // lodash 作为工具，是很多组件会使用的，省去了到处 import 
            '_': 'lodash'
        })
    ],
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
}