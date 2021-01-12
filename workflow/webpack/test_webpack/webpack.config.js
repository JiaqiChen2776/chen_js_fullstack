const path = require('path')
module.exports =  {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        // exclude: /(node_modules|bower_components)/,
        include: [
          path.resolve(__dirname, 'src')
        ],
        use: {
          loader: 'babel-loader?cacheDirectory',
          options: {
            // preset-env 语法转换插件（可转换高级语法）
            presets: ['@babel/preset-env'],
            // 减小代码体积
            plugins: ['@babel/transform-runtime']
          },
        },
      }
    ]
  },
  plugins: [

  ]
}