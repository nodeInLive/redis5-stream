const base = require('./base');
const log = require('../lib/utils/log');
const tool = require('../lib/utils/tool');
const path = require('path');
const fs = require('fs');
const streams = require('redis5-stream');
const handlerCache = {
};
module.exports = class Application extends base {


	// 监听事件
	run() {
		var group_name = 'g';
		var consumer_name = 'c';
		// var stream = new streams(client, 'common,teen_patti,rummy_play');
		var stream = new streams(client, 'common,game');
		stream.xreadGroup(group_name, consumer_name, async (res) => {
			if (res) {
				try {
					const streamName = res[0][0];

					if (!handlerCache[streamName]) {
						if (!await tool.fsExists(path.join(process.cwd(),'model',streamName))) {
							return log.error('not found stream:',path.join(process.cwd(),'model',streamName))
						}
						handlerCache[streamName] = {};
					}
					let str = res[0][1][0];
					// console.log('监听数据并处理数据', streamName, str);
					let valule = str[1];
					for (let k in valule) {
						if (valule[k] === 'data') {
							valule = valule[parseInt(k)+1];
						}
					}
					valule = JSON.parse(valule);
					
					if (!handlerCache[streamName][valule.event]) {
						let tmp = path.join(process.cwd(),'model',streamName,valule.event+'.js');
						if (!await tool.fsExists(tmp)) {
							return log.error('not found event:',tmp);
						}
						handlerCache[streamName][valule.event] = require(tmp);
					}
					handlerCache[streamName][valule.event].exec(valule,str[0]);
				} catch (error) {
					log.error('json data format error:',error)      
				} finally {
					let id = res[0][1][0][0];
					let mystream = res[0][0];
					stream.xack(mystream, group_name, id, (res) => {
						console.log('xack返回数据', res);
					});
				}
				
			}
		});
	}

}