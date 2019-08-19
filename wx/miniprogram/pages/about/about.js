// pages/about/about.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    newmovie:[],
    top:[],
    // 热映榜
    last:[],
    outlist:"",
    outlists:"",
    // 控制整个页面隐藏
    htmlif:""
  },
  // 跳转页面
  onabout_time(e){
    let id=e.currentTarget.dataset.id
    wx.navigateTo({
      url: "/pages/about_time/about_time?id="+id,
    })
  },
  loadMore() {
    // 调用云函数about
    // 将返回的数据保存到list中
    // 一周口碑榜
    wx.cloud.callFunction({
      name: "about",
      data: {}
    }).then(res => {
      let rows = JSON.parse(res.result).subjects
      let rows_length=rows.length
      let str = rows.splice(0, 3)
      this.setData({
        list: str,
        outlist: rows_length
      })
    }).catch(err => {

    }),
    // 新片榜
      wx.cloud.callFunction({
      name: "newsmovie",
      data: { start: 0, count: 10 }
      }).then(res => {
        let rows = JSON.parse(res.result).subjects
        let rows_length = rows.length
        let str = rows.splice(0, 3)
        this.setData({
          newmovie: str,
          outlists: rows_length,
        })
      }).catch(err => {

      }),
      // top250
      wx.cloud.callFunction({
        name: "topmovie",
        data: { start: 0, count: 3 }
      }).then(res => {
        this.setData({
          top: JSON.parse(res.result).subjects
        })
      }).catch(err => {

      }),
      // 影院热映
      wx.cloud.callFunction({
        name: "lovemovie",
        data: { start: 0, count: 3 }
      }).then(res => {
        this.setData({
          last: JSON.parse(res.result).subjects,
        })
      }).catch(err => {
      })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      // 修改导航栏的文字
      title:"榜单"
    })
    this.loadMore()
    this.setData({
      htmlif:false
    })
    wx.showLoading({
      title: '正在加载....',
    })
  // 下面的是请求的缓存
// 口碑榜
    wx.getStorage({
      key: 'sp_list',
      success: (res) => {
        this.setData({
          list: res.data,
        })
      },
    }),
    // 新片榜
    wx.getStorage({
      key: 'sp_newmovie',
      success: (res) => {
        this.setData({
          newmovie: res.data,
        })
      },
    }),
// top250
      wx.getStorage({
      key: 'sp_top',
        success: (res) => {
          htmlif: true
          wx.hideLoading()
          this.setData({
            sp_top: res.data,
          })
        },
      }),

      wx.getStorage({
      key: 'sp_last',
        success: (res) => {
          this.setData({
            last: res.data,
          })
        },
      }),

      wx.getStorage({
        key: 'outlist',
        success: (res) => {
          this.setData({
            outlist: res.data,
          })
        },
      }),
      wx.getStorage({
        key: 'outlists',
        success: (res) => {
          this.setData({
            outlists: res.data,
          })
        },
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