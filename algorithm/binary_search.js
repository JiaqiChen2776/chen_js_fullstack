// 普通版 二分查找
// function binary_search(arr, target) {
//   let begin = 0, end = arr.length-1, middle;
//   while (begin <= end) {
//     middle = parseInt((begin+end)/2);
//     if (target === arr[middle]) {
//       return middle;
//     } else if (target > arr[middle]) {
//       begin = middle + 1;
//     } else {
//       end = middle - 1;
//     }
//   }
// }
// var arr = [1,2,3,4,5,6,7,8,9,10,11,23,44,89];
// var result = binary_search(arr, 10);
// console.log(result);

// 递归版 二分查找
function binary_search(arr, low, high, key) {
  if (low > high) {
    return -1;  // 递归出口
  }
  let middle = Math.floor((low + high)/2);
  // middle = Math.round(low + (key - arr[low])/(arr[high] - arr[low]) * (high - low) );
  console.log(middle);
  if (arr[middle] === key) {
    return middle;
  } else if (arr[middle] > key) {
    return binary_search(arr, low, middle-1, key);
  } else {
    return binary_search(arr, middle+1, high, key);
  }
}
var arr = [1,2,3,4,5,6,7,8,9,10,11,23,44,89];
var result = binary_search(arr, 0, 13, 10);
console.log('result ',result);