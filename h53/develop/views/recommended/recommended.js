
require(['jquery', 'Vue', 'common', 'api', 'Spin', 'FooterBar','Swiper','PageLoad'], function($, Vue, common, api, Spin, FooterBar,Swiper,PageLoad) {

    $(function() {

        var FooterBar_vue = FooterBar.init();
        var Spin_vue = Spin.init();

        var PageLoad_vue = PageLoad.init();

        // settimeout 防止页面假死
        setTimeout(function() {
            new Vue({
                el: '#app',
                data: {
                    hotMainData: [],
                    adImgeData: {},
                    pageSize: 2,
                    pageCount: 7,
                    timer: null,
                    initList: [],
                    showLoading: false,
                    adImge1: null,
                    adImge2: null,
                    pageLoad:false
                },
                components: {
                    'spin': Spin_vue,
                    'footer-bar': FooterBar_vue,
                    'page-load': PageLoad_vue
                },
                created: function() {
                    this.getAdvertising();

                },
                mounted: function() {

                    var _this = this;
                    this.queryHotMain();

                    window.getAdCount = this.getAdCount;
                },
                methods: {
                    queryHotMain: function() {
                        var _this = this;
                        $.ajax({
                            type: 'POST',
                            url: api.queryHotMain,
                            data: {
                                _p: common.getRequest()._p,
                                pageSize: 1,
                                pageNum: _this.pageCount
                            },
                            dataType: 'json',
                            async: true,
                            success: function(res) {
                                _this.initList = res.result.data;

                                _this.pageLoad= true;

                                if (res.result.data) {
                                    for (var i = 0; i < res.result.data.length; i++) {
                                        var obj = {};
                                        obj["mainName"] = res.result.data[i].mainName,
                                            obj["mainCname"] = res.result.data[i].mainCname,
                                            obj["picPath"] = res.result.data[i].picPath,
                                            obj["mainid"] = res.result.data[i].mainid,
                                            _this.hotMainData.push(obj);
                                    }


                                   
                                }

                             
                                setTimeout(function() {
                                   var dom1='';
                                   var dom2='';

                                  if(_this.adImge1&&_this.adImge1.length>0){
                                    for(var i=0;i<_this.adImge1.length;i++){
                                        dom2+= "<li class='swiper-slide' onclick='getAdCount("+_this.adImge1[i].id+","+_this.adImge1[i].spaceId+",轮播广告一"+i+")'><a href='"+_this.adImge1[i].adLink+"'><img src='"+_this.adImge1[i].path+"'></a><li>";
                                    }
                                }
                                if(_this.adImge2&&_this.adImge1.length>0){
                                  for(var i=0;i<_this.adImge2.length;i++){
                                    dom1+= "<li class='swiper-slide'  onclick='getAdCount("+_this.adImge2[i].id+","+_this.adImge2[i].spaceId+",轮播广告二"+i+")'><a href='"+_this.adImge2[i].adLink+"'><img src='"+_this.adImge2[i].path+"'></a><li>";
                                }
                            }

                          
                             var str2 = '<div class="ad opacity swiper-container" id="adId2"><ul class="swiper-wrapper">'+dom2+'</ul><div class="swiper-pagination"></div></div>';
                           
                            var  str1 = '<div class="ad opacity swiper-container" id="adId1"><ul class="swiper-wrapper">'+dom1+'</ul><div class="swiper-pagination"></div></div>';
                          
                           
                                  


                            if (_this.adImge1&&_this.adImge1.length>0||_this.adImge2&&_this.adImge1.length>0) {
                                if (_this.initList.length >= 7) {
                                    $(".recommendUl li").eq(5).before(str2);
                                    $(".recommendUl li").eq(2).after(str1);
                                } else {
                                    $(".recommendUl li").eq(3).before(str2);
                                    $(".recommendUl li").eq(0).after(str1);
                                    
                                }
                            }
 
                                 
                                if(_this.adImge1&&_this.adImge1.length>0){
                                   if(_this.adImge1.length>1){
                                    _this.swiperInit("#adId2");
                                   }
                                }
                                if(_this.adImge2&&_this.adImge2>0){
                                    if(_this.adImge2.length>1){
                                        _this.swiperInit("#adId1");
                                    }
                                }

                                if ($(".recommendUl li").length < 3) {
                                    return false;
                                } else {
                                    _this.IsScrollFooter();
                                }

                                }, 500);



                             
                            }
                        })
                    },
                    swiperInit:function(dom){
                        setTimeout(function(){
                            var swiper=new Swiper(dom, {
                                direction:'horizontal',
                                autoplay:3000,
                                preventClicks:false,
                                preventClicksPropagation:true,
                                pagination:'.swiper-pagination'
                            });
                        },200)
                    },
                    //获取点击广告次数
                    getAdCount: function(adid,spaceid,adTitle) {

                        $.ajax({
                            type: 'POST',
                            url: api.getAdCount + '?_p=' + common.getRequest()._p,
                            data: {
                                adId: adid,
                                spaceId:spaceid,
                                clickTime:common.getDate()
                            },
                            async: true,
                            success: function(res) {
                                var resData = JSON.parse(res);
                                if (resData.result.status == 0) {
                                    console.log("点击成功"+adid+':'+spaceid+adTitle);
                                    _hmt.push(['_trackEvent','热门推荐','热门推荐页广告',adTitle]);
                                } else {

                                }
                            }

                        })

                    },
                    //获取广告
                    getAdvertising: function() {
                        var _this = this;
                        var codes = ['hot_1', 'hot_2'];
                        $.ajax({
                            type: 'POST',
                            url: api.getAdvertising + '?_p=' + common.getRequest()._p,
                            processData: false,
                            'contentType': 'application/json',
                            data: JSON.stringify(codes),
                            async: true,
                            success: function(res) {
                                _this.adImgeData = JSON.parse(res);
                                if (_this.adImgeData.result.data) {

                                    if (_this.adImgeData.result.data[0]) {
                                            _this.adImge1 = _this.adImgeData.result.data[0];
                                    }
                                    if (_this.adImgeData.result.data[1]) {
                                            _this.adImge2 = _this.adImgeData.result.data[1];
                                    }
                                }
                            }
                        })
                    },
                    //滚动加载数据
                    IsScrollFooter: function() {

                        var _this = this;
                        $(window).on('scroll', function() {

                            var scrollTop = $(this).scrollTop();
                            var scrollHeight = $(document).height();
                            var windowHeight = $(this).height();



                            if (_this.initList == null) {
                                $(".over").show();
                                return;
                            } else {
                                _this.showLoading = true;
                            }

                            clearTimeout(_this.timer);
                            //判断最后一个元素是否在底部之上
                            if (scrollTop + windowHeight == scrollHeight) {
                                _this.timer = setTimeout(function() {

                                    $.ajax({
                                        type: 'POST',
                                        url: api.queryHotMain,
                                        data: {
                                            _p: common.getRequest()._p,
                                            pageSize: _this.pageSize,
                                            pageNum: _this.pageCount
                                        },
                                        dataType: 'json',
                                        success: function(res) {

                                            _this.pageSize++;
                                            _this.initList = res.result.data;
                                            _this.showLoading = false;
                                            if (_this.initList) {
                                                for (var i = 0; i < res.result.data.length; i++) {
                                                    var obj = {
                                                        mainName: res.result.data[i].mainName,
                                                        mainCname: res.result.data[i].mainCname,
                                                        picPath: res.result.data[i].picPath,
                                                        mainid: res.result.data[i].mainid,
                                                    };
                                                    _this.hotMainData.push(obj);
                                                }
                                            }
                                        }
                                    })
                                }, 1000)

                            }

                        })


                    },
                    //跳转到热门推荐页面
                    linkToHot: function(index) {
                        var mainid = this.hotMainData[index].mainid;
                        window.location.href = '../recommendedinner/breakfast.html?' + '_p=' + common.getRequest()._p + "&mainid=" + mainid
                    }
                }
            })
        }, 500)

    })


})