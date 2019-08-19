// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
var rp = require("request-promise");
exports.main = async (event, context) => {
  var url = `http://api.zhuishushenqi.com/book/fuzzy-search?query=${encodeURI(event.query)}`;
  return rp(url).then(res => {
    return res;
  }).catch(err => {
    return err;
  })
}


