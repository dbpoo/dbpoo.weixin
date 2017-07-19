var util = require('../../utils/util.js');
var app = getApp();

Page({
  data: {
    searchList: [],
    start: 0,
    count: 10,
    total: 0,
    isComplete: false,
    loadTips: app.globalData.LOADING,
    hasMore: false,
    searchHotShow: true,
    placeholder: '请输入游戏角色',
    searchType: 'txt',
    searchUrl: '',
    timer: '',
    isClose: false
  },

  onLoad: function (options) {
    var stype;
    var sUrl;
    if (options.type) {
      stype = options.type;
    }

    if (stype === 'video') {
      sUrl = app.indexAPI.searchvideo;
    } else {
      sUrl = app.indexAPI.search;
    }

    this.setData({
      searchType: stype,
      searchUrl: sUrl
    })
    util.http(app.indexAPI.searchkey, this.getSearchKey);
  },
  getSearchKey: function (res) {
    this.setData({
      hotkey: res.data.hotkey,
      actorkey: res.data.actorkey
    })
  },
  searchkey: function (evt) {
    this.data.keywords = util.textFilter(evt.currentTarget.dataset.key);
    this.setData({
      isClose: true,
      searchValue: this.data.keywords
    });
    util.http(this.data.searchUrl + '?type=' + this.data.searchType + '&keywords=' + this.data.keywords + '&start=0&count=' + this.data.count, this.getSearchList)
  },
  onCancel: function (evt) {
    wx.navigateBack();
  },
  onBindInput: function (evt) {
    var _this = this;
    this.data.keywords = util.textFilter(evt.detail.value);
    if (!this.data.keywords) {
      this.setData({
        searchList: [],
        searchHotShow: true,
        isClose: false
      })
      clearTimeout(this.data.timer)
      return
    } else {
      this.setData({
        isClose: true
      })
    }
    if (this.data.timer) {
      clearTimeout(this.data.timer)
    }
    this.data.timer = setTimeout(() => {
      wx.showLoading({
        title: app.globalData.LOADING,
      })
      util.http(_this.data.searchUrl + '?type=' + _this.data.searchType + '&keywords=' + _this.data.keywords + '&start=0&count=' + _this.data.count, _this.getSearchList)
    }, 500)
  },
  onClose: function(){
    this.setData({
      searchList: [],
      searchHotShow: true,
      isClose: false,
      searchValue: ''
    })
  },
  getSearchList: function (res) {
    wx.hideLoading();
    if (!res) return;
    this.setData({
      start: 0,
      isComplete: false,
      hasMore: false,
      searchValue: this.data.keywords,
      total: res.data.total,
      searchList: res.data.searchData,
      searchHotShow: false
    })
  },
  onReachBottom: function () {
    if (this.data.hasMore || this.data.searchHotShow) return;
    this.setData({
      hasMore: true
    })
    if (this.data.isComplete) return;
    this.data.start += this.data.count;
    if (this.data.start < this.data.total) {
      util.http(this.data.searchUrl + '?type=' + this.data.searchType + '&keywords=' + this.data.keywords + '&start=' + this.data.start + '&count=' + this.data.count, this.morePostList);
    } else {
      this.setData({
        isComplete: true,
        loadTips: app.globalData.COMPLETE
      })
    }
  },
  morePostList: function (res) {
    var totalPost = {};

    totalPost = this.data.searchList.concat(res.data.searchData);
    this.setData({
      searchList: totalPost,
      hasMore: false
    })
  },
  onTapTxt: function (evt) {
    var id = evt.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../index/detail/detail?id=' + id
    })
  },
  onTapVideo: function (evt) {
    var id = evt.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../video/video-detail/video-detail?id=' + id
    })
  }
})