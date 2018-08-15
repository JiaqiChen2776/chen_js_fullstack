function BinarySearchTree() {
  var Node = function(key) {
    this.key = key;
    this.left = null;
    this.right = null;
  }

  var root = null;

  function insertNode(node, newNode) {
    if (newNode.key < node.key) {
      if (node.left === null) {
        node.left = newNode;
      } else {
        insertNode(node.left, newNode);
      }
    } else {
      if (node.right === null) {
        node.right = newNode;
      } else {
        insertNode(node.right, newNode);
      }
    }
  }

  this.insert = function(key) {
    var newNode = new Node(key);
    if (root === null) {
      root = newNode
    } else {
      insertNode(root, newNode);
    }
  }
  // 中序遍历
  function inOrderTraverseNode(node, callback) {
    if (node !== null) {
      inOrderTraverseNode(node.left, callback);
      callback(node.key);
      inOrderTraverseNode(node.right, callback);
    }
  }
  // 先序遍历
  function preOrderTraverseNode(node, callback) {
    if (node !== null) {
      callback(node.key);      
      inOrderTraverseNode(node.right, callback);
      inOrderTraverseNode(node.left, callback);
    }
  }
  // 后序遍历
  function postOrderTraverseNode(node, callback) {
    if (node !== null) {      
      inOrderTraverseNode(node.right, callback);
      inOrderTraverseNode(node.left, callback);
      callback(node.key);
    }
  }

  this.OrderTraverse = function(callback) {
    inOrderTraverseNode(root, callback);
    console.log('-----------------------');
    preOrderTraverseNode(root, callback);
    console.log('-----------------------');
    postOrderTraverseNode(root, callback);
  }
  // 最大值
  var maxNode = function(node) {
    if (node) {
      while(node && node.right !== null) {
        node = node.right;
      }
      return node.key;
    }
    return null;
  }
  this.max = function() {
    return maxNode(root);
  }
  // 搜索节点
  function searchNode(node, key) {
    if (!node) {
      return false;
    }
    if (key < node.key) { 
      return searchNode(node.left, key);
    } else if (key > node.key) {
      return searchNode(node.right, key);
    } else {
      return true;
    }
  }
  this.search = function(key) {
    return searchNode(root, key);
  }
}

const tree = new BinarySearchTree();
const arr = [11,7,15,5,3,9,8,10,13,12,14,20,18,25,6];
for (let i = 0; i<arr.length; i++) {
  tree.insert(arr[i]);
}

var printNode = function(value) {
  console.log(value);
}

// 遍历二叉排序树
tree.OrderTraverse(printNode);
console.log('--------------------------------------');
// 最大值
console.log(tree.max());
console.log('--------------------------------------');
// 搜索节点
console.log(tree.search(10));