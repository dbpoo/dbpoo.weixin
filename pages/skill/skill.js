var util = require('../../utils/util.js');
var app = getApp();

Page({
  data: {
    currutTab: 0,
    game: [
      {
        id: 1,
        name: '拳皇'
      },
      {
        id: 2,
        name: '饿狼传说'       
      },
      {
        id: 3,
        name: '侍魂'
      },
      {
        id: 4,
        name: '合金弹头'
      },
      {
        id: 5,
        name: '龙虎之拳'
      }
      , {
        id: 6,
        name: '武力'
      },
      {
        id: 7,
        name: '月华之剑士'
      },
      {
        id: 8,
        name: '野兽梦魇'
      }, 
      {
        id: 9,
        name: '心跳魔女'
      },
      {
        id: 10,
        name: '回忆之日'
      }
    ]
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
      avatarList: res.data.avatarData
    })
  },
  onTap: function(evt) {
    var index = evt.currentTarget.dataset.index;
    this.data.videoList[index].iscur = "true"
  }
})