// es6 模块化机制方案
// 若直接 export function 则需在引入处使用 解构
// 若 export default function 则不需解构
export function isvalidUsername (str) {
    const valid_map = ['admin', 'editor'];
    return valid_map.indexOf(str) >= 0;
}

export function isvalidEmail (str) {

}