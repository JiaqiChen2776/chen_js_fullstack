function Person(name) {
    this.name=name
}
Person.prototype.getName=function(){
    return this.name;
}

//IT工程师
// extend Person
function Coder(name,languages){
    Person.call(this,name);  //call:执行一次Person构造函数，且this指Person而不是Coder
    // 父类Person没有的可以加
    // 语言
    this.languages=languages;
}

// new Person 新的对象就是Coder的原型对象
Coder.prototype=new Person();  //使用父类Person的方法 getName
Coder.prototype.construtor = Coder   //Coder 的构造函数 (原来指向Person的构造函数)
Coder.prototype.getLanguages = function(){  //Coder 自己的方法
    return this.languages;
}

var wxf = new Person('汪西发');
console.log(wxf.name);

var xjy = new Coder('徐加元',['javascript','python','c/c++']);
console.log(xjy.name+' '+xjy.languages.join(','))  //join(',') 将其每一项用逗号连接
console.log(xjy.getName());  //getName 是父类Person的方法，须用 Coder 去 new 一个Person
console.log(xjy.getLanguages());