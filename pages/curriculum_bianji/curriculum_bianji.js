// pages/Courses_box/Courses_box.js
var json = require("../../Data/Home_data.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
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
      url: '../../pages/curriculum_bianji_i/curriculum_bianji_i?id=' + HomeId,
    })
  },
  go_url: function (e) {
    var url = e.currentTarget.dataset.url;
  wx.navigateTo({
    url: '../curriculum_bianji_i/curriculum_bianji_i',
    success: function(res) {},
    fail: function(res) {},
    complete: function(res) {},
  })
  },
  //点击分享海报
  haibao: function (e) {
    this.setData({
      isHaibao: false
    })
  },
  //点击关闭海报
  haibao_close: function (e) {
    this.setData({
      isHaibao: true
    })
  },
})