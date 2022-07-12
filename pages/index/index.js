// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName'), // 如需尝试获取用户信息可改为false

    indicatorDots:true,
    autoplay:false,
    interval:5000,
    duration:3000,
    imgUrls:[
     "/icon/1.jpg",
     "/icon/1.jpg",
     "/icon/1.jpg",
    ],
    /*
    city:{
      "name": "",//地区/城市名称
      "id": "",//地区/城市ID
      "lat": "",//地区/城市纬度
      "lon": "",//地区/城市经度
      "adm2": "",//地区/城市的上级行政区划名称
      "adm1": "",//地区/城市所属一级行政区域
      "country": "",//地区/城市所属国家名称
      "tz": "",//地区/城市所在时区
      "utcOffset": "",//地区/城市目前与UTC时间偏移的小时数，参考详细说明
      "isDst": "",//地区/城市是否当前处于夏令时   1 表示当前处于夏令时  0 表示当前不是夏令时
      "type": "",//地区/城市的属性
      "rank": "",//	地区评分
      "fxLink": ""//该地区的天气预报网页链接，便于嵌入你的网站或应用
    },
    weather: {
      "obsTime": "", //数据观测时间
      "temp": "", //温度，默认单位：摄氏度
      "feelsLike": "", //体感温度，默认单位：摄氏度
      "icon": "", //天气状况和图标的代码，图标可通过天气状况和图标下载
      "text": "", //天气状况的文字描述，包括阴晴雨雪等天气状态的描述
      "wind360": "", //风向360角度
      "windDir": "", //风向
      "windScale": "", //风力等级
      "windSpeed": "", //风速，公里/小时
      "humidity": "", //相对湿度，百分比数值
      "precip": "", //当前小时累计降水量，默认单位：毫米
      "pressure": "", //大气压强，默认单位：百帕
      "vis": "", //能见度，默认单位：公里
      "cloud": "", //云量，百分比数值
      "dew": "" //露点温度
    }
    */
  },
  gotopic(){
    wx.navigateTo({
      url: '/pages/pic/pic',
    })
  },
  gotochoose(){
    wx.navigateTo({
      url: '/pages/choose/choose',
    })
  },
  gotoessay(){
    wx.navigateTo({
      url: '/pages/search/search',
      events: {
        // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
        acceptDataFromOpenedPage: function(data) {
        },
      },
      success: function(result) {
        
        // wx.request({
        //   url: 'http://112.124.37.1:9000/mysql/search',
        //   dataType:'json',
        //   data:{
        //     inform:'',
        //     openid:getApp().globalData.openId
        //   },
        //   success(res){
        //     result.eventChannel.emit('acceptDataFromOpenerPage', { data: res })
        //   },
        //   fail(res){

        //   },
        // })
        // 通过eventChannel向被打开页面传送数据
        
      }
    })
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad() {
    var that = this
    

    wx.getLocation({
      type: "wgs84",
      success(res) {
        wx.request({
          url: 'https://geoapi.qweather.com/v2/city/lookup?',
          data:{
            key: "150a5c60083e495998e13b4ff61f137e",
            location: res.longitude.toFixed(2) + "," + res.latitude.toFixed(2)},
          success(res){
            that.setCityData(res.data.location[0])
          }
        })

        wx.request({
          url: 'https://devapi.qweather.com/v7/weather/now?',
          data: {
            key: "150a5c60083e495998e13b4ff61f137e",
            location: res.longitude.toFixed(2) + "," + res.latitude.toFixed(2)
          },
          success(res) {
            that.setJsonData(res.data.now)
          }
        })
      }
    })
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  setJsonData: function setJsonData(params) {
    var that = this
    that.setData({
      weather: params
    })
  },

  setCityData: function setJsonData(params) {
    var that = this
    that.setData({
      city: params
    })
  },

  doSearch: function (e) {
    var inputValue = "";
    wx.navigateTo({
      url: '/pages/essay/essay',
      events: {
        // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
        acceptDataFromOpenedPage: function(data) {
        },
      },
      success: function(result) {
        wx.request({
          url: 'http://112.124.37.1:9000/mysql/search',
          dataType:'json',
          data:{
            inform:inputValue,
            openid:getApp().globalData.openId
          },
          success(res){
            result.eventChannel.emit('acceptDataFromOpenerPage', { data: res })
          },
          fail(res){

          },
        })
        // 通过eventChannel向被打开页面传送数据
        
      }
    })
  }
})
