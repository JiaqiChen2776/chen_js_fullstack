class Promise {
    constructor (executor) {
        this.status = 'pending';
        this.value = undefined;
        this.reason = undefined;
        this.onResolveCallbacks = [];
        this.onRejectedCallbacks = [];

        // reject? value? executor 调用时传过来的结果
        let resolve = (value) => {
            if (this.status == 'pending') {
                this.status = 'resolved';
                this.value = value;
                this.onResolveCallbacks.forEach(fn => fn());
            }
        }
        let reject = (reason) => {
            if (this.status == 'pending') {
                this.status = 'rejected';
                this.reason = reason;
                this.onRejectedCallbacks.forEach(fn => fn());                
            }
        }
        // ajax setTimeout node 数据处理 fs file  --> 异步操作
        executor(resolve, reject);
    }
    then(onFullFilled,onRejected) {
        if (this.status === 'resolved') {
            onFullFilled(this.value);
        } else if(this.status === 'rejected') {
            onRejected(this.reason);
        }
        if (this.status == 'pending') {
            this.onResolveCallbacks.push(() => {
                onFullFilled(this.value);
            })
            this.onRejectedCallbacks.push(() => {
                onRejected(this.reason);
            })
        }
    }
}

const p = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('hello world');
    }, 1000)
})

p.then((data) => {
    console.log(data);
},(err) => {
    console.log(err);
})
// nodejs 原生提供的模块化机制方案
// module.exports = Promise