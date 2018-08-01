export function setAttribute(dom, name, value) {
  // 类 属性
  if (name === 'className') name = 'class';
  // 事件
  if (/on\w+/.test(name)) {  // w 表示匹配 字符串
    name = name.toLowerCase();
    dom[name] = value || '';
  } else if (name === 'style') {  // 样式
    if (!value || typeof value === 'string') {
      // cssText 的本质就是设置 HTML 元素的 style 属性值
      dom.style.cssText = value || '';
    } else if (value && typeof value === 'object') {
      // 样式是以对象的形式来设置的：{{fontSize: 20, color: 'red'}}
      for (let name in value) {
        dom.style[name] = typeof value[name] === 'number' ? value +'px': value[name];
      }
    }
  } else {
    if (value) {
      dom.setAttribute(name, value);
    } else {
      dom.removeAttribute(name, value);
    }
  }
}