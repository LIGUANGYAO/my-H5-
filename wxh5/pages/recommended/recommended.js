
var api = require('../../js/funs/api.js');
var util = require('../../utils/util.js')
let down =null;
Page({
  data: {
    pageCount: 7,
    initList: [],
    initList2:[],
    hotMainData:[],
    timer:null,
    pageSize:1,
    lodingStus:false,
    noDataStus: false,
    adImgeData:{},
    adImge2: null,
    adLink2:null
  },
  onLoad: function () {
    
   
    wx.setNavigationBarTitle({
      title: "热门推荐"
    })
  },
  onReady: function () {

 
  },
  onShow: function(){
    var _this = this;

    util.getP(function(){
      _this.getAdvertising();
      setTimeout(function () {
        _this.queryHotMain();
      }, 500)
    })
  },
  linkAd: function(){
    var _this = this;
    wx.navigateTo({
      url: '/pages/ad/ad'
    });  
   
  },
  //获取广告
  getAdvertising: function () {
    var _this = this;
    var codes = ['hot_1', 'hot_2'];
    wx.request({
      method: 'POST',
      url: api.getAdvertising + api._p,
      processData: false,
      'contentType': 'application/json',
      data: JSON.stringify(codes),
      success: function (res) {
        if ( res.data.result.data) {

            _this.setData({
              adImge2: res.data.result.data[1].path,
              adLink2: res.data.result.data[1].adLink
            })

            var objAd={};

            objAd['adImge2'] = _this.data.adImge2,
            objAd['adLink2'] = _this.data.adLink2

              _this.setData({
                adImgeData: objAd
              })
        
        }


      }
    })
  },
  queryHotMain: function(){

    var _this = this;
    var data={
      pageSize: 1,
      pageNum: _this.data.pageCount
    }
    
    wx.request({
      url: api.queryHotMain + api._p + '&' + util.getQuery(data),
      method: 'POST',
      dataType: 'json',
      success: function (res) {
        _this.setData({
          initList2: res.data.result.data
        })

       // console.log(_this.data.initList)

        if (res.data.result.data) {
          for (var i = 0; i < res.data.result.data.length; i++) {
            var obj = {};
            obj["mainName"] = res.data.result.data[i].mainName,
              obj["mainCname"] = res.data.result.data[i].mainCname,
              obj["picPath"] = res.data.result.data[i].picPath,
              obj["mainid"] = res.data.result.data[i].mainid,
              _this.data.hotMainData.push(obj);
          }


         // _this.data.hotMainData.splice(2, 0, _this.data.adImgeData)

         _this.setData({
           hotMainData: _this.data.hotMainData
         })


        }
     
        setTimeout(function(){
          if (_this.data.initList2.length<3){
               return false;
          }
        },500)

      }
    })
  },
  //跳转到热门推荐页面
  linkToHot: function (event) {
    var mainid = event.currentTarget.dataset.mainid;
    wx.navigateTo({
      url: '/pages/hotdetail/hotdetail?mainid='+ mainid
    });
  },
  onReachBottom: function(){
    var _this = this;

    clearTimeout(_this.data.timer);

    _this.data.timer = setTimeout(function(){

      if (down == null) {
        down = _this.data.pageSize;
        }
        down++;

      console.log("页数:" + down);

      if (_this.data.initList == null){
           _this.setData({
             noDataStus: true,
             lodingStus: false
           })
           console.log("没数据了")
           return;
         }else{

        _this.setData({
          lodingStus: true
        })

       console.log("有数据")
     
      wx.request({
        method: 'POST',
        url: api.queryHotMain+api._p,
        data: {
          pageSize: down,
          pageNum: _this.data.pageCount
        },
        dataType: 'json',
        success: function (res) {

          _this.setData({
            initList: res.data.result.data
          })

          if (_this.data.initList == null){
            _this.setData({
             noDataStus: true,
             lodingStus: false
           })
          }

          if (_this.data.initList) {
            for (var i = 0; i < res.data.result.data.length; i++) {
              var obj = {
                mainName: res.data.result.data[i].mainName,
                mainCname: res.data.result.data[i].mainCname,
                picPath: res.data.result.data[i].picPath,
                mainid: res.data.result.data[i].mainid,
              };
              _this.data.hotMainData.push(obj);
            }

            _this.setData({
              noDataStus: true,
              lodingStus: false
            })

            _this.setData({
              hotMainData: _this.data.hotMainData
            })


          }
        }
      })

      }
       
    },300)

  }
})