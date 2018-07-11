

require(['jquery', 'Vue', 'FooterBar', 'common', 'api'], function($, Vue, FooterBar, common, api) {

    $(function() {

        var FooterBar_vue = FooterBar.init();

        // settimeout 防止页面假死
        setTimeout(function() {
            new Vue({
                el: '#app',
                data: {
                    list: null
                },
                components: {
                    'footer-bar': FooterBar_vue
                },
                created: function() {

                },
                mounted: function() {
                    this.getReporrtList()
                },
                methods: {
                    toDetail: function(id, reportId) {
                        common.linkTo('./detail.html', $.param({ _p: common.getRequest()._p, id: id, reportId: reportId }));
                    },
                    // 实验室列表
                    getReporrtList: function() {

                        var data = {
                            _p: common.getRequest()._p
                        }

                        var _this = this;
                        $.ajax({
                            type: 'POST',
                            url: api.reportList + '?' + $.param(data),
                            dataType: 'json',
                            success: function(res) {
                                _this.list = res.result.data || [];
                            },
                            error: function() {
                                _this.list = []
                            }
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
                        return year + '/' + month + '/' + day;
                        // + ' ' + hour + ':' + minutes + ':' + seconds;
                    }
                }
            })
        }, 500)
    })

})