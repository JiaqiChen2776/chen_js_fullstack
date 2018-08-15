class TreeNode {
  constructor(value) {
    this.value = value;
    this.descendents = [];
  }
}

const abe = new TreeNode('abe');
const homer = new TreeNode('Homer');
const bart = new TreeNode('Bart');
const Lisa = new TreeNode('Lisa');
const maggie = new TreeNode('Maggie');

abe.descendents.push(homer);
homer.descendents(bart, Lisa, maggie);