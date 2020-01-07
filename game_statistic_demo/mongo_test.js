const mongo = require('./lib/mongoModule');
let config = {
    "ip": "192.168.0.11",
    "port": 27017,
    "options": {
        "poolSize": 5,
        "connectTimeoutMS": 5000
    },
    "haInterval": 10,
    "database": "de",
    "mode": "single"
};

async function test(){
    await mongo.init(config);
    
    let {result} = await mongo.mongoConnect.db('de').collection('admin_day_active').updateOne({user_id:2003,active_id:20200104},{$inc:{active_num:1}},{upsert:true});
    
    console.log('=======================>',result);
    // await mongo.close();
}

test();