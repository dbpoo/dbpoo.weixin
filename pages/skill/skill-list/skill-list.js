var util = require('../../../utils/util.js');
var app = getApp();

Page({
  data: {
    currutTab: 0,
    showMore: false,
    shareId:''
  },
  onLoad: function (options) {
    var id = options.id;
    this.setData({
      shareId: id
    })
    wx.showLoading({
      title: app.globalData.LOADING,
    })
    util.http(app.indexAPI.avatar + '?id=' + id, this.getAvatarList);
  },
  getAvatarList: function (res) {
    var that = this;
    wx.hideLoading();
    this.setData({
      avatarName: res.data.avatarName,
      avatarImage: res.data.avatarImage,
      avatarInfoAll: res.data.avatarInfo,
      avatarInfo: that.curstr(res.data.avatarInfo, 100),
      avatarList: res.data.avatarData
    })
  },
  getAvatarInfo: function (evt) {
    var id = evt.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../skill-detail/skill-detail?id=' + id
    })
  },
  toggle: function () {
    var tempStr = '';
    var tempShow = this.data.showMore;
    
    tempShow = !tempShow;
    if (tempShow) {
      tempStr = this.data.avatarInfoAll;
    } else {
      tempStr = this.curstr(this.data.avatarInfoAll, 100)
    }
    this.setData({
      showMore: tempShow,
      avatarInfo: tempStr
    })
  },
  curstr: function (str, len) {
    var temp;
    var icount = 0;
    var patrn = /[^\x00-\xff]/;
    var strre = "";
    for (var i = 0; i < str.length; i++) {
      if (icount < len - 1) {
        temp = str.substr(i, 1);
        if (patrn.exec(temp) == null) {
          icount = icount + 1
        } else {
          icount = icount + 2
        }
        strre += temp
      } else {
        break;
      }
    }
    return strre + "..."
  },
  onShareAppMessage: function (res) {
    console.log(this.data.shareId)
    return {
      title: this.data.avatarName,
      desc: this.data.avatarInfoAll,
      path: '/pages/skill/skill-list/skill-list?id=' + this.data.shareId,
    }
  }
})