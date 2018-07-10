
var api = require('../../js/funs/api.js');

Page({
  data: {
    profile: null,
    currentWeight: null,
    weightStr: ''
  },
  onShow: function () {
    this.getProfile();
    this.getWeight();
  },                                                     //获取体重数据
  getWeight: function () {
    var _this = this;
    wx.request({
      url: api.getHomeTopDate + api._p,
      async: false,
      method: 'GET',
      success: function (res) {

        _this.setData({
          currentWeight: ((res.data[0].currentWeight) * 2).toFixed(1),
          weightStr: ((res.data[0].weightStr) * 2).toFixed(1)
        })


      }
    })
  },    
  edit: function (e) {
    wx.navigateTo({
      url: '/pages/my/edit/edit?type=' + e.currentTarget.dataset.type + '&value=' + e.currentTarget.dataset.value + '&unionid=' + (this.data.profile.unionid || this.data.profile.weChatUser.unionid)
    })
  },

  getProfile: function () {
    var _this = this;
    wx.request({
      url: api.profile + api._p,
      method: 'POST',
      success: function (res) {
        var profile = res.data.result.data[0];

        profile.gender = profile.gender || profile.weChatUser.gender;
        if (profile.gender == 1) {
          profile.genderStr = '男'
        } else {
          profile.genderStr = '女'
        }

        profile.weight = (profile.weight.toFixed(1) * 2).toFixed(1)

        _this.setData({
          profile: profile,
        })
      }
    })
  },

  toFeedback: function () {
    wx.navigateTo({
      url: '/pages/my/feedback/feedback',
    })
  }
})