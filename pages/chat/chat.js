// pages/chat/chat.js
var app = getApp();
var utils = require("../../utils/util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    messageList: [],
    input: null,
    openid: null,
    target_openid: "123",
    imgUrl:'cloud://cloud1-9gtut834de7141af.636c-cloud1-9gtut834de7141af-1310463563/yezi.jpg'  //图片路径
  },
  onPullDownRefresh: function () {
    var App = getApp()
    var that = this
    wx.request({
      url: 'http://112.124.37.1:9000/chat/view',
      data: {
        from: App.globalData.openId,
        to: that.data.target_openid
      },
      success(res) {
        console.log(res);

        that.setData({
          messageList: res.data
        })
      }
    })

  },
  // 选择图片并把图片保存 
  upimg1: function () {
    var App = getApp()
    var that = this;
    wx.chooseMedia({
      count: 1,
      mediaType:"image",
      success: chooseResult => {
        console.log(chooseResult);
        
        wx.uploadFile({
          url: 'http://112.124.37.1:9000/upload', //提交信息至后台 http://112.124.37.1:9000/chat/view
          filePath: chooseResult.tempFiles[0].tempFilePath,
          name: 'myFile', //文件对应的参数名字(key)
          success: function (res) {
            var image = res.data;
            var imageJson = JSON.parse(image);
            
            wx.request({
              url: 'http://112.124.37.1:9000/chat/send',
              data: {
                from: App.globalData.openId,
                to: that.data.target_openid,
                type: 1,
                text: imageJson.data[0].url
              },
              success(res) {
                console.log(res);
                that.setData({
                  messageList: that.data.messageList.concat(res.data),
                  
                })
              }
            })
          }
        })
      }
    })
  },

  upvideo: function () {
    var App = getApp()
    var that = this;
    wx.chooseMedia({
      count: 1,
      mediaType:"video",
      success: chooseResult => {
        console.log(chooseResult);
        
        wx.uploadFile({
          url: 'http://112.124.37.1:9000/upload', //提交信息至后台
          filePath: chooseResult.tempFiles[0].tempFilePath,
          name: 'myFile', //文件对应的参数名字(key)
          success: function (res) {
            console.log(res);
            var video = res.data;
            var videoJson = JSON.parse(video);
            
            wx.request({
              url: 'http://112.124.37.1:9000/chat/send',
              data: {
                from: App.globalData.openId,
                to: that.data.target_openid,
                type: 2,
                text: videoJson.data[0].url
              },
              success(res) {
                console.log(res);
                that.setData({
                  messageList: that.data.messageList.concat(res.data),
                  
                })
              }
            })
          }
        })
      }
    })
  },
  //图片点击预览事件  
  clickImg: function (e) {
    var imgUrl = e.currentTarget.dataset.imgurl;
    wx.previewImage({
      urls: [imgUrl], //需要预览的图片http链接列表，注意是数组
      current: '', // 当前显示图片的http链接，默认是第一个
      success: function (res) {},
      fail: function (res) {},
      complete: function (res) {},
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var App = getApp()
    var that = this
    that.setData({
      openid: getApp().globalData.openId
    })

    wx.request({
      url: 'http://112.124.37.1:9000/chat/view',
      data: {
        from: App.globalData.openId,
        to: that.data.target_openid
      },
      success(res) {
        console.log(res);

        that.setData({
          messageList: res.data
        })
      }
    })


    // wx.getStorage({
    //   key: 'OPENID',
    //   success: function (res) {
    //     _this.setData({
    //       openid: res.data
    //     })
    //   },
    // })
    // var _this = this;
    // //建立连接
    // wx.connectSocket({
    //   url: "wss://www.chat.blingfeng.cn/websocket/" + _this.data.openid + "/" + options.to,
    // })

    // //连接成功
    // wx.onSocketOpen(function () {
    //   console.log('连接成功');
    // })
    // wx.onSocketMessage(function (res) {

    //   var list = [];
    //   list = _this.data.messageList;
    //   var _data = JSON.parse(res.data);

    //   list.push(_data);
    //   console.log(list)
    //   _this.setData({
    //     messageList: list
    //   })

    // })
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
  send: function () {
    var App = getApp()
    var that = this;
    if (that.data.input) {
      // wx.sendSocketMessage({
      //   data: _this.data.input,
      // })
      wx.request({
        url: 'http://112.124.37.1:9000/chat/send',
        data: {
          from: App.globalData.openId,
          to: that.data.target_openid,
          type: 0,
          text: that.data.input
        },
        success(res) {
          console.log(res);
          that.setData({
            messageList: that.data.messageList.concat(res.data),
            input: null
          })
        }
      })
    }
  },
  bindChange: function (res) {
    this.setData({
      input: res.detail.value
    })
  },
  // back: function () {
  //   wx.closeSocket();
  //   console.log('连接断开');
  // }
})