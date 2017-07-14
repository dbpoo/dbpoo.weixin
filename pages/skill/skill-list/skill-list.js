var util = require('../../../utils/util.js');
var app = getApp();

Page({
  data: {
    currutTab: 0
  },
  onLoad: function (options) {
    wx.showLoading({
      title: app.globalData.LOADING,
    })
    util.http(app.indexAPI.avatar, this.getAvatarList)

  },
  getAvatarList: function (res) {
    wx.hideLoading();
    this.setData({
      avatarName: res.data.avatarName,
      avatarImage: res.data.avatarImage,
      avatarInfo: res.data.avatarInfo,
      avatarList: res.data.avatarData
    })
  },
  getAvatarInfo: function (evt) {
    var id = evt.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../skill-detail/skill-detail?id=' + id
    })
  }
})