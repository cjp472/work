// pages/Courses_box/Courses_box.js
var json = require("../../Data/Home_data.js")
var query = wx.createSelectorQuery();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    text: '规则命名中，一律采用小写加中划线的方式，不允许使用大写字母或 _- 命名避免使用中文拼音，应该采用更简明有语义的英文单词进行组- 命名注意缩写，但是不能盲目缩写，具体请参见常用的CSS命名规则- 不允许通过1、2、3等序号进行命名',
    vdo: 'http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400',
    video_show: true,
    beijing: 'http://img2.imgtn.bdimg.com/it/u=3740589220,4198399874&fm=11&gp=0.jpg',
    video_hidden: false,
    zidong: false,
    shouw: true,
    isHaibao: true,  //海报
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      main_key: json.homeIndex
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

  },
  // 跳转子页面 详情页面
  go_i: function (e) {
    var HomeId = e.currentTarget.dataset.id
    console.log(HomeId)
    wx.navigateTo({
      url: '../../pages/Courses_i/Courses_i?id=' + HomeId,
    })
  },
  go_keceng: function () {
    wx.navigateTo({
      url: '../Courses_box/Courses_box',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  bofang: function (e) {
    console.log(e)
    this.setData({
      video_show: false,
      video_hidden: true,
    })
    this.videoContext = wx.createVideoContext('myVideo');
    this.videoContext.play()
  },
  go_url: function (e) {
    var url = e.currentTarget.dataset.url;
    wx.navigateTo({
      url: url,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
 
  Return: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  bianji:function(){
    wx.navigateTo({
      url: '../about_us/about_us',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  }
})