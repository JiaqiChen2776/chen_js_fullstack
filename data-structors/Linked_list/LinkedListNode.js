// 链表结点

// 数组 [] 内存分配给我们一定数量的空间
// 存储空间的连续性问题
// 弊病：数组在内存中分配的空间是连续的，灵活性不够
// a[10] = [1,2,3,4,5,6,7,8];  // 空间连续

// 链表结构 -->　指针
// 1 1001   1.next  指向下一个结点的位置
// 2 10003

export default class LinkedListNode {
  // data collections data node
  constructor(value, next = null) {
    this.value = value;
    this.next = next;
  }
  toString(callback) {
    return callback? callback(this.value): `${this.value}`;
  }
}