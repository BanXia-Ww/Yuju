// pages/essaylist/essaylist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    /*
       inputValue  保存用户在输入框中输入的文字
       historyList数组  用来储存每次的搜索
    */
    inputValue: "",
    historyList: [],
    showHistory: true,
    zhuanjia:{
      url1:"cloud://cloud1-9gtut834de7141af.636c-cloud1-9gtut834de7141af-1310463563/zj1.jpg",
      name1:"翁教授",
      url2:"cloud://cloud1-9gtut834de7141af.636c-cloud1-9gtut834de7141af-1310463563/zj2.jpg",
      name2:"赵教授",
      url3:"cloud://cloud1-9gtut834de7141af.636c-cloud1-9gtut834de7141af-1310463563/zj3.jpg",
      name3:"胡教授",
      url4:"cloud://cloud1-9gtut834de7141af.636c-cloud1-9gtut834de7141af-1310463563/zj4.jpg",
      name4:"林教授",
    },
    bch:{
      url1:"cloud://cloud1-9gtut834de7141af.636c-cloud1-9gtut834de7141af-1310463563/bch1.jpg",
      name1:"警惕柑橘黄龙病！一起来全面了解黄龙病",
      message1:"一、柑橘黄龙病的定义及危害：柑橘黄龙病是一种寄生于韧皮部筛管和薄壁细胞组织中的",
      url2:"cloud://cloud1-9gtut834de7141af.636c-cloud1-9gtut834de7141af-1310463563/bch2.jpg",
      name2:"柑橘炭疽病发生不用慌，了解如何防治才是当前应该做的",
      message2:"炭疽病是柑橘生长周期中比较容易感染的一种真菌性病害，尤其是在高温多湿的环境条件下。"
    },
    zz:{
      url1:"cloud://cloud1-9gtut834de7141af.636c-cloud1-9gtut834de7141af-1310463563/zz1.jpg",
      name1:"柑橘缺锌症",
      message1:"柑橘缺锌症是一种由于缺锌所造成的叶片不良生长状态。症状新梢叶片随着叶片成熟，叶脉间出现黄色斑点",
      url2:"cloud://cloud1-9gtut834de7141af.636c-cloud1-9gtut834de7141af-1310463563/zz2.jpg",
      name2:"了解如何种植才是当前应该做的",
      message2:"炭疽病是柑橘生长周期中比较容易感染的一种真菌性病害，尤其是在高温多湿的环境条件下。"
    }
  },
  //简介显示和隐藏
  onVisibility:function(word){
   var that = this;
   that.setData({
       show:that.data.show ? false : true
     })
   },
  // 读取输入值
  inputText: function (e) {
    this.setData({
      inputValue: e.detail.value
    })
  },
  //把用户输入的值保存在inputValue中
  doSearch: function (e) {
    var inputValue = this.data.inputValue;
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
            result.eventChannel.emit('acceptDataFromOpenerPage', { data: res})
            result.eventChannel.emit('acceptinputDataFromOpenerPage', { data: inputValue})
          },
          fail(res){

          },
        })
        // 通过eventChannel向被打开页面传送数据
        
      }
    })
    
    
    
    
    var historyList = this.data.historyList || [];
    if (historyList.length < 5 && inputValue !== "") {
      historyList.unshift(inputValue);
    } else if (historyList.length >= 5 && inputValue !== "") {
      historyList.unshift(inputValue);
      historyList.pop();
    };
    wx.setStorageSync('historyList', historyList);
  },
  // 隐藏搜索历史框
  hideHistory: function () {
    this.setData({
      showHistory: !this.data.showHistory
    });
  },

  // 显示搜索历史框
  showHistory: function () {
    this.setData({
      showHistory: !this.data.showHistory,
      searchRecord: wx.getStorageSync('searchRecord') || []
    })
  },

  clearHistory: function () {
    wx.clearStorageSync()
    this.setData({
      searchRecord: []
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  }
})