export function setAttribute(dom, name, value) {
  if (name === 'className')  name = 'class';
  // 事件  
  // 正则 \w 匹配数字、字符、下划线
  if (/on\w+/.test(name)) {
    name = name.toLowerCase();
    dom[name] = value || '';
    // dom.setAttribute(name, value);
  } else if (name === 'style') {
    // 样式值为一个字符串
    if (!value || typeof value === 'string') {
      dom.style.cssText = value;
    } else if (value && typeof value === 'object') {
      // 样式值为一个对象，即有设置了多个样式
      for (let name in value) {
        dom.style[name] = typeof value[name] === 'number' ? value[name] + 'px' : value[name];
      }
    }
  } else {
    if (name in dom) {
      dom[name] = value || '';
    }

    if (value) {
      dom.setAttribute(name, value);
    } else {
      dom.removeAttribute(name, value);
    }
  }
}