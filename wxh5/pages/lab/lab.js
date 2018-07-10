// pages/lab/lab.js
var util = require('../../utils/util.js')
var api = require('../../js/funs/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    level: {
      1: '初级',
      2: '中级',
      3: '高级',
    }
  },

  getList: function() {
    var _this = this;
    var data = {
      pageSize: 1,
      pageNum: 100
    }
    wx.request({
      url: api.experimentalList + api._p + '&' + util.getQuery(data),
      success: function(res) {
        _this.setData({
          list: res.data.result.data
        })
      }
    })
  },

  toDetail: function(e) {
    var id = e.currentTarget.dataset.itemid;
    wx.navigateTo({
      url: '/pages/lab/detail?id=' + id,
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
    this.getList();
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