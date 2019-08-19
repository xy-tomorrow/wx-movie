// pages/me/me.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    login:true,
    bottom:false,
    username:"",
    userimg:"",
    num_look:0,
    num_music:0,
    num_movie:0
  },
  // 观看图书和音乐跳转的页面
  order_look(){
    wx.navigateTo({
      url: "/pages/search/search"
    })
  },
  // 观看电影跳转页面
  order_movie(){
    wx.navigateTo({
      url: "/pages/look_longhard/look_longhard?id=2&name=top榜"
    })
  },
  login(){
    this.setData({
      bottom:true
    })
  },
  getMyInfo(e){
    this.setData({
      username: e.detail.userInfo.nickName,
      userimg: e.detail.userInfo.avatarUrl
    })
  },
  // 点击取消和蒙版时触发
  user_no(){
    this.setData({
      bottom:false
    })
  },
  // 点击允许时收起当前页面，然后把登录隐藏，切换成头像显示。然后把数据插入缓存中
  user_ok(){
    this.setData({
      login: false,
      bottom: false,
    })
    wx.setStorage({
      key: 'username',
      data: this.data.username,
    })
    wx.setStorage({
      key: 'userimg',
      data: this.data.userimg,
    })
  },
  // 点击时退出，清理缓存
  userclear(){
    // wx.clearStorage()
    wx.removeStorage({
      key: 'username',
      success:(res)=> {
        wx.showToast({
          title: '已退出登录',
        })
        this.setData({
          login: true,
        })
      },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      wx.getStorage({
        key: 'username',
        success: (res)=> {
          if(res.data==""){
            this.setData({
              login: true
            })
          }else{
            this.setData({
              login: false,
              username: res.data
            })
          }
        },
      })
      // 图片
      wx.getStorage({
        key: 'userimg',
        success: (res) =>{
          this.setData({
            userimg:res.data
          })
        },
      })

    wx.setNavigationBarTitle({
      // 修改导航栏的文字
      title: "我的"
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})