
require(['jquery', 'Vue', 'FooterBar', 'common', 'Swiper', 'api', 'Loading', 'Spin', 'PageLoad'], function($, Vue, FooterBar, common, Swiper, api, Loading, Spin, PageLoad) {

    $(function() {

        var FooterBar_vue = FooterBar.init();
        var loading = Loading.init();
        var Spin_vue = Spin.init();
        var PageLoad_vue = PageLoad.init();

        // settimeout 防止页面假死
        setTimeout(function() {
            new Vue({
                el: '#app',
                data: {
                    images: null,
                    data: {
                        0: [],
                        1: [],
                        2: []
                    },
                    typeImgs: {
                        0: [],
                        1: [],
                        2: []
                    },
                    showLoading: false,
                    adImge: [{}],
                    type: '',
                    pageNum: 12,
                    profile: {},
                    scorerRank: {},
                    adImgeData:{},
                    adImgeData1:null,
                    loaded: false
                },
                components: {
                    'footer-bar': FooterBar_vue,
                    'Loading': loading,
                    'spin': Spin_vue,
                'page-load': PageLoad_vue

                },
                directives: {
                    tab: {
                        bind: function(elm, binding, vnode) {
                            elm = $(elm);
                            var _this = vnode.context;

                            elm.find('> ul li').on('click', function(e) {
                                $(this).addClass('active').siblings().removeClass('active');

                                var index = $(this).index();
                                _this.type = index;
                                elm.find('>.contents >div').eq(index).show().siblings().hide();

                                if (!_this.data[index].length) {
                                    _this.getTypeImg(index);
                                }
                            });

                        }
                    }
                },
                created: function() {

                },
                mounted: function() {
                    this.getAdvertising()
                    var _this = this;
                    this.getProfile(function() {

                        this.getSilderImg();

                        $('.tab2 li').first().trigger('click')

                        // this.getTypeImg(0);
                    }.bind(this))

                    setTimeout(function() {
                        _this.loaded = true;
                    }, 4000)

                },
                methods: { 
                    onScroll: function() {
                        
                        this.getTypeImg(this.type, ++this.data[this.type].pageSize)
                       // this.setLikeData(this.data[this.type]);
                    },
                    swiperInit:function(dom){
                        var _this =this;
                         //幻灯片广告
                           setTimeout(function(){
                              var swiper2=new Swiper(dom, {
                                direction:'horizontal',
                                autoplay:3000,
                                slidesPerView:1,
                                preventClicks : false,
                                pagination:'.swiper-pagination'
                            });
                           },300)
                    },
                    //获取广告
                    getAdvertising: function() {
                        var _this = this;
                        var spaceIds = ['bask_1'];
                        $.ajax({
                            type: 'POST',
                            url: api.getAdvertising + '?_p=' + common.getRequest()._p,
                            processData: false,
                            contentType: 'application/json',
                            data: JSON.stringify(spaceIds),
                            dataType: 'json',
                            success: function(res) {

                                _this.adImgeData = res;

                                if(_this.adImgeData.result.data){
                                    if(_this.adImgeData.result.data[0]){
                                       _this.adImgeData1 = _this.adImgeData.result.data[0];
                                      if(_this.adImgeData1.length>1){
                                        _this.swiperInit("#swiper-container2");
                                      }
                                    }
                                }
                                

                                
                            }
                        })
                    },

                    //获取点击广告次数
                    getAdCount: function(adid, spaceId, title) {
                        $.ajax({
                            type: 'POST',
                            url: api.getAdCount + '?_p=' + common.getRequest()._p,
                            data: {
                                adId: adid,
                                spaceId: spaceId,
                                clickTime:common.getDate()
                            },
                            success: function(res) {
                                var resData = JSON.parse(res);
                                if (resData.result.status == 0) {
                                    console.log("点击成功");
                                    _hmt.push(['_trackEvent','晒一晒','晒一晒首页广告',title]);

                                } else {

                                }
                            }

                        })

                    },
                    // 获取个人信息
                    getProfile: function(callback) {
                        var data = {
                            _p: common.getRequest()._p
                        }

                        var _this = this;
                        $.ajax({
                            type: 'POST',
                            url: api.profile + '?' + $.param(data),
                            dataType: 'json',
                            async: false,
                            success: function(res) {
                                _this.profile = res.result.data && res.result.data[0];
                                if (_this.profile && !_this.profile.unionid) {
                                    _this.profile = _this.profile.weChatUser;
                                    _this.profile.name = _this.profile.nickname;
                                }

                                callback && callback();
                            },
                            error: function() {
                                callback && callback();
                            }
                        })
                    },
                    like: function(type, item) {

                       

                        var data = {
                            _p: common.getRequest()._p,
                            imgId: item.picid,
                            unionid: this.profile.unionid
                        }

                        var _this = this;
                        $.ajax({
                            type: 'POST',
                            url: api.likeImg + '?' + $.param(data),
                            dataType: 'json',
                            success: function(res) {
                                if (res.result.status === 0) {
                                    item.active = !item.active;
                                   this.data[type] = JSON.parse(JSON.stringify(this.data[type]));
                                }
                            }.bind(this),
                            error: function() {}
                        })
                    },
                    getSilderImg: function() {

                        var data = {
                            _p: common.getRequest()._p,
                            pageSize: 1,
                            pageNum: 10
                        }

                        var _this = this;
                        $.ajax({
                            type: 'POST',
                            url: api.queryImg + '?' + $.param(data),
                            dataType: 'json',
                            success: function(res) {
                                _this.data['hot'] = res.result.data;

                                _this.images = [];

                                if (_this.data['hot']) {
                                    for (var i = 0; i < _this.data['hot'].length; i++) {
                                        _this.images.push(_this.data['hot'][i].picUrl);
                                    }
                                }


                                _this.loaded = true;
                                setTimeout(function() {
                                    _this.initSilider();

                                })
                            },
                            error: function() {
                                _this.loaded = true;
                            }
                        })
                    },
                    initSilider: function() {
                        var swiper = new Swiper('#swiper-container1', {
                            grabCursor: true,
                            centeredSlides: true,
                            slidesPerView: '3',
                            coverflowEffect: {
                                rotate: 0,
                                stretch: 50,
                                depth: 100,
                                modifier: 1,
                                slideShadows: true,
                            },
                            initialSlide: 1,
                            // pagination: '.swiper-pagination'

                        });
                    },
                    getTypeImg: function(type, pageSize) {
                        pageSize = pageSize || 1;
                        var data = {
                            _p: common.getRequest()._p,
                            pageSize: pageSize,
                            pageNum: this.pageNum,
                            type: type
                        }

                        var _this = this;
                        $.ajax({
                            type: 'POST',
                            url: api.queryTypeImg + '?' + $.param(data),
                            dataType: 'json',
                            success: function(res) {
                                if(res.result.data){
                                _this.setLikeData(res.result.data);
                                _this.data[type] = _this.data[type].concat(res.result.data);

                                _this.data[type].pageSize = pageSize;

                                _this.typeImgs[type] = [];

                                for (var i = 0; i < _this.data[type].length; i++) {
                                    _this.typeImgs[type].push(_this.data[type][i].picUrl);
                                }
                            }

                                if (!res.result.data || res.result.data.length < _this.pageNum) {
                                    _this.data[type].prevent = true;
                                }

                            }
                        })
                    },
                    setLikeData: function(data) {
                        // 判断是否点赞
                        if (!this.profile) {
                            return;
                        }
                        for (var g = 0; g < data.length; g++) {
                            var item = data[g];

                            var list = item.baskThumbsList || [];

                            for (var i = 0; i < list.length; i++) {
                                if (list[i] && list[i].unionid == this.profile.unionid) {
                                    item.active = true;
                                }
                            }
                        }

                    },
                    // 跳转 晒一晒
                    go: function() {
                        common.linkTo('./submit.html')
                    },
                    // 跳转 我的美图
                    goMyPhoto: function() {
                        common.linkTo('./photo.html')
                    },
                    // 图片详情
                    toDetail: function(id) {
                        common.linkTo('./post.html', $.param({
                            _p: common.getRequest()._p,
                            imgId: id
                        }));
                    }
                }
            })
        }, 500)
    })

})