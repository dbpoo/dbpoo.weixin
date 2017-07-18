var util = require('../../../utils/util.js');
var app = getApp();

Page({
  data: {

  },
  onLoad: function (options) {
    var id = options.id;
    util.http(app.indexAPI.video + '?id=' + id, this.getVideoDetail)
  },
  getVideoDetail: function (res) {
    this.setData({
      title: res.data.title,
      video: res.data.video,
      info: res.data.info
    })
  }
  
})