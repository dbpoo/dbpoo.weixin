//app.js
App({
  globalData: {
    ERR_OK: 0,
    LOADING: "正在加载中...",
    COMPLETE: "亲，已经到底了噢..."
  },
  indexAPI: {
    swiper: "https://static.ledo.com/api/swiper.js",
    post: "https://static.ledo.com/api/post.js",
    detail: "https://static.ledo.com/api/detail.js",
    video: "https://static.ledo.com/api/video.js",
    avatar: "https://static.ledo.com/api/avatar.js",
    skill: "https://static.ledo.com/api/people.js",
    search: 'https://static.ledo.com/api/post.js'
  },
  videoAPI: {
    lastestList: "",
    officialList: "",
    masterList: "",
    matchList: ""
  }
})
