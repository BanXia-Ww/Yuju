// app.js
// App({
//   onLaunch() {
//     // 展示本地存储能力
//     const logs = wx.getStorageSync('logs') || []
//     logs.unshift(Date.now())
//     wx.setStorageSync('logs', logs)\
//     // 登录
//     wx.login({
//       success: res => {
//         // 发送 res.code 到后台换取 openId, sessionKey, unionId
//       }
//     })
//   },
//   globalData: {
//     userInfo: null
//   }
// })

var util = require('utils/util.js');
App({
  globalData:{
    userInfo: {},
    hasUserInfo: false,
    canIUseGetUserProfile: false,
    openId:"",
    userid:"",
    usericon:""
  },
  onLaunch: function () {
    var that = this
    that.http_session = '';

    if (wx.getUserProfile) {
      this.globalData.canIUseGetUserProfile=true
    }

    wx.login({
      success (res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'http://112.124.37.1:9000/user/newuser',
            data: {
              code: res.code
            },
            success(res){
              console.log(res);
              var App = getApp();
              App.globalData.openId=res.data.openid;
              App.globalData.userid=res.data.id;
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })

  },
  // 提交formid
  form_id_bg: function (formId) {
    console.log('form_id_bg执行了')
    let url = this.httpUrl + '/v1/formid/saveFormid.do';
    this.promise.then(function (http_session) {
      let data = {
        session: http_session,
        // minipid: '10000',
        formId: formId
      }
      util.request(url, 'post', data, '', function (res) {
      })
    })
  },
  onShow: function (even) {
    var e;
    // if (even.referrerInfo.extraData && even.referrerInfo.extraData.foo) {
    //   e = even.referrerInfo.extraData.foo
    // }
    if (e && e.appid) {
      this.appid = e.appid;
    }
  }
})

