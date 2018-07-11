


require(['jquery', 'Vue', 'FooterBar', 'common', 'api', 'Spin'], function($, Vue, FooterBar, common, api, Spin) {

    $(function() {

        var FooterBar_vue = FooterBar.init();
        var Spin_vue = Spin.init();

        // settimeout 防止页面假死
        setTimeout(function() {
            new Vue({
                el: '#app',
                data: {
                    images: null,
                    data: new Array(200),
                    pageSize: 15,
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
                    'spin': Spin_vue
                },
                created: function() {

                },
                mounted: function() {
                    var _this =this;
                    this.getProfile(function() {
                        _this.getAllImg();
                    });
                    $(window).on('scroll', this.onScroll.bind(this));
                },
                methods: {
                    getAllImg: function() {
                        //this.addImages();
                        var data = {
                            _p: common.getRequest()._p
                        }

                        var _this = this;
                        $.ajax({
                            type: 'POST',
                            url: api.queryAllImg + '?' + $.param(data),
                            dataType: 'json',
                            success: function(res) {
                                _this.data =  res.result.data;
                                // _this.data = res.result.data.concat(res.result.data);

                                _this.images = [];

                                // for (var i = 0; i < _this.data.length; i++) {
                                //     _this.images.push(_this.data[i].picUrl);
                                // }
                                _this.addImages();
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
                    addImages: function() {
                        var end = this.images.length + this.pageSize;
                        if (end > this.data.length) {
                            end = this.data.length;
                            this.isMax = true;
                        } else {
                            this.isMax = false;
                        }
                        for (var i = this.images.length; i < end; i++) {
                            this.images.push(this.data[i].picUrl);
                        }
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