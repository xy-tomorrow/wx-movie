// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
var rp = require("request-promise");
exports.main = async (event, context) => {
  var url = `http://api.zhuishushenqi.com/book/${event.id}`;
  return rp(url).then(res => {
    return res;
  }).catch(err => {
    return err;
  })
}

// // 云函数入口文件
// const cloud = require('wx-server-sdk')

// cloud.init()

// // 云函数入口函数
// exports.main = async (event, context) => {
//   const wxContext = cloud.getWXContext()

//   return {
//     event,
//     openid: wxContext.OPENID,
//     appid: wxContext.APPID,
//     unionid: wxContext.UNIONID,
//   }
// }