// pages/picedit/picedit.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  touchStart: function (e) {
    // 开始画图，隐藏所有的操作栏
    this.setData({
      color: false,
      canvasHeightLen: 0,
      prevPosition: [e.touches[0].x, e.touches[0].y],
      movePosition: [e.touches[0].x, e.touches[0].y],
    });
    const { r, g, b } = this.data;
    let color = `rgb(${r},${g},${b})`;
    let width = this.data.w;
    startTouch(e, color, width, this.data.masaic);
  },

  touchMove: function (e) {
    const { r, g, b, prevPosition, movePosition, eraser, w, } = this.data;
    // 触摸，绘制中。。
    const ctx = wx.createCanvasContext('myCanvas');
    // 画笔的颜色
    let color = `rgb(${r},${g},${b})`;
    let width = w;
    if (eraser) {
      ctx.clearRect(e.touches[0].x, e.touches[0].y, 30, 30);
      ctx.draw();
      return;
    }

    const [pX, pY, cX, cY] = [...prevPosition, e.touches[0].x, e.touches[0].y];
    const drawPosition = [pX, pY, (cX + pX) / 2, (cY + pY) / 2];
    if (this.data.masaic == true) { 
      ctx.setFillStyle('red')
      ctx.fillRect(e.touches[0].x, e.touches[0].y, 10, 10)
      ctx.fillRect(e.touches[0].x + 10, e.touches[0].y + 10, 10, 10)
      ctx.setFillStyle('pink')
      ctx.fillRect(e.touches[0].x + 10, e.touches[0].y, 10, 10)
      ctx.fillRect(e.touches[0].x, e.touches[0].y + 10, 10, 10)
      ctx.draw(true)
    }else {
      ctx.setLineWidth(width);
      ctx.setStrokeStyle(color);

      ctx.setLineCap('round');
      ctx.setLineJoin('round');
      ctx.moveTo(...movePosition);
      ctx.quadraticCurveTo(...drawPosition);
      ctx.stroke();
      ctx.draw(true);
    }

    recordPointsFun(movePosition, drawPosition)	
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})