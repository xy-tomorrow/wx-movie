// miniprogram/pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    last:[],
    top:[],
    newmovie:[],
    value:"",
    scrollLeft: 0,
    on_if:false
  },
  // 点击查看更多
  look_longhard(e){
    let id=e.currentTarget.dataset.id
    let name = e.currentTarget.dataset.name
    wx.navigateTo({
      url: `/pages/look_longhard/look_longhard?id=${id}&name=${name}`,
    })
  },

  view_details(e){
    let id = e.currentTarget.dataset.id
    let name = e.currentTarget.dataset.name
    wx.navigateTo({
      url: `/pages/details/details?id=${id}&name=${name}`,
    })
  },
  // 点击进入搜素页
  on_focus:function(){
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },
  scrollTo100: function (e) {
    this.setData({
      scrollLeft: 100
    })
  },
  // 调取未上映的电影
  loadMore(){
    // 调用云函数lovemovie
    // 将返回的数据保存到list中
    wx.cloud.callFunction({
      name: "newmovie",
      data: { start: 0, count: 20 }
    }).then(res => {
      this.setData({
        last: JSON.parse(res.result).entries,
      })
      wx.setStorage({
        key: 'last',
        data: JSON.parse(res.result).entries,
      })
    }).catch(err => {

    }),
    // top250
      wx.cloud.callFunction({
        name: "topmovie",
        data: { start: 0, count: 20 }
      }).then(res => {
        wx.hideLoading()
        this.setData({
          top: JSON.parse(res.result).subjects,
          on_if: true
        })
        wx.setStorage({
          key: 'top',
          data: JSON.parse(res.result).subjects,
        })
      }).catch(err => {

      }),
      // 影院热映
      wx.cloud.callFunction({
        name: "lovemovie",
        data: { start: 0, count: 20 }
      }).then(res => {
        this.setData({
          list: JSON.parse(res.result).subjects,
        })
        wx.setStorage({
          key: 'list',
          data: JSON.parse(res.result).subjects,
        })
      }).catch(err => {
      }),
      // 新片榜
      wx.cloud.callFunction({
        name: "newsmovie",
        data: { start: 0, count: 20 }
      }).then(res => {
        this.setData({
          newmovie: JSON.parse(res.result).subjects,
        })
        wx.setStorage({
          key: 'newmovie',
          data: JSON.parse(res.result).subjects,
        })
      }).catch(err => {
      })

  },
  // 提前获取榜单页面数据缓存到后台
  lordMore(){
    wx.cloud.callFunction({
      name: "about",
      data: {}
    }).then(res => {
      let rows = JSON.parse(res.result).subjects
      let rows_length = rows.length
      let str = rows.splice(0, 3)
      // 把数据放入缓存
      wx.setStorage({
        key: 'sp_list',
        data: str,
      })
      wx.setStorage({
        key: 'outlist',
        data: rows_length
      })
      // wx.hideLoading()
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
        wx.setStorage({
          key: 'sp_newmovie',
          data: str,
        })
        wx.setStorage({
          key: 'outlists',
          data: rows_length
        })
      }).catch(err => {

      }),
      // top250
      wx.cloud.callFunction({
        name: "topmovie",
        data: { start: 0, count: 3 }
      }).then(res => {
        wx.setStorage({
          key: 'sp_top',
          data: JSON.parse(res.result).subjects,
        })
      }).catch(err => {

      }),
      // 影院热映
      wx.cloud.callFunction({
        name: "lovemovie",
        data: { start: 0, count: 3 }
      }).then(res => {
        wx.setStorage({
          key: 'sp_last',
          data: JSON.parse(res.result).subjects,
        })
      }).catch(err => {
      })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '正在加载',
    })
    this.loadMore();

    wx.getStorage({
      key: 'list',
      success: (res)=> {
          this.setData({
            list: res.data,
          })
      },
    }),
      wx.getStorage({
        key: 'top',
        success: (res)=> {
          wx.hideLoading()
          this.setData({
            top: res.data,
            on_if: true
          })
        },
      }),
      wx.getStorage({
        key: 'last',
        success: (res)=> {
          this.setData({
            last: res.data,
          })
        },
      }),
      wx.getStorage({
      key: 'newmovie',
        success:  (res) =>{
          if(res.data!==""){
            wx.hideLoading()
          }
          this.setData({
            newmovie: res.data,
          })
        },
      }),
    this.setData({
      // on_if: false
    })
    wx.setNavigationBarTitle({
      // 修改导航栏的文字
      title: "首页"
    })
    // setTimeout( ()=> {
    //   //要延时执行的代码
    //   this.lordMore()
    //   console.log(123)
    // }, 5000) //延迟时间 这里是1秒

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.lordMore()
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