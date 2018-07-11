// 一个Publish  多个Subscriber
// pub-sub
// 发布者
let zk = {};
// 订阅者
zk.peopleList = [];
// 订阅者作何反应？
zk.listen = function(fn) {
    this.peopleList.push(fn);
}
// 发布
zk.trigger = function() {
    // ？消息发出后，所有订阅者做出反应
    for (let i=0,fn;fn=this.peopleList[i++];) {
        fn.apply(this,arguments);
    }
}

//订阅者的过程
zk.listen(function(msg) {
    console.log(`收到了你${msg}的信息，决定给红包`);
});
zk.listen(function(msg) {
    console.log(`收到了你${msg}的信息，打飞机来`);
});
zk.listen(function(msg) {
    console.log(`收到了你${msg}的信息，作为情敌表示不开心`);
});

zk.trigger('曾凯同学要结婚了');
zk.trigger('曾凯同学生了大胖小子');
zk.trigger('曾凯同学二胎了');
