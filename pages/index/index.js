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
    loadTips: app.globalData.LOADING,
    isShow: false,
    placeholder: '请输入游戏角色',
    searchValue: '',
    searchHotShow: true,
    navcur: 0
  },
  onLoad: function () {
    wx.showLoading({
      title: app.globalData.LOADING,
    })
    this.getIndexData();
  },
  getIndexData: function () {
    util.http(app.indexAPI.swiper, this.getSwiperList)
    util.http(app.indexAPI.post + '?nav=' + this.data.navcur, this.getPostList)
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
    setTimeout(() => {
      this.getIndexData();
    }, 2000)
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
  onTap: function (evt) {
    var id = evt.currentTarget.dataset.id;
    wx.navigateTo({
      url: 'detail/detail?id=' + id
    })
  },
  onBindFocus: function (evt) {
    this.setData({
      isShow: true
    })
  },
  onCancel: function (evt) {
    this.setData({
      isShow: false,
      searchValue: '',
      searchList: '',
      searchHotShow: true
    })
  },
  onBindBlur: function () {
    util.http(app.indexAPI.post, this.getSearchList)
  },
  onNav: function(evt) {
    var index = evt.currentTarget.dataset.id;
    if(this.data.navcur == index) return;
    this.setData({
      navcur: index
    })
    util.http(app.indexAPI.post + '?nav=' + this.data.navcur, this.getPostList)
  },
  getSearchList: function (res) {
    wx.hideLoading();
    if (!res) return;
    this.setData({
      searchList: res.data.postData,
      searchHotShow: false
    })
  }
})