import LinkedListNode from './LinkedListNode';
// 形成链表？ 将结点连接起来？
// 数据集合从开始到结束显示出来
// [] next 
// head
//   next 
//   ... 
// tail 

export default class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }
  // 设置参数默认值
  find({value = undefined, callback = undefined}) {
    // 空链表
    if (!this.head) {
      return null;
    }

    let currentNode = this.head;
    while(currentNode) {
      if (callback && callback(currentNode)) {
        return currentNode;
      }
      if (value !== undefined && currentNode.value === value) {
        return currentNode;
      }
      // 继续循环
      currentNode = currentNode.next;
    }
    return null;
  }
  delete(value) {
    // 空链表
    if (!this.head) {
      return null;
    }

    let deletedNode = null;
    // 头结点是不是要删除？
    while(this.head && this.head.value === value) {
      deletedNode = this.head;
      this.head = this.head.next;
    }
    let currentNode = this.head;
    if (currentNode !== null) {
      while(currentNode.next) {
        if (currentNode.next.value === value) {
          deletedNode = currentNode.next;
          currentNode.next = currentNode.next.next;
        } else {
          // 指向下一个节点，继续判断
          currentNode = currentNode.next;
        }
      }
    }
    // 要删除的结点是尾结点
    if (this.tail.value === value) {
      this.tail = currentNode;
    }
    return deletedNode;
  }
  prepend(value) {
    // 头部插入元素
    const newNode = new LinkedListNode(value, this.head);
    this.head = newNode;
    // 链表为空的情况
    if (!this.tail) {
      this.tail = newNode
    }
    return this;
  }
  append(value) {
    const newNode = new LinkedListNode(value);
    // 1.空链表  head为空
    // 2. 非空 tail.next 为 null
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
      return this;  // 返回当前对象（链表），支持链式调用
    }
    // 尾部插入新结点
    this.tail.next = newNode;
    this.tail = newNode;
    return this;  // 返回当前对象（链表），支持链式调用
  }
  toArray() {
    const nodes = [];
    let currentNode = this.head;
    while(currentNode) {
      nodes.push(currentNode);
      currentNode = currentNode.next;
    }
    return nodes;
  }
  toString(callback) {
    // 将链表变为集合（数组），返回链表中的每一个结点的value
     return this.toArray().map(node => node.toString(callback)).toString();
  }
}

