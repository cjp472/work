// pages/tologin/tologin.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
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

  bindGetUserInfo: function(e){
   var that = this;
   console.log(e.detail.userInfo);
   
   var userInfo = e.detail.userInfo
   var nickName = userInfo.nickName
   app.globalData.wxName = userInfo.nickName
   var avatarUrl = userInfo.avatarUrl
   var gender = userInfo.gender //性别 0：未知、1：男、2：女
   var province = userInfo.province
   var city = userInfo.city
   var country = userInfo.country
   console.log(userInfo);
   app.globalData.userInfo = userInfo;
   wx.request({
    url: app.globalData.myUrl + 'logininfo!updateUser.action',
    data: {
     "cus.khcode": app.globalData.khcode,
     "cus.wxName": nickName,
     "cus.headimage": avatarUrl,
     "cus.sex": gender,
     "cus.id": app.globalData.userid,
     "cus.scene": app.globalData.scene,
    },
    header: { 'content-type': 'application/x-www-form-urlencoded' },
    method: 'post',
    success(e) {
     console.log("logininfo..success");
     

     console.log("分销信息..begin");
     wx.request({
      url: app.globalData.myUrl2 + 'minisoftware/distribut!naiChaloginFirst.action',
      data: {
       "saler.khcode": app.globalData.khcode,
       "saler.salerId": app.globalData.userid,
       "saler.parentId": app.globalData.parentId,
       // "saler.parentId": "1152",
       "saler.wxName": app.globalData.userInfo.nickName,
       "saler.qudao": '3'
      },
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      method: 'post',
      success(e) {
       console.log('保存了此销售员信息:' + app.globalData.userid);

       wx.hideLoading(); 
       wx.navigateBack({
        delta: 1
       })
      }
     })
    },
    fail(e) {
     console.log("logininfo..faild");
    }
   })

  }
})