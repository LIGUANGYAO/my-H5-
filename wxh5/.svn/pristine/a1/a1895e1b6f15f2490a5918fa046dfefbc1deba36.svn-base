// pages/my/edit/edit.js
var util = require('../../../utils/util.js')
var api = require('../../../js/funs/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: 'birth',
    value: '',
    unionid: '602439188@qq.com_oc6Qz0iFH8PIaKcNbLB6OmDR9ITI',
    nickname: '',
    heightList: [],
    height: '',
    birth: '19920210',
    sexList: [
      '男', '女'
    ],
    sex: '',
    sexValue: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.updateProfile()
    var value = options.value;

    if (options.type == 'birth') {
      value = value.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3');
    }
    var sexValue = value - 1;
    if (options.type == 'sex') {
      value = this.data.sexList[value - 1]
    }
    this.setData({
      type: options.type,
      unionid: options.unionid,
      nickname: value,
      height: value,
      birth: value,
      sex: value,
      sexValue: sexValue,
      heightList: this.getStatureData()
    })
  },

  //获取身高数据
  getStatureData: function () {
    var list = []
    for (var i = 70; i <= 220; i++) {
      var data = {
        id: i,
        value: i
      }
      list.push(i);
    }
    return list;
  },
  onNicknameChange: function(e) {
    this.setData({
      nickname: e.detail.value
    })
  },
  onHeightChange: function(e) {
    this.setData({
      height: this.data.heightList[e.detail.value]
    })
  },
  onBirthChange: function(e) {
    this.setData({
      birth: e.detail.value
    })
  },
  onSexChange: function(e) {
    this.setData({
      sex: this.data.sexList[e.detail.value],
      sexValue: e.detail.value - 0 + 1
    })
  },

  updateProfile: function() {
    var data = {
      unionid: this.data.unionid
    }

    var type = this.data.type;

    if (type == 'nickname') {
      data.name = this.data.nickname
    }

    if (type == 'height' ) {
      data.height = this.data.height;
    }

    if (type == 'birth') {
      data.birthdate = this.data.birth.replace(/-/g, '');
    }

    if (type == 'sex') {
      data.gender = this.data.sexValue;
    }
    wx.request({
      url: api.updateUserInfo + api._p + '&' + util.getQuery(data),
      method: 'POST',
      success: function(res) {
        res = res.data.result;

        if (res.status === 0) {
          wx.showToast({
            title: '修改成功',
            icon: 'success',
            success: function() {
              setTimeout(function() {
                wx.navigateBack({
                })
              }, 1500)
            }
          });
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})