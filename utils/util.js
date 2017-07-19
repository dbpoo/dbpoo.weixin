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

function textFilter(str) {
  var pattern = new RegExp(/["' <>%;)(&+]/);
  var tempStr = '';
  for (var i = 0; i < str.length; i++) {
    tempStr += str.substr(i, 1).replace(pattern, '');
  }
  return tempStr;
}

module.exports = {
  http,
  textFilter
}