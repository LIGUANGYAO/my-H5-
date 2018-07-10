
var api = require('../../js/funs/api.js');
var util = require('../../utils/util.js');

let up=null;

let down=null;

Page({
  data: {
    scoreInfor: {},
    scorerRank: {},
    scorerRankScore:'',
    showPklistData: [],
    showPklistData2: null,
    rank: null,
    rankNumber: null,
    timer: null,
    initList: null,
    showLoading: false,
    meUnionid: null,
    initListDown: null,
    upNumber: null,
    downNumber: null,
    toStingNumber: null,
    loadStuas:false,
    noDataStuas:false,
    TopnoDataStuas:false,
    TopLodingStuas: false
  },
  onLoad: function () {
    
    wx.setNavigationBarTitle({
      title: "PK榜"
    })

    wx.showLoading({
      title: '加载中',
    })
  
    
  },
  onShow: function(){
    var _this = this;
    util.getP(function () {
      _this.getScore();
    })
   
  },
  onReady: function () {
  
  },
  onReachBottom: function(){
    var _this = this;

    _this.setData({
      rankNumber: Number(_this.data.rank)
    })

    _this.setData({
      downNumber: _this.data.rankNumber
    })

    _this.setData({
      loadStuas: true,
      noDataStuas: false
    })

    if (_this.data.initListDown && _this.data.initListDown.length == 0){
       console.log("没数据");
       _this.setData({
         loadStuas: false,
         noDataStuas:true
       })
    }


    if (down == null)
      down = _this.data.downNumber;
      down++;
 
    
    this.timer =setTimeout(function(){


      console.log('下一页' + down);

      wx.request({
        method: 'GET',
        url: api.showPklist + api._p,
        data:{
          start: down,
          rows: 10
        },
        success: function(res){

          _this.setData({
            initListDown: res.data.data.list
          })

          if (_this.data.initListDown.length==0){
            _this.setData({
              loadStuas: false,
              noDataStuas: true
            })
          }
            if(res.data.data){
              for (var i =0;i< res.data.data.list.length; i++) {
                var obj = {};
                obj["score"] = (res.data.data.list[i].score).toFixed(2),
                  obj["gender"] = res.data.data.list[i].gender,
                  obj["headImgUrl"] = res.data.data.list[i].headImgUrl,
                  obj["likeSize"] = res.data.data.list[i].likeSize,
                  obj["name"] = res.data.data.list[i].name,
                  obj["likeStatus"] = res.data.data.list[i].likeStatus,
                  obj["unionid"] = res.data.data.list[i].unionid,
                  obj["rank"] = res.data.data.list[i].rank,
                  _this.data.showPklistData.push(obj);
              } 
            }

            _this.setData({
              showPklistData: _this.data.showPklistData
            })
        }
      })

       
    },600)



  },
  onPullDownRefresh: function(){
    wx.stopPullDownRefresh();
    var _this =this;

  
    _this.setData({
      rankNumber: Number(_this.data.rank)
    })

  
    _this.setData({
      upNumber: _this.data.rankNumber
    })

    if (up == null){
        up = _this.data.upNumber;
      }
      
      up--;

    console.log('上页:' + up);

    if (up >= 0) {
      _this.setData({
        TopLodingStuas: true,
        TopnoDataStuas: false
      })
    }

    _this.timer =  setTimeout(function(){

        if(up<= -1){
          up = " ";
          _this.setData({
            TopnoDataStuas: true,
            TopLodingStuas: false
          })

          setTimeout(function(){
            _this.setData({
              TopnoDataStuas: false,
              TopLodingStuas: false
            })
          },400)
          console.log("数据加载完");
          return;
        }else{
          
          setTimeout(function(){
            _this.setData({
              TopLodingStuas: false
            })
          },300)

        }

        wx.request({
          method: 'GET',
          url: api.showPklist + api._p,
          data: {
            start: up,
            rows: 10
          },
          success: function (res) {
            if (res.data.data) {
              for (var i = res.data.data.list.length - 1; i >= 0; i--) {
                var obj = {};
                obj["score"] = (res.data.data.list[i].score).toFixed(2),
                  obj["gender"] = res.data.data.list[i].gender,
                  obj["headImgUrl"] = res.data.data.list[i].headImgUrl,
                  obj["likeSize"] = res.data.data.list[i].likeSize,
                  obj["name"] = res.data.data.list[i].name,
                  obj["likeStatus"] = res.data.data.list[i].likeStatus,
                  obj["unionid"] = res.data.data.list[i].unionid,
                  obj["rank"] = res.data.data.list[i].rank,
                  _this.data.showPklistData.unshift(obj);
              }
            }

            _this.setData({
              showPklistData: _this.data.showPklistData
            })

          }

        })       
    },600)
  },
  getScore: function(){
    var _this = this;
    wx.request({
      method: 'GET',
      url: api.showScore+api._p,
      dataType: 'json',
      async: false,
      success: function (res) {
        _this.setData({
          scoreInfor: res.data[1],
          scorerRank: res.data[0],
          scorerRankScore: Number(res.data[0].score).toFixed(2),
          meUnionid: res.data[1].unionid
        })


        console.log("排名值:" + _this.data.scorerRank.rank);

        if (_this.data.scorerRank.rank !== "null" && _this.data.scorerRank.rank !== "0") {

          if (_this.data.scorerRank.rank == 10) {
            _this.setData({
              toStingNumber: "0"
            })
          } else {
            _this.setData({
              toStingNumber: (Number(_this.data.scorerRank.rank) / 10).toString()
            })
          }


          if (_this.data.toStingNumber.indexOf(".") > 0) {


            _this.setData({
              rank: _this.data.toStingNumber.substring(0, _this.data.toStingNumber.indexOf("."))
            })
            console.log("存在小数");
          } else {
            _this.setData({
              rank: Number(_this.data.toStingNumber) - 1
            })
            console.log("整数:" + _this.data.rank);
          }


        } else if (_this.data.scorerRank.rank == "0") {
          _this.setData({
             rank: 0
          })
        } else if (_this.data.scorerRank.rank == "null") {
          _this.setData({
            rank: null
          })
        }

        setTimeout(function () {
          util.getP(function(){
            _this.getPkList();
          })
        }, 300)

      }
    })
  },
  getPkList: function(){
    var _this = this;
    wx.request({
      method: 'GET',
      url: api.showPklist+ api._p,
      data: {
        start: _this.data.rank,
        rows: 10
      },
      success: function (res) {
        _this.setData({
          initList: res.data.data
        })

        if (res.data.data) {

          for (var i = 0; i < res.data.data.list.length; i++) {
            var obj = {};
            obj["score"] = (res.data.data.list[i].score).toFixed(2),
              obj["gender"] = res.data.data.list[i].gender,
              obj["headImgUrl"] = res.data.data.list[i].headImgUrl,
              obj["likeSize"] = res.data.data.list[i].likeSize,
              obj["name"] = res.data.data.list[i].name,
              obj["likeStatus"] = res.data.data.list[i].likeStatus,
              obj["unionid"] = res.data.data.list[i].unionid,
              obj["rank"] = res.data.data.list[i].rank,
              _this.data.showPklistData.push(obj);

            _this.setData({
              showPklistData: _this.data.showPklistData
            })
            // if (_this.data.showPklistData[i].unionid == _this.data.meUnionid) {
            //   //console.log(_this.showPklistData[i].rank);
            //   //console.log(_this.showPklistData.splice(i,1));
            //   _this.setData({
            //     showPklistData2: _this.data.showPklistData.splice(i, 1)
            //   })

            //   var obj2 = {}
            //   obj2["score"] = _this.data.showPklistData2[0].score,
            //     obj2["gender"] = _this.data.showPklistData2[0].gender,
            //     obj2["headImgUrl"] = _this.data.showPklistData2[0].headImgUrl,
            //     obj2["likeSize"] = _this.data.showPklistData2[0].likeSize,
            //     obj2["name"] = _this.data.showPklistData2[0].name,
            //     obj2["likeStatus"] = _this.data.showPklistData2[0].likeStatus,
            //     obj2["unionid"] = _this.data.showPklistData2[0].unionid,
            //     obj2["rank"] = _this.data.showPklistData2[0].rank,
            //     _this.data.showPklistData.unshift(obj2);
            // }
          }

          // _this.setData({
          //   showPklistData: _this.data.showPklistData
          // })

          wx.hideLoading();

        }
        setTimeout(function () {

          if (_this.data.showPklistData.length < 10) {
            return false;
          } else {

          }
        }, 500)
      }
    })
  },
  showGood: function (event) {
    var _this = this;
    var likeUnionId = event.currentTarget.dataset.unionid;

    var status = event.currentTarget.dataset.likestatus;

    var statusNumber;

    if (status==true){

      statusNumber=2   
      }else{
        statusNumber = 1
     }

    var index = event.currentTarget.dataset.index;

    wx.request({
      method: 'post',
      url: api.showGood+api._p,
      data: {
        unionid: _this.data.scoreInfor.unionid,
        likeUnionId: likeUnionId,
        status: statusNumber
      },
      success: function (res) {

        if (statusNumber==1){
 
 
          _this.data.showPklistData[index].likeStatus = true;
          _this.data.showPklistData[index].likeSize++;

          _this.setData({
            showPklistData: _this.data.showPklistData
          })
         console.log("点赞")
        }else{
     
          _this.data.showPklistData[index].likeStatus = false;
          _this.data.showPklistData[index].likeSize--;

          _this.setData({
            showPklistData: _this.data.showPklistData
          })
          console.log("取消点赞")
        }

      }
    })
  }
})