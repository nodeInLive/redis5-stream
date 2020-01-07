var redis = require('redis');
const streams = require('redis5-stream')
// const config = require('./config/config');
const devconfig = require('./config/dev/config.json')
console.log('客户端配置', devconfig)
// var client = redis.createClient(config.redis.port,config.redis.host);
var client = redis.createClient(devconfig.port,devconfig.host, {auth_pass: devconfig.auth, db: devconfig.db});
// if(config.redis.auth) client.auth(config.redis.auth);

// client.xadd(['login','*','test','12345']);

// client.del('login');

// client.xread(['block','0','streams','login','$'],function(res){
//     console.log(res);
// })
// client.quit();

// client.xread()



// const streams = creatStreams(client, 'login')
// writer.once('finish', () => client.quit())
// writer.on('error', console.error)

var stream = new streams(client, 'common');
var gameStream = new streams(client, 'game');
// stream.write({test: '22'});
// stream.write({test: '23'}).quit();
// client = redis.createClient('6379','192.168.0.11');
// var stream = new streams(client, 'login2');
// stream.write({test: '22'});
// stream.write({test: '23'}).quit();



// let date = new Date();
// stream.write({
//     msg:'',data:JSON.stringify({
//         'event': 'recharge',
//         'apply_amount': 20,
//         'ts': date.getTime()/1000,
//         'pay_type':1,
//         'pay_channel':1,
//         'user_id': 12,
//         'order_id': date.getTime(),
//         'amount': Math.floor(Math.random()*100),
//         'start_ts': date.getTime()/1000
//     })
//     msg:'',data:JSON.stringify({
//         'event':"anonymous_login",
// 'ts':date.getTime()/1000,
// 'user_id':12,
// 'channel':"haha",
// 'aid':"0x11112222",
// 'cvc':"haha",
// 'cvn':"haha"
//     })

// }).quit();
// stream.xread('login');

let test_ = {
    draw_start(stream) {
        let draw_start_data ={msg: '', data: JSON.stringify({
            event: "draw_start", 
            ts: "2020-01-03 17:07:21", 
            draw_id:"1111111256", 
            game_kind:110, 
            room_kind: 1, 
            room_id: 1002
        })} ;
        console.log(JSON.stringify(draw_start_data))
        stream.write(draw_start_data).quit();
    },
    user_settle(stream) {
        let user_settle_data = {
            msg: '',
            data: JSON.stringify({
                event: 'user_settle',
                ts: '2020-01-03 17:15:21',
                draw_id: '1111111256',
                game_kind:110, 
                room_kind: 1, 
                room_id: 1002,
                chair_id: 2,
                user_id: 1002,
                is_robot: false,
                tax:0,
                win: 20
            })
        }
        stream.write(user_settle_data).quit();
    },
    play_flow_Test(gameStream) {
        let data = {
            msg: '',
            data: JSON.stringify({
                event: 'play_flow',
                ts: '2020-01-04 17:42:02',
                draw_id: '100001',
                chair_id: 2,
                play_id: 100,
                play_data: {  //play data
                    "hand": {  //手牌信息
                        "1": { //chair id
                            "group": [ //牌组
                                [8, 8],
                                [13, 19, 22],
                                [26, 37, 38],
                                [39, 40, 41, 47],
                                [52]
                            ],
                            "score": 80 //分数
                        },
                        "2": {  
                            "group": [
                                [0, 2, 3, 10, 12],
                                [17, 22, 24, 25],
                                [31],
                                [42, 46, 50]
                            ],
                            "score": 80
                        },
                    },
                }
            
            })
        }
        gameStream.write(data).quit();
    }
}


// test_.draw_start(stream); // 测试draw_start

// test_.user_settle(stream)


test_.play_flow_Test(gameStream) // 发送玩法埋点数据
