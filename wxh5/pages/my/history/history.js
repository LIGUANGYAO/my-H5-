// pages/my/history/history.js
var util = require('../../../utils/util.js')
var api = require('../../../js/funs/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    isLoading: false,
    isEnd: false,
    pageSize: 1
  },

  getWeight: function(page) {
    var data = {
      pageSize: page,
      pageNum: 10
    }
    var _this = this;

    _this.setData({
      isLoading: true,
      pageSize: page
    })

    setTimeout(function () { 
    wx.request({
      url: api.weUserWeightAll + api._p + '&' + util.getQuery(data),
      success: function(res) {

        var isEnd = true;

        if (res.data.result.data && res.data.result.data.length) {
          var _i = res.data.result.data[0]
          // res.data.result.data = [...new Array(10)].map(_=>{
          //   return Object.assign({}, _i) || [];
          // })
          var list = _this.data.list.concat(res.data.result.data)

          list.forEach(function(item) {
            item.receiverTime = item.receiverTime.replace(/(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/, '$1-$2-$3 $4:$5');
            item.weight = item.weight ? ((item.weight - 0).toFixed(1) * 2).toFixed(1) : ''
          })
          _this.setData({
            list: list
          });
          if (res.data.result.data.length >= _this.data.pageNum) {
            isEnd = false;
          } 
        }


        _this.setData({
          isLoading: false,
          isEnd: isEnd
        }) 
      }
    })
    }, 0)
  },

  onScroll: function() {
    
    this.getWeight(this.data.pageSize + 1)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var app = getApp();
    app.globalData.history_onScroll = this.history_onScroll;

    this.getWeight(this.data.pageSize)
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