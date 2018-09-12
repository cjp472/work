// pages/zhishiku/zhishiku.js
const innerAudioContext = wx.createInnerAudioContext();
const recorderManager = wx.getRecorderManager();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['图文', '视频',],
    tuwen: false,
    shipin: true,
    index: 0,
    img_show: true,
    
    imageList: [

      '../../icons/pig_jia.png'
    ],
      voicetempFilePath: '',
    luyin: true,
    jishu: 1,
    time: 0,
    daoTime: "stop",
    state: "paus",
    audio_kaiguan: false,
    audio_xianshi: true,
    audio_guanbi: true,
    yinpin_guanbi:true,
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
    var imageList = that.data.imageList;
    imageList.splice(index, 1);
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
  go_detail: function (e) {
    wx.navigateTo({
      url: '../luyin_jieshao/luyin_jieshao',
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
  Return: function () {
    wx.navigateBack({
      delta: 1
    })
  },
go_i:function(){
 wx.navigateTo({
   url: '../home_page/home_page',
   success: function(res) {},
   fail: function(res) {},
   complete: function(res) {},
 })
},
// 上传本地音频
  yinpin: function () {
    this.setData({
      times3: 0,
      times4: 0,
      tishi: "录音结束前轻勿进行其他操作，录音时长300秒",
    })

    // var hide = this.data.img_kaiguan;
    // var bofang = this.data.audio_xianshi;
  

    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      maxDuration: 60,
      camera: 'back',
      success: function (res) {
        that.setData({
          img_kaiguan: true,
          yinpin_guanbi: false,
        })
        console.log(res.tempFilePath);
        that.setData({
          audio_src_2: res.tempFilePath
        })
      }

    })
   
  },
  shan_audio_b: function () {
    var that = this;
    that.data.audio_src_2 = '';
    that.setData({
      img_kaiguan: false,
      yinpin_guanbi: true,
   
    })
  },
  //音频播放
  audio_click_b: function (e) {
    var src = e.currentTarget.dataset.src;
    innerAudioContext.src = src;
    innerAudioContext.loop = true;
    innerAudioContext.play();
    this.setData({
      isPlay_2: true
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
          progress_2: progress,
          total_time: total
        });
      })
    })
  },
  //音频暂停
  audio_pause_b: function (e) {
    var src = e.currentTarget.dataset.src;
    innerAudioContext.src = src;
    innerAudioContext.pause();
    this.setData({
      isPlay_2: false
    })
  },
})