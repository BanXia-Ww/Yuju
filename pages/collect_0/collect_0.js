// pages/collect_0/collect_0.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[{}],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    const eventChannel = this.getOpenerEventChannel()
    // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
    eventChannel.on('acceptDataFromOpenerPage', function(data){
      wx.request({
        url: 'http://112.124.37.1:9000/collect/view',
        data:{
          openid:getApp().globalData.openId,
          parent:data.data,
        },
        success(e){
          that.setData({
            list:e.data
          })
        }
      })
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

  showdetial:function(event){
    if(event.currentTarget.dataset.datatype==0){
      wx.navigateTo({
        url: '/pages/collect_0/collect_0',
        success(result){
          result.eventChannel.emit('acceptDataFromOpenerPage', { data: event.currentTarget.dataset.id })
        }
      })
    }
    else{
      wx.navigateTo({
        url: '/pages/test/test',
        events: {
          // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
          acceptDataFromOpenedPage: function(data) {
          },
        },
        success: function(res) {
          // 通过eventChannel向被打开页面传送数据
          var temp={id:'',isCollected:''}
          temp.id = event.currentTarget.dataset.datatype
          temp.isCollected = true
          res.eventChannel.emit('acceptDataFromOpenerPage', { data: temp })
        }
      })
    }
      
  }

})