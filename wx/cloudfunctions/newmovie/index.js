
// 云函数lovemovie
// 向豆瓣网发送请求获取最新热映电影
// 引入第三方ajax库
var rp = require("request-promise")
// 创建main函数
exports.main = async (event, context) => {
  // 创建url请求函数
  var url = ` http://api.douban.com/v2/movie/coming?apikey=0df993c66c0c636e29ecbb5344252a4a&start=${event.start}&count=${event.count}`
  // 将请求的数据反回电影列表返回
  return rp(url).then(res => {  //发送请求,请求成功
    return res;
    console.log(res)
  }).catch(err => {  //请求失败
    console.log(err);
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