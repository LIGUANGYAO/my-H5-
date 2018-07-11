



require(['jquery', 'Vue', 'FooterBar', 'common', 'api'], function($, Vue, FooterBar, common, api) {

    var map = {
        run: '运动咖',
        manage: '体重管理'
    }

    $('title').text(map[common.getRequest().type])
    $(function() {

        var FooterBar_vue = FooterBar.init();

        // settimeout 防止页面假死
        setTimeout(function() {
            new Vue({
                el: '#app',
                data: {
                },
                components: {
                    'footer-bar': FooterBar_vue
                },
                created: function() {
                },
                mounted: function() {
                }
            })
        }, 500)
    })

})