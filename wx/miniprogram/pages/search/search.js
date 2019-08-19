// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    music:[],
    num:1
  },
  // 点击小说时效果
  onbook(){
    this.setData({
      num:1
    })
  },
  // 点击音乐时效果
  onmusic() {
    this.setData({
      num: 2
    })
  },
  // 点击搜索产生效果
  onSearch(e) {
    wx.cloud.callFunction({
      name: "search",
      data: {
        start: e.detail,
      }
    }).then(res => {
      this.setData({
        list: JSON.parse(res.result).books,
      })
    }).catch(err => {

    }),
      wx.cloud.callFunction({
        name: "music",
        data: {
          start: e.detail
        }
      }).then(res => {

        this.setData({
          music: JSON.parse(res.result).musics,
        })
      }).catch(err => {

      })

  },
  // 点击图片
  bookchange(e){
    let id =e.currentTarget.dataset.id
    let name = e.currentTarget.dataset.name
    wx.navigateTo({
      url: `/pages/search_book/search_book?id=${id}&name=${name}`,
    })
  },
  musicchange(e){
    let id = e.currentTarget.dataset.id
    let name = e.currentTarget.dataset.name
    wx.navigateTo({
      url: `/pages/music/music?id=${id}&name=${name}`,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: '搜索'
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})