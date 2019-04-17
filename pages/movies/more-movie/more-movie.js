// pages/movies/more-movie/more-movie.js
var app = getApp()
var util = require('../../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    movies: {},
    requestUrl: "",
    totalCount: 0,
    isEmpty: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var category = options.category
    this.setData({ navigationTitle: category})
    var dataUrl = ""

    switch (category) {
      case "正在热映":
        dataUrl = app.globalData.doubanBase +
          "/v2/movie/in_theaters"
        break;
      case "即将上映":
        dataUrl = app.globalData.doubanBase +
          "/v2/movie/coming_soon"
        break;
      case "豆瓣Top250":
        dataUrl = app.globalData.doubanBase + "/v2/movie/top250"
        break;
    }
    // 初始 请求 路径
    this.setData({ requestUrl: dataUrl})
    util.http(dataUrl, this.processDoubanData)
  },

  processDoubanData: function (moviesData) {
    var movies = []
    moviesData.subjects.map(item => {
      // 处理 评分
      var starsArr = util.convertToStarsArray(item.rating.stars)
      // console.log(item, starsArr)
      // 处理 标题
      var title = item.title
      if (title.length > 6) {
        title = title.slice(0, 6) + '...'
      }
      var temp = {
        title: title,
        average: item.rating.average,
        starsArr,
        coverageUrl: item.images.large,
        movieId: item.id
      }
      movies.push(temp)
    })

    var totalMovies = {}
    this.data.totalCount += 20
    // 将 原有 数据 和新数据 合并到一起
    if (!this.data.isEmpty) {
      totalMovies = this.data.movies.concat(movies)
    } else {
      totalMovies = movies
      this.setData({isEmpty: false})
    }
    this.setData({ movies: totalMovies })
    wx.hideNavigationBarLoading()
    wx.stopPullDownRefresh()
  },
  // 下拉 加载 更多
  onScrollLower: function () {
    var nextUrl = this.data.requestUrl +
      "?start=" + this.data.totalCount + "&count=20";
    util.http(nextUrl, this.processDoubanData)
    wx.showNavigationBarLoading()
  },
  // 上拉 刷新
  onScrollUpper: function () {
    console.log('上拉')
    wx.startPullDownRefresh({
      success: () => {
        // 重置 数据， 重新请求
        this.setData({
          totalCount: 0,
          isEmpty: true
        })
        util.http(this.data.requestUrl, this.processDoubanData)
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({
      title: this.data.navigationTitle,
    })
  }
})