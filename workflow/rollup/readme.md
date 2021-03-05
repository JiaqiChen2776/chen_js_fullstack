### rollup
#### 创建项目
- 新建一个目录，如`rollupDemo`
- 进入项目，`npm init -y`

#### 安装
`npm install rollup --save-dev`

#### 使用
1. 配置文件`rollup.config.js`
```js
export default {
  input: 'src/main.js', // 入口
  output: {
    file: 'dist/bundle.cjs.js',
    format: 'cjs',  // 文件输出格式，commonJS
    name: 'bundleNmae'  // 包的全局变量名称
  }
}
```

2. 编写打包文件
```js
// src/main.js
import sayHello from '../modules/HelloWorld';
sayHello('hello world!')
```
```js
// modules/HelloWorld.js
const sayHello = (msg) => {
  console.log(msg)
}
export default sayHello;
```

3. 打包
- `package.json`配置script`"build": "rollup -c"`
- 运行`npm run build`
- 打包生成`dist/bundle.cjs.js`
```js
'use strict';
const sayHello = (msg) => {
  console.log(msg);
};
sayHello('hello world!');
```

4. 使用打包后的文件
- 根目录创建`index.html`
- 引入`dist/bundle.cjs.js`


#### 插件
1. Babel
---
可正确解析模块及es6语法
- 安装插件`npm install rollup-plugin-babel --save-dev`
- 安装babel：`cnpm install @babel/core @babel/preset-env --save-dev`
- 配置 `rollup.config.js`
```js
import babel from 'rollup-plugin-babel';

export default {
  plugins: [
    babel({
      exclude: 'node_modules/**'  // 排除node_modules目录代码
    })
  ]
}
```
- 配置`.babelrc'
```json
{
  "presets": [
    [
      "@babel/env",
      {
        // modules设置为false，因为为true时babel可能会在rollup处理之前将模块转成commonJS，导致rollup处理失败
        "modules": false
      }
    ]
  ]
}
```
注：编译完后，main.js中的箭头函数（es6语法）被转换成了es5的写法。

2. node模块的引用
---
由于rollup.js默认只支持es6+的模块方法import/export，而node模块是基于commonJS规范，导致node模块不可直接编译使用。
使用时报错：`Uncaught ReferenceError: require is not defined`

- 安装插件：`cnpm install @rollup/plugin-node-resolve @rollup/plugin-commonjs --save-dev`
@rollup/plugin-node-resolve 插件容许加载node模块
@rollup/plugin-commonjs 插件将模块转为es6+版本
- rollup.config.js配置
```js
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'

export default {
  plugins: [
    resolve(),
    commonjs()
  ]
}
```
- 安装引入lodash，安装`npm install lodash --save-dev`，引入`import _ from 'lodash';`，至此引入node模块成功

注：此时我们看打包后文件，多了很多lodash代码，若是不想将第三方库打包进来，配置rollup.config.js，再通过cdn引入使用
```js
export default {
    external: ['lodash']
}
```
```html
<script src="https://cdn.bootcdn.net/ajax/libs/lodash.js/4.17.20/lodash.core.min.js"></script>
```
```js
// src/main.js
// 可直接通过“ _”来使用lodash
console.log(_)
```

3. 使用 typescript

---
- 安装ts：需要先安装ts的依赖包，`npm install tslib typescript --save-dev`
- 安装插件：`npm install @rollup/plugin-typescript --save-dev`
- 配置rollup.config.js
```js
import typescripts from '@rollup/plugin-typescript'
export default {
  plugins: [
    typescripts()
  ]
}
```
- 配置 tsconfig.json，`tsc --init`生成配置文件，修改`"target": "es6"`、`"module": "esnext"`

4. 编译css
---
rollup多用于开发类库，类库中通常不包含过多的css，若css较多的项目可使用webpack打包。
- 安装插件：`npm install rollup-plugin-postcss --save-dev`
- 配置rollup.config.js
```js
import postcss from 'rollup-plugin-postcss'
export default {
  plugins: [
    postcss()
  ]
}
```
问题：
    1. 报错：` Error: PostCSS plugin postcss-noop-plugin requires PostCSS 8.`
    解决：安装`npm install autoprefixer --save-dev`，配置如下
```js
// rollup.config.js 配置文件
import autoprefixer from 'autoprefixer'
export default {
  plugins: [
    postcss({
      plugins: [
        autoprefixer({overrideBrowserslist: ['> 0.15% in CN']})  // 自动添加css前缀
      ]
    }),
  ],
}
```
    2. 报错：`Error: PostCSS plugin autoprefixer requires PostCSS 8. Update PostCSS or downgrade this plugin。`
    解决：降低`autoprefixer`的版本，`npm install autoprefixer@8.0.0 --save-dev`
    
5. 压缩代码
使用`terser`，它是适用于es6+的js解析器和压缩器工具包。uglify-js也可压缩代码，但只能压缩es5的代码。
- 安装插件：`npm install rollup-plugin-terser --save-dev`
- 配置rollup.config.js
```js
import { terser } from 'rollup-plugin-terser';
export default {
    terser()
  ]
}
```