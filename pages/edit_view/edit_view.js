// pages/edit_view/edit_view.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isEdit: false, //选择编辑页
    isEditDetail: false, //编辑页
    video_src: 'http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400',  //视频
    video_poster: 'http://weixin.forindata.com/pushInfo/sucai/getsucai.action?fileName=zimajie/video_post_1.png',  //视频封面
    total: [],  //编辑页总数
    totalsourse:[],
    img_src: [],  //图片
    sourseArr:[],
    scroll_height:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    if (options.types == 1) {
      this.choose_text();
    } else if (options.types == 2) {
      this.choose_img();
    } else if (options.types == 3) {
      this.choose_video();
    }
    var arr = wx.getStorageSync("hothuodong");
    console.log("onShow");
    console.log(arr);
    if (arr) {
      console.log(arr);
      that.setData({
        totalsourse:arr
      })
    }
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
  //选择编辑类型
  click_edit: function (e) {
    this.setData({
      isEdit: true
    })
  },
  //关闭编辑
  close_edit: function (e) {
    this.setData({
      isEdit: false
    })
  },
  //选择文字
  choose_text: function (e) {
    var types = 1;
    var that = this;
   
    var sourseata = {
      'types': 1,
      'shuju':'',
    };
    that.data.total.push(types);
    that.data.totalsourse.push(sourseata);
    console.log(that.data.totalsourse);

    var total = that.data.total;
    console.log(total);
    that.setData({
      isEditDetail: true,
      isEdit: false,
      types: types,
      total: total,
      totalsourse: that.data.totalsourse
    })
    setTimeout(function () {
      wx.createSelectorQuery().select('#scroll_height').boundingClientRect(function (rect) {
        that.setData({
          scroll_height: rect.height
        })
      }).exec()
    }, 2000)
  },
  //选择图片
  choose_img: function (e) {
    var types = 2;
    var that = this;
    wx.chooseImage({
      count: 9, // 最多可以选择的图片张数，默认9
      sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
      success: function (res) {
        // success
        for (var i = 0; i < res.tempFilePaths.length;i++){
          var sourseata = {
            'types': 2,
            'shuju': res.tempFilePaths[i],
          };
          that.data.totalsourse.push(sourseata);
        }
        console.log(that.data.totalsourse);
        that.setData({
          // img_src: res.tempFilePaths,
          isEditDetail: true,
          isEdit: false,
          types: types,
          totalsourse: that.data.totalsourse
        })
        setTimeout(function () {
          wx.createSelectorQuery().select('#scroll_height').boundingClientRect(function (rect) {
            that.setData({
              scroll_height: rect.height
            })
          }).exec()
        }, 2000)
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    });
  },
  //选择视频
  choose_video: function (e) {
    var types = 3;
    var that = this;
    wx.chooseVideo({
      //相机和相册
      sourceType: ['album', 'camera'],
      //录制视频最大时长
      // maxDuration: 60,
      //摄像头
      camera: ['front', 'back'],
      //是否压缩
      compressed: true,
      success: function (res) {
        console.log(res);
        var sourseata = {
          'types': 3,
          'shuju': res.tempFilePath,
        };
        that.data.totalsourse.push(sourseata);
        that.setData({
          // video_src: res.tempFilePath,
          isEditDetail: true,
          isEdit: false,
          types: types,
          totalsourse: that.data.totalsourse
        });
        setTimeout(function () {
          wx.createSelectorQuery().select('#scroll_height').boundingClientRect(function (rect) {
            that.setData({
              scroll_height: rect.height
            })
          }).exec()
        }, 2000)
      },
      fail: function (res) {
        console.log(res);
      }
    })
  },
  //选择类型
  choose_type: function (e) {
    this.setData({
      isEditDetail: false,
      isEdit: true
    })
    var that= this;
    // 使页面滚动到底部
    wx.pageScrollTo({
      scrollTop: that.data.scroll_height
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
  //关闭
  close_operation: function (e) {
    var that = this;
    console.log(e.currentTarget.dataset.index);
    // that.data.totalsourse.splice(e.currentTarget.dataset.index, 1);
    var arr = that.data.totalsourse;
    arr.splice(e.currentTarget.dataset.index, 1)
    that.setData({
      totalsourse: arr
    })


    // var types = e.currentTarget.dataset.types;
    // var index = e.currentTarget.dataset.index;  //总位置
    // console.log

    // var num = e.currentTarget.dataset.num;  //图片位置
    // console.log(arr);
    // if (types == 2) {
    //   //上传图片
    //   if (that.data.img_src.length < 2) {
    //     that.data.total.splice(index, 1);
    //     var arr = that.data.total;
    //     that.setData({
    //       total: arr
    //     })
    //   } else {
    //     that.data.img_src.splice(num, 1);
    //     var img_num = that.data.img_src;  //图片总数
    //     that.setData({
    //       img_src: img_num
    //     })
    //   }
    // } else {
    //   //文本或视频
    //   console.log(index);
    //   that.data.total.splice(index, 1);
    //   var arr = that.data.total;
    //   that.setData({
    //     total: arr
    //   })
    // }
  },
  Return:function(){
    var that = this;
    console.log(that.data.totalsourse);
    //此处进行保存操作
    wx.setStorageSync("hothuodong", that.data.totalsourse);
    wx.navigateBack({
      delta: 1
    })
  },
  
  go_fanhui: function () {
    wx.navigateTo({
      url: '../baoma_bianji/baoma_bianji',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  inputtext:function(e){
    console.log(e);
    var that = this;
    var arr = that.data.totalsourse;
    arr[e.currentTarget.dataset.arrid].shuju = e.detail.value
  }
})