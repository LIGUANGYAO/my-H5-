


require(['jquery', 'Vue', 'FooterBar', 'common', 'api', 'Spin', 'PageLoad'], function($, Vue, FooterBar, common, api, Spin,PageLoad) {

    $(function() {

        var FooterBar_vue = FooterBar.init();
        var Spin_vue = Spin.init();
        var PageLoad_vue = PageLoad.init();

        // settimeout 防止页面假死
        setTimeout(function() {
            new Vue({
                el: '#app',
                data: {
                    images: null,
                    loaded: false,
                    list: [],
                    preventScroll: false,
                    pageNum: 1,
                    status: '',
                    selected: {},
                    showDeleteDlg: false,
                    showLoading: false,
                    isMax: false,
                    handle: null,
                    profile: null
                },
                components: {
                    'footer-bar': FooterBar_vue,
                    'page-load': PageLoad_vue,
                    'spin': Spin_vue
                },
                created: function() {

                },
                mounted: function() {
                    var _this =this;
                    this.getProfile(function() {
                        _this.getAllImg();
                    });
                    // $(window).on('scroll', this.onScroll.bind(this));
                },
                methods: {
                    toShow: function() {
                        common.linkTo('./show.html')
                    },
                    like: function(item) {

                       

                        var data = {
                            _p: common.getRequest()._p,
                            picid: item.picid
                        }

                        var _this = this;
                        $.ajax({
                            type: 'POST',
                            url: api.likeImg + '?' + $.param(data),
                            dataType: 'json',
                            success: function(res) {
                                if (res.result.status === 0) {
                                    item.light = !item.light;
                                    item.light ? item.thuupSum++ : item.thuupSum--
                                   _this.list= JSON.parse(JSON.stringify(_this.list));
                                }
                            }.bind(this),
                            error: function() {}
                        })
                    },
                    getAllImg: function() {
                        //this.addImages();
                        var data = {
                            _p: common.getRequest()._p,
                            pageSize: 10,
                            pageNum: this.pageNum++
                        }

                        var _this = this;
                        $.ajax({
                            type: 'GET',
                            url: api.queryAllImg + '?' + $.param(data),
                            dataType: 'json',
                            success: function(res) {
                                _this.loaded = true;
                                var data = res.result.data || [];
                                _this.list = _this.list || []


                                if (data.length < 10) {
                                    _this.preventScroll = true;
                                }
                                if (data && data.length) {

                                    _this.list = _this.list.concat(data);
                                }                                // _this.addImages();
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
                    // 图片详情
                    toDetail: function(id) {
                        common.linkTo('./post.html', $.param({
                            _p: common.getRequest()._p,
                            imgId: id,
                            entry: 'my'
                        }));
                    },
                    addImages: function() {
                        this.getAllImg()
                    },
                    edit: function() {
                        this.status = 'delete';
                    },
                    cancel: function() {
                        this.status = '';
                        this.selected = {};
                    },
                    remove: function() {

                        var imgIds = [];

                        for(var i = 0; i < this.data.length; i++) {
                            if (this.selected[i]) {
                                imgIds.push(this.data[i].picid)
                            }
                        }

                        if (imgIds.length === 0) {
                            common.showToastr('请先选择图片');
                            return;
                        }
                        this.showDeleteDlg = true;
                    },

                    select: function(index) {
                        if (this.status !== 'delete') {
                            return;
                        }
                        this.selected[index] = !this.selected[index];
                        this.selected = Object.assign({}, this.selected);
                    },
                    // 取消对话框
                    cancelDlg: function() {
                        this.showDeleteDlg = false;
                    },
                    // 确认删除
                    confirm: function() {
                        var imgIds = [];

                        for(var i = 0; i < this.data.length; i++) {
                            if (this.selected[i]) {
                                imgIds.push(this.data[i].picid)
                            }
                        }

                        var data = {
                            _p: common.getRequest()._p
                        }

                        var _this = this;
                        $.ajax({
                            type: 'POST',
                            url: api.removeImg + '?' + $.param(data),
                            processData: false,
                             'contentType': 'application/json',
                            data: JSON.stringify(imgIds),
                            dataType: 'json',
                            success: function(res) {
                                if (res.result.status === 0) {
                                    _this.getAllImg();
                                    _this.showDeleteDlg = false;
                                    common.showToastr('成功')
                                    _this.selected = {}
                                    _this.status = ''
                                }
                            }
                        })
                    },

                    onScroll: function() {
                        var body = window;

                        if (body.scrollY + body.innerHeight >= (document.body.scrollHeight - 100)) {
                            if (!this.isMax) {
                                this.showLoading = true;
                                clearTimeout(this.handle)
                                this.handle = setTimeout((function() {
                                    this.addImages();
                                    this.showLoading = false;
                                }).bind(this), 500)
                            }
                        }
                    }
                }
            })
        }, 500)
    })

})