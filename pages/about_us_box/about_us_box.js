// pages/bianji_fenlei_a/bianji_fenlei_a.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['精简版', '详细版',],
    index: 0,
    img: '../../icons/BJ.png',
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
  go_i: function () {
    wx.navigateTo({
      url: '../bianji_fenlei/bianji_fenlei',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var index = e.detail.value
    this.setData({
      index: e.detail.value
    })

    if (index == 0) {
      wx.navigateTo({
        url: '../brand/brand',
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    } else if (index == 1) {
      wx.navigateTo({
        url: '../about_us_b/about_us_b',
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    }

  },
})