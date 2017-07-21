var util = require('../../../utils/util.js');
var app = getApp();

Page({
  data: {
    shareId: ''
  },
  onLoad: function (options) {
    var id = options.id;
    this.setData({
      shareId: id
    })
    util.http(app.indexAPI.skill + '?id=' + id, this.getSkillDetail, this)
  },
  getSkillDetail: function (res) {
    this.setData({
      name: res.data.name,
      desc: res.data.desc,
      skill: res.data.skill
    })
  },
  onShareAppMessage: function (res) {
    console.log(this.data.shareId)
    return {
      title: this.data.name,
      desc: this.data.desc,
      path: '/pages/skill/skill-detail/skill-detail?id=' + this.data.shareId,
    }
  }
})