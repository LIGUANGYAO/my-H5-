
require(['jquery', 'Vue', 'FooterBar', 'common', 'api', 'Spin', 'PageLoad'], function($, Vue, FooterBar, common, api, Spin,PageLoad) {
    window.common = common;
    $(function() {

        var FooterBar_vue = FooterBar.init();
        var Spin_vue = Spin.init();
        var PageLoad_vue = PageLoad.init();

        // settimeout 防止页面假死
        setTimeout(function() {
            new Vue({
                el: '#app',
                data: {
                    loaded: false,
                    data: {
                        userInfo: {},
                        user: {}
                    },
                    profile: {}, // 个人信息,
                    isPraise: false,
                    adImge: [{}]
                },
                components: {
                    'footer-bar': FooterBar_vue,
                    'Spin': Spin_vue,
                'page-load': PageLoad_vue
                },
                created: function() {

                },
                mounted: function() {
                    var id = common.getRequest().imgId;
                    this.getDetail(id);
                    this.imgBrowse(id);

                    this.getAdvertising()
                },
                methods: {
                    preview: function(url) {
                        wx.previewImage({
                            current: url,
                            urls: [url]
                        });
                    },
                    //获取广告
                    getAdvertising: function() {
                        var _this = this;
                        var spaceIds = ['baskDetail'];
                        $.ajax({
                            type: 'POST',
                            url: api.getAdvertising + '?_p=' + common.getRequest()._p,
                            processData: false,
                            contentType: 'application/json',
                            data: JSON.stringify(spaceIds),
                            dataType: 'json',
                            success: function(res) {
                                _this.adImge = res.result.data  || [{}];
                            }
                        })
                    },
                    //获取点击广告次数
                    getAdCount: function(adid, spaceId) {
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
                                } else {

                                }
                            }

                        })

                    },
                    imgBrowse: function(imgId) {
                        var data = {
                            _p: common.getRequest()._p,
                            imgId: imgId
                        }

                        var _this = this;
                        $.ajax({
                            type: 'POST',
                            url: api.imgBrowse + '?' + $.param(data),
                            dataType: 'json',
                            data: {

                            },
                            success: function(res) {}
                        })
                    },
                    // 获取详情
                    getDetail: function(imgId, callback) {
                        // openLoading('加载中');
                        var data = {
                            _p: common.getRequest()._p,
                            imgId: imgId
                        }

                        var _this = this;
                        $.ajax({
                            type: 'POST',
                            url: api.imgDetail + '?' + $.param(data),
                            dataType: 'json',
                            data: {

                            }, 
                            success: function(res) {
                                _this.data = res.result.data[0];
                                _this.loaded = true
                                _this.getLike(imgId, function() {

                                    _this.getProfile();

                                    _this.getComment(imgId, callback);
                                }); 
                            }
                        })
                    },
                    // 获取点赞
                    getLike: function(imgId, cb) {

                        var data = {
                            _p: common.getRequest()._p,
                            imgId: imgId,
                            pageNum: 10000,
                            pageSize: 1
                        }

                        var _this = this;
                        $.ajax({
                            type: 'POST',
                            url: api.likeImgList,
                            cache: false,
                            async: true,
                            dataType: 'json',
                            data: {
                                _p: common.getRequest()._p,
                                imgId: imgId,
                                pageNum: 10000,
                                pageSize: 1
                            },
                            success: function(res) {
                                var data = res.result.data;
                                // data = [...new Array(100)].map(_=>data[0])
                                if (data && data.length) {
                                    _this.data.praiseList = data;
                                } else {
                                    _this.data.praiseList = []
                                }

                                cb && cb()
                            }
                        })
                    },
                    // 获取详情
                    getComment: function(imgId, cb) {

                        var data = {
                            _p: common.getRequest()._p,
                            imgId: imgId
                        }

                        var _this = this;
                        $.ajax({
                            type: 'POST',
                            url: api.commentariesImgList,
                            dataType: 'json',
                            data: {
                                _p: common.getRequest()._p,
                                imgId: imgId
                            },
                            success: function(res) {
                                var data = res.result.data;

                                if (data && data.length) {

                                    _this.data.commList = data;
                                }

                                cb && cb();
                            }
                        })
                    },
                    toDetail: function() {
                        location.href = './detail.html'
                    },
                    // 获取个人信息
                    getProfile: function() {
                        var data = {
                            _p: common.getRequest()._p
                        }

                        var _this = this;
                        $.ajax({
                            type: 'POST',
                            url: api.profile + '?' + $.param(data),
                            dataType: 'json',
                            success: function(res) {
                                _this.profile = res.result.data[0];
                                if (!_this.profile.unionid) {
                                    var name = _this.profile.name;
                                    _this.profile = _this.profile.weChatUser;
                                    _this.profile.name = name || _this.profile.nickname
                                } else {
                                    _this.profile.name = _this.profile.name || _this.profile.weChatUser.nickname;
                                }
                                _this.profile.gender = _this.profile.gender || _this.profile.weChatUser.gender;
                                if (_this.profile.gender == 1) {
                                    _this.profile.genderStr = '男'
                                } else {
                                    _this.profile.genderStr = '女'
                                }

                                // 判断是否点赞

                                var list = _this.data.praiseList || [];
                                _this.isPraise = false;
                                for (var i = 0; i < list.length; i++) {
                                    if (list[i] && list[i].unionid == _this.profile.unionid) {
                                        _this.isPraise = true;
                                    }
                                }
                            },
                            error: function() {}
                        })
                    },
                    // 评论
                    addComment: function() {
                        var data = {
                            _p: common.getRequest()._p,
                            imgId: this.data.picid,
                            content: this.$refs.comment.value,
                            unionid: this.profile.unionid,
                            name: this.profile.name
                        }


                        if (!data.content) {
                            return common.showToastr('请输入文字');
                        }
                        var _this = this;

                        $.ajax({
                            type: 'GET',
                            url: api.sensitiveword + '?' + $.param({comment: data.content}),
                            // dataType: 'json',
                            success: function(res) {
                                if (res === true) {
                                    $.ajax({
                                        type: 'POST',
                                        url: api.imgCommentaries + '?' + $.param(data),
                                        dataType: 'json',
                                        success: function(res) {
                                            if (res.result.status === 0) {
                                                common.showToastr('评论成功');
                                                _this.$refs.comment.value = ''

                                                _this.getComment(data.imgId);

                                            } else {
                                                common.showToastr('评论失败');
                                                // _this.$refs.comment.value = ''                                                
                                            }
                                        },
                                        error: function() {}
                                    })
                                } else {
                                   common.showToastr('评论不能包含敏感词'); 
                                }
                            },
                            error: function() {}
                        })

                        // if (data.content.length > 50) {
                        //   return common.showToastr('评论不能超过50字');
                        // }
                        
                    },
                    // 点赞
                    like: function() {
                        // alert('like')
                        console.log('like') 
                        var data = {
                            _p: common.getRequest()._p,
                            imgId: this.data.picid,
                            unionid: this.profile.unionid
                        }

                        var _this = this;
                        $.ajax({
                            type: 'POST',
                            url: api.likeImg + '?' + $.param(data),
                            dataType: 'json',
                            success: function(res) {
                                if (res.result.status === 0) {
                                    //location.reload()
                                    var id = common.getRequest().imgId;
                                    _this.getLike(id, function() {

                                        _this.getProfile();

                                        // _this.getComment(imgId, callback);
                                        
                                    }); 
                                }
                            },
                            error: function() {}
                        })
                    }
                },
                filters: {
                    formatDate: function(input, type) {
                        if (!input) {
                            return ''
                        }

                        if (typeof input == 'string') {
                            input = input.replace(/-/g, '/').replace('.0', '')
                            // console.log(input)
                        }

                        if (type == 2) {
                          var diff = new Date() - new Date(input);
                          var oneMinute = 60 * 1000;
                          var oneHour = 60 * 60 * 1000;
                          var oneDay = 24 * oneHour;
                          var oneWeek = 7 * oneDay;

                          var result;
                          if (diff < oneHour) {
                              result = Math.floor(diff / oneMinute);

                              if (diff < (5*60*1000)) {
                                result = '刚刚'
                              } else {

                                result = result + '分钟前';
                            }
                          } else if (diff < oneDay) {
                              result = Math.floor(diff / oneHour);

                              result = result + '小时前';
                          } else if (diff < oneWeek) {
                              result = Math.floor(diff / oneDay);

                              result = result + '天前';
                          }

                          if (result) {
                            return result;
                          }
                        }
                       
                        var d = new Date(input);
                        var year = d.getFullYear();
                        var month = (d.getMonth() + 1) < 10 ? '0' + (d.getMonth() + 1) : '' + (d.getMonth() + 1);
                        var day = d.getDate() < 10 ? '0' + d.getDate() : '' + d.getDate();
                        var hour = d.getHours();
                        var minutes = d.getMinutes();
                        var seconds = d.getSeconds();
                        return year + '-' + month + '-' + day;
                    }
                }
            })
        }, 500)
    })

})