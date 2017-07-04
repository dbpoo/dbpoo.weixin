function http(url, callback) {
  wx.showLoading({
    title: '加载中...',
  })
  wx.request({
    url: url,
    method: 'GET',
    header: {
      "Content-Type": "json"
    },
    success: function (res) {
      wx.hideLoading();
      callback(res.data);
    },
    fail: function (error) {
      console.log(error)
    }
  })
}

module.exports = {
  http: http
}