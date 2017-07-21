var util = require('../../utils/util.js');
var app = getApp();

Page({
  data: {
    tempIndex: ''
  },
  onLoad: function () {
    wx.showLoading({
      title: app.globalData.LOADING,
    })
    util.http(app.indexAPI.game, this.getGameList, this)
  },
  getGameList: function (res, index) {
    wx.hideLoading();
    this.setData({
      skillList: res.data.gameData
    })
  },
  onToggle: function (evt) {
    var index = evt.currentTarget.dataset.id;
    if(this.data.type === index){
      this.setData({
        type: ''
      })
    } else {
      this.setData({
        type: index
      })
    }    
  },
  onTap: function (evt) {
    var id = evt.currentTarget.dataset.id;
    wx.navigateTo({
      url: 'skill-list/skill-list?id=' + id,
    })
  }
})