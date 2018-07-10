// pages/knowledge/knowledge.js

var util = require('../../utils/util.js')
var api = require('../../js/funs/api.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    healType: 'at01',
    secondType: '',
    secondCats: []
  },

  getList: function(healType, secondType) {
    var _this = this;
    _this.setData({
      healType: healType,
      secondType: secondType
    })
    var data = {
      pageSize: 1,
      pageNum: 100,
      healType: healType,
      secendType: secondType
    }
    wx.request({
      url: api.healthknowledgeList + api._p + '&' + util.getQuery(data),
      success: function(res) {
        var list = res.data.result.data || [];

        list = list.map(function(item, i) {
          item.createTime = util.formatDate(item.createTime);
          return item;
        })
        _this.setData({
          list: list
        });
      }
    })
  },
  getKnowledgeParam: function() {
    var _this = this;
    wx.request({
      url: api.healthknowledgeParam + api._p,
      success: function(res) {
        _this.setData({
          secondCats: res.data.result.data
        })
      }
    })
  },
  onFirstChange: function(e) {
    var data = e.currentTarget.dataset;

    this.getList(data.code, '');
  },
  onSecondChange: function(e) {
    var data = e.currentTarget.dataset;

    this.getList(this.data.healType, data.code);
  },

  toDetail: function(e) {
    var id = e.currentTarget.dataset.id;
    
    wx.navigateTo({
      url: '/pages/knowledge/detail?id=' + id
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
    this.getList(this.data.healType, this.data.secondType);
    this.getKnowledgeParam()
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