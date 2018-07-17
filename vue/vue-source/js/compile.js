class Compile {
    constructor(el, vm) {
        this.vm = vm;
        this.el = document.querySelector(el);
        // 文档碎片 fragment
        // 模板无法编译，编译有个从外到内的过程，编译出来的一段段的html 和 node 要 append 到 this.el 上，
        // 这将会一直更新界面，降低性能
        // 利用 fragment 代替 this.el 做新的主人，最后一次性更新到真实的DOM上
        this.fragment = null;
        this.init();
    }
    init() {
        // this.el 它将会被编译后的 html 替换
        if (this.el) {
            // 将此节点转变为文档碎片节点
            this.fragment = this.nodeToFragment(this.el);
            this.compileElement(this.fragment);
            // 替换 this.el
            this.el.appendChild(this.fragment);
        } else {
            console.log('DOM元素不存在');
        } 
    }
    // 递归调用，一层层往里走
    compileElement(el) {
        var childNodes = el.childNodes;
        // 借用数组的 slice 方法，也可用 Array.from
        [].slice.call(childNodes).forEach(node => {
            // console.log(node);
            var reg = /\{\{(.*)\}\}/;
            var text = node.textContent;
            // console.log(text);
            if (this.isElementNode(node)) {
                // 标签节点的情况
                this.compile(node);
            } else if (this.isTextNode(node) && reg.test(text)) {
                // 判断是否为 文本节点，并正则判断
                // console.log(node, reg.exec(text)[1]);
                this.compileText(node, reg.exec(text)[1]);  // 执行正则，得到正则中的第一个分组
            }
            // 递归 （当前节点还有子节点）
            if (node.childNodes && node.childNodes.length) {
                this.compileElement(node);
            }
        })
    }
    compile(node) {
        // 指令？
        var nodeAttrs = node.attributes;
        Array.prototype.forEach.call(nodeAttrs, attr => {
            var attrName = attr.name;
            // console.log(attrName);
            if (this.isDirective(attrName)) {
                var exp = attr.value;
                var dir = attrName.substring(2);
                if (this.isEventDirective(dir)) {
                    // v-on
                    this.compileEvent(node, this.vm, exp, dir);
                } else {
                    // v-model
                }
            }
        })
    }
    isDirective(attr) {
        return attr.indexOf('v-') == 0
    }
    isEventDirective(dir) {
        return dir.indexOf('on:') == 0
    }
    compileEvent(node, vm, exp, dir) {
        // 什么事件？ event  callback?  addEventListener
        const eventType = dir.split(':')[1];
        var cb = vm.methods && vm.methods[exp];  // 确保在 methods 中定义了此方法
        if (eventType && cb) {
            node.addEventListener(eventType, cb.bind(vm), false);
        }
    }
    compileText(node, Exp) {
        var initText = this.vm[Exp];
        this.updateText(node, initText);
    }
    updateText(node, value) {
        // 此处也可使用 replace (更加严谨)
        node.textContent = typeof value === 'undefined'?'': value;
    }
    // 文本节点与标签节点的区别：nodeType
    isElementNode(node) {
        return node.nodeType == 1;
    }
    isTextNode(node) {
        return node.nodeType == 3;
    }
    nodeToFragment(el) {
        // 可作为容器，将节点挂载于此，不会更新界面，故不会降低性能
        var fragment = document.createDocumentFragment();
        var child = el.firstChild;
        while(child) {
            fragment.appendChild(child);
            child = el.firstChild;
        }
        return fragment;
    }
}