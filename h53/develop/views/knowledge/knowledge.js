
require(['jquery', 'Vue', 'FooterBar', 'common', 'api', 'PageLoad'], function($, Vue, FooterBar, common, api,PageLoad) {

    $(function() {

        var FooterBar_vue = FooterBar.init();
        var PageLoad_vue = PageLoad.init();
        // settimeout 防止页面假死
        setTimeout(function() {
            new Vue({
                el: '#app',
                data: {
                    showSecond: false,
                    mainTab: '',
                    list: [],
                    secondCats: [],
                    loaded: false
                },
                components: {
                    'footer-bar': FooterBar_vue,
                'page-load': PageLoad_vue

                },
                created: function() {

                },
                mounted: function() {
                    var isManage = common.getRequest().manage;
                    if (isManage) {
                        $('.nav1 > li:last').trigger('click');
                    } else {
                        $('.nav1 > li:first').trigger('click');
                    }

                    this.getKnowledgeParam();
                },
                directives: {
                    tab: {
                        bind: function(elm, binding, vnode) {
                            var _this = vnode.context;
                            $(elm).find(' > li, > span').on('click', function() {
                                $(this).addClass('active').siblings().removeClass('active');

                                var code = $(this).attr('code');
                                if (binding.modifiers.first) {
                                    if (code == 'at03') {
                                        _this.showSecond = true
                                    } else {
                                        _this.showSecond = false;
                                    }
                                    _this.mainTab = code;
                                    _this.getKnowledgeList(code);
                                } else {
                                    _this.getKnowledgeList(_this.mainTab, code);
                                }


                            })
                        }
                    }
                },

                methods: {
                    toArtical: function(id) {
                        common.linkTo('./artical.html', $.param({
                            _p: common.getRequest()._p,
                            healid: id
                        }));
                    },
                    // 健康知识库列表
                    getKnowledgeList: function(firstType, secondType) {

                        var data = {
                            _p: common.getRequest()._p,
                            pageSize: 1,
                            pageNum: 10,
                            healType: firstType,
                            secendType: secondType
                        }

                        var _this = this;
                        $.ajax({
                            type: 'GET',
                            url: api.healthknowledgeList + '?' + $.param(data),
                            dataType: 'json',
                            success: function(res) {
                                _this.list = res.result.data;

                                _this.loaded = true;
                            },
                            error: function() {}
                        })
                    },
                    // 二级栏目
                    getKnowledgeParam: function() {
                        var data = {
                            _p: common.getRequest()._p
                        }

                        var _this = this;
                        $.ajax({
                            type: 'GET',
                            url: api.healthknowledgeParam + '?' + $.param(data),
                            dataType: 'json',
                            success: function(res) {
                                _this.secondCats = res.result.data;
                            },
                            error: function() {}
                        })
                    }
                },

                filters: {
                    formatDate: function(input) {
                        var d = new Date(input);
                        var year = d.getFullYear();
                        var month = (d.getMonth() + 1) < 10 ? '0' + (d.getMonth() + 1) : '' + (d.getMonth() + 1);
                        var day = d.getDate() < 10 ? '0' + d.getDate() : '' + d.getDate();
                        var hour = d.getHours();
                        var minutes = d.getMinutes();
                        var seconds = d.getSeconds();
                        return year + '-' + month + '-' + day;
                        // + ' ' + hour + ':' + minutes + ':' + seconds;
                    }
                }
            });
        }, 500)
    })

})