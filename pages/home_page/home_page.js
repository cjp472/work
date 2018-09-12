// pages/home_page/home_page.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nav:[
      {
        url:'../my_daka/my_daka',
        icon: '../../icons/nav_1.png', 
        text: '我的打卡',
      },
      // {
      //   url: '',
      //   icon: '../../icons/nav_2.png',
      //   text: '约课',
      // },
      {
        url: '../class_cricle/class_cricle',
        icon: '../../icons/nav_3.png',
        text: '成长足迹',
      },
      {
        url: '../edit_notice/edit_notice',
        icon: '../../icons/nav_4.png',
        text: '公告',
      },
    ],
    BJ:' http://weixin.forindata.com/pushInfo/sucai/getsucai.action?fileName=houtia_XCX/shouye_bj_a.png',
   
    BJ_b: ' http://weixin.forindata.com/pushInfo/sucai/getsucai.action?fileName=houtia_XCX/shouye_bj_b.png',
    BJ_c: ' http://weixin.forindata.com/pushInfo/sucai/getsucai.action?fileName=houtia_XCX/shouye_bj_c.png',
    img:'http://weixin.forindata.com/pushInfo/sucai/getsucai.action?fileName=houtia_XCX/sucai_a.jpg',
    but: '../../icons/jia_lunbotu.png',
    img_b: '../../icons/sucai_b.jpg',


    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
  
  },
  go_bianji:function(){
    wx.navigateTo({
      url: '',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  //go_url
  go_url: function (e) {
    var url = e.currentTarget.dataset.url;
    wx.navigateTo({
      url: url,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  //登录
  go_login: function (e) {

    wx.removeStorageSync('khcode');
    
    wx.redirectTo({
     
      url: '../login/login',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  }
})