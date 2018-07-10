
const app = getApp()
var api = require('../../js/funs/api.js');
var bmi = require('../../js/funs/bmi.js');
var util = require('../../utils/util.js')
Page({
  data: {
    bmrWorld:null,
    bmr:null,
    registeredData:{},
    homeData:{},
    standardW: null,
    BeauBodyW: null,
    bmr: null,
    bmrMin:null,
    bmrMax:null,
    standard: null,
    beautBody: null,
    bodyTypeChinese: null,
    BMI: null,
    foodSuggestTitle:null,
    sportsuggestTitle1:null,
    sportsuggestTitle2: null,
    sportsuggestTitle3: null,
    gapStandard:null,
    gapBeauBody:null,
    instructionStaus:false,
    heightList: [],
    height: '150',
    birth: '1992-02-10',
    value: '',
    menStaus:true,
    wemStaus:false,
    sex:null,
    nickname:null,
    unionid:null,
    openStaus:false,
    leftValue:0,
    run:null,
    animationData: {},
    animationData2:{},
    animationData3:{},
    heartMin:null,
    heartMax:null,
    currentWeight:null,
    water:null,
    bon:null,
    fat:null,
    muscle:null,
    protein:null,
    fatWeight:null,
    visceralFat:null,
    waterTitle: null,
    bonTitle: null,
    muscleTitle: null,
    proteinTitle: null,
    fatWeightTitle: null,
    fatLevelTitle: null,
    bodyTypeTitle: null,
    bodyTypeNum: null
  },
  onLoad: function(){
    var _this = this;
    wx.setNavigationBarTitle({
      title: "健康分析"
    })

    util.getP(function(){
      _this.getWeight();

      _this.getProfile(function(){
        if (_this.data.registeredData.height && _this.data.registeredData.gender && _this.data.registeredData.age) {
          console.log("注册")

          _this.data.BMI = bmi.toMathBmi(_this.data.homeData.currentWeight, _this.data.registeredData.height);//计算BMI值
          _this.data.standard = bmi.standMeasur(_this.data.registeredData.height);//计算标准三围
          _this.data.beautBody = bmi.bodyMeasur(_this.data.registeredData.height);//计算美体三围
          _this.data.bodyTypeChinese = bmi.getBodyTypeChinese(_this.data.BMI.bmi);
          _this.data.standardW = bmi.toMathSBW(_this.data.registeredData.gender, _this.data.registeredData.height);
          _this.data.BeauBodyW = bmi.BeauBody(_this.data.registeredData.height, _this.data.registeredData.gender);
          _this.data.bmr = bmi.toMathBMR(_this.data.registeredData.gender, _this.data.homeData.currentWeight, _this.data.registeredData.height, _this.data.registeredData.age);

          _this.setData({
            BMI: _this.data.BMI,
            bodyTypeChinese: _this.data.bodyTypeChinese,
            standardW: Number(_this.data.standardW.weight).toFixed(1),
            BeauBodyW: Number(_this.data.BeauBodyW.beautWeight).toFixed(1),
            beautBody: _this.data.beautBody,
            standard: _this.data.standard,
            bmr: _this.data.bmr,
            heartMin: ((220 - _this.data.registeredData.age) * 0.6).toFixed(1),
            heartMax: ((220 - _this.data.registeredData.age) * 0.8).toFixed(1),
            bmrMin: _this.data.bmr - (_this.data.bmr * 0.1),
            bmrMax: _this.data.bmr + (_this.data.bmr * 0.1),
            gapStandard: (Math.abs(parseInt(_this.data.homeData.currentWeight) - parseInt(_this.data.standardW.weight)) * 2).toFixed(1),
            gapBeauBody: (Math.abs(parseInt(_this.data.BeauBodyW.beautWeight) - parseInt(_this.data.homeData.currentWeight)) * 2).toFixed(1)
          })

          _this.setData({
            openStaus: false
          })

        } else {
          console.log("未注册")
          if (_this.data.registeredData.height == null || _this.data.registeredData.gender == null || _this.data.registeredData.age == null) {
            _this.setData({
              openStaus: true
            })

          }

        }
      })
    })

  },
  onShow: function(){
     
    
    var _this = this;
    util.getP(function(){
      _this.getWeight();

      _this.getDataFat();

      _this.getProfile(function(){

        if (_this.data.registeredData.height && _this.data.registeredData.gender && _this.data.registeredData.age) {
          console.log("注册")

          _this.data.BMI = bmi.toMathBmi(_this.data.homeData.currentWeight, _this.data.registeredData.height);//计算BMI值
          _this.data.standard = bmi.standMeasur(_this.data.registeredData.height);//计算标准三围
          _this.data.beautBody = bmi.bodyMeasur(_this.data.registeredData.height);//计算美体三围
          _this.data.bodyTypeChinese = bmi.getBodyTypeChinese(_this.data.BMI.bmi);
          _this.data.standardW = bmi.toMathSBW(_this.data.registeredData.gender, _this.data.registeredData.height);
          _this.data.BeauBodyW = bmi.BeauBody(_this.data.registeredData.height, _this.data.registeredData.gender);
          _this.data.bmr = bmi.toMathBMR(_this.data.registeredData.gender, _this.data.homeData.currentWeight, _this.data.registeredData.height, _this.data.registeredData.age);

          _this.setData({
            BMI: _this.data.BMI,
            bodyTypeChinese: _this.data.bodyTypeChinese,
            standardW: Number(_this.data.standardW.weight).toFixed(1),
            BeauBodyW: Number(_this.data.BeauBodyW.beautWeight).toFixed(1),
            beautBody: _this.data.beautBody,
            standard: _this.data.standard,
            bmr: _this.data.bmr,
            heartMin: ((220 - _this.data.registeredData.age) * 0.6).toFixed(1),
            heartMax: ((220 - _this.data.registeredData.age) * 0.8).toFixed(1),
            bmrMin: _this.data.bmr - (_this.data.bmr * 0.1),
            bmrMax: _this.data.bmr + (_this.data.bmr * 0.1),
            gapStandard: (Math.abs(parseInt(_this.data.homeData.currentWeight) - parseInt(_this.data.standardW.weight)) * 2).toFixed(1),
            gapBeauBody: (Math.abs(parseInt(_this.data.BeauBodyW.beautWeight) - parseInt(_this.data.homeData.currentWeight)) * 2).toFixed(1)
          })

     
            _this.suggestAdvice();
            _this.suggestBmr();
            _this.indicator();

            setTimeout(function(){

              _this.getBodyFatWorld(_this.data.registeredData.gender, _this.data.registeredData.age, _this.data.bmr, _this.data.BMI.bmi, _this.data.registeredData.height, parseInt(_this.data.homeData.currentWeight));//计算体脂信息

            },500)

          _this.setData({
            openStaus: false
          })

         

        } else {
          console.log("未注册")
          if (_this.data.registeredData.height == null || _this.data.registeredData.gender == null || _this.data.registeredData.age == null) {
            _this.setData({
              openStaus: true
            })

          }

        }
          
      });
    })


    _this.setData({
      height: _this.data.height,
      birth: _this.data.birth,
      sex: 1,
      heightList: _this.getStatureData()
    })

  },
  onReady: function(){

    
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
          homeData: res.data[0],
          currentWeight: ((res.data[0].currentWeight) * 2).toFixed(1)
        })
      }
    })
  },
  //运动建议 饮食建议文字
  suggestAdvice: function () {
    var _this = this;
    if (_this.data.bodyTypeChinese == '偏瘦') {

      this.setData({
        foodSuggestTitle: '主要保证有足够的热量摄入，能量摄入大于消耗，热量的食入完全来源于饮食',
        sportsuggestTitle1: '1、在健身房做无氧运动，如杠铃卧推、杠铃推举、高位下拉等;',
        sportsuggestTitle2: '2、每周训练3天，每次把全身都练一遍，一小时左右;',
        sportsuggestTitle3: '3、每个动作做1~3组，每组做12~15次;'
      })

    } else if (_this.data.bodyTypeChinese == '正常') {

      this.setData({
        foodSuggestTitle: '三大营养素的比例要均衡，碳水化合物55%-65%，蛋白质10%-12%，脂肪20%-30%',
        sportsuggestTitle1: '1、每天运动30mins，如慢跑、跳绳、游泳、骑自行车等;',
        sportsuggestTitle2: '2、运动前要热身;',
        sportsuggestTitle3: '3、运动后要做拉伸运动;'
      })

    } else if (_this.data.bodyTypeChinese == '偏胖') {
    
      _this.setData({
        foodSuggestTitle: '体型偏重的您，首要做到的是控制总能量的摄入，采取高蛋白质，低碳水化合物，低脂肪的膳食模式....',
        sportsuggestTitle1 :'1、锻炼的最佳方式应选择走、游泳、自行车等持续的周期性有氧运动;',
        sportsuggestTitle2: '2、下午4-5点，这是锻炼最好的时候，消耗热量比较快;',
        sportsuggestTitle3: '3、锻炼方式多样交替，慢走——快走——走跑交替——持续慢跑——持续中速跑;'
      })

    } else if (_this.data.bodyTypeChinese == '肥胖') {

      this.setData({
        foodSuggestTitle: '针对超重的您，建议开始控制饮食，减少甜食和饮料的摄入，多选择天然的食物.....',
        sportsuggestTitle1: '1、找到自己喜欢的运动并坚持;',
        sportsuggestTitle2: '2、做燃脂类运动以加快减脂进度，每周3-5次，每次20-40分钟，控制好强度;',
        sportsuggestTitle3: '3、第一次十分钟即可，慢慢增加到30分钟左右，完全可以一直保持每周三次，每次只有15分钟的较低运动量;'
      })
    }

  },
  //bmr推荐
  suggestBmr:function(){
    var _this = this;
    if (_this.data.bmr <= 1100) {
     _this.setData({
       bmrWorld:'.....'
     })
    } else if (_this.data.bmr > 1100 && _this.data.bmr <= 1200) {
      _this.setData({
        bmrWorld: '3碗米饭+3只鸡蛋+3盘炒青菜+1个大苹果'
      })

    } else if (_this.data.bmr > 1200 && _this.data.bmr <= 1300) {
      _this.setData({
        bmrWorld: '3碗米饭+3只鸡蛋+3盘炒青菜+1个大苹果+1杯牛奶'
      })

    } else if (_this.data.bmr > 1300 && _this.data.bmr <= 1400) {

      _this.setData({
        bmrWorld: '3碗米饭+1只鸡蛋+1份煎牛扒+3盘炒青菜+1个大苹果+1杯牛奶'
      })
    } else if (_this.data.bmr > 1400 && _this.data.bmr <= 1500) {
      _this.setData({
        bmrWorld: '3碗米饭+1只鸡蛋+2份煎牛扒+3盘炒青菜+1杯牛奶'
      })
    } else if (_this.data.bmr > 1500 && _this.data.bmr <= 1600) { 
      _this.setData({
        bmrWorld: '3碗米饭+2只鸡蛋+2份煎牛扒+3盘炒青菜+1杯牛奶'
      })

    } else if (_this.data.bmr > 1600 && _this.data.bmr <= 1700) {

      _this.setData({
        bmrWorld: '3碗米饭+3只鸡蛋+2份煎牛扒+3盘炒青菜+1个大苹果'
      })

    } else if (_this.data.bmr > 1700 && _this.data.bmr <= 1800) {

      _this.setData({
        bmrWorld: '3碗米饭+3份煎牛扒+3盘炒青菜+1个大苹果'
      })


    } else if (_this.data.bmr > 1800 && _this.data.bmr <= 1900) {

      _this.setData({
        bmrWorld: '3碗米饭+3份煎牛扒+3盘炒青菜+1杯牛奶 +1个大苹果'
      })

    } else if (_this.data.bmr > 1900 && _this.data.bmr <= 2000) {

      _this.setData({
        bmrWorld: '3碗米饭+2只鸡蛋+3份煎牛扒+3盘炒青菜+1杯牛奶 +1个大苹果'
      })
    } else if (_this.data.bmr > 2000 && _this.data.bmr <= 2100) {

      _this.setData({
        bmrWorld: '3碗米饭+3只鸡蛋+3份煎牛扒+3盘炒青菜+1杯牛奶 +1个大苹果'
      })

    } else if (_this.data.bmr > 2100 && _this.data.bmr <= 2200) {
      _this.setData({
        bmrWorld: '3碗米饭+3只鸡蛋+3份煎牛扒+4盘炒青菜+1杯牛奶 +1个大苹果'
      })

    } else if (_this.data.bmr > 2200 && _this.data.bmr <= 2300) {

      _this.setData({
        bmrWorld: '3碗米饭+3只鸡蛋+3份煎牛扒+4盘炒青菜+2杯牛奶 +1个大苹果'
      })

    } else if (_this.data.bmr > 2300 && _this.data.bmr <= 2400) {

      _this.setData({
        bmrWorld: '3碗米饭+4只鸡蛋+3份煎牛扒+4盘炒青菜+2杯牛奶 +1个大苹果'
      })

    } else if (_this.data.bmr > 2400 && _this.data.bmr <= 2500) {

      _this.setData({
        bmrWorld: '3碗米饭+3只鸡蛋+3份煎牛扒+4盘炒青菜+2杯牛奶 +2个大苹果'
      })

    } else {
      _this.setData({
        bmrWorld: '.....'
      })
    }
  },
  linkAd: function () {
    var _this = this;
      wx.navigateTo({
        url: '/pages/ad/ad'
      });
  },
  toFoodSuggest: function(){
    wx.navigateTo({
      url: '/pages/foodsuggest/foodsuggest'
    });
  },
  toSportSuggest:function(){
    wx.navigateTo({
      url: '/pages/sportsuggest/sportsuggest'
    });
  },
  toBuild:function(){
    wx.navigateTo({
      url: '/pages/build2/build?Name=体重管理'
    });
  },
  openInstruction: function(){
     this.setData({
       instructionStaus:true
     })
  },
  closeInstruction:function(){
    this.setData({
      instructionStaus: false
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
  onHeightChange: function (e) {
    this.setData({
      height: this.data.heightList[e.detail.value]
    })
  },
  onBirthChange: function (e) {
    this.setData({
      birth: e.detail.value
    })
  },
  changeSex:function(e){
    var gender = e.currentTarget.dataset.gender;

    var _this = this;

    if (gender == 1) {
      _this.setData({
        menStaus: true,
        wemStaus:false,
        sex: 1
      })
    }else{
      _this.setData({
        menStaus: false,
        wemStaus: true,
        sex:2
      })
    }
 
  },
  //获取注册信息接口
  getProfile: function (callback) {
    var _this = this;
    wx.request({
      method: 'POST',
      url: api.profile  + api._p,
      dataType: 'json',
      success: function (res) {
        if (res.data.result.data) {
          _this.setData({
            registeredData: res.data.result.data[0]
          })

          _this.setData({
            unionid: _this.data.registeredData.weChatUser.unionid
          })

          if (typeof callback === "function"){
               callback();
          }
          
        }
      }
    })
  },
  //获取体脂数据
  getDataFat:function(){
    var _this = this;
    var FatData;
    wx.request({
      method: 'GET',
      url: api.bodyFat + api._p,
      async: false,
      dataType: 'json',
      success: function (res) {

        if (res.data.result.data[0] && res.data.result.data[0].fat) {

          if (parseFloat(res.data.result.data[0].fat) * 100 > 5) {
            FatData = (parseFloat(res.data.result.data[0].fat) * 100).toFixed(1);
          } else {
            FatData = (5).toFixed(1);
          }

        }

        _this.setData({
          bodyFat: res.data.result.data[0],
          water: (parseFloat(res.data.result.data[0].water) * 100).toFixed(1),
          bon: parseFloat(res.data.result.data[0].bon).toFixed(1),
          muscle: parseFloat(res.data.result.data[0].muscle).toFixed(1),
          fat: FatData,
          protein: parseFloat(res.data.result.data[0].protein).toFixed(1),
          fatWeight: parseFloat(res.data.result.data[0].fatWeight).toFixed(1),
          visceralFat: parseFloat(res.data.result.data[0].visceralFat).toFixed(1)
        })

        
      }
    })
  },
   //计算体脂的正常值
  getBodyFatWorld:function(sex,year,BMR,bmiData,Height,currntWeight){

    //肥胖等级
    if (sex == 1) {

      if (year >= 20 && year <= 29) {

        if (parseInt(this.data.bodyFat.fat * 100) <= 9) {
          this.setData({
            fatLevelTitle: '偏瘦'
          })
        } else if (parseInt(this.data.bodyFat.fat * 100) > 9 && parseInt(this.data.bodyFat.fat * 100) <= 13) {
          this.setData({
            fatLevelTitle: '苗条'
          })
        } else if (parseInt(this.data.bodyFat.fat * 100) >= 14 && parseInt(this.data.bodyFat.fat * 100) <= 20) {
          this.setData({
            fatLevelTitle: '标准'
          })
        } else if (parseInt(this.data.bodyFat.fat * 100) >= 21 && parseInt(this.data.bodyFat.fat * 100) <= 23) {
          this.setData({
            fatLevelTitle: '偏胖'
          })
        } else if (parseInt(this.data.bodyFat.fat * 100) > 23) {
          this.setData({
            fatLevelTitle: '肥胖'
          })
        }

      } else if (year >= 30 && year <= 39) {

        if (parseInt(this.data.bodyFat.fat * 100) <= 12) {
          this.setData({
            fatLevelTitle: '偏瘦'
          })
        } else if (parseInt(this.data.bodyFat.fat * 100) > 12 && parseInt(this.data.bodyFat.fat * 100) <= 14) {
          this.setData({
            fatLevelTitle: '苗条'
          })
        } else if (parseInt(this.data.bodyFat.fat * 100) >= 15 && parseInt(this.data.bodyFat.fat * 100) <= 21) {
          this.setData({
            fatLevelTitle: '标准'
          })
        } else if (parseInt(this.data.bodyFat.fat * 100) >= 22 && parseInt(this.data.bodyFat.fat * 100) <= 24) {
          this.setData({
            fatLevelTitle: '偏胖'
          })
        } else if (parseInt(this.data.bodyFat.fat * 100) > 24) {
          this.setData({
            fatLevelTitle: '肥胖'
          })
        }

      } else if (year >= 40 && year <= 49) {

        if (parseInt(this.data.bodyFat.fat * 100) <= 14) {
          this.setData({
            fatLevelTitle: '偏瘦'
          })
        } else if (parseInt(this.data.bodyFat.fat * 100) > 14 && parseInt(this.data.bodyFat.fat * 100) <= 16) {
          this.setData({
            fatLevelTitle: '苗条'
          })
        } else if (parseInt(this.data.bodyFat.fat * 100) >= 17 && parseInt(this.data.bodyFat.fat * 100) <= 23) {
          this.setData({
            fatLevelTitle: '标准'
          })
        } else if (parseInt(this.data.bodyFat.fat * 100) >= 24 && parseInt(this.data.bodyFat.fat * 100) <= 26) {
          this.setData({
            fatLevelTitle: '偏胖'
          })
        } else if (parseInt(this.data.bodyFat.fat * 100) > 26) {
          this.setData({
            fatLevelTitle: '肥胖'
          })
        }

      } else if (year >= 50 && year <= 59) {

        if (parseInt(this.data.bodyFat.fat * 100) <= 15) {
          this.setData({
            fatLevelTitle: '偏瘦'
          })
        } else if (parseInt(this.data.bodyFat.fat * 100) > 15 && parseInt(this.data.bodyFat.fat * 100) <= 17) {
          this.setData({
            fatLevelTitle: '苗条'
          })
        } else if (parseInt(this.data.bodyFat.fat * 100) >= 18 && parseInt(this.data.bodyFat.fat * 100) <= 24) {
          this.setData({
            fatLevelTitle: '标准'
          })
        } else if (parseInt(this.data.bodyFat.fat * 100) >= 25 && parseInt(this.data.bodyFat.fat * 100) <= 27) {
          this.setData({
            fatLevelTitle: '偏胖'
          })
        } else if (parseInt(this.data.bodyFat.fat * 100) > 27) {
          this.setData({
            fatLevelTitle: '肥胖'
          })
        }

      } else if (year >= 60) {

        if (parseInt(this.data.bodyFat.fat * 100) <= 16) {
          this.setData({
            fatLevelTitle: '偏瘦'
          })
        } else if (parseInt(this.data.bodyFat.fat * 100) > 16 && parseInt(this.data.bodyFat.fat * 100) <= 18) {
          this.setData({
            fatLevelTitle: '苗条'
          })
        } else if (parseInt(this.data.bodyFat.fat * 100) >= 19 && parseInt(this.data.bodyFat.fat * 100) <= 25) {
          this.setData({
            fatLevelTitle: '标准'
          })
        } else if (parseInt(this.data.bodyFat.fat * 100) >= 26 && parseInt(this.data.bodyFat.fat * 100) <= 28) {
          this.setData({
            fatLevelTitle: '偏胖'
          })
        } else if (parseInt(this.data.bodyFat.fat * 100) > 28) {
          this.setData({
            fatLevelTitle: '肥胖'
          })
        }

      }

    } else if (sex == 2) {

      if (year >= 20 && year <= 29) {

        if (parseInt(this.data.bodyFat.fat * 100) <= 17) {
          this.setData({
            fatLevelTitle: '偏瘦'
          })
        } else if (parseInt(this.data.bodyFat.fat * 100) > 17 && parseInt(this.data.bodyFat.fat * 100) <= 19) {
          this.setData({
            fatLevelTitle: '苗条'
          })
        } else if (parseInt(this.data.bodyFat.fat * 100) >= 20 && parseInt(this.data.bodyFat.fat * 100) <= 28) {
          this.setData({
            fatLevelTitle: '标准'
          })
        } else if (parseInt(this.data.bodyFat.fat * 100) >= 29 && parseInt(this.data.bodyFat.fat * 100) <= 31) {
          this.setData({
            fatLevelTitle: '偏胖'
          })
        } else if (parseInt(this.data.bodyFat.fat * 100) > 31) {
          this.setData({
            fatLevelTitle: '肥胖'
          })
        }

      } else if (year >= 30 && year <= 39) {

        if (parseInt(this.data.bodyFat.fat * 100) <= 18) {
          this.setData({
            fatLevelTitle: '偏瘦'
          })
        } else if (parseInt(this.data.bodyFat.fat * 100) > 18 && parseInt(this.data.bodyFat.fat * 100) <= 20) {
          this.setData({
            fatLevelTitle: '苗条'
          })
        } else if (parseInt(this.data.bodyFat.fat * 100) >= 21 && parseInt(this.data.bodyFat.fat * 100) <= 29) {
          this.setData({
            fatLevelTitle: '标准'
          })
        } else if (parseInt(this.data.bodyFat.fat * 100) >= 30 && parseInt(this.data.bodyFat.fat * 100) <= 32) {
          this.setData({
            fatLevelTitle: '偏胖'
          })
        } else if (parseInt(this.data.bodyFat.fat * 100) > 32) {
          this.setData({
            fatLevelTitle: '肥胖'
          })
        }

      } else if (year >= 40 && year <= 49) {

        if (parseInt(this.data.bodyFat.fat * 100) <= 19) {
          this.setData({
            fatLevelTitle: '偏瘦'
          })
        } else if (parseInt(this.data.bodyFat.fat * 100) > 19 && parseInt(this.data.bodyFat.fat * 100) <= 21) {
          this.setData({
            fatLevelTitle: '苗条'
          })
        } else if (parseInt(this.data.bodyFat.fat * 100) >= 22 && parseInt(this.data.bodyFat.fat * 100) <= 30) {
          this.setData({
            fatLevelTitle: '标准'
          })
        } else if (parseInt(this.data.bodyFat.fat * 100) >= 31 && parseInt(this.data.bodyFat.fat * 100) <= 33) {
          this.setData({
            fatLevelTitle: '偏胖'
          })
        } else if (parseInt(this.data.bodyFat.fat * 100) > 33) {
          this.setData({
            fatLevelTitle: '肥胖'
          })
        }

      } else if (year >= 50 && year <= 59) {

        if (parseInt(this.data.bodyFat.fat * 100) <= 20) {
          this.setData({
            fatLevelTitle: '偏瘦'
          })
        } else if (parseInt(this.data.bodyFat.fat * 100) > 20 && parseInt(this.data.bodyFat.fat * 100) <= 22) {
          this.setData({
            fatLevelTitle: '苗条'
          })
        } else if (parseInt(this.data.bodyFat.fat * 100) >= 23 && parseInt(this.data.bodyFat.fat * 100) <= 31) {
          this.setData({
            fatLevelTitle: '标准'
          })
        } else if (parseInt(this.data.bodyFat.fat * 100) >= 32 && parseInt(this.data.bodyFat.fat * 100) <= 33) {
          this.setData({
            fatLevelTitle: '偏胖'
          })
        } else if (parseInt(this.data.bodyFat.fat * 100) > 34) {
          this.setData({
            fatLevelTitle: '肥胖'
          })
        }

      } else if (year >= 60) {

        if (parseInt(this.data.bodyFat.fat * 100) <= 21) {
          this.setData({
            fatLevelTitle: '偏瘦'
          })
        } else if (parseInt(this.data.bodyFat.fat * 100) > 21 && parseInt(this.data.bodyFat.fat * 100) <= 23) {
          this.setData({
            fatLevelTitle: '苗条'
          })
        } else if (parseInt(this.data.bodyFat.fat * 100) >= 24 && parseInt(this.data.bodyFat.fat * 100) <= 32) {
          this.setData({
            fatLevelTitle: '标准'
          })
          
        } else if (parseInt(this.data.bodyFat.fat * 100) >= 33 && parseInt(this.data.bodyFat.fat * 100) <= 35) {
          this.setData({
            fatLevelTitle: '偏胖'
          })
        } else if (parseInt(this.data.bodyFat.fat * 100) > 35) {
          this.setData({
            fatLevelTitle: '肥胖'
          })
        }

      }

    }


    //内脏脂肪
    if (parseInt(this.data.bodyFat.visceralFat) >= 1 && parseInt(this.data.bodyFat.visceralFat) <= 4) {
        this.setData({
          fatWeightTitle: '健康型'
        })
    } else if (parseInt(this.data.bodyFat.visceralFat) >= 5 && parseInt(this.data.bodyFat.visceralFat) <= 9) {
        this.setData({
          fatWeightTitle: '警示型'
        })
    } else if (parseInt(this.data.bodyFat.visceralFat) >= 10 && parseInt(this.data.bodyFat.visceralFat) <= 14) {
        this.setData({
          fatWeightTitle: '危险型'
        })
    } else if (parseInt(this.data.bodyFat.visceralFat) > 14) {
      this.setData({
        fatWeightTitle: '极度危险'
      })
    }


    //蛋白质
    if (this.data.bodyFat.protein <= 16) {
        this.setData({
          proteinTitle: '偏低'
        })
    } else if (this.data.bodyFat.protein > 16 && this.data.bodyFat.protein <= 19) {
      this.setData({
        proteinTitle: '正常'
      })
    } else if (this.data.bodyFat.protein > 19) {
      this.setData({
        proteinTitle: '偏高'
      })
    }




     
    if(sex == 1) {
     
      //水份
      if (year <= 30) {
        if ((this.data.bodyFat.water * 100).toFixed(1) < 37.8) {
          this.setData({
            waterTitle: '胖'
          })
        } else if ((this.data.bodyFat.water * 100).toFixed(1) >= 37.8 && (this.data.bodyFat.water * 100).toFixed(1) <= 50.1) {
          this.setData({
            waterTitle: '胖'
          })
        } else if ((this.data.bodyFat.water * 100).toFixed(1) >= 50.2 && (this.data.bodyFat.water * 100).toFixed(1) <= 53.5) {
          this.setData({
            waterTitle: '偏胖'
          })
        } else if ((this.data.bodyFat.water * 100).toFixed(1) >= 53.6 && (this.data.bodyFat.water * 100).toFixed(1) <= 57.0) {
          this.setData({
            waterTitle: '标准'
          })
        } else if ((this.data.bodyFat.water * 100).toFixed(1) >= 57.1 && (this.data.bodyFat.water * 100).toFixed(1) <= 60.4) {
          this.setData({
            waterTitle: '偏瘦'
          })
        } else if ((this.data.bodyFat.water * 100).toFixed(1) >= 60.5 && (this.data.bodyFat.water * 100).toFixed(1) <= 66.0) {
          this.setData({
            waterTitle: '瘦'
          })
        } else if ((this.data.bodyFat.water * 100).toFixed(1) > 66.0) {
          this.setData({
            waterTitle: '瘦'
          })
        }
      } else if (year > 30) {

        if ((this.data.bodyFat.water * 100).toFixed(1) < 37.8) {
          this.setData({
            waterTitle: '胖'
          })
        } else if ((this.data.bodyFat.water * 100).toFixed(1) >= 37.8 && (this.data.bodyFat.water * 100).toFixed(1) <= 48.7) {
          this.setData({
            waterTitle: '胖'
          })
        } else if ((this.data.bodyFat.water * 100).toFixed(1) >= 48.8 && (this.data.bodyFat.water * 100).toFixed(1) <= 52.5) {
          this.setData({
            waterTitle: '偏胖'
          })
        } else if ((this.data.bodyFat.water * 100).toFixed(1) >= 52.3 && (this.data.bodyFat.water * 100).toFixed(1) <= 55.6) {
          this.setData({
            waterTitle: '标准'
          })
        } else if ((this.data.bodyFat.water * 100).toFixed(1) >= 55.7 && (this.data.bodyFat.water * 100).toFixed(1) <= 59.0) {
          this.setData({
            waterTitle: '偏瘦'
          })
        } else if ((this.data.bodyFat.water * 100).toFixed(1) >= 59.1 && (this.data.bodyFat.water * 100).toFixed(1) <= 66.0) {
          this.setData({
            waterTitle: '瘦'
          })
        } else if ((this.data.bodyFat.water * 100).toFixed(1) > 66.0) {
          this.setData({
            waterTitle: '瘦'
          })
        }

      }


      //骨量
      if (year <= 55) {
        if (this.data.bodyFat.bon <= 2.16) {
          this.setData({
            bonTitle: '偏低'
          })
        } else if (this.data.bodyFat.bon > 2.16 && this.data.bodyFat.bon <= 2.64) {
          this.setData({
            bonTitle: '标准'
          })
        } else if (this.data.bodyFat.bon > 2.64) {
          this.setData({
            bonTitle: '偏高'
          })
        }
      } else if (year > 55 && year <= 75) {
        if (this.data.bodyFat.bon <= 2.52) {
          this.setData({
            bonTitle: '偏低'
          })
        } else if (this.data.bodyFat.bon > 2.52 && this.data.bodyFat.bon <= 3.08) {
          this.setData({
            bonTitle: '标准'
          })
        } else if (this.data.bodyFat.bon > 3.08) {
          this.setData({
            bonTitle: '偏高'
          })
        }
      } else if (year > 75) {
        if (this.data.bodyFat.bon <= 2.79) {
          this.setData({
            bonTitle: '偏低'
          })
        } else if (this.data.bodyFat.bon > 2.79 && this.data.bodyFat.bon <= 3.41) {
          this.setData({
            bonTitle: '标准'
          })
        } else if (this.data.bodyFat.bon > 3.41) {
          this.setData({
            bonTitle: '偏高'
          })
        }
      }

      //肌肉率
      if (this.data.bodyFat.muscle <= 30) {
        this.setData({
          muscleTitle: '低'
        })
      } else if (this.data.bodyFat.muscle >= 31 && this.data.bodyFat.muscle <= 34) {
        this.setData({
          muscleTitle: '标准'
        })
      } else if (this.data.bodyFat.muscle >= 35 && this.data.bodyFat.muscle <= 38) {
        this.setData({
          muscleTitle: '偏高'
        })
      } else if (this.data.bodyFat.muscle >= 39) {
        this.setData({
          muscleTitle: '高'
        })
      }

    }else if(sex==2){

      //水份
      if (year <= 30) {
        if ((this.data.bodyFat.water * 100).toFixed(1) < 37.8) {
          this.setData({
            waterTitle: '胖'
          })
        } else if ((this.data.bodyFat.water * 100).toFixed(1) >= 37.8 && (this.data.bodyFat.water * 100).toFixed(1) <= 46.0) {
          this.setData({
            waterTitle: '胖'
          })
        } else if ((this.data.bodyFat.water * 100).toFixed(1) >= 46.1 && (this.data.bodyFat.water * 100).toFixed(1) <= 49.4) {
          this.setData({
            waterTitle: '偏胖'
          })
        } else if ((this.data.bodyFat.water * 100).toFixed(1) >= 49.5 && (this.data.bodyFat.water * 100).toFixed(1) <= 52.9) {
          this.setData({
            waterTitle: '标准'
          })
        } else if ((this.data.bodyFat.water * 100).toFixed(1) >= 53.0 && (this.data.bodyFat.water * 100).toFixed(1) <= 56.3) {
          this.setData({
            waterTitle: '偏瘦'
          })
        } else if ((this.data.bodyFat.water * 100).toFixed(1) >= 56.4 && (this.data.bodyFat.water * 100).toFixed(1) <= 66.0) {
          this.setData({
            waterTitle: '瘦'
          })
        } else if ((this.data.bodyFat.water * 100).toFixed(1) > 66.0) {
          this.setData({
            waterTitle: '瘦'
          })
        }

      } else if (year > 30) {
        if ((this.data.bodyFat.water * 100).toFixed(1) < 37.8) {
          this.setData({
            waterTitle: '胖'
          })
        } else if ((this.data.bodyFat.water * 100).toFixed(1) >= 37.8 && (this.data.bodyFat.water * 100).toFixed(1) <= 44.6) {
          this.setData({
            waterTitle: '胖'
          })
        } else if ((this.data.bodyFat.water * 100).toFixed(1) >= 44.7 && (this.data.bodyFat.water * 100).toFixed(1) <= 48.0) {
          this.setData({
            waterTitle: '偏胖'
          })
        } else if ((this.data.bodyFat.water * 100).toFixed(1) >= 48.1 && (this.data.bodyFat.water * 100).toFixed(1) <= 51.5) {
          this.setData({
            waterTitle: '标准'
          })
        } else if ((this.data.bodyFat.water * 100).toFixed(1) >= 51.6 && (this.data.bodyFat.water * 100).toFixed(1) <= 54.9) {
          this.setData({
            waterTitle: '偏瘦'
          })
        } else if ((this.data.bodyFat.water * 100).toFixed(1) >= 55.0 && (this.data.bodyFat.water * 100).toFixed(1) <= 66.0) {
          this.setData({
            waterTitle: '瘦'
          })
        } else if ((this.data.bodyFat.water * 100).toFixed(1) > 66.0) {
          this.setData({
            waterTitle: '瘦'
          })
        }

      }

      //骨量
      if (year <= 40) {
        if (this.data.bodyFat.bon <= 1.53) {
          this.setData({
            bonTitle: '偏低'
          })
        } else if (this.data.bodyFat.bon > 1.53 && this.data.bodyFat.bon <= 1.87) {
          this.setData({
            bonTitle: '标准'
          })
        } else if (this.data.bodyFat.bon > 1.87) {
          this.setData({
            bonTitle: '偏高'
          })
        }
      } else if (year > 40 && year <= 60) {
        if (this.data.bodyFat.bon <= 1.89) {
          this.setData({
            bonTitle: '偏低'
          })
        } else if (this.data.bodyFat.bon > 1.89 && this.data.bodyFat.bon <= 2.31) {
          this.setData({
            bonTitle: '标准'
          })
        } else if (this.data.bodyFat.bon > 2.31) {
          this.setData({
            bonTitle: '偏高'
          })
        }
      } else if (year > 60) {
        if (this.data.bodyFat.bon <= 2.16) {
          this.setData({
            bonTitle: '偏低'
          })
        } else if (this.data.bodyFat.bon > 2.16 && this.data.bodyFat.bon <= 2.64) {
          this.setData({
            bonTitle: '标准'
          })
        } else if (this.data.bodyFat.bon > 2.64) {
          this.setData({
            bonTitle: '偏高'
          })
        }
      }


      //肌肉率
      if (this.data.bodyFat.muscle <= 25) {
        this.setData({
          muscleTitle: '低'
        })
      } else if (this.data.bodyFat.muscle > 25 && this.data.bodyFat.muscle <= 27) {
        this.setData({
          muscleTitle: '标准'
        })
      } else if (this.data.bodyFat.muscle >= 28 && this.data.bodyFat.muscle <= 29) {
        this.setData({
          muscleTitle: '偏高'
        })
      } else if (this.data.bodyFat.muscle >= 30) {
        this.setData({
          muscleTitle: '高'
        })
      }

    }



    //脂肪率
    if (year <= 30) {
      if (sex == 1) {
        if ((this.data.bodyFat.fat * 100) < 4.0 ){
          this.setData({
            fatRateTitle: '瘦'
          })
        }else if((this.data.bodyFat.fat * 100) >= 4.0 && (this.data.bodyFat.fat * 100) <= 12.0) {
          this.setData({
            fatRateTitle: '瘦'
          })
        } else if ((this.data.bodyFat.fat * 100) >= 12.1 && (this.data.bodyFat.fat * 100) <= 17.0) {
          this.setData({
            fatRateTitle: '偏瘦'
          })
        } else if ((this.data.bodyFat.fat * 100) >= 17.1 && (this.data.bodyFat.fat * 100) <= 22.0) {
          this.setData({
            fatRateTitle: '标准'
          })
        } else if ((this.data.bodyFat.fat * 100) >= 22.1 && (this.data.bodyFat.fat * 100) <= 27.0) {
          this.setData({
            fatRateTitle: '偏胖'
          })
        } else if ((this.data.bodyFat.fat * 100) > 27.0){
          this.setData({
            fatRateTitle: '偏胖'
          })
        }
      } else if (sex == 2) {
        if ((this.data.bodyFat.fat * 100) < 4.0){
          this.setData({
            fatRateTitle: '瘦'
          })
        }else if((this.data.bodyFat.fat * 100) >= 4.0 && (this.data.bodyFat.fat * 100) <= 18.0) {
          this.setData({
            fatRateTitle: '瘦'
          })
        } else if ((this.data.bodyFat.fat * 100) >= 18.1 && (this.data.bodyFat.fat * 100) <= 23.0) {
          this.setData({
            fatRateTitle: '偏瘦'
          })
        } else if ((this.data.bodyFat.fat * 100) >= 13.1 && (this.data.bodyFat.fat * 100) <= 28.0) {
          this.setData({
            fatRateTitle: '标准'
          })
        } else if ((this.data.bodyFat.fat * 100) >= 28.1 && (this.data.bodyFat.fat * 100) <= 33.0) {
          this.setData({
            fatRateTitle: '偏胖'
          })
        } else if ((this.data.bodyFat.fat * 100) >= 33.1 && (this.data.bodyFat.fat * 100) <= 45.0) {
          this.setData({
            fatRateTitle: '胖'
          })
        } else if ((this.data.bodyFat.fat * 100) > 45.0){
          this.setData({
            fatRateTitle: '胖'
          })
        }
      }

    } else if (year > 30) {

      if (sex == 1) {
        if ((this.data.bodyFat.fat * 100)<4.0){

          this.setData({
            fatRateTitle: '瘦'
          })

        }else if((this.data.bodyFat.fat * 100) >= 4.0 && (this.data.bodyFat.fat * 100) <= 14.0) {
          this.setData({
            fatRateTitle: '瘦'
          })
        } else if ((this.data.bodyFat.fat * 100) >= 14.1 && (this.data.bodyFat.fat * 100) <= 19.0) {
          this.setData({
            fatRateTitle: '偏瘦'
          })
        } else if ((this.data.bodyFat.fat * 100) >= 19.1 && (this.data.bodyFat.fat * 100) <= 24.0) {
          this.setData({
            fatRateTitle: '标准'
          })
        } else if ((this.data.bodyFat.fat * 100) >= 24.1 && (this.data.bodyFat.fat * 100) <= 29.0) {
          this.setData({
            fatRateTitle: '偏胖'
          })
        } else if ((this.data.bodyFat.fat * 100) >= 29.1 && (this.data.bodyFat.fat * 100) <= 45.0) {
          this.setData({
            fatRateTitle: '胖'
          })
        } else if ((this.data.bodyFat.fat * 100) >45.0){
          this.setData({
            fatRateTitle: '胖'
          })
        }
      } else if (sex == 2) {
        if ((this.data.bodyFat.fat * 100) < 4.0){

          this.setData({
            fatRateTitle: '瘦'
          })

        }else if((this.data.bodyFat.fat * 100) >= 4.0 && (this.data.bodyFat.fat * 100) <= 20.0) {
          this.setData({
            fatRateTitle: '瘦'
          })
        } else if ((this.data.bodyFat.fat * 100) >= 20.1 && (this.data.bodyFat.fat * 100) <= 25.0) {
          this.setData({
            fatRateTitle: '偏瘦'
          })
        } else if ((this.data.bodyFat.fat * 100) >= 25.1 && (this.data.bodyFat.fat * 100) <= 30.0) {
          this.setData({
            fatRateTitle: '标准'
          })
        } else if ((this.data.bodyFat.fat * 100) >= 30.1 && (this.data.bodyFat.fat * 100) <= 35.0) {
          this.setData({
            fatRateTitle: '偏胖'
          })
        } else if ((this.data.bodyFat.fat * 100) >= 35.1 && (this.data.bodyFat.fat * 100) <= 45.0) {
          this.setData({
            fatRateTitle: '胖'
          })
        } else if ((this.data.bodyFat.fat * 100)>45.0){
          this.setData({
            fatRateTitle: '胖'
          })
        }
      }

    }
    
    //体型分数
    var fatN, muscleN, visceralFatN, bodyYearN, bmrN, bmiN;

    //体脂
    if (this.data.fatRateTitle == '偏瘦' || this.data.fatRateTitle == '偏胖') {
      fatN = (-2);
    } else if (this.data.fatRateTitle == '瘦' || this.data.fatRateTitle == '胖') {
      fatN = (-4);
    } else if (this.data.fatRateTitle == '标准'){
      fatN = 0;
    }

    //肌肉率
    if (this.data.muscleTitle == '低') {
      muscleN = (-4);
    } else if (this.data.muscleTitle == '标准') {
      muscleN = 2;
    } else if (this.data.muscleTitle == '偏高') {
      muscleN = 4;
    } else if (this.data.muscleTitle == '高') {
      muscleN = 6;
    }

    //内脏脂肪
    if (this.data.fatWeightTitle == '警示型') {
      visceralFatN = (-2);
    } else if (this.data.fatWeightTitle == '危险型') {
      visceralFatN = (-4);
    } else if (this.data.fatWeightTitle == '极度危险') {
      visceralFatN = (-6);
    }

    //身体年龄
    if (this.data.bodyFat.bodyAge > year) {
      bodyYearN = (-2);
    } else {
      bodyYearN = 2;
    }


    //基础代谢率
    if (sex == 1) {
      if (year >= 1 && year <= 2) {
        if (BMR < 700) {
          bmrN = (-2);
        } else {
          bmrN = 0;
        }
      } else if (year >= 3 && year <= 5) {
        if (BMR< 900) {
          bmrN = (-2);
        } else {
          bmrN = 0;
        }
      } else if (year >= 6 && year <= 8) {
        if (BMR < 1090) {
          bmrN = (-2);
        } else {
          bmrN = 0;
        }
      } else if (year >= 9 && year <= 11) {
        if (BMR < 1290) {
          bmrN = (-2);
        } else {
          bmrN = 0;
        }
      } else if (year >= 12 && year <= 14) {
        if (BMR < 1480) {
          bmrN = (-2);
        } else {
          bmrN = 0;
        }
      } else if (year >= 15 && year <= 17) {
        if (BMR < 1610) {
          bmrN = (-2);
        } else {
          bmrN = 0;
        }
      } else if (year >= 18 && year <= 29) {
        if (BMR < 1550) {
          bmrN = (-2);
        } else {
          bmrN = 0;
        }
      } else if (year >= 30 && year <= 49) {
        if (BMR < 1500) {
          bmrN = (-2);
        } else {
          bmrN = 0;
        }
      } else if (year >= 50 && year <= 69) {
        if (BMR < 1350) {
          bmrN = (-2);
        } else {
          bmrN = 0;
        }
      } else if (year > 70) {
        if (BMR < 1220) {
          bmrN = (-2);
        } else {
          bmrN = 0;
        }
      }
    } else if (sex == 2) {

      if (year >= 1 && year <= 2) {
        if (BMR < 700) {
          bmrN = (-2);
        } else {
          bmrN = 0;
        }
      } else if (year >= 3 && year <= 5) {
        if (BMR < 860) {
          bmrN = (-2);
        } else {
          bmrN = 0;
        }
      } else if (year >= 6 && year <= 8) {
        if (BMR < 1000) {
          bmrN = (-2);
        } else {
          bmrN = 0;
        }
      } else if (year >= 9 && year <= 11) {
        if (BMR < 1180) {
          bmrN = (-2);
        } else {
          bmrN = 0;
        }
      } else if (year >= 12 && year <= 14) {
        if (BMR < 1340) {
          bmrN = (-2);
        } else {
          bmrN = 0;
        }
      } else if (year >= 15 && year <= 17) {
        if (BMR < 1300) {
          bmrN = (-2);
        } else {
          bmrN = 0;
        }
      } else if (year >= 18 && year <= 29) {
        if (BMR < 1210) {
          bmrN = (-2);
        } else {
          bmrN = 0;
        }
      } else if (year >= 30 && year <= 49) {
        if (BMR < 1170) {
          bmrN = (-2);
        } else {
          bmrN = 0;
        }
      } else if (year >= 50 && year <= 69) {
        if (BMR < 1110) {
          bmrN = (-2);
        } else {
          bmrN = 0;
        }
      } else if (year > 70) {
        if (BMR < 1010) {
          bmrN = (-2);
        } else {
          bmrN = 0;
        }
      }

    }

    //BMI值
    if (bmiData < 18.5) {
      bmiN = (-2);
    } else if (bmiData >= 18.5 && bmiData <= 23.9) {
      bmiN = 0;
    } else if (bmiData >= 24 && bmiData < 26) {
      bmiN = (-2);
    } else if (bmiData >= 26 && bmiData < 28) {
      bmiN = (-4);
    } else if (bmiData >= 28) {
      bmiN = (-6);
    }
     

    this.setData({
      bodyTypeNum: 82 + fatN + muscleN + visceralFatN + bodyYearN + bmrN + bmiN
    })


    if (this.data.bodyTypeNum <= 60) {

      this.setData({
        bodyTypeTitle:'危险性'
      })

    } else if (this.data.bodyTypeNum > 60 && this.data.bodyTypeNum < 70) {

      this.setData({
        bodyTypeTitle: '肥胖型'
      })

    } else if (this.data.bodyTypeNum >= 70 && this.data.bodyTypeNum <= 78) {


       if(sex==1){

         var standardWeight = (Height - 105);

         if (currntWeight > standardWeight) {

           this.setData({
             bodyTypeTitle: '微胖'
           })

         } else if (currntWeight <= standardWeight) {

           this.setData({
             bodyTypeTitle: '偏瘦'
           })

         }

       }else if(sex==2){
 
         var standardWeight = (Height - 110);

         if (currntWeight > standardWeight) {

           this.setData({
             bodyTypeTitle: '微胖'
           })

         } else if (currntWeight <= standardWeight) {

           this.setData({
             bodyTypeTitle: '偏瘦'
           })

         }

       }

    } else if (this.data.bodyTypeNum > 78 && this.data.bodyTypeNum <= 90) {
      this.setData({
        bodyTypeTitle: '健康型'
      })
    } else if (this.data.bodyTypeNum >= 90) {
      this.setData({
        bodyTypeTitle: '强壮型'
      })
    }


  },
  savePersoInfoH:function(){
    var _this = this;
      util.getP(function () {
        _this.savePersoInfo();
      })
  },
  savePersoInfo: function(){
     var _this = this;
     var birth = _this.data.birth;
      birth = birth.replace(/-/g, '');

      var data = {
        unionid: _this.data.unionid,
        gender: _this.data.sex,
        height: _this.data.height,
        birthdate: birth
      }

     wx.request({
       method: "POST",
       url: api.updateUserInfo + api._p + '&' + util.getQuery(data),
       success: function (res) {

         util.getP(function(){
           _this.getProfile(function(){
             _this.data.BMI = bmi.toMathBmi(_this.data.homeData.currentWeight, _this.data.registeredData.height);//计算BMI值
             _this.data.standard = bmi.standMeasur(_this.data.registeredData.height);//计算标准三围
             _this.data.beautBody = bmi.bodyMeasur(_this.data.registeredData.height);//计算美体三围
             _this.data.bodyTypeChinese = bmi.getBodyTypeChinese(_this.data.BMI.bmi);
             _this.data.standardW = bmi.toMathSBW(_this.data.registeredData.gender, _this.data.registeredData.height);
             _this.data.BeauBodyW = bmi.BeauBody(_this.data.registeredData.height, _this.data.registeredData.gender);
             _this.data.bmr = bmi.toMathBMR(_this.data.registeredData.gender, _this.data.homeData.currentWeight, _this.data.registeredData.height, _this.data.registeredData.age);

             _this.setData({
               BMI: _this.data.BMI,
               bodyTypeChinese: _this.data.bodyTypeChinese,
               standardW: Number(_this.data.standardW.weight).toFixed(1),
               BeauBodyW: Number(_this.data.BeauBodyW.beautWeight).toFixed(1),
               beautBody: _this.data.beautBody,
               standard: _this.data.standard,
               bmr: _this.data.bmr,
               bmrMin: _this.data.bmr - (_this.data.bmr * 0.1),
               bmrMax: _this.data.bmr + (_this.data.bmr * 0.1),
               gapStandard: (Math.abs(parseInt(_this.data.homeData.currentWeight) - parseInt(_this.data.standardW.weight)) * 2).toFixed(1),
               gapBeauBody: (Math.abs(parseInt(_this.data.BeauBodyW.beautWeight) - parseInt(_this.data.homeData.currentWeight)) * 2).toFixed(1)
             })

             setTimeout(function(){

               _this.getBodyFatWorld(_this.data.registeredData.gender, _this.data.registeredData.age, _this.data.bmr, _this.data.BMI.bmi, _this.data.registeredData.height, parseInt(_this.data.homeData.currentWeight));//计算体脂信息
             },500)



           });

           _this.setData({
             openStaus: false
           })

         })
         
       }
     })

  },
  //人物跑动
  indicator:function(){
    var _this = this;
    var bmi = this.data.BMI.bmi;
    var bmiValue = this.data.BMI.bmiValue;

    if (bmi <= bmiValue.thin) {//偏瘦
    
      if (_this.data.registeredData.gender==1){
          _this.setData({
            run: 'men1'
          })
        }else{
          _this.setData({
            run: 'women1'
          })
        }

    _this.setData({
      leftValue: (bmi / bmiValue.thin) * 20
    })   
    if (bmi<=10){
      _this.setData({
        leftValue: 4
      }) 
    }

    } else if (bmi >= bmiValue.standard && bmi < bmiValue.fat_lv1) {//正常

      
      if (_this.data.registeredData.gender == 1) {
        _this.setData({
          run: 'men2'
        })
      } else {
        _this.setData({
          run: 'women2'
        })
      }

      _this.setData({
        leftValue: ((bmi - bmiValue.standard) / (bmiValue.fat_lv1 - bmiValue.standard)) * 20 + 25
      })  
       
    } else if (bmi >= bmiValue.fat_lv1 && bmi <= bmiValue.super_fat) {//偏胖

      if (_this.data.registeredData.gender == 1) {
        _this.setData({
          run: 'men3'
        })
      } else {
        _this.setData({
          run: 'women3'
        })
      }

      _this.setData({
        leftValue: ((bmi - bmiValue.fat_lv1) / (bmiValue.super_fat - bmiValue.fat_lv1)) * 20 + 50
      })  
    
    } else if (bmi >= bmiValue.super_fat){

      if (_this.data.registeredData.gender == 1) {
        _this.setData({
          run: 'men4'
        })
      } else {
        _this.setData({
          run: 'women4'
        })
      }

      _this.setData({
        leftValue: (bmi / bmiValue.super_fat) * 20 + 60
      })
      if (bmi >= 42) {
        _this.setData({
          leftValue: 96
        })
      }

    }

    var animation = wx.createAnimation({
      duration: 2000,
      timingFunction: 'ease-in',
    })

    var animation2 = wx.createAnimation({
      duration: 2000,
      timingFunction: 'ease-in',
    })

    var animation3 = wx.createAnimation({
      duration: 2000,
      timingFunction: 'ease-in',
    })

    _this.animation = animation;
    setTimeout(function(){
      animation.left(_this.data.leftValue+'%').step();
      _this.setData({
        animationData: animation.export()
      })
    },500)

    _this.animation2 = animation2;
    setTimeout(function () {
      animation2.left((_this.data.leftValue-4) + '%').step();
      _this.setData({
        animationData2: animation2.export()
      })
    }, 500)

    _this.animation3 = animation3;
    setTimeout(function () {
      animation3.left((_this.data.leftValue-4) + '%').step();
      _this.setData({
        animationData3: animation3.export()
      })
    }, 500)

  }

})