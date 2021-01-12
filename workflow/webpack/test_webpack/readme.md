# webpack问题记录

## loader

- js

  使用babel编译

  安装：`yarn add -D babel-loader @babel/core @babel/preset-env webpack webpack-cli`

  配置：

  ```javascript
  {
       test: /\.js$/,
       exclude: /(node_modules|bower_components)/,
       use: {
          loader: 'babel-loader?cacheDirectory',
          options: {
          presets: ['@babel/preset-env'],
          plugins: ['@babel/transform-runtime']
        }
     }
  }
  ```

  优化：

  - babel-loader很慢，可添加`cacheDirectory`参数，可指定缓存目录，值为空或`true`时，默认缓存目录为`node_modules/.cache/babel-loader`，如果在任何根目录下都没有找到 `node_modules` 目录，将会降级回退到操作系统默认的临时文件目录。
  - babel导致代码体积过大。使用插件`@babel/plugin-transform-runtime`。
    - 安装：`yarn add -D @babel/plugin-transform-runtime`

  问题：

  - 报错

  ```
  [webpack-cli] Invalid configuration object. Webpack has been initialized using a configuration object that does not match the API schema.
   - configuration.module.rules[0] should be one of these:
     ...
  ```

  `babel-loader`与`babel`版本不匹配，`babel-loader 8.x | babel 7.x`或者`babel-loader 7.x | babel 6.x`

  - 执行`npx webpack`后提示安装`webpack-cli`：是因为`webpack4`中把`webpack`跟`webpack-cli`分离开了，需要单独安装`webpack-cli`
  - 安装`webpack-cli`后，`package.json`文件中也有相关依赖了，还是提示未安装：`webpack webpack-cli`同时安装！`yarn add -D webpack webpack-cli`