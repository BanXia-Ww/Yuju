Page({
  data: {
    isAuth: false,
    src: ''
  },
  onLoad() {
    const _this = this
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.camera']) {
          // 用户已经授权
          _this.setData({
            isAuth: true
          })
        } else {
          // 用户还没有授权，向用户发起授权请求
          wx.authorize({
            scope: 'scope.camera',
            success() { // 用户同意授权
              _this.setData({
                isAuth: true
              })
            },
            fail() { // 用户不同意授权
              _this.openSetting().then(res => {
                _this.setData({
                  isAuth: true
                })
              })
            }
          })
        }
      },
      fail: res => {
        console.log('获取用户授权信息失败')
      }
    })
  },
  //跳转到“我的”页面，查看历史识别
  gotomine(){
    wx.switchTab({
      url: '/pages/mine/mine'
    })
  },
  //返回键，跳转到首页
  /*
  gotoindex(){
    wx.switchTab({
      url: '/pages/index/index',
    })
  },
  */
 
  // 打开授权设置界面
  openSetting() {
    const _this = this
    let promise = new Promise((resolve, reject) => {
      wx.showModal({
        title: '授权',
        content: '请先授权获取摄像头权限',
        success(res) {
          if (res.confirm) {
            wx.openSetting({
              success(res) {
                if (res.authSetting['scope.camera']) { // 用户打开了授权开关
                  resolve(true)
                } else { // 用户没有打开授权开关， 继续打开设置页面
                  _this.openSetting().then(res => {
                    resolve(true)
                  })
                }
              },
              fail(res) {
                console.log(res)
              }
            })
          } else if (res.cancel) {
            _this.openSetting().then(res => {
              resolve(true)
            })
          }
        }
      })
    })
    return promise;
  },

  takePhoto() {
    const ctx = wx.createCameraContext()
    ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        console.log(res)
        this.setData({
          src: res.tempImagePath
        })
        wx.previewImage({
          current: res.tempImagePath, // 当前显示图片的http链接
          urls: [res.tempImagePath] // 需要预览的图片http链接列表
        })
      }
    })
  },

  uploadImage (path){
    wx.uploadFile({
      filePath: path,
      name: 'name',
      url: 'http://localhost:9000/',
      success(res){

      },
    })
  },

  takeLocalPhoto() {
    wx.chooseImage({
      count: 1,
      sizeType:['original','compressed'],
      sourceType:['album','camera'],
      success (res) {
        const tempFilePaths = res.tempFilePaths
      }
    })
  }
})
