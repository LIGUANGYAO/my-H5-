// pages/my/feedback/feedback.js

var util = require('../../../utils/util.js')
var api = require('../../../js/funs/api.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    feedback: ''
  },

  submit: function() {
    if (!this.data.feedback) {
      wx.showToast({
        title: '请填写建议',
        icon: 'none'
      });   
      return   
    }
    wx.request({
      url: api.saveFeedback + api._p + '&feedback=' + this.data.feedback,
      method: 'POST',
      success: function(res) {
        if (!res.data.result || !res.data.result ||  res.data.result.status !== 0)  {
          wx.showToast({
            title: '提交失败',
            icon: 'none'
          });
          return
        }
        wx.showToast({
          title: '提交成功'
        });

        setTimeout(()=> {
          wx.navigateBack({
            
          })
        }, 1500)
      },
      fail: function() {
        wx.showToast({
          title: '提交失败',
          icon: 'none'
        });        
      }
    })
  },

  onInput: function(e) {
    this.setData({
      feedback: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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