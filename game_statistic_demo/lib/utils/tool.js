const fs = require('fs');
const crypto = require('crypto');
const {listTimeZones, findTimeZone, getZonedTime}= require('timezone-support');
exports.validate = (data,rules) => {
  for (let r of rules) {
    if (data[r] === null || data[r] === undefined) return {ok: false, msg: 'Lack of parameter ' + r};
    if (typeof data[r] === String && data[r].trim() === '') return {ok: false, msg: 'Error string parameters ' + r};
  }
  return {ok:true};
}

exports.fsExists = async(path) => {
  return new Promise(res=>{
    fs.exists(path, exists => res(exists));
  });
}

// 根据时区格式化时间 return: yyyy-MM-dd
exports.formatTimeZoneToDateString = (timestamp,timezone) => {
  if (!listTimeZones().includes(timezone)) { // 判断时区合法性
    return null;
  }
  const berlin = findTimeZone(timezone)
  const nativeDate = new Date(timestamp)
  const retDate = getZonedTime(nativeDate, berlin)
  return `${retDate.year}-${retDate.month}-${retDate.day}`;
}
// 根据时区格式化时间 return: yyyy-MM-dd HH:mm:ss
exports.formatTimeZoneToString = (timestamp,timezone) => {
  if (!listTimeZones().includes(timezone)) { // 判断时区合法性
    return null;
  }
  const berlin = findTimeZone(timezone)
  const nativeDate = new Date(timestamp)
  const retDate = getZonedTime(nativeDate, berlin)
  return `${retDate.year}-${retDate.month}-${retDate.day} ${retDate.hours}:${retDate.minutes}:${retDate.seconds}`;
}



exports.md5 = (val) => {
  return crypto.createHash('md5').update(str + '', 'utf8').digest('hex');
}

exports.datetime = (date = new Date(), format) => {
  if (date && typeof date === 'string') {
    const dateString = date;
    date = new Date(Date.parse(date));

    if (isNaN(date.getTime()) && !format) {
      format = dateString;
      date = new Date();
    }
  }
  format = format || 'YYYY-MM-DD HH:mm:ss';

  const fn = d => {
    return ('0' + d).slice(-2);
  };

  const d = new Date(date);
  const formats = {
    YYYY: d.getFullYear(),
    MM: fn(d.getMonth() + 1),
    DD: fn(d.getDate()),
    HH: fn(d.getHours()),
    mm: fn(d.getMinutes()),
    ss: fn(d.getSeconds())
  };

  return format.replace(/([a-z])\1+/ig, a => {
    return formats[a] || a;
  });
}
 


exports.enums = {
  game_type: {
    "102": "teen_patti",
    "110": "rummy_play"
  }
}