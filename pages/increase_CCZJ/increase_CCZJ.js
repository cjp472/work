// pages/new_daka/new_daka.js
const innerAudioContext = wx.createInnerAudioContext();
const recorderManager = wx.getRecorderManager();
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['k2001班', 'k2002班'],
    index: 0,
    detailInput:'',
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
    imageList: [],
    src: '',
    temFilePath: '',
    audio_src: '',
    isRecord: true,
    curId: '0',
    totalsourse: [],
    video_poster: 'http://weixin.forindata.com/pushInfo/sucai/getsucai.action?fileName=zimajie/video_post_1.png',
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
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  bindDateChange2: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date2: e.detail.value
    })
  },
  shan_video: function () {
    var that = this;
    that.data.src = '';
    that.setData({
      video_yincang: true,
      video_kaiguan: false
    })
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
  record_click: function (e) {
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
  
  shan_view_audio: function (e) {
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
        if (res.tempFilePaths.length > 1) {
          for (var i = 0; i < res.tempFilePaths.length; i++) {
            that.data.imageList.push(res.tempFilePaths[i]);
          }
        } else {
          that.data.imageList.push(res.tempFilePaths);
        }
        for (var i = 0; i < res.tempFilePaths.length; i++) {
          var sourseata = {
            'types': 2,
            'shuju': res.tempFilePaths[i],
          };
          that.data.totalsourse.push(sourseata);
          that.setData({
            totalsourse: that.data.totalsourse
          })
        }
        var imageList = that.data.imageList;
        that.setData({
          img_yincang: false,
          imageList: imageList
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
    var index = e.currentTarget.dataset.index;
    var imageList = that.data.totalsourse;
    imageList.splice(index, 1);
    that.setData({
      totalsourse: imageList,
    })
    if (that.data.totalsourse.length == 0) {
      that.setData({
        img_yincang: true,
        img_kaiguan: false
      })
    }
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
       
        var sourseata = {
          'types': 3,
          'shuju': res.tempFilePath,
        };
        that.data.totalsourse.push(sourseata);
        that.setData({
          src: res.tempFilePath

        })
      }
    })

  },
  shan_video: function () {
    var that = this;
    console.log(that.data.totalsourse);
    that.data.src = '';
    that.setData({
      video_yincang: true,
      video_kaiguan: false
    })
    var arr = [];
    for (var i = 0; i < that.data.totalsourse.length; i++) {
      if (that.data.totalsourse[i].types != 3) {
        var obj = that.data.totalsourse[i]
        arr.push(obj);
      }
    }
    that.data.totalsourse = arr;
    console.log(that.data.totalsourse);
  },
  shan_audio: function () {
    var that = this;
    console.log(that.data.totalsourse);
    that.data.audio_src = '';
    that.setData({
      audio_guanbi: true,
      audio_kaiguan: false
    })
    var arr = [];
    for (var i = 0; i < that.data.totalsourse.length; i++) {
      if (that.data.totalsourse[i].types != 4) {
        var obj = that.data.totalsourse[i]
        arr.push(obj);
      }
    }
    that.data.totalsourse = arr;
    console.log(that.data.totalsourse);
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
  go_detail: function (e) {
    wx.navigateTo({
      url: '../daka_detail/daka_detail',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  //视频播放
  video_play: function (e) {
    var videoId = 1;
    this.setData({
      curId: videoId
    })
    var v = "video" + videoId;
    this.videoContext = wx.createVideoContext(v);
    // this.videoContext.requestFullScreen(() => {

    // });
    this.videoContext.play();
  },
  //视频暂停
  video_pause: function (e) {
    var videoId = 1;
    this.setData({
      curId: '0'
    })
    var v = "video" + videoId;
    this.videoContext = wx.createVideoContext(v);
    this.videoContext.pause();
  },
  detailInput:function(e){
    this.data.detailInput=e.detail.value;
  },
  Return: function () {



    var that = this;



    console.log(that.data.detailInput);
    console.log(that.data.totalsourse);
    if (that.data.detailInput.replace(/\s+/g, '') == '') {
      wx.showToast({
        title: '请输入内容',
      })
    }else{
      wx.showLoading({
        title: '发布中',
      })
      that.saveSourse(that.data.totalsourse, 0);
    }
    // if (that.data.titleInput.replace(/\s+/g, '') == '') {
    //   wx.showToast({
    //     title: '请输入课程标题',
    //   })
    // } else if (that.data.detailInput.replace(/\s+/g, '') == '') {
    //   wx.showToast({
    //     title: '请输入课程描述',
    //   })
    // } else if (that.data.date == '') {
    //   wx.showToast({
    //     title: '请输入开始时间',
    //   })
    // } else if (that.data.date2 == '') {
    //   wx.showToast({
    //     title: '请输入结束时间',
    //   })
    // } else {

    //   wx.showLoading({
    //     title: '发布中',
    //   })
    //   that.saveSourse(that.data.totalsourse, 0);
    // }

  },
  saveSourse: function (arr, i) {
    console.log(i);
    var that = this;

    if (i < arr.length) {
      that.goUpload(arr, i);
    } else {
      that.gosave(arr);
    }

  },
  goUpload: function (arr, i) {
    var that = this;
    if (arr[i].types == 2) {
      //图片
      wx.uploadFile({
        url: app.globalData.myUrl2 + 'minisoftware/tyHouTai/uploadPhtot.do',
        filePath: arr[i].shuju,
        name: 'file',
        success: function (res) {
          console.log(res);
          arr[i].shuju = res.data;
          console.log(arr);
          that.saveSourse(arr, i + 1);
        }
      })

    } else if (arr[i].types == 3) {
      //视频
      wx.uploadFile({
        url: app.globalData.myUrl2 + 'minisoftware/tyHouTai/uploadVideo.do',
        filePath: arr[i].shuju,
        name: 'file',
        success: function (res) {
          console.log(res);
          arr[i].shuju = res.data;
          console.log(arr);
          that.saveSourse(arr, i + 1);
        }
      })
    } else if (arr[i].types == 4) {
      //音频
      wx.uploadFile({
        url: app.globalData.myUrl2 + 'minisoftware/tyHouTai/uploadVoice.do',
        filePath: arr[i].shuju,
        name: 'file',
        success: function (res) {
          console.log(res);
          arr[i].shuju = res.data;
          console.log(arr);
          that.saveSourse(arr, i + 1);
        }
      })
    }
  },
  gosave: function (arr) {
    console.log("gosave");
    var that = this;
    console.log(arr);
    var phone = wx.getStorageSync('phone');


    wx.request({
      url: app.globalData.myUrl2 + 'minisoftware/tyHouTai/addChengzhang.do',
      data: {
        "khcode": app.globalData.khcode,
        "phone": app.globalData.phone,
        "wxName": app.globalData.userInfo.nickName,
        "wxTouxiang": app.globalData.userInfo.avatarUrl,
        "detail": that.data.detailInput,
        



        "arrSourseData": JSON.stringify(arr),
      },
      dataType: 'json',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      method: 'post',
      success(e) {
        console.log(e.data);
        wx.hideLoading();
        wx.showModal({
          title: '提示',
          content: '发布成功',
          showCancel: false,
          success: function () {
            wx.navigateBack({
              delta: 1
            })
          }
        })

      }
    })


  },
  // 音频
  audio: function () {
    var that = this;
    this.setData({
      time1: 0,
      time2: 0,
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
      that.data.can = 'yes';
      console.log('recorder start')
      var time = 0;
      that.jishi(time);


    })

    recorderManager.onFrameRecorded((res) => {
      const { frameBuffer } = res
      console.log('frameBuffer.byteLength', frameBuffer.byteLength)
    })
  },
  jishi: function (time) {
    var that = this;
    if (that.data.can == 'yes') {
      console.log(time + 1)
      var times = time + 1;
      var time1 = ((time + 1) / 60).toFixed(0);
      var time2 = ((time + 1) % 60).toFixed(0);
      console.log(time1 + '.' + time2);
      that.setData({
        time1: time1,
        time2: time2
      })

      setTimeout(function () {
        that.jishi(time + 1)
      }, 1000)
    }



  },
  //录音停止
  ab_on: function () {
    var that = this;

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



    recorderManager.stop();
    console.log(that.data.tempFilePath);

    that.setData({
      audio_xianshi: true,
      audio_guanbi: false,
    })
    recorderManager.onStop((res) => {
      console.log("进入停止方法");
      console.log('recorder stop', res)
      that.data.voicetempFilePath = res.tempFilePath

      var sourseata = {
        'types': 4,
        'shuju': res.tempFilePath,
      };
      that.data.totalsourse.push(sourseata);
      that.data.can = 'no';
      console.log(res.duration);
      var times = res.duration;
      var time1 = (res.duration / 1000 / 60).toFixed(0);
      var time2 = (res.duration / 1000 % 60).toFixed(0);
      console.log(time1 + '.' + time2);
      that.setData({
        time1: time1,
        time2: time2
      })

    })

  },
})