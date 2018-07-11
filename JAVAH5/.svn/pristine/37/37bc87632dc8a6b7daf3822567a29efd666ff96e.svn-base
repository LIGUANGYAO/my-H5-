
require(['jquery', 'Vue', 'FooterBar', 'common'], function ($, Vue, FooterBar, common) {
    $(function () {
        common.globalAjax();//开始全局ajax监听
        common.hideOptionMenu();//禁用分享等按钮
        var FooterBar_vue = FooterBar.init();

        // settimeout 防止页面假死
        setTimeout(function () {
            new Vue({
                el: '#app',
                data: {

                },
                components: {
                    'footer-bar': FooterBar_vue

                },
                created: function () {

                },
                mounted: function () {

                },
                methods: {

                }
            })
        }, 50)
    });
});