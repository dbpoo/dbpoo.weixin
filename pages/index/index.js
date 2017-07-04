var util = require('../../utils/util.js');
var app = getApp();

Page({
  data: {
    swiperList: [],
    postList: [],
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 500,
    circular: true,
    indicatorColor: 'rgba(255,255,255,.3)',
    indicatorActiveColor: '#ffffff',
    page: 1,
    size: 20,
    hasMore: true,
    hasRefresh: false
  },
  onLoad: function () {
    util.http(app.indexAPI.swiperList, this.getSwiperList)
    util.http(app.indexAPI.postList, this.getPostList)
  },
  getSwiperList: function (res) {
    if(!res) return;
    this.setData({
      swiperList: res.data.slider
    })
  },
  getPostList: function (res) {
    if (!res) return;
    this.setData({
      postList: res.data.postData
    })
  },
  onPullDownRefresh: function () {
    if (!this.data.hasRefresh) return;
    console.log("刷新页面")
  },
  onReachBottom: function () {
    if (!this.data.hasMore) return;
    console.log("加载更多")
  },
  onTap(event) {
    var id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: 'detail/detail?id=' + id
    })
  }
})