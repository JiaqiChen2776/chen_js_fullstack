element 值
子节点

前端
Map, Set 基于树
HTML DOM 树
react vnode dom diff
  diff 比较值、属性、方法，只更新修改部分， 减少了真实DOM的渲染面积与次数

二叉树：
  只有两个节点，左子树 右子树
root 树根
完美二叉树：层数为 k, 叶节点 2^(k-1), 总节点 (2^k)-1

特例：二叉搜索树 BST (Binary Search Tree)
1. 二叉树
2. 左节点小于父节点小于右节点

搜索
BST 节点的插入
规则：
  - 树中无任何节点，根节点
  - 若节点比树的根节点或树的节点，值更大，则放在右子树，反之则放在左子树
  - 重复第二步，直至找到空位，插入新节点

BST 遍历（先序、中序、后序）
1. 中序 （左中右）
  以最小到最大的顺序访问所有节点
2. 先序 （中左右）
  祖先节点优先于后代节点的顺序遍历
3. 后序 （左右中）
  先访问节点的后代节点，再访问节点本身

