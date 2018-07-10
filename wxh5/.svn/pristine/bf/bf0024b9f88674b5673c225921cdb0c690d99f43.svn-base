
var api = require('../../js/funs/api.js');
var util = require('../../utils/util.js')
let down = null;
Page({

  data:{
    mainid:null,
    queryHotData:[],
    timer:null,
    pageSize:1,
    initList:[],
    initList2:[],
    lodingStus:false,
    noDataStus:false
  },
  onLoad: function (options){

    wx.setNavigationBarTitle({
      title: "热门推荐分类列表"
    })

    this.setData({
      mainid: options.mainid
    })
  },
  onShow: function(){
    var _this = this;

    util.getP(function(){
      _this.queryHot();
    })

  },
  onReady: function(){

  },
  formatDate: function (input) {
    var d = new Date(input);
    var year = d.getFullYear();
    var month = (d.getMonth() + 1) < 10 ? '0' + (d.getMonth() + 1) : '' + (d.getMonth() + 1);
    var day = d.getDate() < 10 ? '0' + d.getDate() : '' + d.getDate();
    var hour = d.getHours();
    var minutes = d.getMinutes();
    var seconds = d.getSeconds();
    return year + '-' + month + '-' + day;
  },
  linkto: function(event){

    var hotId = event.currentTarget.dataset.hotid;
    console.log("热门ID"+hotId)
    wx.navigateTo({
      url: '/pages/hotarticles/hotarticles?hotId=' + hotId
    });

  },
  queryHot: function(){
    var _this = this;

    
    var data={
      mainid: _this.data.mainid,
      pageSize: 1,
      pageNum: 10
    }

    wx.request({
      method: 'POST',
      url: api.queryHot + api._p + '&' + util.getQuery(data),
      dataType: 'json',
      success: function (res) {

        _this.setData({
          initList2: res.data.result.data
        })

        if (res.data.result.data) {
          for (var i = 0; i < res.data.result.data.length; i++) {
            var obj = {};
            obj["titel"] = res.data.result.data[i].titel,
              obj["createTime"] = _this.formatDate(res.data.result.data[i].createTime),
              obj["picUrl"] = res.data.result.data[i].picUrl,
              obj["hotId"] = res.data.result.data[i].hot_id,
              _this.data.queryHotData.push(obj);
          }

          _this.setData({
            queryHotData: _this.data.queryHotData
          })
        }
        setTimeout(function () {
          if (_this.data.initList2.length<10){
            return false;
          }
        }, 500)
      }
    })
  },
  onReachBottom: function () {

    var _this = this;

    clearTimeout(_this.data.timer);


    if (down == null) {
        down = _this.data.pageSize
     }
    down++

    console.log("页：" + down)

    if (_this.data.initList==null){
        _this.setData({
          noDataStus: true,
          lodingStus: false
        })
        return
     }else{

      _this.setData({
        lodingStus: true
      })
   
      clearTimeout(_this.data.timer);
    _this.data.timer = setTimeout(function () {

      var data={
        mainid: _this.data.mainid,
        pageSize: down,
        pageNum: 10
      }

      wx.request({
        method: 'POST',
        url: api.queryHot + api._p + '&' + util.getQuery(data),
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
                titel: res.data.result.data[i].titel,
                createTime: _this.formatDate(res.data.result.data[i].createTime),
                picUrl: res.data.result.data[i].picUrl,
                hotId: res.data.result.data[i].hot_id
              };
              _this.data.queryHotData.push(obj);
            }
            _this.setData({
              lodingStus: false,
              noDataStus: true,
            })


            _this.setData({
              queryHotData: _this.data.queryHotData
            })


          }
        }
      })

    }, 500)
    }
  }

})