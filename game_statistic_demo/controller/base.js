const path = require('path');
module.exports = class Application {

    // 计算模型调用函数
    model(name) {
        console.log('准备实例化模型')
        var m = require(path.join(process.cwd(),'model',name));
        var model = new m;
        return model;
    }

}