// node 环境
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve('dist'),
        // publicPath: 'dist/' 
    },
    module: {
        rules: [
            // {
            //     test: /\.styl/,
            //     use: [
            //         'style-loader'
            //     ]
            // },
            {
                test: /\.styl/,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'stylus-loader'
                ]
            },
            {
                test: /\.js/,
                include: /src/,
                exclude: /node_modules/,
                use: [
                    'babel-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'static/images/[name].[hash:8].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].[chunkhash:8].css',
            chunkFilename: '[id].css'
        }),
        new HtmlWebpackPlugin({
            file: 'index.html',
            template: path.resolve(__dirname, './public/index.html')
        })
    ],
    devServer: {
        // contentBase: './dist',
        port: 3000,
        // 自动打开浏览器
        open: true
    },
    devtool: 'inline-source-map'
}