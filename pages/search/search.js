var util = require('../../utils/util.js');
var app = getApp();

Page({
  data: {
    start: 0,
    count: 10,
    total: 0,
    isComplete: false,
    loadTips: app.globalData.LOADING,
    hasMore: false,
    isSearch: false,
    searchHotShow: true,
    placeholder: '请输入游戏角色',
    searchType: ''
  },

  onLoad: function (options) {
    this.data.searchType = options.type;
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
      searchValue: this.data.keywords
    });
    util.http(app.indexAPI.search + '?type=' + this.data.searchType + '&keywords=' + this.data.keywords + 'start=0&count=' + this.data.count, this.getSearchList)
  },
  onBindFocus: function (evt) {
    this.setData({
      isSearch: true,
      start: 0,
      isComplete: false,
      hasMore: false,
      loadTips: app.globalData.LOADING,
    })
  },
  onCancel: function (evt) {
    wx.navigateBack();
  },
  onBindBlur: function (evt) {
    this.data.keywords = util.textFilter(evt.detail.value);
    wx.showLoading({
      title: app.globalData.LOADING,
    })
    util.http(app.indexAPI.search + '?type=' + this.data.searchType + '&keywords=' + this.data.keywords + 'start=0&count=' + this.data.count, this.getSearchList)
  },
  getSearchList: function (res) {
    wx.hideLoading();
    if (!res) return;
    this.setData({
      searchValue: this.data.keywords,
      total: res.data.total,
      searchList: res.data.searchData,
      searchHotShow: false
    })
  },
  onReachBottom: function () {
    if (this.data.hasMore) return;
    this.setData({
      hasMore: true
    })
    if (this.data.isComplete) return;
    this.data.start += this.data.count;
    if (this.data.start < this.data.total) {
      util.http(app.indexAPI.search + '?type=' + this.data.searchType + '&keywords=' + this.data.keywords + 'start=' + this.data.start + '&count=' + this.data.count, this.morePostList);
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
  }
})