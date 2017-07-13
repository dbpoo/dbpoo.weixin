var app = getApp();

function http(url, callback) {
  wx.request({
    url: url,
    method: 'GET',
    header: {
      "Content-Type": "json"
    },
    success: function (res) {
      if (res.data.code === app.globalData.ERR_OK) {
        callback(res.data);
      } else {
        console.log('no data');
      }
    },
    fail: function (error) {
      console.log(error)
    }
  })
}

module.exports = {
  http: http
}