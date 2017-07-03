var swiperData = require('../../api/swiper-data.js')

Page({
  data: {
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 500,
    circular: true,
    indicatorColor: 'rgba(255,255,255,.3)',
    indicatorActiveColor: '#ffffff'
  },
  onLoad: function () {
    this.setData({
      swiperImg: swiperData.swiperImg
    })
  }
})