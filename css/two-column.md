### 自适应两栏布局
左固定，右弹性
[参考地址](https://www.cnblogs.com/vicky123/p/8866548.html)
#### 1、左float + 右BFC
利用BFC的特性，BFC 可以阻止元素被浮动元素覆盖
```css
.left {
    width: 100px;
    height: 100px;
    float: left;
}
.right {
    overflow: hidden;
    height: 100px;
}
```

#### 2、左float + 右margin-left
```css
.left {
    width: 100px;
    height: 100px;
    float: left;
}
.right {
    margin-left: 100px;
    height: 100px;
}
```

#### 3、flex布局
注意：若未设置子容器的高度，默认等高。父容器的align-items默认为stretch，表示各列等高，可设置 flex-start 或 flex-end
```css
.outer {
    display: flex;
    height: 100px;
}
.left {
    width: 100px;
}
.right {
    flex: 1;
}
```

#### 4、左 绝对定位 + 右 margin-left
缺点：
- 使用了绝对定位，若是用在某个div中，需要更改父容器的position为relative或absolute。
- 没有清除浮动的方法，若左侧盒子高于右侧盒子，就会超出父容器的高度。因此只能通过设置父容器的min-height来放置这种情况。
```css
.left {
    position: absolute;
    left: 0;
    top: 0;
    width: 100px;
    height: 100px;
}
.right {
    margin-left: 100px;
    height: 100px;
}
```

#### 5、table布局
缺点：高度更小的子容器外边会被同背景颜色填充，使其看起来各列等高。
```css
.outer {
    display: table;
    width: 100%;
}
.left {
    display: table-cell;
    width: 100px;
    height: 100px;
}
.right {
    display: table-cell;
    height: 150px;
}
```
![606cac91b60fa2b8d1a69905b0ee1fa5.png](en-resource://database/605:1)

#### 6、双float + calc计算属性
```css
.left {
    float: left;
    width: 100px;
    height: 100px;
}
.right {
    float: left;
    width: calc(100% - 100px);
    height: 100px;
}
```

#### 7、双inline-block + calc计算属性
注意：子容器需要设置box-sizing为border-box，否则当为子容器设置border或padding时右容器会太长。计算属性 100% - 左侧盒子具体的宽度(content+padding+border)

缺点:
- 需要知道左侧盒子的宽度，两个盒子的距离，还要设置各个元素的box-sizing
- 需要消除空格字符的影响
- 需要设置vertical-align: top满足顶端对齐。
```css
.outer {
    font-size: 0;
}
.left, .right {
    display: inline-block;
    vertical-align: top;
    box-sizing: border-box;
}
.left {
    width: 100px;
    height: 100px;
}
.right {
    width: calc(100% - 100px);
    height: 150px;
}
```

#### 8、grid 网格布局
用法简单，且可以方便地设置元素之间的间距
```css
.outer {
    width: 100%;
    height: 150px;
    display: grid;
    grid-template-columns: 100px 1fr;
    /*或者*/
    /*grid-template-columns: 100px auto;*/
}
```