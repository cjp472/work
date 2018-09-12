// pages/edit_view/edit_view.js
var app = getApp();
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
    delarr: [],
    scroll_height: 0,
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

    setTimeout(function () {
      wx.createSelectorQuery().select('#scroll_height').boundingClientRect(function (rect) {
        that.setData({
          scroll_height: rect.height
        })
      }).exec()
    }, 2000)
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: app.globalData.myUrl2 + 'minisoftware/tongYong/showXiaoQu.do',
      data: {
        "khcode": app.globalData.khcode,

      },
      dataType: 'json',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      method: 'post',
      success(e) {
        console.log(e.data);
        // console.log(e.data.jingpin)
        wx.hideLoading();
        if (e.data.xiaoqu) {
          var arr= e.data.xiaoqu
          that.setData({
           
            sourseurl: app.globalData.sourseUrl,
            
          })
          // console.log("onShow");
          console.log(arr);
          if (arr) {
            console.log(arr);
            that.setData({
              totalsourse: arr
            })
          }

        }

      }
    })
    // var arr = wx.getStorageSync("hothuodong");
    
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
      'dataCome':'qiantaiA'
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
      // total: total,
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
    that.data.total.push(types);
    var total = that.data.total;
    wx.chooseImage({
      count: 9, // 最多可以选择的图片张数，默认9
      sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
      success: function (res) {
        // success
        console.log(res)
        console.log(res.tempFilePaths);
        for (var i = 0; i < res.tempFilePaths.length;i++){
          var sourseata = {
            'types': 2,
            'shuju': res.tempFilePaths[i],
            'dataCome': 'qiantaiA'
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
    that.data.total.push(types);
    var total = that.data.total;
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
          'dataCome': 'qiantaiA'
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
    var that = this;
    // 使页面滚动到底部
    wx.pageScrollTo({
      scrollTop: that.data.scroll_height
    })
    console.log(that.data.scroll_height)
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
    var arr = that.data.totalsourse;
    if (e.currentTarget.dataset.id != undefined) {
      var delarr = that.data.delarr;
      delarr.push(arr[e.currentTarget.dataset.index]);
      that.data.delarr = delarr;
    }
    // that.data.totalsourse.splice(e.currentTarget.dataset.index, 1);
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
  
  
  go_fanhui: function () {
    wx.navigateTo({
      url: '../baoma_bianji/baoma_bianji',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  inputtext:function(e){
    // console.log(e);
    var that = this;
    var arr = that.data.totalsourse;
    arr[e.currentTarget.dataset.arrid].shuju = e.detail.value;
    if (e.currentTarget.dataset.id==undefined){
      // arr[e.currentTarget.dataset.arrid].dataCome = "qiantaiA";
    }else{
      arr[e.currentTarget.dataset.arrid].dataCome = "qiantaiU";
    }
    that.data.totalsourse = arr;
  },
  Return: function () {
    wx.showLoading({
      title: '保存中',
    })
    var that = this;
    console.log(that.data.totalsourse);
    var arr = that.data.totalsourse;
    that.goSave(arr,0);


    //此处进行保存操作
    // wx.setStorageSync("hothuodong", that.data.totalsourse);
    // wx.navigateBack({
    //   delta: 1
    // })
  },
  goSave: function (arr,i){
    var that = this;
    if (i<arr.length){
      if (arr[i].dataCome == "qiantaiU") {
        //去更新，并进行下一条数据 i+1
        wx.request({
          url: app.globalData.myUrl2 + 'minisoftware/tyHouTai/updateCommentDataById.do',
          data: {
            "id": arr[i].id,
            "detail": arr[i].shuju
          },
          dataType: 'json',
          header: { 'content-type': 'application/x-www-form-urlencoded' },
          method: 'post',
          success(e) {
            console.log(e.data);
            that.goSave(arr,i+1);
          }
        })
      } else if (arr[i].dataCome == "qiantaiA") {
        //去添加，并进行下一条数据 i+1
        if (arr[i].types == 1) {
          //图片
          wx.request({
            url: app.globalData.myUrl2 + 'minisoftware/tyHouTai/addCommentData.do',
            data: {
              "khcode": app.globalData.khcode,
              "forginType": "xiaoqu",
              "dataType": "text",
              "detail": arr[i].shuju,
            },
            dataType: 'json',
            header: { 'content-type': 'application/x-www-form-urlencoded' },
            method: 'post',
            success(e) {
              console.log(e.data);
              that.goSave(arr,i + 1);
            }
          })
        }else if (arr[i].types == 2) {
          //图片
          wx.uploadFile({
            url: app.globalData.myUrl2 + 'minisoftware/tyHouTai/uploadPhtot.do',
            filePath: arr[i].shuju,
            name: 'file',
            success: function (res) {
              console.log(res);
              arr[i].shuju = res.data;
              console.log(arr);
              // that.saveSourse(arr, i + 1);
              wx.request({
                url: app.globalData.myUrl2 + 'minisoftware/tyHouTai/addCommentData.do',
                data: {
                  "khcode":app.globalData.khcode ,
                  "forginType": "xiaoqu" ,
                  "dataType": "photo",
                  "detail":arr[i].shuju,
                },
                dataType: 'json',
                header: { 'content-type': 'application/x-www-form-urlencoded' },
                method: 'post',
                success(e) {
                  console.log(e.data);
                  that.goSave(arr,i + 1);
                }
              })
            }
          })

        } else if (arr[i].types == 3) {
          //视频
          wx.uploadFile({
            url: app.globalData.myUrl2 + 'minisoftware/tyHouTai/addCommentData.do',
            filePath: arr[i].shuju,
            name: 'file',
            success: function (res) {
              console.log(res);
              arr[i].shuju = res.data;
              console.log(arr);
              // that.saveSourse(arr, i + 1);
              wx.request({
                url: app.globalData.myUrl2 + 'minisoftware/tyHouTai/addCommentData.do',
                data: {
                  "khcode": app.globalData.khcode,
                  "forginType": "xiaoqu",
                  "dataType": "video",
                  "detail": arr[i].shuju,
                },
                dataType: 'json',
                header: { 'content-type': 'application/x-www-form-urlencoded' },
                method: 'post',
                success(e) {
                  console.log(e.data);
                  that.goSave(arr,i + 1);
                  
                }
              })
            }
          })
        }
      } else if (arr[i].dataCome == "houtai"){
        // that.goSave(arr,i + 1);
        that.goSave(arr, i + 1);

      }
    }else{
      //保存完毕了
      wx.hideLoading();
      wx.showModal({
        title: '提示',
        content: '保存成功',
        showCancel: false,//是否显示取消按钮

        success: function (res) {
          wx.navigateBack({
            delta: -1
          })
        },
      })
      console.log(that.data.delarr);
      var delarr = that.data.delarr;
      for (var j = 0; j < delarr.length;j++){
        wx.request({
          url: app.globalData.myUrl2 + 'minisoftware/tyHouTai/updateCommentDataById.do',
          data: {
            "id": delarr[j].id,
            "state": "-1"
          },
          dataType: 'json',
          header: { 'content-type': 'application/x-www-form-urlencoded' },
          method: 'post',
          success(e) {
            console.log(e.data);
            wx.hideLoading();
            wx.showModal({
              title: '提示',
              content: '保存成功',
              showCancel: false,//是否显示取消按钮
              
              success: function (res) {
                wx.navigateBack({
                  delta:-1
                })
              },
            })
          }
        })
      }
      
    }
    
  },
})