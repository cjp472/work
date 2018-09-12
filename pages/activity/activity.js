
var app = getApp();
// 手机的宽度
var windowWRPX = 750
// 拖动时候的 pageX
var pageX = 0
// 拖动时候的 pageY
var pageY = 0

var pixelRatio = wx.getSystemInfoSync().pixelRatio

// 调整大小时候的 pageX
var sizeConfPageX = 0
// 调整大小时候的 pageY
var sizeConfPageY = 0

var initDragCutW = 0
var initDragCutL = 0
var initDragCutH = 0
var initDragCutT = 0
var qualityWidth = 750
var innerAspectRadio = 1
// 移动时 手势位移与 实际元素位移的比
var dragScaleP = 2
Page({

  /**
   * 页面的初始数据
   */
  data: {
    biaoti:'',
    fabu:false,
    imageList: [

      'http://weixin.forindata.com/pushInfo/sucai/getsucai.action?fileName=houtia_XCX/pig_jia.png'
    ],
       img_show: true,
    video_src: null,
    returnImage: '',
    isShowImg: false,
    // 初始化的宽高
    cropperInitW: windowWRPX,
    cropperInitH: windowWRPX,
    // 动态的宽高
    cropperW: windowWRPX,
    cropperH: windowWRPX,
    // 动态的left top值
    cropperL: 0,
    cropperT: 0,

    // 图片缩放值
    scaleP: 0,
    imageW: 0,
    imageH: 0,

    // 裁剪框 宽高
    cutW: 375,
    cutH: 190,
    cutL: 0,
    cutT: 0,
    qualityWidth: qualityWidth,
    innerAspectRadio: innerAspectRadio,

    //设置剪裁区域是否出现1，3:代表不出现，2代表出现
    isExit: '1'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.removeStorageSync("hothuodong")
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
    var arr =wx.getStorageSync("hothuodong");
    console.log("onShow");
    console.log(arr);
    if(arr){
      console.log(arr);
    }
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
  go_i: function () {
    wx.navigateTo({
      url: '../curriculum_bianji/curriculum_bianji',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  go_xiangqing: function () {
    console.log(1)
    wx.navigateTo({
      url: '../edit_view/edit_view',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  biaoti:function(e){
    this.data.biaoti = e.detail.value
  },
 
 
  guanbi: function () {
    this.setData({
      imageList: ['http://weixin.forindata.com/pushInfo/sucai/getsucai.action?fileName=houtia_XCX/pig_jia.png'],
    })
    this.setData({
      img_show: true,
    })
  },
 
  chooseImage: function () {
    var that = this
    var i = that.data.imageList
    console.log(i.length)
    wx.chooseImage({
      count: 1,
      success: function (res) {
        that.setData({
          imageSrc: res.tempFilePaths[0],
          isExit: '2',
                 img_show: false,
        })
        that.loadImage();
      }
    })
  },





  g: function (e) {
    // 获取 类似于for的i
    var index = e.currentTarget.dataset.index;
    var that = this;
    //that.data.imageList 或许他现有的数组
    //.splice删除 i位子的字符串
    that.data.imageList.splice(index, 1)
    var shuzu = that.data.imageList
    // 赋值给现在的数组
    that.setData({
      imageList: shuzu,
    });
  },
  loadImage: function () {
    var _this = this
    wx.showLoading({
      title: '图片加载中...',
    })
    wx.getImageInfo({
      src: _this.data.imageSrc,
      success: function success(res) {
        innerAspectRadio = res.width / res.height;
        // 根据图片的宽高显示不同的效果   保证图片可以正常显示
        if (innerAspectRadio >= 1) {
          _this.setData({
            cropperW: windowWRPX,
            cropperH: windowWRPX / innerAspectRadio,
            // 初始化left right
            cropperL: Math.ceil((windowWRPX - windowWRPX) / 2),
            cropperT: Math.ceil((windowWRPX - windowWRPX / innerAspectRadio) / 2),
            // 裁剪框  宽高  
            // cutW: windowWRPX - 200,
            // cutH: windowWRPX / innerAspectRadio - 200,
            cutW: 750 / innerAspectRadio,
            cutH: 380 / innerAspectRadio,
            cutL: Math.ceil((windowWRPX - windowWRPX + 200) / 2),
            cutT: Math.ceil((windowWRPX / innerAspectRadio - (windowWRPX / innerAspectRadio - 200)) / 2),
            // 图片缩放值
            scaleP: res.width * pixelRatio / windowWRPX,
            // 图片原始宽度 rpx
            imageW: res.width * pixelRatio,
            imageH: res.height * pixelRatio,

            innerAspectRadio: innerAspectRadio
          })
        } else {
          _this.setData({
            cropperW: windowWRPX * innerAspectRadio,
            cropperH: windowWRPX,
            // 初始化left right
            cropperL: Math.ceil((windowWRPX - windowWRPX * innerAspectRadio) / 2),
            cropperT: Math.ceil((windowWRPX - windowWRPX) / 2),
            // 裁剪框的宽高
            cutW: 750 * innerAspectRadio,
            cutH: 380 * innerAspectRadio,
            cutL: Math.ceil((windowWRPX * innerAspectRadio - (windowWRPX * innerAspectRadio - 50)) / 2),
            cutT: Math.ceil((windowWRPX - 200) / 2),
            // 图片缩放值
            scaleP: res.width * pixelRatio / windowWRPX,
            // 图片原始宽度 rpx
            imageW: res.width * pixelRatio,
            imageH: res.height * pixelRatio,

            innerAspectRadio: innerAspectRadio
          })
        }
        _this.setData({
          isShowImg: true
        })
        wx.hideLoading()
      }
    })
  },
  // 设置大小的时候触发的touchStart事件
  dragStart(e) {
    var _this = this
    sizeConfPageX = e.touches[0].pageX
    sizeConfPageY = e.touches[0].pageY
    initDragCutW = _this.data.cutW
    initDragCutL = _this.data.cutL
    initDragCutT = _this.data.cutT
    initDragCutH = _this.data.cutH
  },

  // 设置大小的时候触发的touchMove事件
  dragMove(e) {
    var _this = this;
    var dragLengthX = (sizeConfPageX - e.touches[0].pageX) * dragScaleP
    var dragLengthY = (sizeConfPageY - e.touches[0].pageY) * dragScaleP
    if (initDragCutH >= dragLengthY && initDragCutW >= dragLengthX) {
      if ((dragLengthY < 0 && _this.data.cropperH > initDragCutT + _this.data.cutH) || (dragLengthY > 0)) {
        this.setData({
          cutH: initDragCutH - dragLengthY,
          cutW: (initDragCutH - dragLengthY) * 750 / 380
        })
      } else if ((dragLengthX < 0 && _this.data.cropperW > initDragCutL + _this.data.cutW) || (dragLengthX > 0)) {
        this.setData({
          cutW: initDragCutW - dragLengthX,
          cutH: (initDragCutW - dragLengthX) * 380 / 750
        })
      } else {
        return
      }
    }
  },
  // 拖动时候触发的touchStart事件
  contentStartMove(e) {
    pageX = e.touches[0].pageX
    pageY = e.touches[0].pageY
  },
  // 拖动时候触发的touchMove事件
  contentMoveing(e) {
    var _this = this
    // _this.data.cutL + (e.touches[0].pageX - pageX)
    // console.log(e.touches[0].pageX)
    // console.log(e.touches[0].pageX - pageX)
    var dragLengthX = (pageX - e.touches[0].pageX) * dragScaleP
    var dragLengthY = (pageY - e.touches[0].pageY) * dragScaleP
    var minX = Math.max(_this.data.cutL - (dragLengthX), 0)
    var minY = Math.max(_this.data.cutT - (dragLengthY), 0)
    var maxX = _this.data.cropperW - _this.data.cutW
    var maxY = _this.data.cropperH - _this.data.cutH
    this.setData({
      cutL: Math.min(maxX, minX),
      cutT: Math.min(maxY, minY),
    })
    console.log(`${maxX} ----- ${minX}`)
    pageX = e.touches[0].pageX
    pageY = e.touches[0].pageY
  },
  // 获取图片
  getImageInfo() {
    var _this = this
    wx.showLoading({
      title: '图片生成中...',
    })
    // 将图片写入画布
    const ctx = wx.createCanvasContext('myCanvas')
    ctx.drawImage(_this.data.imageSrc, 0, 0, qualityWidth, qualityWidth / innerAspectRadio);
    ctx.draw(true, () => {
      // 获取画布要裁剪的位置和宽度   均为百分比 * 画布中图片的宽度    保证了在微信小程序中裁剪的图片模糊  位置不对的问题 canvasT = (_this.data.cutT / _this.data.cropperH) * (_this.data.imageH / pixelRatio)
      var canvasW = (_this.data.cutW / _this.data.cropperW) * qualityWidth
      var canvasH = (_this.data.cutH / _this.data.cropperH) * qualityWidth / innerAspectRadio
      var canvasL = (_this.data.cutL / _this.data.cropperW) * qualityWidth
      var canvasT = (_this.data.cutT / _this.data.cropperH) * qualityWidth / innerAspectRadio
      console.log(`canvasW:${canvasW} --- canvasH: ${canvasH} --- canvasL: ${canvasL} --- canvasT: ${canvasT} -------- _this.data.imageW: ${_this.data.imageW}  ------- _this.data.imageH: ${_this.data.imageH} ---- pixelRatio ${pixelRatio}`)
      wx.canvasToTempFilePath({
        x: canvasL,
        y: canvasT,
        width: canvasW,
        height: canvasH,
        destWidth: canvasW,
        destHeight: canvasH,
        quality: 0.5,
        canvasId: 'myCanvas',
        success: function (res) {
          wx.hideLoading()
          console.log(res.tempFilePath);
          _this.data.imageList.splice(0, 1)
          _this.data.imageList.push(res.tempFilePath);

          var imageList = _this.data.imageList
          _this.setData({
            isExit: '3',
            imageList: imageList,
            img_show: false,
          })
          // 成功获得地址的地方
          console.log(res.tempFilePath)
        }
      })
    })
  },
  getnone: function (e) {
    this.setData({
      isExit: '1'
    })
  },
  Close: function (e) {
    var index = e.currentTarget.dataset.index;
    var that = this;
    wx.showModal({
      title: '提示',
      content: '确定删除图片?',
      success: function (res) {
        if (res.confirm) {
          // 获取 类似于for的i

          //that.data.imageList 或许他现有的数组
          //.splice删除 i位子的字符串
          that.data.imageList.splice(index, 1)
          var shuzu = that.data.imageList
          // 赋值给现在的数组
          that.setData({
            imageList: shuzu,
          });
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  Return: function () {
    var that = this;
    that.setData({
      fabu: true,
    })
    console.log(that.data.imageList);
    if (that.data.biaoti == '') {
      wx.showToast({
        title: '请输入标题',
      })
      that.setData({
        fabu: false,
      })
    } else if (that.data.imageList[0] == "http://weixin.forindata.com/pushInfo/sucai/getsucai.action?fileName=houtia_XCX/pig_jia.png") {
      wx.showToast({
        title: '请选择图片',
      })
      that.setData({
        fabu: false,
      })
    }else{
      //上传资料中
      var arr = wx.getStorageSync("hothuodong");
      wx.showLoading({
        title: '发布中',
      })
      that.saveSourse(arr,0);
    }

    // wx.navigateBack({
    //   delta: 1
    // })
  },
  saveSourse: function (arr,i){
    var that = this;
    
    if (i < arr.length){
      that.goUpload(arr,i);
    }else{
      that.gosave(arr);
    }
    
  },
  goUpload: function (arr, i){
    var that = this;
    if (arr[i].types == 2){
      //图片
      wx.uploadFile({
        url: app.globalData.myUrl2 + 'minisoftware/tyHouTai/uploadPhtot.do',
        filePath: arr[i].shuju,
        name: 'file',
        success: function (res) {
          console.log(res);
          arr[i].shuju = res.data;
          console.log(arr);
          that.saveSourse(arr,i+1);
        }
      })

    } else if (arr[i].types == 3){
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
    } else if (arr[i].types == 1) {
      that.saveSourse(arr, i + 1);
    }
  },
  gosave: function (arr){
    console.log("gosave");
    var that = this;
    console.log(that.data.biaoti);
    console.log(that.data.imageList[0]);
    console.log(arr);
    if(arr == ''){
      arr = [];
    }
    wx.uploadFile({
      url: app.globalData.myUrl2 + 'minisoftware/tyHouTai/uploadPhtot.do',
      filePath: that.data.imageList[0],
      name: 'file',
      success: function (res) {
        console.log(res);
        //开始保存数据
        // var that = this;
        wx.request({
          url: app.globalData.myUrl2 + 'minisoftware/tyHouTai/saveHotHuoDong.do',
          data: {
            "khcode": app.globalData.khcode,
            "title": that.data.biaoti,
            "fengmian": res.data,
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



      }
    })


  }

})