// 在entry 和 ouput 之间，进行文件引用 顺序打包文件，依赖
// 使用 loader 的方式来编译、处理、打包 style.less
// require('./style.less')
require('./styles/normalize')
require('./styles/index')

const format = require('utils/format')
// 模块化，浏览器不支持commonjs模块化机制，可通过打包（babel）转变成nodejs require模块化机制
const { log } = require('./utils')

log(format('hello world!!!'))
log('hello world')
document.querySelector('.superman').style.display = 'block'

log(_.map([1,2,3], (item) => item * 2))