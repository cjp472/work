// pages/my_daka/my_daka.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nav: '1',//1:进行中 2：已过期
    img:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2659519208,2040552462&fm=27&gp=0.jpg'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //查询打卡列表。需要客户的手机号和khcode
    var that = this;
    var phone = wx.getStorageSync('phone');
    console.log(phone);
    var khcode = wx.getStorageSync('khcode');
    console.log(khcode);
    wx.request({
      url: app.globalData.myUrl2 + 'minisoftware/vipMini/getVipBindNyKhcodeAndPhone.do',
      data: {
        "khcode": khcode,
        "bdPhone": phone

      },
      dataType: 'json',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      method: 'post',
      success(e) {
        console.log("绑定的userid", e.data.bdUserid);
        if (e.data.bdUserid){
        app.globalData.userid = e.data.bdUserid;
        app.globalData.userId = e.data.bdUserid;
        app.globalData.khcode = khcode;
        app.globalData.khCode = khcode;

        }else{
          wx.showModal({
            title: '提示',
            content: '未获取到userid，请联系管理员',
            showCancel: false,//是否显示取消按钮

            success: function (res) {
            wx.navigateBack({
              delta:-1
            })
            },
          })
        }
      }
    })
    wx.request({
      url: app.globalData.myUrl2 + 'minisoftware/vipMini/getVipUserByKhcodeAndPhone.do',
      data: {
        "khcode": khcode,
        "phoneNum": phone

      },
      dataType: 'json',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      method: 'post',
      success(e) {
        console.log("vip", e.data.vipId);
            wx.request({
          url: app.globalData.myUrl2 + 'minisoftware/tyHouTai/getCourseNew.do',
          data: {
            "khcode": khcode,
            "vipId": e.data.vipId

          },
          dataType: 'json',
          header: { 'content-type': 'application/x-www-form-urlencoded' },
          method: 'post',
          success(e) {
            console.log("打卡列表", e.data);
            that.setData({
              can: e.data.can,
              nocan: e.data.nocan
            })

          }
        })

      }
    })
   

    // wx.showModal({
    //   title: '提示',
    //   content: '功能暂未开放。',
    //   showCancel: false,//是否显示取消按钮
     
    //   success: function (res) {
    //    wx.navigateBack({
    //      delta:-1
    //    })
    //   },
    // })
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
    var that = this;
    var phone = wx.getStorageSync('phone');
    console.log(phone);
    var khcode = wx.getStorageSync('khcode');
    console.log(khcode);
    wx.request({
      url: app.globalData.myUrl2 + 'minisoftware/vipMini/getVipBindNyKhcodeAndPhone.do',
      data: {
        "khcode": khcode,
        "bdPhone": phone

      },
      dataType: 'json',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      method: 'post',
      success(e) {
        console.log("绑定的userid", e.data.bdUserid);
        app.globalData.userid = e.data.bdUserid;
        app.globalData.userId = e.data.bdUserid;
        app.globalData.khcode = khcode;
        app.globalData.khCode = khcode;
      }
    })
    wx.request({
      url: app.globalData.myUrl2 + 'minisoftware/vipMini/getVipUserByKhcodeAndPhone.do',
      data: {
        "khcode": khcode,
        "phoneNum": phone

      },
      dataType: 'json',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      method: 'post',
      success(e) {
        console.log("vip", e.data.vipId);
        wx.request({
          url: app.globalData.myUrl2 + 'minisoftware/tyHouTai/getCourseNew.do',
          data: {
            "khcode": khcode,
            "vipId": e.data.vipId

          },
          dataType: 'json',
          header: { 'content-type': 'application/x-www-form-urlencoded' },
          method: 'post',
          success(e) {
            console.log("打卡列表", e.data);
            that.setData({
              can: e.data.can,
              nocan: e.data.nocan
            })

          }
        })

      }
    })
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
  
  },
  //nav切换
  changeNav: function (e) {
    var nav = e.currentTarget.dataset.nav;
    this.setData({
      nav: nav
    })
  },
  //查看
  chakan: function (e) {
    console.log(e.currentTarget.dataset);
    wx.navigateTo({
      url: '../daka_detail/daka_detail?courseid='
        + e.currentTarget.dataset.courseid
        + '&className=' + e.currentTarget.dataset.classname
        + '&miaoshu=' + e.currentTarget.dataset.miaoshu
        + '&url=' + e.currentTarget.dataset.url
        + '&cnum=' + e.currentTarget.dataset.cnum
        + '&wxname=' + e.currentTarget.dataset.wxname
        + '&subTitle=' + e.currentTarget.dataset.subtitle,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  daka:function(){
    wx.navigateTo({
      url: '../daka_type/daka_type',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  }
})