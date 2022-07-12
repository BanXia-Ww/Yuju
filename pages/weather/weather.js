
Page({
  data: {
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

  },
  onLoad: function () {
    var that = this;
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

  setJsonData: function setJsonData(params) {
    var that = this
    that.setData({
      weather: params
    })
    console.log(that.data.weather)
  },

  setCityData: function setJsonData(params) {
    var that = this
    that.setData({
      city: params
    })
    console.log(that.data.city)
  }
})