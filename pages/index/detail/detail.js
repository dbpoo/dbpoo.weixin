var util = require('../../../utils/util.js');
var WxParse = require('../../../wxParse/wxParse.js');
var app = getApp();

Page({
  data: {
    
  },
  onLoad: function (options) {
    var id = options.id;
    util.http(app.indexAPI.detail + '?id=' + id, this.getPostDetail, this)
  },
  getPostDetail: function (res) {
    var article = res.data.body;
    WxParse.wxParse('article', 'html', article, this, 5);
    this.setData({
      title: res.data.title
    })
  }
})