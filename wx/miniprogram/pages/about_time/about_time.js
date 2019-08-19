// miniprogram/pages/about_time/about_time.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    name:"",
    onlyif:false,
    looked:"",
    load_more: false,
    load_more_first: false,
    outlist: "",
    htmlshow:""
  },
  // 页面跳转
  on_about_time(e){
    let id = e.currentTarget.dataset.id
    let name = e.currentTarget.dataset.name
    wx.navigateTo({
      url: `/pages/details/details?id=${id}&name=${name}`,
    })
  },
  // 点击小星星变字
  onChange(e){
    let l_id=e.currentTarget.dataset.l_id
    this.setData({
      looked:l_id
    })
  },
  lodMore(){
    if (this.data.name == "一周口碑电影榜") {
      // 请求口碑榜，数据放在list中
      // 一周口碑榜
      wx.cloud.callFunction({
        name: "about",
        data: {}
      }).then(res => {
        let rows = JSON.parse(res.result).subjects
        this.setData({
          list: rows,
          htmlshow: true
        })
        wx.hideLoading()
      }).catch(err => {

      })
    } else if (this.data.name== "新片榜") {
      // 请求新片榜，数据放在last中
      // 新片榜
      wx.cloud.callFunction({
        name: "newsmovie",
        data: { start: 0, count: 10 }
      }).then(res => {
        
        let rows = JSON.parse(res.result).subjects
        this.setData({
          list: rows,
          onlyif:!this.data.onlyif,
          htmlshow: true
        })
        wx.hideLoading()
      }).catch(err => {

      })

    } else if (this.data.name== "top250") {
      // 请求top榜，数据放在top中
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
          onlyif:true,
          outlist: outlist,
          htmlshow: true
        })
        wx.hideLoading()
      }).catch(err => {

      })
    } else if (this.data.name == "热映榜") {
      // 请求热映榜，数据放在order中
      // 影院热映
      wx.cloud.callFunction({
        name: "lovemovie",
        data: { start: 0, count: 10 }
      }).then(res => {
        wx.hideLoading()
        this.setData({
          list: JSON.parse(res.result).subjects,
          onlyif: !this.data.onlyif,
          htmlshow:true
        })
      }).catch(err => {
      })
    } else {
      console.log("请求错误")
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      // 修改导航栏的文字
      title: options.id
    })
    wx.showLoading({
      title: '正在加载....',
    })
    this.setData({
      name: options.id,
      htmlshow:false
    })
    this.lodMore()
    
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
    if(this.data.name=="top250"){
      this.lodMore()
      this.setData({
        // 每次触底时显示加载,然后隐藏掉加载完成
        load_more: true,
        load_more_first: false
      })
      if (this.data.outlist < 20) {
        // 当请求的数据小于10条时延迟加载显示已加载全部
        // 三秒后数据加载到了不到数据隐藏加载项,然后显示,加载全部
        setTimeout(() => {
          this.setData({
            load_more_first: true,
            load_more: false
          })
        }, 1000)
      } else {
        // 当下拉加载的数据获取的超过不小于20条时显示加载的动画
        setTimeout(() => {
          this.setData({
            // 三秒后隐藏掉加载动画
            load_more: false
          })
        }, 3000)
      }
    }
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})