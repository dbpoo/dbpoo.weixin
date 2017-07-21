var app = getApp();

function http(url, callback, that, isCache) {
  var isOne = true;
  var cacheFn = function() {
    wx.request({
      url: url,
      method: 'GET',
      header: {
        "Content-Type": "json"
      },
      success: function (res) {
        if (res.data.code === app.globalData.ERR_OK) {
          callback.call(that, res.data);
          if (!that.data.isNet) {
            that.setData({
              isNet: true
            })
          }
        } else {
          if (!isOne) {
            return
          }

          wx.hideLoading();
          that.setData({
            isError: true,
            errorTxt: '加载失败',
            isNet: false
          })

          that.reloadFn = http(url, callback, that, 1);
          isOne = false;
        }
      },
      fail: function () {
        alert('服务器错误！')
      }
    })
  }

  return isCache ? cacheFn : cacheFn();
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