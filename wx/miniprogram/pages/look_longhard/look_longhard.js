// pages/look_longhard/look_longhard.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      ord_let:"",
      list:[],
      load_more:false,
      load_more_first:false,
      outlist:""
  },
  view_details(e) {
    let id = e.currentTarget.dataset.id
    let name = e.currentTarget.dataset.name
    wx.navigateTo({
      url: `/pages/details/details?id=${id}&name=${name}`,
    })
  },
  // 封装请求云函数请求数据事件
  loadMore() {
    // 调用云函数lovemovie
    // 将返回的数据保存到list中
    // 影院热映
    if (this.data.ord_let==1){
      wx.cloud.callFunction({
        name: "lovemovie",
        data: {
          start: this.data.list.length,
          count: 20
        }
      }).then(res => {
        let rows = JSON.parse(res.result).subjects
        let outlist = rows.length
        rows = this.data.list.concat(rows);
        this.setData({
          list: rows,
          outlist: outlist
        })
        wx.hideLoading()
      }).catch(err => {

      })
    } else if (this.data.ord_let == 2){
      // top250
      wx.cloud.callFunction({
        name: "topmovie",
        data: {
          start: this.data.list.length,
          count: 20
        }
      }).then(res => {
        let rows = JSON.parse(res.result).subjects
        let outlist = rows.length
        rows = this.data.list.concat(rows);
        this.setData({
          list: rows,
          outlist: outlist
        })
        wx.hideLoading()
      }).catch(err => {

      })
    } else if (this.data.ord_let == 3) {
      // 即将上映
      wx.cloud.callFunction({
        name: "newmovie",
        data: {
          start: this.data.list.length,
          count: 20
        }
      }).then(res => {
        let rows = JSON.parse(res.result).entries
        let outlist = rows.length
        rows = this.data.list.concat(rows);
        this.setData({
          list: rows,
          outlist: outlist
        })
        wx.hideLoading()
      }).catch(err => {

      })

    } else if (this.data.ord_let == 4) {
      // 新片榜
      wx.cloud.callFunction({
        name: "newsmovie",
        data: { start: 0, count: 20 }
      }).then(res => {
        this.setData({
          list: JSON.parse(res.result).subjects,
        })
        wx.hideLoading()
      }).catch(err => {
      })

    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let order=options.id
    wx.setNavigationBarTitle({ 
      // 修改导航栏的文字
      title: options.name 
      })
    this.setData({
      ord_let:order
    })
    this.loadMore();
    wx.showLoading({
      title: '正在加载',
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
    // 发送请求下载下一页的数据
    this.loadMore();
    this.setData({
      // 每次触底时显示加载,然后隐藏掉加载完成
      load_more: true,
      load_more_first: false
    })
    if(this.data.outlist<20){
      // 当请求的数据小于20条时延迟加载显示已加载全部
      // 三秒后数据加载到了不到数据隐藏加载项,然后显示,加载全部
      setTimeout(() => {
        this.setData({
          load_more_first: true,
          load_more: false
        })
      }, 1000)
    } else{
      // 当下拉加载的数据获取的超过不小于20条时显示加载的动画
      setTimeout(() => {
        this.setData({
          // 三秒后隐藏掉加载动画
          load_more: false
        })
      }, 3000)
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})