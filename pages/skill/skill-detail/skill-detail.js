var util = require('../../../utils/util.js');
var app = getApp();

Page({
  data: {
    
  },
  onLoad: function (options) {
    var id = options.id;
    util.http(app.indexAPI.skill + '?id=' + id, this.getSkillDetail)
  },
  getSkillDetail: function (res) {
    this.setData({
      name: res.data.name,
      desc: res.data.desc,
      skill: res.data.skill
    })
  }
})