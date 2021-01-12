const format = require('./utils/format')
const testFunc = (...arr) => {
  let result = 0
  arr.forEach(i => {
    result += i
  })
  return result
}
var v1, v2
v1 = v2 = Math.random()
console.log(testFunc(v1, v2))

console.log(format('abc'))