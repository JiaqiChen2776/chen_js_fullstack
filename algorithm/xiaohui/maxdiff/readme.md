有一个无序整型数组，求出数组排序后任意两个相邻元素的最大差值？
要求时间复杂度，空间复杂度较低。

1. 排序算法  数组排好序
简单：冒泡 选择 插入  O(n^2) 
复杂：归并 快排 堆排序 O(NlogN)

归并排序：
- 拆分数组：
- 合并已排好序的数组

2. 遍历排好序的数组，获取相邻元素的最大差值

时间复杂度：NlogN + N
有没有可能时间复杂度小于这个值？
更快的排序算法？
桶排序：(时间复杂度较低，空间复杂度较高)
2,6,3,4,5,10,9
max = 10
min = 2
数放到相应的桶里：2 3 4 5 6 空 空 9 10
各元素的新的位置：arr[i] - min