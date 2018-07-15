const add = (a, b) => {
    // if (typeof a === 'number' && typeof b === 'number') {
    //     return a + b;
    // }
    if (!isNaN(a) && !isNaN(b)) {
        return a + b
    }
    return NaN
}
// console.log(add(1, '2'))  // 测试用例
module.exports = {
    add
}
