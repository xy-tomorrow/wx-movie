// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabse: 0,
    detail: {},
    title: 0,
    metast: []
  },
  btase: function (e) {
    //功能：用户点击按钮后跳转详情组件
    var id = e.target.dataset.id;
    var title = e.target.dataset.name;
    wx.navigateTo({
      url: '/pages/home/home?id=' + id + '&title=' + title,
    })
  },
  jumpup: function () {
    var id = this.data.tabse;
    wx.showLoading({
      title: '加载中...',
    })
    wx.cloud.callFunction({
      name: "mymove",
      data: { id: id }
    }).then(res => {
      var obj = JSON.parse(res.result);
      this.setData({
        detail: obj
      })
      wx.hideLoading();
    }).catch(err => {
      console.log(err);
    })
  },
  loadMore() {
    var id = this.data.tabse;
    wx.showLoading({
      title: '加载中...',
    })
    wx.cloud.callFunction({
      name: "mymove",
      data: { id: id }
    }).then(res => {
      var obj = JSON.parse(res.result);
      this.setData({
        detail: obj
      })
      wx.hideLoading();
    }).catch(err => {
      console.log(err);
    })
    //相关推荐
    var title = this.data.title.slice(0, 2);
    wx.cloud.callFunction({
      name: "meta",
      data: { query: title }
    }).then(res => {
      var obj = JSON.parse(res.result);
      this.setData({
        metast: obj.books.slice(6, 9)
      })
    }).catch(err => {
      console.log(err);
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      tabse: options.id,
      title: options.name
    });
    this.loadMore();
    wx.setNavigationBarTitle({
      // 修改导航栏的文字
      title:options.name
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