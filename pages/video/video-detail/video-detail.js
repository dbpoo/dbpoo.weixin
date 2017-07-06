var util = require('../../../utils/util.js');
var app = getApp();

Page({
  data: {
    curIndex: -1
  },
  onLoad: function (options) {
    wx.showLoading({
      title: app.globalData.LOADING,
    })
    util.http(app.indexAPI.video, this.getVideoList)
  },
  getVideoList: function (res) {
    wx.hideLoading();
    this.setData({
      videoList: res.data.videoData
    })
  },
  onTap: function (evt) {
    var index = evt.currentTarget.dataset.index;

    this.setData({
      curIndex: index
    })
  }
})