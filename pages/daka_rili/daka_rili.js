// pages/daka_rili/daka_rili.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    height: '',  //微信头像高度
    three_height: '',  //三分之一高度
    video_src: 'http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400',  //视频
    audio_src: 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46',  //音频


    year: 0,
    month: 0,
    date: ['日', '一', '二', '三', '四', '五', '六'],
    dateArr: [],
    isToday: 0,
    isTodayWeek: false,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var width = wx.getSystemInfoSync().windowWidth;
    var height = width * 0.895 * 0.149;
    var three_height = width * 0.895 * 0.82 * 0.32;
    this.setData({
      height: height,
      three_height: three_height
    })

    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth() + 1;
    this.dateInit();
    this.setData({
      year: year,
      month: month,
      isToday: '' + year + month + now.getDate()
    });

  },
  dateInit:function (setYear, setMonth) {
    //全部时间的月份都是按0~11基准，显示月份才+1
    let dateArr = [];						//需要遍历的日历数组数据
    let arrLen = 0;							//dateArr的数组长度
    let now = setYear ? new Date(setYear, setMonth) : new Date();
    let year = setYear || now.getFullYear();
    let nextYear = 0;
    let month = setMonth || now.getMonth();					//没有+1方便后面计算当月总天数
    let nextMonth = (month + 1) > 11 ? 1 : (month + 1);
    let startWeek = new Date(year + ',' + (month + 1) + ',' + 1).getDay();							//目标月1号对应的星期
    let dayNums = new Date(year, nextMonth, 0).getDate();				//获取目标月有多少天
    let obj = {};
    let num = 0;

    if (month + 1 > 11) {
      nextYear = year + 1;
      dayNums = new Date(nextYear, nextMonth, 0).getDate();
    }
    arrLen = startWeek + dayNums;
    for (let i = 0; i < arrLen; i++) {
      if (i >= startWeek) {
        num = i - startWeek + 1;
        obj = {
          isToday: '' + year + (month + 1) + num,
          dateNum: num,
          weight: 5
        }
      } else {
        obj = {};
      }
      dateArr[i] = obj;
    }
    this.setData({
      dateArr: dateArr
    })

    let nowDate = new Date();
    let nowYear = nowDate.getFullYear();
    let nowMonth = nowDate.getMonth() + 1;
    let nowWeek = nowDate.getDay();
    let getYear = setYear || nowYear;
    let getMonth = setMonth >= 0 ? (setMonth + 1) : nowMonth;

    if (nowYear == getYear && nowMonth == getMonth) {
      this.setData({
        isTodayWeek: true,
        todayIndex: nowWeek
      })
    } else {
      this.setData({
        isTodayWeek: false,
        todayIndex: -1
      })
    }
  },
  lastMonth: function () {
    //全部时间的月份都是按0~11基准，显示月份才+1
    let year = this.data.month - 2 < 0 ? this.data.year - 1 : this.data.year;
    let month = this.data.month - 2 < 0 ? 11 : this.data.month - 2;
    this.setData({
      year: year,
      month: (month + 1)
    })
    this.dateInit(year, month);
  },
  nextMonth: function () {
    //全部时间的月份都是按0~11基准，显示月份才+1
    let year = this.data.month > 11 ? this.data.year + 1 : this.data.year;
    let month = this.data.month > 11 ? 0 : this.data.month;
    this.setData({
      year: year,
      month: (month + 1)
    })
    this.dateInit(year, month);
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
  //视频播放
  video_play: function (e) {
    var videoId = e.currentTarget.dataset.id;
    this.setData({
      curId: videoId
    })
    console.log(1);
    var src = e.currentTarget.dataset.src;
    for (var i = 1; i < 10; i++) {
      var m = "video" + i;
      this.videoContext = wx.createVideoContext(m);
      this.videoContext.pause();
      console.log(1);
    }
    var v = "video" + videoId;
    this.videoContext2 = wx.createVideoContext(v);
    // this.videoContext2.requestFullScreen(() => {

    // });
    this.videoContext2.play();
    console.log(2);
  },
  //视频退出全屏播放
  // video_full:function(e){
  //   this.videoContext.exitFullScreen();
  //   this.videoContext.pause();
  // },
  //音频播放
  audio_click: function (e) {
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
  dianzan: function (e) {
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
  //打卡
  go_daka: function (e) {
    wx.navigateTo({
      url: '../daka_dairy/daka_dairy',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  //评论
  go_pinglun: function (e) {
    wx.navigateTo({
      url: '../pinglun/pinglun',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  //删除
  delete:function (e) {
    wx.showModal({
      content: '删除后将不再展示，确认删除？',
    })
  },
})