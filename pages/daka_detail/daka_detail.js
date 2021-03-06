// pages/daka_detail/daka_detail.js
const innerAudioContext = wx.createInnerAudioContext();
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num:0,
    nav:'1',  //1:日记 2：详情 3：成员
    height:'',  //微信头像高度
    three_height:'',  //三分之一高度
    video_src:'http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400',  //视频
    audio_src:'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46',  //音频
    haibao_hidden:false,  //海报显示隐藏
  },
  preview: function (e) {
    var that = this;
    console.log(e.currentTarget.dataset.index);
    console.log(e.currentTarget.dataset.photourl);
    var currenturl = e.currentTarget.dataset.photourl;
    console.log(this.data.dakaList[e.currentTarget.dataset.index]);
    var arr = this.data.dakaList[e.currentTarget.dataset.index].photo;
    console.log(arr);
    var photoArr = [];
    for (var i = 0; i < arr.length; i++) {

      photoArr.push(that.data.sourseurl + arr[i].photoUrl);

    }
    console.log(photoArr);
    wx.previewImage({
      current: currenturl, // 当前显示图片的http链接
      urls: photoArr // 需要预览的图片http链接列表
    })
  },
  flashdakalist:function(){
    var that = this;
    wx.request({
      url: app.globalData.myUrl2 + 'minisoftware/jingDaka/adminGetAlldakaStn.do',
      data: {

        "courseId": that.data.courseid,
        "userid": app.globalData.userId,
        "khcode": app.globalData.khCode,
      },
      dataType: 'json',
      header: { 'content-type': 'application/json;charset=ISO-8859-1' },
      method: 'post',
      success(e) {
        console.log("dakalist")
        console.log(e)
        that.setData({
          dakaList: e.data,
          dakavideoUrl: app.globalData.myUrl2 + 'minisoftware',
          sourseUrl: app.globalData.myUrl2 + 'minisoftware/naiProduct/downNaiProductSourse.do?sourseName=',
        })

      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);

    console.log(options.miaoshu);
    this.data.courseid = options.courseid;
    this.data.courseId = options.courseid;
    this.setData({
      className: options.className,
      miaoshu: options.miaoshu,
      courseid: options.courseid,
      cnum:options.cnum,
      url: options.url,
      subTitle: options.subTitle,
      wxname: options.wxname
    })

    var that = this;

    that.flashdakalist();
    
    wx.request({
      url: app.globalData.myUrl2 + 'minisoftware/tongYong/getCommentDataByComment.do',
      data: {
        "khcode": app.globalData.khcode,
        "forginType": "zuoye",
        "forginId": options.courseid,
        "state": "1",

      },
      dataType: 'json',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      method: 'post',
      success(e) {
        console.log(e.data);
        that.setData({
          huodong: e.data.huodong,
          sourseurl: app.globalData.sourseUrl,
          videourl: app.globalData.videourl
        })
      }

      


    })

    wx.request({
      url: app.globalData.myUrl2 + 'minisoftware/jingDaka/getDaka.do',
      data: {
        "userid": app.globalData.userId,
        "khcode": app.globalData.khCode,
        "courseId": that.data.courseId,
      },
      dataType: 'json',
      header: { 'content-type': 'application/json;charset=ISO-8859-1' },
      method: 'post',
      success(e) {
        console.log("今日打卡");
        console.log(e)
        if (e.data.toDayExit != "yes") {
          that.setData({
            yincang: "yes"
          })
        }
        if (that.data.guoqi == 'yes') {
          that.setData({
            yincang: "no"
          })
        }
      }
    })



    wx.request({
      url: app.globalData.myUrl2 + 'minisoftware/jingDaka/adminGetMember.do',
      data: {

        "courseId": that.data.courseid,

      },
      dataType: 'json',
      header: { 'content-type': 'application/json;charset=ISO-8859-1' },
      method: 'post',
      success(e) {
        console.log("参加人们")
        console.log(e)
        that.setData({
          pnum: e.data.length,
          people: e.data
        })

      }
    })



    var width = wx.getSystemInfoSync().windowWidth;
    var window_height = wx.getSystemInfoSync().windowHeight;
    var height = width*0.895*0.149;
    var three_height = width * 0.895 * 0.82 *0.32;
    this.setData({
      height: height,
      three_height: three_height,
      haibao_height: window_height
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
    var that = this;
    that.flashdakalist();
    wx.request({
      url: app.globalData.myUrl2 + 'minisoftware/jingDaka/adminGetMember.do',
      data: {

        "courseId": that.data.courseid,

      },
      dataType: 'json',
      header: { 'content-type': 'application/json;charset=ISO-8859-1' },
      method: 'post',
      success(e) {
        console.log("参加人们")
        console.log(e)
        that.setData({
          pnum: e.data.length,
          people: e.data
        })

      }
    })
  },
  //视频播放
  video_play: function (e) {
    var that = this;
    var videoId = e.currentTarget.dataset.id;
    that.setData({
      curId: videoId
    })
    var v = "video" + videoId;
    that.videoContext = wx.createVideoContext(v);
    // that.videoContext.requestFullScreen();
    that.videoContext.play();
  },
  //视频暂停
  pause: function (e) {
    var that = this;
    var videoId = e.currentTarget.dataset.id;
    that.setData({
      curId: videoId
    })
    var v = "video" + videoId;
    that.videoContext = wx.createVideoContext(v);
    that.setData({
      curId: null
    })
    that.videoContext.pause();
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
  //回到首頁
  goIndex: function (e) {
    wx.switchTab({
      url: '../home_page/home_page',
    })
  },
  //nav切换
  changeNav:function(e){
    var nav = e.currentTarget.dataset.nav;
    this.setData({
      nav:nav
    })
  },
  //视频播放
  // video_play:function(e){
  //   var videoId = e.currentTarget.dataset.id;
  //   this.setData({
  //     curId: videoId
  //   })
  //   console.log(1);
  //   var src = e.currentTarget.dataset.src;
  //   for(var i=1;i<10;i++){
  //     var m = "video" + i;
  //     this.videoContext = wx.createVideoContext(m);
  //     this.videoContext.pause();
  //     console.log(1);
  //   }
  //   var v = "video" + videoId;
  //   this.videoContext2 = wx.createVideoContext(v);
  //   this.videoContext2.requestFullScreen(() =>{
      
  //   });
  //   this.videoContext2.play();
  //   console.log(2);
  // },
  //视频退出全屏播放
  // video_full:function(e){
  //   this.videoContext.exitFullScreen();
  //   this.videoContext.pause();
  // },
  //音频播放
  audio_click:function(e){
    var src = e.currentTarget.dataset.src;
    innerAudioContext.src = src;
    innerAudioContext.loop = true;
    innerAudioContext.play();
    this.setData({
      isPlay1: true
    });
    innerAudioContext.onPlay(() => {
      //音频进度条
      innerAudioContext.onTimeUpdate(() => {
        var audioId = e.currentTarget.dataset.id;
        var progress = parseInt((innerAudioContext.currentTime / innerAudioContext.duration) * 100);
        var total = parseInt(innerAudioContext.duration);
        console.log(innerAudioContext.duration);
        var minute = parseInt(total / 60);
        var second = total % 60;
        total = minute + ":" + second;
        if (audioId == 1) {
          this.setData({
            progress1: progress,
            total_time1: total
          });
        } else if (audioId == 2) {
          this.setData({
            progress2: progress,
            total_time2: total
          });
        } else if (audioId == 3) {
          this.setData({
            progress3: progress,
            total_time3: total
          });
        } else if (audioId == 4) {
          this.setData({
            progress4: progress,
            total_time4: total
          });
        }
      })
    })
  },
  //音频暂停
  audio_pause: function (e) {
    var src = e.currentTarget.dataset.src;
    innerAudioContext.src = src;
    innerAudioContext.pause();
    this.setData({
      isPlay1: false
    })
  },
  //点赞
  dianzan:function(e){
    this.setData({
      isZan: true
    })
  },
  //取消点赞
  undianzan: function (e) {
    this.setData({
      isZan: false
    })
  },
  //查看打卡日历
  go_rili:function(e){
    wx.navigateTo({
      url: '../daka_rili/daka_rili',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  
 
  //日历
  go_rili:function(e){
    wx.navigateTo({
      url: '../daka_rili/daka_rili',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  //删除
  delete:function(e){
    wx.showModal({
      content: '删除后将不再展示，确认删除？',
    })
  },
  //海报关闭
  haibao_close:function(e){
    this.setData({
      haibao_hidden:true
    })
  },
  //打卡
  go_daka: function (e) {
    var that = this;
    wx.navigateTo({
      url: '../daka_dairy/daka_dairy?courseid=' + that.data.courseid,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  dianzan_a: function (e) {
    var that = this;
    console.log(e.currentTarget.dataset.id);
    wx.request({
      url: app.globalData.myUrl2 + 'minisoftware/jingDaka/dianzan.do',
      data: {
        "dakaId": e.currentTarget.dataset.id,

        "userId": app.globalData.userId,
        "wxName": app.globalData.wxName,
        "state": '1'

      },
      dataType: 'json',
      header: { 'content-type': 'application/json;charset=ISO-8859-1' },
      method: 'post',
      success(e) {
        console.log(e.data);

        that.flashdakalist();
      }
    })


  },
  dianzan_b: function (e) {
    var that = this;
    console.log(e.currentTarget.dataset.id);
    wx.request({
      url: app.globalData.myUrl2 + 'minisoftware/jingDaka/dianzan.do',
      data: {
        "dakaId": e.currentTarget.dataset.id,

        "userId": app.globalData.userId,
        "wxName": app.globalData.wxName,
        "state": '0'

      },
      dataType: 'json',
      header: { 'content-type': 'application/json;charset=ISO-8859-1' },
      method: 'post',
      success(e) {
        console.log(e.data);

        that.flashdakalist();

      }
    })

  },

  //评论
  go_pinglun: function (e) {
    console.log(e.currentTarget.dataset.commentid);


    wx.navigateTo({
      url: '../pinglun/pinglun?dakaid=' + e.currentTarget.dataset.commentid,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
})