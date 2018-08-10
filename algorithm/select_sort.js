// 选择排序
// 时间复杂度： n^2
//   找到数组中最小的值放在第一位，第二小的放在第二位
//   坑 基址查找

let arr = [85, 24, 63, 45, 17, 31, 96, 50];

function selectionSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    let min = i;
    // 如果已经选择了，就是有序的，i-j 已经有序
    for (let j = i; j < arr.length; j++) {
      if (arr[min] > arr[j]) {
        min = j;
      }
    }
    if (min !== i) {
      [arr[min], arr[i]] = [arr[i], arr[min]];
    }
  }
  return arr;
}

console.log(selectionSort(arr));