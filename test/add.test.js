import add from '../src/add';
import 'should';

describe("es6 测试",function(){
    it("无参数测试",function(){
        add().should.be.eql(2);
    })

    it("有参数测试",function(){
        add(1,2).should.be.eql(3);
    })
})