// pages/map/detail.js

var util = require('../../utils/util.js')
var api = require('../../js/funs/api.js')
var _options;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopId: '',
    data: {},
    distance: 0,
    long: 0,
    lat: 0
  },
  getDetail: function (shopId) {
    var _this = this;

    wx.request({
      url: api.getBusinessDetails + api._p + '&id=' + shopId,
      success: function (res) {
        var data = res.data;
        _this.setData({
          data: data
        })
        
      }
    })
  },

  returnHome: function(e) {
    var app = getApp();
    app.globalData.long = this.data.long;
    app.globalData.lat = this.data.lat;
    wx.navigateBack({
      
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    _options = options;
    this.setData({
      shopId: options.id,
      distance: options.distance,
      long: options.long,
      lat: options.lat
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
    this.getDetail(this.data.shopId)
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