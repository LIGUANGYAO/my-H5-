//@see 有背景的loading框
function openLoading(msg) {
    var loadingBox = document.createElement('div');
    loadingBox.id = 'loadingBox';
    loadingBox.style.cssText = "width:100%;height:100%;background-color: white;position:fixed;top:0;left:0;z-index:9999";
    var loading = document.createElement('div');
    loading.id = 'loading';
    loading.style.cssText = "display:-webkit-box;-webkit-box-align:center; -webkit-box-pack: center;-webkit-box-orient: vertical; width:8em;height:7em;color:#ffffff;text-shadow: none; background:#000; opacity:0.4; border-radius:5px; position:fixed; top:50%; left:50%; margin-top:-3.5em;margin-left:-4em;z-index:9999";
    var loadingImg = document.createElement('div');
    loadingImg.id = 'loadingImg';
    loadingImg.style.cssText = "width:5em;;height:4.5em;background-image:url('../../assets/images/logo.gif');background-size:65%;background-position:center;background-repeat:no-repeat;";
    var loadingText = document.createElement('div');
    loadingText.id = 'loadingText';
    loadingText.innerHTML = msg
    loadingText.style.cssText = "-webkit-box-flex:1;font-family:Microsoft Yahei;font-size:1.1em;color: rgb(153,207,22);"
    loading.appendChild(loadingImg);
    loading.appendChild(loadingText);
    loadingBox.appendChild(loading);
    document.getElementsByTagName('body')[0].appendChild(loadingBox);
}
//@see 关闭有背景的loading框
function closeLoading() {
    $("div#loadingBox").remove();
}

//openLoading("加载中......");//在require加载模块js之前显示loading



require(['jquery', 'Vue', 'FooterBar', 'common', 'api', 'Spin', 'bmi'], function($, Vue, FooterBar, common, api, Spin, bmi) {

    $(function() {

        var FooterBar_vue = FooterBar.init();
        var Spin_vue = Spin.init();

        // settimeout 防止页面假死
        setTimeout(function() {
            new Vue({
                el: '#app',
                data: {
                    list: [],
                    isloading: true,
                    pageNum: 10,
                    pageSize: 1,
                    registeredData: {},
                    bodyFat: {},
                    fatRateTitle: null,
                    waterTitle: null,
                    bonTitle: null,
                    muscleTitle: null,
                    proteinTitle: null,
                    fatWeightTitle: null,
                    fatLevelTitle: null,
                    bodyTypeTitle: null,
                    bodyTypeNum: null
                },
                components: {
                    'footer-bar': FooterBar_vue,
                    'spin': Spin_vue
                },
                created: function() {

                },
                mounted: function() {
                    var _this = this;
                    this.getProfile(function() {

                        _this.getWeight(_this.pageSize);
                    })
                },
                methods: {
                    onScroll: function() {
                        this.isloading = true;


                        this.getWeight(++this.pageSize);
                    },
                    getWeight: function(pageSize) {
                        var data = {
                            _p: common.getRequest()._p,
                            pageSize: pageSize,
                            pageNum: this.pageNum,
                            startTime: '2017-01-01 00:00:00'
                        }

                        var _this = this;
                        $.ajax({
                            type: 'GET',
                            url: api.weUserWeightAll + '?' + $.param(data),
                            dataType: 'json',
                            success: function(res) {
                                // res = JSON.parse(JSON.stringify(DATA));
                                if (res.result.data && res.result.data.length) {

                                    for (var i = 0; i < res.result.data.length; i++) {
                                        var item = res.result.data[i];


                                        common.computeFat(item, _this.registeredData, bmi)
                                    }
                                    _this.list = _this.list.concat(res.result.data);

                                    if (res.result.data.length < _this.pageNum) {
                                        _this.isloading = false;
                                    }
                                } else {
                                    _this.isloading = false;
                                }
                            }
                        })
                    },
                     //获取注册信息接口
                    getProfile:function(callback){
                        var _this = this;
                        $.ajax({
                        type:'POST',
                        url: api.profile,
                        async: false,
                        data:{
                            _p:common.getRequest()._p
                        },
                        dataType:'json',
                        success: function(res){
                             if(res.result.data){
                                _this.registeredData = res.result.data[0];
                               
                               if (_this.registeredData.age == 0) {
                                   _this.registeredData.age = 1;
                               }
                                if (typeof callback === "function"){
                                    callback();
                                }
                              
                             }
                           }
                        })
                    }
                },

                filters: {
                    formatDate2: function(input) {

                        return input.replace(/(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/, '$1-$2-$3 $4:$5');
                        // + ' ' + hour + ':' + minutes + ':' + seconds;
                    }
                }
            })
        }, 500)
    })

})


var DATA = {
    "result": {
        "count": 7,
        "data": [{
            "accountId": null,
            "bindTime": null,
            "bmi": 0.0,
            "bmr": 0.0,
            "bodyAge": null,
            "bon": null,
            "burnHeartRate": null,
            "code": null,
            "codeBack": 0,
            "createTime": 20180409114524,
            "dateType": 0,
            "fat": null,
            "fatWeight": null,
            "id": "ede5a3d521f74fb1aa5b68e8ad8e5312",
            "machineId": null,
            "muscle": null,
            "ohm": null,
            "openId": null,
            "processId": null,
            "protein": null,
            "receiverTime": "20170409114520",
            "reportId": null,
            "scaleInfo": null,
            "shopAddress": null,
            "shopCity": null,
            "shopDirect": null,
            "shopName": null,
            "shopProvince": null,
            "standardWeight": 0.0,
            "type": null,
            "unionId": null,
            "userInfo": null,
            "visceralFat": null,
            "water": null,
            "weight": 46.7,
            "weightScore": 0.0
        }, {
            "accountId": null,
            "bindTime": null,
            "bmi": 0.0,
            "bmr": 0.0,
            "bodyAge": null,
            "bon": null,
            "burnHeartRate": null,
            "code": null,
            "codeBack": 0,
            "createTime": 20180409114508,
            "dateType": 0,
            "fat": null,
            "fatWeight": null,
            "id": "c9caffe0fec54908b9cf0fe399cd8ce5",
            "machineId": null,
            "muscle": .11,
            "ohm": 504,
            "openId": null,
            "processId": null,
            "protein": null,
            "receiverTime": "20180421114500",
            "reportId": null,
            "scaleInfo": null,
            "shopAddress": null,
            "shopCity": null,
            "shopDirect": null,
            "shopName": null,
            "shopProvince": null,
            "standardWeight": 0.0,
            "type": null,
            "unionId": null,
            "userInfo": null,
            "visceralFat": null,
            "water": .66,
            "weight": 45.63,
            "weightScore": 0.0
        }, {
            "accountId": null,
            "bindTime": null,
            "bmi": 0.0,
            "bmr": 0.0,
            "bodyAge": null,
            "bon": null,
            "burnHeartRate": null,
            "code": null,
            "codeBack": 0,
            "createTime": 20180408152815,
            "dateType": 0,
            "fat": null,
            "fatWeight": null,
            "id": "ba787ca5e5c04637bced60997c3ae367",
            "machineId": null,
            "muscle": .8,
            "ohm": null,
            "openId": null,
            "processId": null,
            "protein": null,
            "receiverTime": "20180408152813",
            "reportId": null,
            "scaleInfo": null,
            "shopAddress": null,
            "shopCity": null,
            "shopDirect": null,
            "shopName": null,
            "shopProvince": null,
            "standardWeight": 0.0,
            "type": null,
            "unionId": null,
            "userInfo": null,
            "visceralFat": null,
            "water": .44,
            "weight": 42.03,
            "weightScore": 0.0
        }, {
            "accountId": null,
            "bindTime": null,
            "bmi": 0.0,
            "bmr": 0.0,
            "bodyAge": null,
            "bon": null,
            "burnHeartRate": null,
            "code": null,
            "codeBack": 0,
            "createTime": 20180404162635,
            "dateType": 0,
            "fat": null,
            "fatWeight": null,
            "id": "4f2efb1f1a5d41f388cdf18fce2405fd",
            "machineId": null,
            "muscle": .1,
            "ohm": 507,
            "openId": null,
            "processId": null,
            "protein": null,
            "receiverTime": "20180404162635",
            "reportId": null,
            "scaleInfo": null,
            "shopAddress": null,
            "shopCity": null,
            "shopDirect": null,
            "shopName": null,
            "shopProvince": null,
            "standardWeight": 0.0,
            "type": null,
            "unionId": null,
            "userInfo": null,
            "visceralFat": null,
            "water": null,
            "weight": 45.64,
            "weightScore": 0.0
        }, {
            "accountId": null,
            "bindTime": null,
            "bmi": 0.0,
            "bmr": 0.0,
            "bodyAge": null,
            "bon": null,
            "burnHeartRate": null,
            "code": null,
            "codeBack": 0,
            "createTime": 20180404162555,
            "dateType": 0,
            "fat": null,
            "fatWeight": null,
            "id": "b2df1131261b4236b60112339e94f1c1",
            "machineId": null,
            "muscle": null,
            "ohm": 550,
            "openId": null,
            "processId": null,
            "protein": null,
            "receiverTime": "20180404162555",
            "reportId": null,
            "scaleInfo": null,
            "shopAddress": null,
            "shopCity": null,
            "shopDirect": null,
            "shopName": null,
            "shopProvince": null,
            "standardWeight": 0.0,
            "type": null,
            "unionId": null,
            "userInfo": null,
            "visceralFat": null,
            "water": null,
            "weight": 46.38,
            "weightScore": 0.0
        }, {
            "accountId": null,
            "bindTime": null,
            "bmi": 0.0,
            "bmr": 0.0,
            "bodyAge": null,
            "bon": null,
            "burnHeartRate": null,
            "code": null,
            "codeBack": 0,
            "createTime": 20180404143318,
            "dateType": 0,
            "fat": .5,
            "fatWeight": null,
            "id": "c6bd55bb060a4b7cb4fb8ef9bf473fec",
            "machineId": null,
            "muscle": null,
            "ohm": 506,
            "openId": null,
            "processId": null,
            "protein": null,
            "receiverTime": "20180404143256",
            "reportId": null,
            "scaleInfo": null,
            "shopAddress": null,
            "shopCity": null,
            "shopDirect": null,
            "shopName": null,
            "shopProvince": null,
            "standardWeight": 0.0,
            "type": null,
            "unionId": null,
            "userInfo": null,
            "visceralFat": null,
            "water": null,
            "weight": 45.15,
            "weightScore": 0.0
        }, {
            "accountId": null,
            "bindTime": null,
            "bmi": 0.0,
            "bmr": 0.0,
            "bodyAge": null,
            "bon": null,
            "burnHeartRate": null,
            "code": null,
            "codeBack": 0,
            "createTime": 20180404142424,
            "dateType": 0,
            "fat": 0.2,
            "fatWeight": null,
            "id": "196cc6a6cc6f442a9bf1d7d98d347252",
            "machineId": null,
            "muscle": null,
            "ohm": 705,
            "openId": null,
            "processId": null,
            "protein": null,
            "receiverTime": "20180404142408",
            "reportId": null,
            "scaleInfo": null,
            "shopAddress": null,
            "shopCity": null,
            "shopDirect": null,
            "shopName": null,
            "shopProvince": null,
            "standardWeight": 0.0,
            "type": null,
            "unionId": null,
            "userInfo": null,
            "visceralFat": null,
            "water": null,
            "weight": 46.19,
            "weightScore": 0.0
        }],
        "pageNum": null,
        "pageSize": null,
        "status": null
    }
}