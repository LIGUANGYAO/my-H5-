

require(['jquery', 'Vue', 'FooterBar', 'common', 'api', 'PageLoad'], function($, Vue, FooterBar, common, api, PageLoad) {

    $(function() {

        var FooterBar_vue = FooterBar.init();
        var PageLoad_vue = PageLoad.init();
        // settimeout 防止页面假死
        setTimeout(function() {
            new Vue({
                el: '#app',
                data: {
                    list: [],
                    level: {
                        1: '初级',
                        2: '中级',
                        3: '高级',
                    },
                    loaded: false
                },
                components: {
                    'footer-bar': FooterBar_vue,
                'page-load': PageLoad_vue
                },
                created: function() {

                },
                mounted: function() {
                    this.getExperimentalList();
                },
                methods: {
                    toDetail: function(id) {
                        common.linkTo('./detail.html', $.param({_p: common.getRequest()._p, evaid: id}));
                    },
                    // 实验室列表
                    getExperimentalList: function() {

                        var data = {
                            _p: common.getRequest()._p,
                            pageSize: 1,
                            pageNum: 10
                        }

                        var _this = this;
                        $.ajax({
                            type: 'GET',
                            url: api.experimentalList + '?' + $.param(data),
                            dataType: 'json',
                            success: function(res) {
                                _this.list = res.result.data;
                                _this.loaded = true
                            },
                            error: function() {}
                        })
                    }
                }
            })
        }, 500)
    })

})