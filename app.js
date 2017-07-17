//app.js
App({
  globalData: {
    ERR_OK: 0,
    LOADING: '正在加载中...',
    COMPLETE: '亲，已经到底了噢...'
  },
  indexAPI: {
    swiper: 'https://static.ledo.com/api/swiper.js',
    hot: 'https://static.ledo.com/api/hot.js',
    news: 'https://static.ledo.com/api/news.js',
    announce: 'https://static.ledo.com/api/announce.js',
    study: 'https://static.ledo.com/api/study.js',
    detail: 'https://static.ledo.com/api/detail.js',
    video: 'https://static.ledo.com/api/video.js',
    avatar: 'http://static.ledo.com/api/avatar.js?v=22',
    skill: 'https://static.ledo.com/api/people.js',
    search: 'https://static.ledo.com/api/post.js',
    game: 'https://static.ledo.com/api/game.js?v=22',
    search: 'http://static.ledo.com/api/search.js?v=22',
    searchkey: 'http://static.ledo.com/api/searchkey.js?v=33'
  },
  videoAPI: {
    lastestList: '',
    officialList: '',
    masterList: '',
    matchList: ''
  }
})
