Page({
  data: {
    videoList: [
      {
        id: '1',
        title: '最新视频',
        image: '../../images/temp/videolist_01.jpg'
      },
      {
        id: '2',
        title: '官方教学',
        image: '../../images/temp/videolist_02.jpg'
      },
      {
        id: '3',
        title: '赛事视频',
        image: '../../images/temp/videolist_03.jpg'
      },
      {
        id: '4',
        title: '大神教学',
        image: '../../images/temp/videolist_01.jpg'
      }
    ]
  },
  onTap: function () {
    wx.navigateTo({
      url: 'video-list/video-list',
    })
  }
})