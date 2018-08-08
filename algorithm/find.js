// 需求：
// 1. 一个二维数组
// 2. 每一行都从左到右递增的顺序
//   每一列从上到下递增
// 3. 完成一个函数，判断是否有此数
// target 10
// [
//   [1,2,3,4],
//   [5,9,10,11],
//   [13,20,21,23]
// ]

function find(target, arr) {
  let i = 0; // row
  let j = arr[i].length - 1;

  while(i < arr.length && j >= 0) {
    if (target > arr[i][j]) {
      i++;
    } else if (target < arr[i][j]) {
      j--;
    } else {
      return {i,j};
    }
  }
  return false;
}
console.log(find(110, [
  [1,2,3,4],
  [5,9,10,11],
  [13,20,21,23]
]))