var util = require('../../utils/util.js');
var app = getApp();

Page({
  data: {
    game: [
      {
        id: 1,
        name: '拳皇',
        iscur: 'true'
      },
      {
        id: 2,
        name: '饿狼传说',
        iscur: ''
        
      },
      {
        id: 3,
        name: '侍魂',
        iscur: ''
      },
      {
        id: 4,
        name: '合金弹头',
        iscur: ''
      },
      {
        id: 5,
        name: '龙虎之拳',
        iscur: ''
      }
      , {
        id: 6,
        name: '武力',
        iscur: ''
      },
      {
        id: 7,
        name: '月华之剑士',
        iscur: ''
      },
      {
        id: 8,
        name: '野兽梦魇',
        iscur: ''
      }, 
      {
        id: 9,
        name: '心跳魔女',
        iscur: ''
      },
      {
        id: 10,
        name: '回忆之日',
        iscur: ''
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
  }
})