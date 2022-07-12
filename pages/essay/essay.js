// pages/essay/essay.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[{}],
    searchvalue:"",
    image:'<img src="http://112.124.37.1:9000/upload/1637668177231image.jpeg" style="max-width:100%;"  contenteditable="false" width="100%"/>',
    isCollected:false,
    inputData:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    const eventChannel = this.getOpenerEventChannel()
    // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
    eventChannel.on('acceptDataFromOpenerPage', function(data){
      that.setData({
        list:data.data.data
      }) 
    eventChannel.on('acceptinputDataFromOpenerPage',function(data){
      that.setData({
        inputData:data.data
      })
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
  gototest(event){
    
    var that=this
    // wx.request({
    //   url: 'http://112.124.37.1:9000/mysql/getbyid',
    //   dataType:JSON,
    //   data:{
    //     id:59
    //   },
    //   success(res){
    //     console.log(res)
    //   },
    //   fail(res){
    //     console.log(res)
    //   }
    // })
    wx.navigateTo({
      url: '/pages/detail/detail',
      events: {
        // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
        acceptDataFromOpenedPage: function(data) {
        },
      },
      success: function(res) {
        // 通过eventChannel向被打开页面传送数据
        var temp={id:'',isCollected:''}
        temp.id = event.currentTarget.dataset.gid
        temp.isCollected = that.data.list[event.currentTarget.dataset.count].isCollected
        res.eventChannel.emit('acceptDataFromOpenerPage', { data: temp })
      }
    })
  },
  //搜索事件
  search(e){
    var that = this
    var openid=getApp().globalData.openId
    wx.request({
      url: 'http://112.124.37.1:9000/mysql/search',
      dataType:'json',
      data:{
        inform:this.data.searchvalue.value,
        openid:openid
      },
      success(res){
        that.setData({
          list:res.data
        })
      },
      fail(res){

      },
    })
  },
  setsearchvalue(e){
    var that = this;
    this.setData({
      searchvalue:e.detail
    })
  },
  //收藏变色事件
  Collect(e){
    var that = this
    var article_id = e.currentTarget.dataset.id
    var count = e.currentTarget.dataset.count
    var temp_list= that.data.list
    temp_list[count].isCollected = !temp_list[count].isCollected
    that.setData({
      list:temp_list
    })
    wx.request({
      url: 'http://112.124.37.1:9000/collect/add',
      data:{
        openid:getApp().globalData.openId,
        article:article_id
      }
    })
    //提示用户
    wx.showToast({
      title:that.data.list[count].isCollected ? '收藏成功':'取消收藏',
      icon:'success'
    })
  },
  disCollect(e){
    var that = this
    var article_id = e.currentTarget.dataset.id
    var count = e.currentTarget.dataset.count
    var temp_list= that.data.list
    temp_list[count].isCollected = !temp_list[count].isCollected
    that.setData({
      list:temp_list
    })
    wx.request({
      url: 'http://112.124.37.1:9000/collect/remove',
      data:{
        openid:getApp().globalData.openId,
        article:article_id
      }
    })
    //提示用户
    wx.showToast({
      title:that.data.list[count].isCollected ? '收藏成功':'取消收藏',
      icon:'success'
    })
  },
})