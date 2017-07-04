var util = require('../../../utils/util.js');
var app = getApp();

Page({
  data: {
    postDetail: []
  },
  onLoad: function (option) {
    this.postId = option.id;
    util.http(app.indexAPI.postList, this.getPostDetail)
  },
  getPostDetail: function (res) {
    var postArr = res.data.postData;
    var detailData = postArr.find((value) => {
      return value.id == this.postId;
    })
    this.setData({
      postDetail: detailData
    })
  }
})