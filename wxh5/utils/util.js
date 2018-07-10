const app = getApp()
var api = require('../js/funs/api.js')

let unionidData;
let appIdData;

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function getQuery(obj) {
  var str = [];

  for(var k in obj) {
    str.push(k + '=' + encodeURIComponent(obj[k]));
  }

  return str.join('&')
}

function formatDate(input) {
  var d = new Date(input);
  var year = d.getFullYear();
  var month = (d.getMonth() + 1) < 10 ? '0' + (d.getMonth() + 1) : '' + (d.getMonth() + 1);
  var day = d.getDate() < 10 ? '0' + d.getDate() : '' + d.getDate();
  var hour = d.getHours();
  var minutes = d.getMinutes();
  var seconds = d.getSeconds();
  return year + '-' + month + '-' + day;
}

function myInit (app) {

  wx.onAppRoute(function(e) {

    if (e.openType == 'appLaunch')
    return;

    wx.setStorage({
      key: 'url',
      data: '/' + e.path + '?' + getQuery(e.query),
    })
    wx.setStorage({
      key: 'openType',
      data: e.openType,
    })
  });
  var obj = wx.getStorage({
    key: 'url',
    success: function (res) {

      setTimeout(function () {
        var openType = wx.getStorageSync('openType')

        if (openType == 'navigateBack') {
          openType = 'switchTab'
        }
        if (wx[openType]) {
          wx[openType]({
            url: res.data,
          })
        }
      }, 500)
    },
  })
}

// 计算距离

function Rad(d) {
  return d * Math.PI / 180.0;//经纬度转换成三角函数中度分表形式。
}
//计算距离，参数分别为第一点的纬度，经度；第二点的纬度，经度
function GetDistance(lat1, lng1, lat2, lng2) {
  var radLat1 = Rad(lat1);
  var radLat2 = Rad(lat2);
  var a = radLat1 - radLat2;
  var b = Rad(lng1) - Rad(lng2);
  var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) +
    Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
  s = s * 6378.137;// EARTH_RADIUS;
  s = Math.round(s * 10000) / 10000 * 1000; //输出为公里
  //s=s.toFixed(4);
  return s;
}




function getP(callback) {
  // 登录
  if (api._p) {

    console.log("存在p值：" + api._p)
    if (typeof callback === "function"){
      callback();
    }
    
    return;
  }
  wx.login({
    success: res => {
      // 发送 res.code 到后台换取 openId, sessionKey, unionId

      if (res.code) {

      var data2={
          appid: 'wxe091ea00e3771f2e',
          secret: '6aa85d1d744880d9199a54a93ac7a54b',
          js_code: res.code,
          grant_type: 'authorization_code'
        }

        wx.request({
          url: api.getAppcode + getQuery(data2),
          method: 'GET',
          success: function (res) {
            
            var wxsessionKey = res.data.session_key;

            console.log('密钥密钥' + wxsessionKey)

            console.log("登录信息unionid:" + res.data.unionid);

            console.log("全局appid:" + app.globalData.wechatAppid);

            if (res.data.unionid) {//存在unionid

            
              unionidData = res.data.unionid;

              if (app.globalData.wechatAppid) {//存在参数appid

                appIdData = app.globalData.wechatAppid

                 } else {//缓存appid
                var value = wx.getStorageSync('key');
                appIdData = value;
                console.log("缓存appid" + value)
              }

              var data = {
                appId: appIdData,
                unionid: unionidData
              }
              //获取_p参数
              wx.request({
                url: api.getNumberp + getQuery(data),
                method: 'GET',
                async: false,
                success: function (res) {
                  api._p = '?_p=' + res.data;

                  console.log("获取到的_p=" + res.data)

                  if (typeof callback === "function") {
                    callback();
                  }

                }
              })

                    
              } else {//不存在unionid

              wx.getUserInfo({
                withCredentials: true,
                success: function (res2) {

                  var data = {
                    appid: 'wxe091ea00e3771f2e',
                    sessionKey: wxsessionKey,
                    encryptedData: res2.encryptedData,
                    iv: res2.iv
                  }

                  wx.request({
                    url: api.decryuserinfo + getQuery(data),
                    method: 'POST',
                    async: false,
                    success: function (res3) {
                      // 可以返回前端需要的用户信息（包括unionid、openid、user_id等）
                      unionidData = res3.data.unionId;
                      console.log("没关注的用户获取unionid:" + res3.data.unionId)

                      if (app.globalData.wechatAppid) {//存在参数appid

                        appIdData = app.globalData.wechatAppid

                      } else {//缓存appid

                        var value = wx.getStorageSync('key');
                        appIdData = value;
                        console.log("缓存appid" + value)
                      }

                      var data = {
                        appId: appIdData,
                        unionid: unionidData
                      }

                      wx.request({
                        url: api.getNumberp + getQuery(data),
                        method: 'GET',
                        async: false,
                        success: function (res) {
                          api._p = '?_p=' + res.data;
                          console.log("获取到的_p=" + res.data)

                          if (typeof callback === "function") {
                            callback();
                          }

                        }
                      })

                    }
                  })
                }, fail: function () {
                  wx.showModal({
                    title: '警告通知',
                    content: '您点击了拒绝授权,将无法正常显示数据,点击确定重新获取授权。',
                    success: function (res) {
                      if (res.confirm) {
                        wx.openSetting({
                          success: (res) => {

                          }
                        })
                      }
                    }
                  })
                }
              })

                   

               }
          }
          
        })

      }

    }
  })

}






module.exports = {
  formatTime: formatTime,
  myInit: myInit,
  getQuery: getQuery,
  formatDate: formatDate,
  GetDistance: GetDistance,
  getP: getP
}

