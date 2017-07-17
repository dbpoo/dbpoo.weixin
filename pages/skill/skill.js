var util = require('../../utils/util.js');
var app = getApp();

Page({
  data: {

  },
  onLoad: function () {
    wx.showLoading({
      title: app.globalData.LOADING,
    })
    util.http(app.indexAPI.game, this.getGameList)
  },
  getGameList: function (res, index) {
    wx.hideLoading();
    this.setData({
      skillList: res.data.gameData
    })
  },
  onTap: function () {
    wx.navigateTo({
      url: 'skill-list/skill-list',
    })
  }
})