
var api = require('../../js/funs/api.js');
var WxParse = require('../../js/wxParse/wxParse.js');
var util = require('../../utils/util.js')

Page({
   data:{
     hotId:null,
     detailsData: '',
     detailsDataTtile:'',
     detailsDataCreateTime: '',
     article:''
   },
   onLoad: function (options){

    this.setData({
      hotId: options.hotId
    })

     wx.setNavigationBarTitle({
       title: "热门推荐内容"
     })
   },
   onShow:function(){
     var _this = this;

     util.getP(function(){
       _this.queryHotDetail();
     })

     
   },
   onReady: function(){

   },
   queryHotDetail: function(){
     var _this = this;

     var data={
       hotId: parseInt(_this.data.hotId)
     }

     wx.request({
       method: 'POST',
       url: api.queryHotDetail + api._p +'&' + util.getQuery(data),
       dataType: 'json',
       success: function (res) {
  
         if (res.data.result.data){
         _this.setData({
           detailsDataTtile: res.data.result.data[0].titel,
           detailsDataCreateTime: _this.formatDate(res.data.result.data[0].createTime),
           article: WxParse.wxParse('article', 'html', res.data.result.data[0].details, _this, 5)
         })

         
         }
       }
     })
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
   }
})