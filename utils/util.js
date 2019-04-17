// 豆瓣返回的 stars 是 '35'这种形式，我们 转换为 [1,0,1,0] 这种数组的形式，好在
// 页面 上区分 什么时候用 实心图片，什么时候用空心 
function convertToStarsArray(stars) {
  var starsNum = stars.slice(0,1)
  var starsArr = []
  for (var i = 1; i <=5; i++ ) {
    if (i <= starsNum) {
      starsArr.push('1')
    } else {
      starsArr.push('0')
    }
  }
  return starsArr
}

function http(url, callback) {
  wx.request({
    url: url,
    header: {
      'content-type': 'json',
    },
    data: {},
    method: 'GET',
    success: (res) => {
      callback && callback(res.data)
    }
  })
}

function convertToCastString(casts) {
  var castsjoin = "";
  for (var idx in casts) {
    castsjoin = castsjoin + casts[idx].name + " / ";
  }
  return castsjoin.substring(0, castsjoin.length - 2);
}

function convertToCastInfos(casts) {
  var castsArray = []
  for (var idx in casts) {
    var cast = {
      img: casts[idx].avatars ? casts[idx].avatars.large : "",
      name: casts[idx].name
    }
    castsArray.push(cast);
  }
  return castsArray;
}

module.exports = {
  convertToStarsArray,
  http,
  convertToCastString,
  convertToCastInfos
}
