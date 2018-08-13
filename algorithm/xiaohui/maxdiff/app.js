// 桶排序

function getMaxDiff(arr) {
  // 1. 利用桶排序 （计数排序） 时间复杂度为 N 
  // 2. 相邻空桶的最大值就是最大差值
  // newArr[0] = min;
  // newArr[] = max;
  if (!arr.length) return null;
  let min = max = arr[0];
  // 1. 得到最小值、最大值
  for (let i = 0;i < arr.length; i++) {
    if (arr[i] < min) {
      min = arr[i];
    }
    if (arr[i] > max) {
      max = arr[i];
    }
  }
  // 2. 得到排好序的新的数组
  // 数组长度为 max-min+1
  const newArr = new Array(max-min+1);
  for (let i = 0; i < arr.length; i++) {
    // arr[i]-min 为新元素的位置
    newArr[arr[i]-min] = arr[i];  // 将要排序的数组元素放入新的数组中
  }
  console.log(newArr);
  // 3. 得到最大差值
  let result = k = 1;
  for(let i = 0; i < newArr.length; i++) {
    if (!newArr[i]) {
      k++;
    } else {
      if (k > result) {
        result = k;
      }
      k = 1;
    }
  }
  // result 是连续的最大空位，差值需要 +1，也可先将最大差值初始化为 1，let result = k = 1;
  return result;
}

console.log(getMaxDiff([2,6,3,4,5,15,7]));

// 空间复杂度 N (arr) + K(newArr)  O(N + K)
// 时间复杂度 O(N + K)； O(3N)  O(N+K)