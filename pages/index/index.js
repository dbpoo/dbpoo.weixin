var util = require('../../utils/util.js');
var app = getApp();

Page({
  data: {
    swiperList: [],
    postList: [],
    hasMore: false,
    hasRefresh: true,
    loadTips: app.globalData.LOADING,
    placeholder: '请输入游戏角色',
    searchValue: '',
    searchHotShow: true,
    navcur: 0,
    start: 0,
    count: 10,
    total: 0,
    isComplete: false,
    isSearch: false,
    keywords: ''
  },
  onLoad: function () {
    wx.showLoading({
      title: app.globalData.LOADING,
    })
    this.getIndexData();
  },
  onNav: function (evt) {
    var index = parseInt(evt.currentTarget.dataset.id);
    var url = '';
    if (this.data.navcur == index) return;
    this.setData({
      navcur: index
    })
    url = this.getUrl(index);
    util.http(url + '?start=0' + '&count=' + this.data.count, this.getPostList)
  },
  getUrl: function (index) {
    switch (index) {
      case 0:
        return app.indexAPI.hot;
        break;
      case 1:
        return app.indexAPI.news;
        break;
      case 2:
        return app.indexAPI.announce;
        break;
      case 3:
        return app.indexAPI.study;
        break;
      default:
        return app.indexAPI.search;
        break;
    }
  },
  getIndexData: function () {
    util.http(app.indexAPI.swiper, this.getSwiperList);
    util.http(app.indexAPI.hot + '?start=' + this.data.start + '&count=' + this.data.count, this.getPostList);
    util.http(app.indexAPI.searchkey, this.getSearchKey);
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
      start: 0,
      isComplete: false,
      hasMore: false,
      loadTips: app.globalData.LOADING,
      total: res.data.total,
      postList: res.data.postData
    })
  },
  getSearchKey: function (res) {
    this.setData({
      hotkey: res.data.hotkey,
      actorkey: res.data.actorkey
    })
  },
  searchkey: function (evt) {
    this.data.keywords = evt.currentTarget.dataset.key;
    this.setData({
      searchValue: this.data.keywords
    });
    util.http(app.indexAPI.search + '?&keywords=' + this.data.keywords + 'start=0&count=' + this.data.count, this.getSearchList)
  },
  onPullDownRefresh: function () {
    var index = this.data.navcur;
    var url = this.getUrl(index);

    util.http(url, this.refreshPostList)
  },
  refreshPostList: function (res) {
    wx.stopPullDownRefresh()
    if (!res) return;
    this.setData({
      total: res.data.total,
      postList: res.data.postData
    })
  },
  onReachBottom: function () {
    var index = this.data.navcur;
    var url = '';
    if (this.data.hasMore) return;
    this.setData({
      hasMore: true
    })
    if (this.data.isSearch) {
      url = this.getUrl();
    } else {
      url = this.getUrl(index);
    }

    if (this.data.isComplete) return;
    this.data.start += this.data.count;
    if (this.data.start < this.data.total) {
      if (this.data.isSearch) {
        util.http(url + '?keywords=' + this.data.keywords + 'start=' + this.data.start + '&count=' + this.data.count, this.morePostList);
      } else {
        util.http(url + '?start=' + this.data.start + '&count=' + this.data.count, this.morePostList);
      }
    } else {
      this.setData({
        isComplete: true,
        loadTips: app.globalData.COMPLETE
      })
    }
  },
  morePostList: function (res) {
    var totalPost = {};

    if (this.data.isSearch) {
      totalPost = this.data.searchList.concat(res.data.postData);
      this.setData({
        searchList: totalPost,
        hasMore: false
      })
    } else {
      totalPost = this.data.postList.concat(res.data.postData);
      this.setData({
        postList: totalPost,
        hasMore: false
      })
    }
  },
  onTap: function (evt) {
    var id = evt.currentTarget.dataset.id;
    wx.navigateTo({
      url: 'detail/detail?id=' + id
    })
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
    this.setData({
      isSearch: false,
      searchValue: '',
      searchList: '',
      searchHotShow: true
    })
  },
  onBindBlur: function (evt) {
    this.data.keywords = evt.detail.value;
    util.http(app.indexAPI.search + '?&keywords=' + this.data.keywords + 'start=0&count=' + this.data.count, this.getSearchList)
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