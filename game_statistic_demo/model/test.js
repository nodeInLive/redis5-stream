const base = require('./base');
const path = require('path');
const userState = require('../module/userState');

module.exports = class test extends base {

    async test(value){
        console.log('模型处理消费数据',value);
    }

}