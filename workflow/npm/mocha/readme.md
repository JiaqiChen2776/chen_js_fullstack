# 前端测试

## mocha chai
安装：
    yarn add mocha chai -D

设置脚本：
    "mocha": "mocha tests/"

测试用例：
    引入 chai
    引入需要测试方法
    describle('', () => {})
    it('should return run when param are numbers') 举个例子
    expect()   可查阅 chai.js 断言库

    示例：
    describe('hello-npm-script', () => {
    // 方方面面都考虑进去
    describe('#add', ()=> {
        it('should return sum when param are numbers', ()=> {
            expect(add(0, 1)).to.equal(1);
            expect(add(2, 3)).to.equal(5);
        })
        it ('参数不合法，结果返回NaN', () => {
            expect(isNaN(add(1, '2'))).to.equal(true);
        })
    })
});

