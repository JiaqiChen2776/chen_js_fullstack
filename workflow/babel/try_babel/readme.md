前端工作流

- babel  js 预编译器 (将es6转换成es5)

    es6以前，以后
    使用最新的js 语法来编写，运行的代码可以根据需求编译成相应的版本
    全局安装：yarn global add babel-core babel-cli
    本地安装：
        yarn add babel-cli -D
        yarn add babel-core -D
        yarn add babel-preset-env
        npm install babel-plugin-transform-runtime    plugin-transform-runtime插件（编译一些语法糖无法实现的较新语法）
        npm install babel-preset-stage-2 -D   预处理（通过一定编译规范进行编译）

    编译：
        babel main.js
        本地命令运行： ./node_modules/.bin/babel main.js
        babel main.js -o a.js  编译后输出到 a.js 文件中

    .babelrc文件：env 新一代预处理器

    commonjs  nodejs原生支持的模块化机制（babel默认的模块化机制）

    babel 编译js
    source_code .babelrc cli targets(运行平台)
    babel 依赖于 presets预处理集
    babel 的预处理，只是语法糖，class没有
    es5里没有的es6的语法，实现一遍，最基本的const...
    babel-core
    plugins：还有一些没实现的 Object.assign(), promise, async
        babel使用了一个新的概念 plugins 来实现

    要点总结：解决代码编译问题
             es6/7/8 --> es5
             plugins 

- npm 
    npm run dev, npm install  项目构建的基本流程

- postcss
    解决前缀问题，使用css变量

- stylus/scss/less