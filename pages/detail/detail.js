// pages/test/test.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
    item: {
      title: 0,
      writer: 'this is a template',
      text: '2016-09-15',
      essayid: 0,
      isCollected:false,
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    var that = this
    const eventChannel = this.getOpenerEventChannel()
    // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
    eventChannel.on('acceptDataFromOpenerPage', function(data) {
      wx.request({
        url: 'http://112.124.37.1:9000/mysql/getbyid',
        dataType:"json",
        data:{
          id:data.data.id
        },
        success(res){
          var temp = that.data.item;
          temp.title=res.data.title;
          temp.writer=res.data.writer;
          temp.text=res.data.text;
          temp.essayid=data.data.id
          temp.isCollected=data.data.isCollected
          that.setData({
            item:temp
          })
        },
        fail(res){
          console.log(res)
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
  Collect(e){
    var that = this
    var temp_item = that.data.item
    temp_item.isCollected = !temp_item.isCollected
    that.setData({
      item:temp_item
    })
    wx.request({
      url: 'http://112.124.37.1:9000/collect/add',
      data:{
        openid:getApp().globalData.openId,
        article:temp_item.essayid
      }
    })
    //提示用户
    wx.showToast({
      title:that.data.item.isCollected ? '收藏成功':'取消收藏',
      icon:'success'
    })
  },
  disCollect(e){
    var that = this
    var temp_item = that.data.item
    temp_item.isCollected = !temp_item.isCollected
    that.setData({
      item:temp_item
    })
    wx.request({
      url: 'http://112.124.37.1:9000/collect/remove',
      data:{
        openid:getApp().globalData.openId,
        article:temp_item.essayid
      }
    })
    //提示用户
    wx.showToast({
      title:that.data.item.isCollected ? '收藏成功':'取消收藏',
      icon:'success'
    })
  },
})