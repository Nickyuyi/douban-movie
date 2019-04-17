Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  onTap: function() {
    // 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面
    wx.switchTab({
      url: '../posts/post',
    })
  }
  
})