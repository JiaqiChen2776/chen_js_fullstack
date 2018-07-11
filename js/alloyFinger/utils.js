// 截流 throttle, debounce 防抖 都为解决高频事件而来，
// 如：scroll mousewheel mousemover mousemove touchmove onresize 等
// 截流 throttle，在规定时间只执行一次，先执行
// 防抖 debounce, 在规定时间执行一次，后执行
const utils = {
    // 帮忙 method 执行的次数在规定时间内只有一次
    // method 执行时，函数内的 this 要指向 PureFullPage
    // this.container
    throttle(method, context, delay) {
        // args?
        // 返回的函数就是等下事件执行的真正函数体
        // 闭包
        let wait = false;
        return function(...args) {
            // console.log(wait);

            // console.log(args);
            // call()  apply()
            // args? event 对象
            // 执行时，上下文环境要跟以前一样
            if (!wait) {
                method.apply(context, args);
                wait = true;
                setTimeout(() => {
                    wait = false;
                }, delay)
            }
        }
    },
    debounce (method, context, event, delay) {
        // 清除定时器
        clearTimeout(context.tId);
        // window.resize 不要急，等一下再执行
        // 给 context 添加一个属性 tId，使定时器保持它的名字，普通的变量会被覆盖
        // js 是动态语言，可随时新增属性
        context.tId = setTimeout(() => {
            method.call(context, event);
        }, delay);
        // window.location.reload();
    },
    getWheelDelta (event) {
        // console.log(event.wheelData);
        if (event.wheelDelta) {
            this.getWheelDelta = event => event.wheelDelta;
            return event.wheelDelta;
        }
        // chrome  不同浏览器对 mousewheel 事件处理不同
        
    }
}