// console.log('工厂模式');
// 函数属于 对象
// 函数是一等对象
// 类，简单的只有一个构造函数   类跟函数没有区别
// js 本身并没有类，只是用的人多了，给了这个实现
// js 只有对象（基于原型式） Object原型对象的始祖
// 原型 prototype
// js 不需要传统继承，只要有个参照物就可实现原型式继承
var Bicycle = function() {
    // 构造函数 constractor
    // new 时执行
    // this.brand = brand ||'凤凰'
}

// function Bicycle(brand) {
//     // 构造函数 constractor
//     // new 时执行
//     this.brand = brand ||'凤凰'
// }


// 原型 凤凰...
// 二维码 手机支付
// js 继承关系，不是
// 共享单车，完全颠覆了自行车
Bicycle.prototype={
    sellBicycle:function(model){
        var bicycle = null;
        switch (model) {
            case 'Giant':
                bicycle=new Giant();   //被实例化为不同的对象
                break;
            case 'Speedster':
                bicycle=new Speedster();
                break;
            case 'U2':
                bicycle=new U2();
                break;
            default:
                break;
        }
        console.log('您已购买'+model);
        bicycle.assemble();
        bicycle.wash();
        bicycle.provideRepair();
        // 把车卖出去
        return bicycle

        // console.log('卖车了...')
        // return null;
        // 面向对象们
        // 卖车：商店、很多车、维修人员、仓库人员   （工厂）
    }
}


// js 基本类型：字符串，数字，布尔值，undefined，null
// 复杂类型 object <-prototype   array function json

//雷速达
function Speedster(){
    
}
Speedster.prototype = {   //每种自行车的保修都不一样，需在每个部分添加接口 assemble wash provideRepair
    assemble:function(){
        console.log('组装完成！');
    },
    wash:function(){
        console.log('清洗完成！');
    },
    provideRepair:function(){
        console.log('保修一年');
    }
}

//捷安特
function Giant(){

}
Giant.prototype = {
    assemble:function(){
        console.log('组装完成！');
    },
    wash:function(){
        console.log('清洗完成！');
    },
    provideRepair:function(){
        console.log('保修两年');
    }

}

//U2
function U2(){

}
//prototype模拟类，区别于对象
U2.prototype = {
    assemble:function(){
        console.log('组装完成！');
    },
    wash:function(){
        console.log('清洗完成！');
    },
    provideRepair:function(){
        console.log('保修三年');
    }

}


var bicycle = new Bicycle();  //new:执行一遍构造函数
console.log(bicycle.sellBicycle('Giant'));  //undefined 没有返回值