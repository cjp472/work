// pages/luyin_jieshao/luyin_jieshao.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img: 'http://weixin.forindata.com/pushInfo/sucai/getsucai.action?fileName=houtia_XCX/BJ.png',
    Popup: true,
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
  Popup_show:function(){
    this.setData({
      Popup: !this.data.Popup
    })
  },
  go_moban:function(){
    wx.navigateTo({
      url: '../luyin_bianji/luyin_bianji',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
    this.setData({
      Popup: !this.data.Popup
    })
  },
  go_moban_b: function () {
    wx.navigateTo({
      url: '../edit_view/edit_view',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
    this.setData({
      Popup: !this.data.Popup
    })
  },
})