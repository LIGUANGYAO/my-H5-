var amapFile = require('../../js/amap-wx.js')
var util = require('../../utils/util.js')
var api = require('../../js/funs/api.js')
var qqmap = require('../../js/qqmap-wx-jssdk.js')

var myAmapFun = new amapFile.AMapWX({ key: '979b6bb52a7b80d6fd1162328a7e6f38' }); 


Page({
  data: {
    markers: [],
    latitude: 0,
    longitude: 0,
    markers: [],
    controls: [
      
    ],
    mapHeight: '100%',
    scale: 18,

    currentDot: {},
    dotModalDisplay: false,
    nearbyModalDisplay: false,
    dotData: [],

    polylines: []
  },
  onShow: function () {
    var that = this;
    this.location() 
    this.setData({
      nearbyModalDisplay: false,
      dotModalDisplay:false,
      mapHeight: '100%'
    })

    setTimeout(()=> {

      var info = wx.getSystemInfoSync();
      var size = 40;
      
      this.setData({
        controls: [
          {
            id: 1,
            clickable: true,
            iconPath: '/images/map/location.png',
            position: {
              left: 8,
              top: info.windowHeight - size - 8,
              width: size,
              height: size
            }
          },
          {
            id: 2,
            clickable: true,
            iconPath: '/images/map/nearby.png',
            position: {
              width: parseInt(info.windowWidth / 3) + 10,
              height: size,
              left: parseInt(info.windowWidth / 3),
              top: info.windowHeight - size - 8
            }
          }
        ]
      })
    }, 1000)
  },
  location: function () {
    var _this = this;
    wx.getLocation({
      type: 'gcj02',
      success: function(res) {
        _this.setData({
          latitude: res.latitude,
          longitude: res.longitude
        })

        _this.getMarkers()
        _this.getDotData('')

        var app = getApp();
        if (app.globalData.long) {
          _this.getWalkingRoute(app.globalData.long, app.globalData.lat)
          app.globalData.long = null;
        }
        
      },
    })
  },

  getMarkers: function() {
    var _this = this;
    var data = {
      longitude: this.data.longitude,
      latitude: this.data.latitude
    }
    wx.request({
      url: api.getNearWeightScale + api._p + '&' + util.getQuery(data),

      success: function(res) {

        data = res.data.map(function(item, index) {
          item.width = 32;
          item.height = 32;
          item.iconPath = '/images/map/dot_blue.png'
          item.desc = item.name
          item.id = index
          return item;
        })
        _this.setData({
          markers: data
        })


      }
    })
  },
  getDotData: function(aname) {
    var _this = this;
    var data = {
      aname: aname,
      longitude: this.data.longitude,
      latitude: this.data.latitude
    }
    wx.request({
      url: api.getWeightScaleAddress + api._p + '&' + util.getQuery(data),
      success: function(res) {
        var data = res.data;
        data.forEach(function(item) {
          item.distance = util.GetDistance(_this.data.longitude, _this.data.latitude, item.longitude, item.latitude).toFixed(0)
        })
        _this.setData({
          dotData: data
        })
      }
    })
  },
  getWalkingRoute: function(longitude, latitude) {
    var that = this;
    myAmapFun.getWalkingRoute({
      origin: this.data.longitude + ',' + this.data.latitude,
      destination: longitude + ',' + latitude,
      success: function (data) {
        var points = [];
        if (data.paths && data.paths[0] && data.paths[0].steps) {
          var steps = data.paths[0].steps;
          for (var i = 0; i < steps.length; i++) {
            var poLen = steps[i].polyline.split(';');
            for (var j = 0; j < poLen.length; j++) {
              points.push({
                longitude: parseFloat(poLen[j].split(',')[0]),
                latitude: parseFloat(poLen[j].split(',')[1])
              })
            }
          }
        }

        that.setData({
          polyline: [{
            points: points,
            color: "#0091ff",
            width: 6
          }],
          scale: 18
        });
      }
    })
  },
  onMarkerTap: function(e) {
    var index = e.markerId;
    var marker = this.data.markers[index]
    var shopId = marker.shopId;
    if (!shopId) {
      return;
    }
    if (this.data.nearbyModalDisplay)
      return;

    this.setData({
      dotModalDisplay: true,
      mapHeight: '70%'
    })
    var that = {
      currentDot: {}
    };
    var _this = this;

    wx.request({
      url: api.getBusinessDetails + api._p + '&id=' + shopId,
      success: function(res) {
        var data = res.data;

        if (data) {
          that.currentDot.devicename = data.name || item.name;
          that.currentDot.id = data.id;
          that.currentDot.address = data.address;
          that.currentDot.longitude = marker.longitude;
          that.currentDot.latitude = marker.latitude;
          that.currentDot.distance = util.GetDistance(_this.data.longitude, _this.data.latitude, marker.longitude, marker.latitude).toFixed(0);
          that.currentDot.serviceTime = data.serviceStartTime + '-' + data.serviceEndTime; //服务时间
          that.currentDot.tel = data.telephone; //联系电话
          that.currentDot.introduce = data.remark; //商家介绍
          that.currentDot.logUrl = data.imgLogo || '';
          that.currentDot.envImage1 = data.envImage1 || '';
          that.currentDot.envImage2 = data.envImage2 || '';
          //地址不存在则等于空
          if (typeof that.currentDot.address === 'number') {
            that.currentDot.address = '  ';
          }

          _this.setData({
            currentDot: that.currentDot
          })
        }
      }
    })
  },

  onMapTap: function() {

    this.setData({
      dotModalDisplay: false,
      mapHeight: '100%'
    })    
  },

  onControlTap: function(e) {
    var id = e.controlId;

    if (id == 2) {
      this.setData({
        nearbyModalDisplay: true,
        mapHeight: '50%'
      })
    } else if (id == 1) {
      this.setData({
        scale: 18,
        polyline: []
      })
      this.location()
    }
  },

  closeNearbyModal: function() {
    this.setData({
      nearbyModalDisplay: false,
      mapHeight: '100%'
    })
  },

  onSearch: function(e) {
    var value = e.detail.value;
    clearTimeout(this.data.hSearch)
    this.data.hSearch = setTimeout(() => {
      this.getDotData(value);
    }, 1500);
  },

  openNearbyListDetails: function(e) {
    var shopId = e.currentTarget.dataset.id;
    var distance = e.currentTarget.dataset.distance;
    var long = e.currentTarget.dataset.long;
    var lat = e.currentTarget.dataset.lat;

    wx.navigateTo({
      url: '/pages/map/detail?id=' + shopId + '&distance=' + distance + '&long=' + long + '&lat=' + lat ,
    })
  },

  goHere: function(e) {
    var long = e.currentTarget.dataset.longitude;
    var lat = e.currentTarget.dataset.latitude;

    this.getWalkingRoute(long, lat)
  }

})