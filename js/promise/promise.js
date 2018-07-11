/**
 * data 2018-6-21
 * 模块提供Promise类
 */
class Promise {
    constructor(excutor) {
        // promise 状态有几种？ !!!!
        // pending 等待， resolved 成功， rejected 失败
        this.status = 'pending';
        // 第一种写法
        this.value = undefined;   // resolve成功的值
        this.reason = undefined;  // reject失败的值
        let resolve = (value) => {
            if (this.status === 'pending') {
                this.value = value;
                this.status = 'resolved';
            }
        };
        let reject = (reason) => {
            if (this.status === 'pending') {
                this.reason = reason;
                this.status = 'rejected';
            }
        };
        // 高阶函数
        excutor(resolve, reject);
        // 第二种写法
        // excutor(() => {
        //     // resolve 函数体
        // }, () => {
        //     // reject 函数体
        // });
    }
    // 高阶函数
    then(onFullFilled,onRejected) {
        if (this.status === 'resolved') {
            onFullFilled(this.value);
        } else if(this.status === 'rejected') {
            onRejected(this.reason);
        }
    }
}
// 输出Promise类
module.exports = Promise

