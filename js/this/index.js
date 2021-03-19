var name = 'window'
function sayName() {
    console.log(this.name)
}
var p1 = {
    name: 'p1',
    sayName: sayName
}
var p2 = {
    name: 'p2',
    sayName: function() {
        var fun = p1.sayName
        fun()
    }
}

p1.sayName()
p2.sayName()