// // 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
// 向详情页发送请求获取电影详情
var rp = require("request-promise")
// 创建main函数
exports.main = async (event, context) => {
 
  console.log(123)
  var url = `http://api.zhuishushenqi.com/book/fuzzy-search?query=${encodeURI(event.start)}`
  // console.log()
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