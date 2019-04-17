var postData = require('../../data/posts-data.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      post_content: postData.postList
    })
  },

  onTapPost: function(event) {
    var postId = event.currentTarget.dataset.postId
    wx.navigateTo({
      url: './post-detail/post-detail?id=' + postId,
    })
  },

  onSwiperTap: function(event) {
    console.log(event)
    var postId = event.target.dataset.postId
    wx.navigateTo({
      url: './post-detail/post-detail?id=' + postId
    })
  }
})