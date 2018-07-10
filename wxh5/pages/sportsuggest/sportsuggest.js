

var api = require('../../js/funs/api.js');
var bmi = require('../../js/funs/bmi.js');
var util = require('../../utils/util.js');

Page({

  data: {
    registeredData: {},
    homeData: {},
    text1: '',
    text2: '',
    BMI: null,
    bodyTypeChinese: null,
    bmr: null
  },
  onLoad: function () {

    wx.setNavigationBarTitle({
      title: "运动建议"
    })
   

  },
  onShow: function(){
    var _this = this;
 
    util.getP(function(){
      _this.getWeight();
      _this.getProfile();
    })


    setTimeout(function(){

      _this.data.BMI = bmi.toMathBmi(_this.data.homeData.currentWeight, _this.data.registeredData.height);//计算BMI值
      _this.data.bodyTypeChinese = bmi.getBodyTypeChinese(_this.data.BMI.bmi);

      _this.setData({
        bodyTypeChinese: _this.data.bodyTypeChinese
      })

      console.log(_this.data.bodyTypeChinese)

      util.getP(function () {
        _this.foodSuggest();
      })

    },500)

  },
  onReady: function () {
   

  },
  //获取体重数据
  getWeight: function () {
    var _this = this;
    wx.request({
      url: api.getHomeTopDate + api._p,
      method: 'GET',
      async: false,
      success: function (res) {

        _this.setData({
          homeData: res.data[0]
        })
      }
    })
  },
  //获取注册信息接口
  getProfile: function () {
    var _this = this;
    wx.request({
      method: 'POST',
      url: api.profile + api._p,
      dataType: 'json',
      async: false,
      success: function (res) {
        if (res.data.result.data) {
          _this.setData({
            registeredData: res.data.result.data[0]
          })

        }
      }
    })
  },
  //运动建议推荐
  foodSuggest: function () {
    var _this = this;
    if (this.data.bodyTypeChinese == '偏瘦') {

      _this.setData({
        text1: '建议适当增加力量训练，比如短跑、哑铃、仰卧起坐、动感单车等，增加力量训练可以增加我们的肌肉量，适当增加体重。',
        text2: '每周增加2-3次的运动时间，一般在15：00-20：00之间，可以考虑作为主要锻炼时间，一般在晚上餐前比较合适。',
      })
    } else if (this.data.bodyTypeChinese == '正常') {

      _this.setData({
        text1: '建议可以保持每周3次左右的有氧运动，比如游泳、慢跑、踩单车等，对身材要求比较高的可以适当加入力量训练，以便能塑造更完美的体型。',
        text2: '有氧运动建议在三餐餐前进行比较合适，并且时间需连续持续30分钟以上；确定每天运动的时间，逐渐养成运动的习惯；',
      })
 
    } else if (this.data.bodyTypeChinese == '偏胖' || this.data.bodyTypeChinese == '肥胖') {
      _this.setData({
        text1: '建议适当增加有氧运动，比如慢跑、快走、游泳、踩单车等，增加有氧运动可以有效的燃烧我们体内的脂肪，适当减轻体重',
        text2: '有氧运动一般建议在三餐餐前进行比较合适，空腹的有氧运动能更有效的促进脂肪燃烧，并且时间需连续持续30分钟以上；',
      })
 
    }
  }
})