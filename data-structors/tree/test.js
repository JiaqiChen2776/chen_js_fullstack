function BinaryTree (arr) {
  if (Object.prototype.toString.call(arr).slice(8, -1) !== 'Array') {
      throw new TypeError('只接受一个数组作为参数')
  }
  this.root = null; //根节点
  this.arr = arr || []; //接受传入的参数-数组
  
  
  //初始化每个树节点
  var TreeNode = function (key) {
      this.key = key; //当前节点的值
      this.left = null; //左子树
      this.right = null; //右子树
  }
  
  //构建二叉树
  this.init = function () {
      if (!this.arr) {
          console.warn('请选择一个数组参数');
      }
      for (var i = 0, len = this.arr.length; i < len; i++) {
          this.insert(this.arr[i])
      }
  }

  //插入节点
  this.insert = function (key) {
      var newNode = new TreeNode(key) //当前需要插入的节点
      if (this.root === null) { //根节点不存在值时, 插入节点到根节点
          this.root = newNode;
      }else{
          this.insertNode(this.root, newNode)
      }
  }
  this.insertNode = function (rootNode, newNode) {
      if (rootNode.key > newNode.key) { // 当前节点的key小于父节点时, 当前节点应该插入左子树
          if (rootNode.left === null) { //如果左子树不存在节点时, 把当前节点放进去
              rootNode.left = newNode;
              return;
          }
          this.insertNode(rootNode.left, newNode) //左子树存在节点, 再次递归与该左节点进行比较

      }else{ // 当前节点的key大于或等于父节点时, 当前节点应该插入右子树
          if (rootNode.right === null) { //如果右子树不存在节点时, 把当前节点放进去
              rootNode.right = newNode;
              return;
          }
          this.insertNode(rootNode.right, newNode) //右子树存在节点, 再次递归与该右节点进行比较
      }
  }
}


var arr = [8, 13,3,7,19,21,15];
var tree = new BinaryTree(arr);
tree.init();
console.log(tree)