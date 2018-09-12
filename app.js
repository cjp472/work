//app.js
App({
  onLaunch: function (e) {
    // 展示本地存储能力
    var that = this;
    console.log("进入小程序");
    //是否为通过其他人的分享进入的
    console.log("是否分享进入");
    console.log(e.query.parentId);
    // wx.request({
    //   url: that.globalData.myUrl + 'mendian!showAllMd.action',
    //   data: {
    //     "khcode": that.globalData.khcode,
    //     "demoid": that.globalData.demoid,
    //   },
    //   success(res) {
    //     console.log("mendian:", res.data);
    //     var mendian = res.data[0].name;
    //     var yanzheng = res.data[0].yanzheng;
    //     //that.globalData.yanzheng = yanzheng;
    //     wx.setNavigationBarTitle({
    //       title: mendian,
    //     })
    //   }
    // })
    wx.request({
      url: that.globalData.myUrl + 'msgManageAction!showShNumByAppid.action',
      data: {
        "appid": that.globalData.appId
      },
      success(res) {
        that.globalData.mch_id = res.data
      }
    })
    if (e.query.parentId == undefined || e.query.parentId == null || e.query.parentId == '') {
      console.log("不是");
      that.globalData.isFenxiao = false;
      that.globalData.parentId = '';
    } else {
      console.log("是的，parentId=" + e.query.parentId);
      that.globalData.isFenxiao = true;
      that.globalData.parentId = e.query.parentId;
    }
    this.login(e);
  },
  login: function (e) {
    console.log("login打印");
    console.log(this);
    // let pageInstance = getCurrentPages();
    var that = this;
    var scene = decodeURIComponent(e.scene);
    that.globalData.scene = scene;
    wx.login({
      success: function (res) {
        console.log("code")
        console.log(res.code)
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'https://weixin.forindata.com/miniprogram/logininfo!getLoginInfo.action',
            data: {
              appid: that.globalData.appId,
              code: res.code,
            },
            success(e) {
              console.log("成功")
              console.log(e);
              that.globalData.userid = e.data.userid;
              that.globalData.userId = e.data.userid;

              wx.getUserInfo({
                withCredentials: true,
                success: function (res) {
                  //此处为获取微信信息后的业务方法
                  var userInfo = res.userInfo
                  var nickName = userInfo.nickName
                  that.globalData.wxName = userInfo.nickName
                  var avatarUrl = userInfo.avatarUrl
                  var gender = userInfo.gender //性别 0：未知、1：男、2：女
                  var province = userInfo.province
                  var city = userInfo.city
                  var country = userInfo.country
                  console.log(userInfo);

                  that.globalData.userInfo = userInfo;
                  wx.request({
                    url: 'https://weixin.forindata.com/miniprogram/logininfo!updateUser.action',
                    data: {
                      "cus.khcode": that.globalData.khcode,
                      "cus.wxName": nickName,
                      "cus.headimage": avatarUrl,
                      "cus.sex": gender,
                      "cus.id": that.globalData.userid,
                      "cus.scene": scene,
                    },
                    header: { 'content-type': 'application/x-www-form-urlencoded' },
                    method: 'post',
                    success(e) {
                      console.log("logininfo..success");


                      console.log("分销信息..begin");
                      wx.request({
                        url: that.globalData.myUrl2 + 'minisoftware/distribut!naiChaloginFirst.action',
                        data: {
                          "saler.khcode": that.globalData.khcode,
                          "saler.salerId": that.globalData.userid,
                          "saler.parentId": that.globalData.parentId,
                          // "saler.parentId": "1152",
                          "saler.wxName": that.globalData.userInfo.nickName,
                          "saler.qudao": '3'
                        },
                        header: { 'content-type': 'application/x-www-form-urlencoded' },
                        method: 'post',
                        success(e) {
                          console.log('保存了此销售员信息:' + that.globalData.userid);

                          wx.hideLoading();
                        }
                      })
                    },
                    fail(e) {
                      console.log("logininfo..faild");
                    }
                  })
                },
                fail: function () {
                  //获取用户信息失败后。请跳转授权页面
                  wx.showModal({
                    title: '警告',
                    content: '尚未进行授权，请点击确定跳转到授权页面进行授权。',
                    success: function (res) {
                      if (res.confirm) {
                        console.log('用户点击确定')
                        wx.navigateTo({
                          url: '../tologin/tologin',
                        })
                      }
                    }
                  })
                }
              })

            }, fail(e) {
              console.log("failed:", e);
            }
          })
          console.log("send....finish");
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    });
  },
  sendRequest: function (param, urlAction) {
    var that = this;
    wx.showLoading({});
    wx.request({
      url: that.globalData.myUrl + urlAction,
      data: param.data,
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      method: 'post',
      success(res) {
        console.log(urlAction, res);
        typeof param.success == 'function' && param.success(res);
      },
      complete() {
        wx.hideLoading();
      }
    })
  },
  globalData: {
    // appId: 'wxeea0eab9954fc519',
    appId: 'wxdfb112fdd6154fc3',
    mch_id: '',
    loginUrl: "https://weixin.forindata.com/miniprogram/",
    myUrl: 'https://weixin.forindata.com/miniprogram/',
    // myUrl: 'http://192.168.2.172:8080/miniprogram/',
    // myUrl: 'http://localhost:8080/miniprogram/',
    myUrl2: "https://weixin.forindata.com/",
    videourl: 'https://weixin.forindata.com/minisoftware',
    sourseUrl: 'https://weixin.forindata.com/minisoftware/naiProduct/downNaiProductSourse.do?sourseName=',
   
    // myUrl2: 'http://192.168.2.172:8080/',
    // videourl: 'https://192.168.2.172:8080/minisoftware',
    // sourseUrl: 'http://192.168.2.172:8080/minisoftware/naiProduct/downNaiProductSourse.do?sourseName=',
    demoid: '50',
    
    khcode:'13088',
    
    
    phone: '010-80456086',
    
  }
})