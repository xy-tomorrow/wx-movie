// pages/details/details.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    mouter:0,
    introduction:true,
    view_toast:false
  },
  on_introduction(){
    this.setData({
      introduction: !this.data.introduction
    })
  },
  // 页面评分跳转
  onlooked(e){
    let id=e.currentTarget.dataset.id
    wx.navigateTo({
      url: "/pages/comments/comments?id=" + id,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 页面进入是弹窗加载中
    wx.showLoading({
      title: '正在加载',
    })
    wx.setNavigationBarTitle({
      // 修改导航栏的文字
      title: options.name
    })
    wx.cloud.callFunction({
      name: "love_details",
      data: { id:options.id }
    }).then(res => {

      let list = JSON.parse(res.result)
      let num=0; 
      // 循环获取总的评论数  
      for(var i in list.rating.details){
        num += list.rating.details[i]
      }
      // 请求数据加载成功后关掉弹窗
      wx.hideLoading()
      this.setData({
        list: list,
        mouter:num,
        // 页面数据请求回来时显示页面
        view_toast:true
      })
    }).catch(err => {

    });
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