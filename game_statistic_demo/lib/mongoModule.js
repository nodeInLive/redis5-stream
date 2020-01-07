/**
 *  mongo 连接工具类
 */
/*global process:true */

const mongodb = require('mongodb');
const bluebird = require('bluebird');
const log = require('./utils/log');

const connectOptions = {
  promiseLibrary: bluebird,
  useUnifiedTopology: true
};

// 参考: https://docs.mongodb.com/manual/reference/connection-string/

exports.init = async (opt) => {
  try {
    let url =  buildConnectUrl(opt);
    exports.database = opt.database;
    let options = Object.assign({},connectOptions,opt.options);
    //   {auth: {
    //   user: opt.username,
    //   password: opt.password
    // }});
    
    log.info('[%s] mongo connected to %s with \n %j',process.pid,url,options);
    // return await mongodb.MongoClient.connect(url,options);    
    exports.mongoConnect = await mongodb.MongoClient.connect(url,options);
  } catch (error) {
    log.error('mongo connect error: %s',error.message);
    log.stack(error);
  }
}

function buildConnectUrl(config) {
  if (config.mode === 'single') {
    if (config.username) {
      return `mongodb://${config.username}:${config.password}@${config.single.ip}:${config.single.port}/${config.permissions}`;
    }
    return `mongodb://${config.ip}:${config.port}/${config.database}`;
  } else if (config.mode === 'cluster') {
    // TODO
  }
}