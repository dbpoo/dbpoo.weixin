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
    hasMore: false,
    hasRefresh: true,
    loadTips: app.globalData.LOADING
  },
  onLoad: function () {
    wx.showLoading({
      title: app.globalData.LOADING,
    })
    this.getIndexData();
  },
  getIndexData: function () {
    this.setData({
      swiperList: [],
      postList: []
    })
    util.http(app.indexAPI.swiperList, this.getSwiperList)
    util.http(app.indexAPI.postList, this.getPostList)
  },
  getSwiperList: function (res) {
    if (!res) return;
    this.setData({
      swiperList: res.data.slider
    })
  },
  getPostList: function (res) {
    wx.hideLoading();
    if (!res) return;
    this.setData({
      postList: res.data.postData
    })
  },
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh()
    wx.showLoading({
      title: app.globalData.LOADING,
    })
    setTimeout(()=>{
      this.getIndexData();
    },2000)
  },
  onReachBottom: function () {
    if (this.data.hasMore) return;
    this.setData({
      hasMore: true
    })
    setTimeout(() => {
      this.setData({
        hasMore: false
      })
    }, 2000)
  },
  onTap(event) {
    var id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: 'detail/detail?id=' + id
    })
  }
})