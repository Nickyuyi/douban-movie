var postData = require('../../../data/posts-data.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id
    // 数据绑定到 data
    this.setData({
      post_content: postData.postList[id],
      postId: id
    })
    // 读取本地 的collections 如果有 获取当前collection状态 绑定数据 如果没有则创建
    var collections = wx.getStorageSync('collections')
    if (collections) {
      var curCollection = collections[id] || false
      this.setData({curCollection})
    } else {
      collections = {}
      wx.setStorageSync('collections', collections)
      this.setData({curCollection: false})
    }
  },
  onCollection: function () {
    const {postId} = this.data
    // 读取 本地的collections  获取当前的collection状态，取反，再绑定数据，存入本地
    var collections = wx.getStorageSync('collections')
    var curCollection = !collections[postId]
    // toast
    wx.showToast({
      title: curCollection ? '收藏成功' : '取消收藏成功',
      success: () => {
        this.setData({ curCollection })
        collections[postId] = curCollection
        wx.setStorageSync('collections', collections)
      }
    })
  },
  onShare: function () {
    wx.showActionSheet({
      itemList: [
        '分享给微信好友',
        "分享到朋友圈",
        "分享到QQ",
        "分享到微博"
      ],
      itemColor: '#405f80',
      success: (res) => {
        console.log(res)
      }
    })
  }

})