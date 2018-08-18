function bubbleSort(arr) {
  var len = arr.length;
  var count = 0;
  for (var i = 0; i < len - 1; i++) {
      for (var j = 0; j < len - 1 - i; j++) {
        // console.log(j);
        count++;
          if (arr[j] > arr[j+1]) {        // 相邻元素两两对比
              var temp = arr[j+1];        // 元素交换
              arr[j+1] = arr[j];
              arr[j] = temp;
          }
      }
      // console.log(i, '--------------');
  }
  console.log(count);
  return arr;
}

const arr = [4,6,3,8,2,4,9];
const arr1 = bubbleSort(arr);
console.log(arr1);
