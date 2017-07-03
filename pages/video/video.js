// pages/video/video.js
Page({
  data: {

  },
  onTap: function () {
    console.log('111');
    wx.navigateTo({
      url: 'video-detail/video-detail',
    })
  }
})