// pages/bianji_fenlei_a/bianji_fenlei_a.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  array: ['早安', '晚安', ],

    img: 'http://weixin.forindata.com/pushInfo/sucai/getsucai.action?fileName=houtia_XCX/BJ.png',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showModal({
      title: '提示',
      content: '功能暂未开放。',
      showCancel: false,//是否显示取消按钮

      success: function (res) {
        wx.navigateBack({
          delta: -1
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
  
  },
  go_i:function(){
    wx.navigateTo({
      url: '../bianji_fenlei/bianji_fenlei',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
    wx.navigateTo({
      url: '../baoma_bianji/baoma_bianji',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
})