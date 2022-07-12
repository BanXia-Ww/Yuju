// pages/mine/mine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //tab变量
    currentData: 0,
    //是否收藏
    isCollected:false,
    //收藏夹内容横向滚动相关数值的设定
    toView:'red',
    scrollTop:10,
    folder:[{}],
    article:[{}],
    //用户头像昵称
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName') // 如需尝试获取用户信息可改为false
  },
  //获取用户信息
  getUserProfile() {
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
  //tab跳转
  changeTab: function(e){
    const that = this;
    console.log(e.currentTarget.dataset.current);
    that.setData({
      currentData:e.currentTarget.dataset.current
    })
  },
  //获取用户信息
  getUserInfo() {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  //收藏夹内容横向滚动相关数值的设定
  upper:function(e){
    console.log(e)
  },
  lower:function(e){
    console.log(e)
  },
  scroll:function(e){
    
  },
  tap:function(e){
    for(var i=0;i<this.onPullDownRefresh.length;++i){
      if(order[i]===this.data.toView){
        this.setData({
          toView:order[i+1]
        })
        break
      }
    }
  },
  tapMove:function(e){
    this.setData({
      scrollTop:this.data.scrollTop+10
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
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
    var App = getApp()
    var that = this
    wx.request({
      url: 'http://112.124.37.1:9000/collect/view',
      data:{
        openid:App.globalData.openId
      },
      success(e){
        console.log(e);
        that.setData({
          folder:e.data[0],
          article:e.data[1]
        })
      }
    })
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
  gotodoc(){
    wx.navigateTo({
      url: '/pages/document/document',
    })
  },

  //跳转到新建收藏夹页面
  gotoadd(){
    wx.navigateTo({
      url: '/pages/add/add',
    })
  },

  //跳转到文章详情页面
  gototest(){
    wx.navigateTo({
      url: '/pages/detail/detail',
    })
  },
  
  //收藏功能
  handleCollection(){
    let isCollected = !this.data.isCollected
    this.setData({
      isCollected
    })
    //提示用户
    wx.showToast({
      title:isCollected ? '收藏成功':'取消收藏',
      icon:'success'
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  login: function () {

    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        getApp().globalData.userInfo=res.userInfo
        getApp().globalData.hasUserInfo=true
        console.log(getApp().globalData.userInfo,getApp().globalData.hasUserInfo)
      }
    })
  },

  jumpCollect:function(){
    wx.navigateTo({
      url: '/pages/collect_0/collect_0',
      success(result){
        result.eventChannel.emit('acceptDataFromOpenerPage', { data: 0 })
      }
    })
  },

  gotocollect:function(event){
    var that=this
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
        temp.isCollected = true
        res.eventChannel.emit('acceptDataFromOpenerPage', { data: temp })
      }
    })
  }
})