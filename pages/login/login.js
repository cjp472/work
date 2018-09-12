// pages/login/login.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    blueBtn: false,
    grayBtn: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getStorage({
      key: 'khcode',
      success: function(res) {

        app.globalData.khcode = res.data;
        console.log(res);
        if (res != null && res !=undefined){
          wx.redirectTo({
           
            url: '../home_page/home_page',
          })

        }
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
  changePhone: function (e) {
    console.log('name:', e.detail.value);
    this.setData({
      phone: e.detail.value,
    })
  },
 
  changeCode: function (e) {
    console.log('age:', e.detail.value);
    this.setData({
      code: e.detail.value,
    })
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

  //
  dologin:function(){
    
      var that = this;
      if (!this.data.phone) {
        wx.showModal({
          title: '提示',
          content: '请输入手机号码',
        })
        return;
      } else if (!/^1(3|4|5|7|8)\d{9}$/.test(this.data.phone)) {
        wx.showModal({
          title: '提示',
          content: '请输入正确的手机号码',
        })
        return;
      }else  if (this.data.code=='') {
          wx.showModal({
            title: '提示',
            content: '请输入验证码',
          })
          return;
        
      }else{
        app.sendRequest({
          data: {
            phoneString: that.data.phone,
            codeString: that.data.code,
            bizId: that.data.bizId,
          },
          success(res) {
            if (res.data == 'success') {
              console.log('验证码验证通过');
              that.jiatiaozhuan(that.data.phone);
            } else {
              wx.showToast({
                title: '验证码有误，请重新输入！',
              })
            }
          },
        }, 'checkMessage!checkMsg.action')
      }
      
        
      


    
  },
  //跳转
  jiatiaozhuan: function (phoneNumber) {
    console.log(app.globalData.myUrl2);
    var that = this;
    wx.request({
      url: app.globalData.myUrl2 + 'minisoftware/tyHouTai/doLogin.do',
      data: {
        "phoneNumber": phoneNumber,
       
      },
      dataType: 'json',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      method: 'post',
      success(e) {
        console.log(e.data);
        if (e.data.loginResNum>1){
          wx.showModal({
            title: '提示',
            content: '此手机号已绑定多个khcode，清联系管理员',
          })
        } else if (e.data.loginResNum < 1) {
          wx.showModal({
            title: '提示',
            content: '此手机号尚未开通账号权限，清联系管理员',
          })
        } else if (e.data.loginResNum == 1){
          wx.setStorageSync('khcode', e.data.loginRes);
          app.globalData.khcode = e.data.loginRes;
          app.globalData.khCode = e.data.loginRes;
          wx.setStorageSync('phone', phoneNumber);
          wx.navigateTo({
            url: '../home_page/home_page',
          })
        }
      }
    })

    
  },
  getCode: function (e) {
    var that = this;
    if (this.data.phone) {
      if (!/^1(3|4|5|7|8)\d{9}$/.test(this.data.phone)) {
        wx.showModal({
          title: '提示',
          content: '请输入正确的手机号码',
        })
        return;
      } else {
        app.sendRequest({
          data: {
            phoneString: that.data.phone
          },
          success(res) {
            if (res.data.state == 'success') {
              that.data.bizId = res.data.bizId;
              wx.showToast({
                title: '发送成功，请查收!',
                duration: 2000,
              })
              //获取成功后开始倒计时
              that.setData({
                blueBtn: true,
                grayBtn: false,
              });
              var totalSecond = 120;
              var interval = setInterval(function () {
                // 秒数   
                that.setData({
                  countDownSecond: totalSecond,
                });
                totalSecond--;
                if (totalSecond < 0) {
                  //倒计时结束
                  clearInterval(interval);
                  that.setData({
                    blueBtn: false,
                    grayBtn: true,
                  })
                }
              }.bind(this), 1000);
              //-------------------------
            } else if (res.data.state == 'fail') {
              wx.showToast({
                title: '验证码发送失败！',
                duration: 2000,
              })
            }
          }
        }, 'sendMessage!sendMsg.action')
      }
    } else {
      wx.showModal({
        title: '提示',
        content: '请填写手机号码',
      })
      return;
    }
  },
})