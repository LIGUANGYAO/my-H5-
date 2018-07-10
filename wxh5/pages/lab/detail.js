// pages/lab/detail.js
var util = require('../../utils/util.js')
var api = require('../../js/funs/api.js')

var WxParse = require('../../js/wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data: {},
    itemId: ''
  },
  getDetail: function(id) {
    var _t = this;
    wx.request({
      url: api.experimentalId + api._p + '&evaid=' + id,
      success: function(res) {
        var data = res.data.result.data[0];
        var that = _t;
        WxParse.wxParse('article', 'html', data.details, that, 5);
        _t.setData({
          data:data
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.itemId = options.id;
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (options) {
    this.getDetail(this.data.itemId);
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