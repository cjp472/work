// pages/pinglun/pinglun.js
const innerAudioContext = wx.createInnerAudioContext();
const recorderManager = wx.getRecorderManager();
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tuijian:'no',
    shengyu:0,
    userid:'',
    voicetempFilePath: '',
    luyin: true,
    jishu: 1,
    time: 0,
    daoTime: "stop",
    state: "paus",
    audio_kaiguan: false,
    audio_xianshi: true,
    audio_guanbi: true,
    img_yincang: true,
    img_kaiguan: false,
    video_kaiguan: false,
    video_yincang: true,
    times1: 0,
    times2: 0,
    tishi: "录音结束前轻勿进行其他操作，录音时长300秒",
    imageList: '',
    src: '',
    temFilePath: '',
    audio_src: '',
    isRecord:true,
    shuru:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log(options.id);
    that.data.courseId = options.id;
    that.data.dakaid = options.dakaid;
    //获取绑定的userid
    //khcode  phone
    var phone = wx.getStorageSync('phone');
    console.log(phone);
    var khcode = wx.getStorageSync('khcode');
    console.log(khcode);
    
    wx.request({
      url: app.globalData.myUrl2 + 'minisoftware/vipMini/getVipBindNyKhcodeAndPhone.do',
      data: {
        "khcode": khcode,
        "bdPhone": phone

      },
      dataType: 'json',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      method: 'post',
      success(e) {
        console.log("绑定的userid", e.data.bdUserid);
        that.data.userid = e.data.bdUserid
      }
    })
    wx.request({
      url: app.globalData.myUrl2 + 'minisoftware/tyHouTai/getTodayQiangNum.do',
      data: {
        "khcode": app.globalData.khcode,
        
        "tuijianId": app.globalData.userid,
        

      },
      dataType: 'json',
      header: { 'content-type': 'application/json;charset=ISO-8859-1' },
      method: 'post',
      success(e) {
        console.log(e.data);
        that.setData({
          shengyu: e.data.shengyu
        })
      }
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
  detailInput: function (e) {
    this.data.detailInput = e.detail.value;
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    console.log('分享开始' + res);
    var pages = getCurrentPages() //获取加载的页面
    var currentPage = pages[pages.length - 1] //获取当前页面的对象
    var url = currentPage.route //当前页面url

    console.log(url);
    return {
      title: '芝麻街英语',
      path: '/' + url + '?parentId=' + app.globalData.userid,
    }
  },
  shan_audio: function () {
    var that = this;
    that.data.audio_src = '';
    that.setData({
      audio_guanbi: true,
      audio_kaiguan: false
    })
  },
  shan_luyin: function () {
    var that = this;
    that.data.voicetempFilePath = '';
    that.setData({
      audio_kaiguan: false,
      audio_xianshi: true,
      audio_guanbi: true,
      luyin: true
    })
  },
  //开始录音
  record_click:function(e){
    var that = this;
    const options = {
      duration: 300000,
      sampleRate: 44100,
      numberOfChannels: 1,
      encodeBitRate: 192000,
      format: 'mp3',
      frameSize: 50
    }
    recorderManager.start();
    that.setData({
      isRecord: true
    })
    recorderManager.onStart(() => {
      console.log('recorder start')
      
    })
    recorderManager.onFrameRecorded((res) => {
      const { frameBuffer } = res
      console.log('frameBuffer.byteLength', frameBuffer.byteLength)
    })

  },
  //录音暂停
  record_pause: function (e) {
    var that = this;
    that.setData({
      isRecord: false
    });
    recorderManager.pause();
    recorderManager.onPause(() => {
      console.log('recorder pause')
    })
  },
  //录音停止
  ab_on: function () {
    var that = this;
    recorderManager.onStop((res) => {

      console.log('recorder stop', res)
      that.data.voicetempFilePath = res.tempFilePath

    })
    recorderManager.onFrameRecorded((res) => {
      const { frameBuffer } = res
      console.log('frameBuffer.byteLength', frameBuffer.byteLength)
    })

    const options = {
      duration: 300000,
      sampleRate: 44100,
      numberOfChannels: 1,
      encodeBitRate: 192000,
      format: 'mp3',
      frameSize: 50
    }


    if (that.data.luyin) {

      recorderManager.start(options);
      that.data.luyin = false;
    } else {
      recorderManager.stop();
      console.log(that.data.tempFilePath);
      that.setData({
        audio_xianshi: true,
        audio_guanbi: false,
      })
    }
  },
  shan_view_audio:function(e){
    var that = this;
    that.setData({
      audio_xianshi: true,
      audio_kaiguan: false
    })
  },
  goPlayVoice: function () {
    var that = this;


    const innerAudioContext = wx.createInnerAudioContext()
    innerAudioContext.autoplay = true
    innerAudioContext.src = that.data.voicetempFilePath
    innerAudioContext.onPlay(() => {
      console.log('开始播放')
    })
    innerAudioContext.onError((res) => {
      console.log(res.errMsg)
      console.log(res.errCode)
    })
  },
  //  上传相片
  img: function () {
    var that = this;
    wx.chooseImage({
      count: 9, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          img_yincang: false,
          imageList: res.tempFilePaths
        })
        if (res.tempFilePaths.length > 0) {

          that.setData({
            img_kaiguan: true
          })
        }

      }
    })
  },
  quxiao_img: function (e) {
    var that = this;
    console.log(e.currentTarget.dataset.inde);
    var imageList = that.data.imageList;
    imageList.splice(e.currentTarget.dataset.inde, 1);
    that.setData({
      imageList: imageList,
    })
    if (imageList.length == 0) {
      that.setData({
        img_yincang: true,
        img_kaiguan: false
      })
    }
  },
  // 音频
  audio: function () {
    this.setData({
      times1: 0,
      times2: 0,
      tishi: "录音结束前轻勿进行其他操作，录音时长300秒",


    })

    var hide = this.data.audio_kaiguan;
    var bofang = this.data.audio_xianshi;
    this.setData({
      audio_kaiguan: !hide,
      audio_xianshi: !bofang
    })


    //开始录音
    var that = this;
    const options = {
      duration: 300000,
      sampleRate: 44100,
      numberOfChannels: 1,
      encodeBitRate: 192000,
      format: 'mp3',
      frameSize: 50
    }
    recorderManager.start();
    that.setData({
      isRecord: true
    })
    recorderManager.onStart(() => {
      console.log('recorder start')

    })
    recorderManager.onFrameRecorded((res) => {
      const { frameBuffer } = res
      console.log('frameBuffer.byteLength', frameBuffer.byteLength)
    })

  },
  video: function () {
    var that = this
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      maxDuration: 60,
      camera: 'back',
      success: function (res) {
        that.setData({
          video_yincang: false,
          video_kaiguan: true
        })
        console.log(res.tempFilePath);
        that.setData({
          src: res.tempFilePath
        })
      }
    })

  },
  daka: function () {
    wx.showToast({
      title: '正在上传中..',
      icon: 'loading',
      duration: 250000,
    })
    var that = this;
    console.log("开始打卡：")
    console.log("视频：" + that.data.src);
    console.log("录音：" + that.data.voicetempFilePath);
    console.log("图片：" + that.data.imageList);












    wx.request({
      url: app.globalData.myUrl2 + 'minisoftware/jingDaka/saveDaka.do',
      data: {
        "userid": app.globalData.userid,
        "khcode": app.globalData.khCode,
        "courseId": that.data.courseId,
      },
      dataType: 'json',
      header: { 'content-type': 'application/json;charset=ISO-8859-1' },
      method: 'post',
      success(e) {
        console.log("打卡第一步");
        console.log(e);
        wx.request({
          url: app.globalData.myUrl2 + 'minisoftware/jingDaka/saveDakaSourseDetail.do',
          data: {
            "id": e.data.dakaId,
            "dakaDetail": that.data.detailInput,

          },
          dataType: 'json',
          header: { 'content-type': 'application/json;charset=ISO-8859-1' },
          method: 'post',
          success(ee) {
            console.log("插入detail成功");
            //此处插入资源
            that.goSaveShipin(e.data.dakaId);
          }
        })
      }
    })
  },
  goSaveShipin(courseId) {
    var that = this;
    if (that.data.src != '') {
      //上传视频
      console.log("视频上传start...")
      wx.uploadFile({
        url: app.globalData.myUrl2 + 'minisoftware/jingCourse/dakauploadVideoStn.do',
        filePath: that.data.src,
        name: 'file',
        formData: {
          "id": courseId,
        },
        success: function (res) {

          console.log("视频上传结束")
          that.data.src = '';
          that.goSaveLuyin(courseId);
        }
      })
    } else {
      that.goSaveLuyin(courseId);
    }
  },
  goSaveLuyin: function (courseId) {
    var that = this;
    if (that.data.voicetempFilePath != '') {
      //上传视频
      console.log("语音上传start...")
      wx.uploadFile({
        url: app.globalData.myUrl2 + 'minisoftware/jingCourse/dakauploadLuYinStn.do',
        filePath: that.data.voicetempFilePath,
        name: 'file',
        formData: {
          "id": courseId,
        },
        success: function (res) {

          console.log("语音上传结束")
          that.data.voicetempFilePath = '';
          that.goSavePhoto(courseId);
        }
      })
    } else {
      that.goSavePhoto(courseId);
    }
  },
  goSavePhoto: function (courseId) {
    var that = this;
    console.log("进入保持图片的方发");
    if (that.data.imageList.length > 0) {
      var i = 0;
      that.dosavePhoto(that.data.imageList[i], courseId, i);
    } else {
      that.goLastPage();

    }
  },
  dosavePhoto: function (url, courseId, i) {
    var that = this;
    wx.uploadFile({
      url: app.globalData.myUrl2 + 'minisoftware/jingCourse/dakauploadPhotoStn.do',
      filePath: url,
      name: 'file',
      formData: {
        "id": courseId,
      },
      success: function (res) {
        console.log("图片上传结束")
        if (i < that.data.imageList.length - 1) {
          that.dosavePhoto(that.data.imageList[i + 1], courseId, i + 1);
        } else {
          var arr = that.data.imageList;
          arr.splice(0, that.data.imageList.length);
          that.setData({
            imageList: arr,
          })
          that.goLastPage();

        }

      }
    })
  },
  goLastPage: function () {
    wx.showModal({
      title: '提示',
      content: '打卡成功',
      success: function (res) {
        if (res.confirm) {
          wx.setStorageSync("indexNo", 2)
          wx.navigateBack({
            delta: 1
          })
        } else if (res.cancel) {
          wx.setStorageSync("indexNo", 2)
          wx.navigateBack({
            delta: 1
          })
        }
      }
    })


  },
  //音频播放
  audio_click: function (e) {
    var src = e.currentTarget.dataset.src;
    innerAudioContext.src = src;
    innerAudioContext.loop = true;
    innerAudioContext.play();
    this.setData({
      isPlay: true
    });
    innerAudioContext.onPlay(() => {
      //音频进度条
      innerAudioContext.onTimeUpdate(() => {
        var progress = parseInt((innerAudioContext.currentTime / innerAudioContext.duration) * 100);
        var total = parseInt(innerAudioContext.duration);
        console.log(innerAudioContext.duration);
        var minute = parseInt(total / 60);
        var second = total % 60;
        total = minute + ":" + second;
        this.setData({
          progress: progress,
          total_time: total
        });
      })
    })
  },
  //音频暂停
  audio_pause: function (e) {
    var src = e.currentTarget.dataset.src;
    innerAudioContext.src = src;
    innerAudioContext.pause();
    this.setData({
      isPlay: false
    })
  },
  // //假跳转
  // jiatiaozhuan:function(e){
  //   //有两个出口daka_detail和daka_rili，后端自己判断
  //   wx.navigateTo({
  //     url: '../daka_detail/daka_detail',
  //     success: function(res) {},
  //     fail: function(res) {},
  //     complete: function(res) {},
  //   })
  // }
  shuru:function(e){
    this.data.shuru = e.detail.value
  },
  Return: function () {
    var that = this;
    var scene = '';
    if (that.data.tuijian == 'yes'&&that.data.shengyu==0){
      wx.showModal({
        title: '提示',
        content: '您今日推荐名额已用完',
      })
      return;
    }
    if (app.globalData.userInfo){
      console.log(that.data.userid);
      console.log(that.data.shuru);
      if (app.globalData.userid == '') {
        wx.getUserInfo({
          withCredentials: true,
          success: function (res) {
            //此处为获取微信信息后的业务方法
            var userInfo = res.userInfo
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
              url: 'https://weixin.forindata.com/miniprogram/logininfo!updateUser.action',
              data: {
                "cus.khcode": app.globalData.khcode,
                "cus.wxName": nickName,
                "cus.headimage": avatarUrl,
                "cus.sex": gender,
                "cus.id": app.globalData.userid,
                "cus.scene": scene,
              },
              header: { 'content-type': 'application/x-www-form-urlencoded' },
              method: 'post',
              success(e) {
                console.log("logininfo..success");



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
      } else if (that.data.shuru == '') {
        wx.showModal({
          title: '提示',
          content: '请输入评论内容',
        })
      } else {
        wx.showLoading({
          title: '发表中',
        })
        wx.request({
          url: app.globalData.myUrl2 + 'minisoftware/jingDaka/addComment.do',
          data: {
            "dakaId": that.data.dakaid,
            "speakUser": that.data.userid,
            "speakName": app.globalData.wxName,
            "commentDetail": that.data.shuru,
            "toUser": '',
            "toName": '',
          },
          dataType: 'json',
          header: { 'content-type': 'application/json;charset=ISO-8859-1' },
          method: 'post',
          success(e) {
            console.log(e.data);
            console.log('评论成功')

            if (that.data.tuijian == 'yes') {
              that.gotuijian();
            } else {
              wx.hideLoading();
              wx.showModal({
                title: '提示',
                content: '评论成功',
                showCancel: false,//是否显示取消按钮

                success: function (res) {
                  if (res.cancel) {
                    //点击取消,默认隐藏弹框
                  } else {
                    wx.navigateBack({
                      delta: -1
                    })

                  }
                },
                fail: function (res) { },//接口调用失败的回调函数
                complete: function (res) { },//接口调用结束的回调函数（调用成功、失败都会执行）
              })
            }



          }
        })
      }
    }else{
      wx.getUserInfo({
        withCredentials: true,
        success: function (res) {
          //此处为获取微信信息后的业务方法
          var userInfo = res.userInfo
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
            url: 'https://weixin.forindata.com/miniprogram/logininfo!updateUser.action',
            data: {
              "cus.khcode": app.globalData.khcode,
              "cus.wxName": nickName,
              "cus.headimage": avatarUrl,
              "cus.sex": gender,
              "cus.id": app.globalData.userid,
              "cus.scene": scene,
            },
            header: { 'content-type': 'application/x-www-form-urlencoded' },
            method: 'post',
            success(e) {
              console.log("logininfo..success");


              
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
    }
    


    
    
    // wx.navigateBack({
    //   delta: 1
    // })
  },
  radioChange:function(e){
    console.log(e.detail.value);
    this.data.tuijian = e.detail.value;
  },
  gotuijian:function(){
    var that = this;
    wx.request({
      url: app.globalData.myUrl2 + 'minisoftware/tyHouTai/addQiang.do',
      data: {
        "khcode": app.globalData.khcode,
        "dakaId": that.data.dakaid,
        "tuijianId": app.globalData.userid,
        "tuijianName": app.globalData.userInfo.nickName,
        "tuijianUrl": app.globalData.userInfo.avatarUrl,

      },
      dataType: 'json',
      header: { 'content-type': 'application/json;charset=ISO-8859-1' },
      method: 'post',
      success(e) {
        console.log("已推荐",e)
        console.log(e.data);
        console.log('评论成功')
        wx.hideLoading();
        wx.showModal({
          title: '提示',
          content: '评论成功，推荐成功',
          showCancel: false,//是否显示取消按钮

          success: function (res) {
            if (res.cancel) {
              //点击取消,默认隐藏弹框
            } else {
              wx.navigateBack({
                delta: -1
              })

            }
          },
          fail: function (res) { },//接口调用失败的回调函数
          complete: function (res) { },//接口调用结束的回调函数（调用成功、失败都会执行）
        })

      }
    })
  }
})