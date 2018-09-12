// pages/edit_notice/edit_notice.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputxiangqing:'',
    inputtitle:'',
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
  Return: function () {
    var that = this;
    
    console.log(that.data.inputtitle);
    console.log(that.data.inputxiangqing);
    if (that.data.inputtitle==''){
      wx.showModal({
        title: '提示',
        content: '请输入标题',
      })
    } else if (that.data.inputxiangqing == ''){
      wx.showModal({
        title: '提示',
        content: '请输入详情',
      })
    }else{
      console.log("去保存");
      wx.showLoading({
        title: '发布中',
      })
      // var that = this;
      wx.request({
        url: app.globalData.myUrl2 + 'minisoftware/tyHouTai/saveGongGao.do',
        data: {
          "khcode": app.globalData.khcode,
          "ggTitle": that.data.inputtitle,
          "ggDesc": that.data.inputxiangqing
        },
        dataType: 'json',
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        method: 'post',
        success(e) {
          console.log(e.data);
          if (e.data.insRes == 1){
            wx.hideLoading();
            wx.showModal({
              title: '提示',
              content: '公告发布成功',
              showCancel: false,
              success: function () {
                wx.navigateBack({
                  delta: 1
                })
              }
            })
          }
        }
      })

    }
  },
  inputtitle:function(e){
    // this.data.biaoti = e.detail.value
    this.setData({
      inputtitle: e.detail.value
    })
  },
  inputxiangqing: function (e) {
    this.setData({
      inputxiangqing: e.detail.value
    })
  },
})