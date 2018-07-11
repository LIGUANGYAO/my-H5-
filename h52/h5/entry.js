

require(['jquery', 'Vue', 'FooterBar', 'common', 'api'], function($, Vue, FooterBar, common, api) {
    $(function() {

        var FooterBar_vue = FooterBar.init();

        // settimeout 防止页面假死
        setTimeout(function() {
            new Vue({
                el: '#app',
                data: {
                    isMini: null
                },
                components: {
                    'footer-bar': FooterBar_vue
                },
                created: function() {
                    var _this = this;
                    $.ajax({
                        url: api.switch,
                        data: {
                            p: common.getRequest()._p
                        },
                        success: function(res) {
                            res = 2;
                            if (res == 1) {
                                location.href = 'http://h5.mzjmedia.com/index.html?_p=' + common.getRequest()._p
                            } else if (res == 2) {
                                _this.isMini = true;
                            }
                        }
                    })
                },
                mounted: function() {
                }
            })
        }, 500)
    })

})