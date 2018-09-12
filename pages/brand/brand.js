// pages/about_us/about_us.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isNav: '1', //nav切换
    isEdit: false, //选择编辑页
    shop:['1'],  //门店个数
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  //切换nav
  change_nav: function(e) {
    var nav = e.currentTarget.dataset.nav;
    this.setData({
      isNav: nav
    })
  },
  //选择编辑类型
  click_edit: function(e) {
    this.setData({
      isEdit: true
    })
  },
  //关闭编辑
  close_edit: function(e) {
    this.setData({
      isEdit: false
    })
  },
  //选择文字，图片，视频
  choose_type: function(e) {
    var types = e.currentTarget.dataset.type;
    var that = this;
    wx.navigateTo({
      url: '../edit_view/edit_view?types='+types,
    })
  },
  //删除门店
  delete_shop:function(e){
    var that = this;
    var index = e.currentTarget.dataset.index;
    that.data.shop.splice(index,1);
    var shop = that.data.shop;
    that.setData({
      shop: shop
    })
  },
  //添加门店
  add_shop: function (e) {
    var that = this;
    that.data.shop.push(1);
    var shop = that.data.shop;
    that.setData({
      shop: shop
    })
  },
})