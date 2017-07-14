Page({
  data: {
    skillList: [
      {
        id: '1',
        title: '拳皇系列',
        image: '../../images/temp/videolist_01.jpg'
      },
      {
        id: '2',
        title: '合金弹头',
        image: '../../images/temp/videolist_02.jpg'
      },
      {
        id: '3',
        title: '饿狼传说',
        image: '../../images/temp/videolist_03.jpg'
      },
      {
        id: '4',
        title: '龙虎之拳',
        image: '../../images/temp/videolist_01.jpg'
      },
      {
        id: '5',
        title: '侍魂',
        image: '../../images/temp/videolist_01.jpg'
      }
    ]
  },
  onTap: function () {
    wx.navigateTo({
      url: 'skill-list/skill-list',
    })
  }
})