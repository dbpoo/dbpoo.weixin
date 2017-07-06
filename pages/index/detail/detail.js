var util = require('../../../utils/util.js');
var WxParse = require('../../../wxParse/wxParse.js');
var app = getApp();

Page({
  data: {
    
  },
  onLoad: function (option) {
    util.http(app.indexAPI.detail, this.getPostDetail)
  },
  getPostDetail: function (res) {
    var article = res.data.body;
    WxParse.wxParse('article', 'html', article, this, 5);
    this.setData({
      title: res.data.title
    })
  }
})