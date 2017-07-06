var util = require('../../../utils/util.js');
var app = getApp();

Page({
  data: {
    
  },
  onLoad: function (option) {
    util.http(app.indexAPI.skill, this.getSkillDetail)
  },
  getSkillDetail: function (res) {
    this.setData({
      name: res.data.name,
      desc: res.data.desc,
      skill1: res.data.skill1,
      skill2: res.data.skill2,
      skill3: res.data.skill3
    })
  }
})