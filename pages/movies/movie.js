var util = require('../../utils/util.js')
var app = getApp()
Page({

  data: {
    inTheaters: {},
    comingSoon: {},
    top250: {},
    searchResult: {},
    containerShow: true,
    searchPanelShow: false,
  },
  onLoad: function(options) {
    var inTheatersUrl = app.globalData.doubanBase +
      "/v2/movie/in_theaters" + "?start=0&count=3"
    var comingSoonUrl = app.globalData.doubanBase +
      "/v2/movie/coming_soon" + "?start=0&count=3"
    var top250Url = app.globalData.doubanBase +
      "/v2/movie/top250" + "?start=0&count=3"

    this.getDouBanMovie(inTheatersUrl, 'inTheaters', '正在热映')
    this.getDouBanMovie(comingSoonUrl, 'comingSoon', '即将上映')
    this.getDouBanMovie(top250Url, 'top250', '豆瓣Top250')
  },

  getDouBanMovie: function(url, settledKey, categoryTitle) {
    util.http(url, res => {
      this.processDouBanData(res, settledKey, categoryTitle)
    })
  },

  processDouBanData: function(movie, settledKey, categoryTitle) {
    var movies = []
    movie.subjects.map(item => {
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
    // console.log(movies)
    var readyData = {}
    readyData[settledKey] = {
      movies,
      categoryTitle
    }
    this.setData(readyData)
  },

  onMoreTap: function(event) {
    var category = event.currentTarget.dataset.categoryTitle
    wx.navigateTo({
      url: './more-movie/more-movie?category='+ category
    })
  },

  onMovieTap: function(event) {
    var movieId = event.currentTarget.dataset.movieid
    wx.navigateTo({
      url: './movie-detail/movie-detail?id=' + movieId,
    })
  },

  // 展示 搜索 内容
  onBindFocus: function() {
    this.setData({
      containerShow: false,
      searchPanelShow: true
    })
  },
  // 取消 搜索
  onCancelImgTap: function() {
    this.setData({
      containerShow: true,
      searchPanelShow: false,
      searchResult: {}
    })
  },

  onBindConfirm: function(event) {
    var text = event.detail.value
    var searchUrl = app.globalData.doubanBase + "/v2/movie/search?q=" + text
    this.getDouBanMovie(searchUrl, 'searchResult', '')
  }

  
})