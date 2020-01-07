const redis = require('redis');
const path = require('path');
const mongo = require('./lib/mongoModule');
const log = require('./lib/utils/log');

const env = process.argv[2] ? process.argv[2] : 'dev';
let config = path.join(process.cwd(), 'config', env, 'config.json');
if (!require('fs').existsSync(config)) {
	log.error('The config file %s is not found!', config);
	process.exit(1);
}
config = require(config);
log.info("Application env: %s, load config: %s", env, JSON.stringify(config));
// 配置放入全局
global.configInfo = new Proxy(config,{
	set: (target, propKey) => {
		throw new Error(`Can't change global.configInfo information ${propKey}`);
	}
});
(async () => {
	await mongo.init(config.mongo);
})()

const Application = require('./controller/index');
client = redis.createClient(config.port, config.host,{auth_pass:config.auth,db:config.db});
client.on('ready', function (res) {
	console.log('ready');
});

client.on('end', function (err) {
	console.log('end');
});

client.on('error', function (err) {
	console.log(err);
});

client.on('connect', function () {
	console.log('redis connect success!');
});


const app = new Application();
app.run();

