var util = require('../../../utils/util.js');
var app = getApp();

Page({
  data: {
    'oldindex' : -1
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
    var oldindex = this.data.oldindex;
    console.log(index + '+++' + oldindex)
    if (index === this.oldindex) return;
    if (oldindex >= 0) {
      this.data.videoList[oldindex].isPlay = '';
    }
    this.data.videoList[index].isPlay = 'true';
    this.setData({
      videoList: this.data.videoList,
      oldindex : index
    })
  }
})