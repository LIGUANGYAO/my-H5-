
require(['jquery', 'Vue', 'common', 'api'], function($, Vue, common, api) {
    $(function() {



        // settimeout 防止页面假死
        setTimeout(function() {
            new Vue({
                el: '#app',
                data: {
                    errorcode:null
                },
                components: {
                },
                created: function() {

                    this.errorcode = common.getRequest().errorcode

                },
                mounted: function() {
                     console.log( this.errorcode);

                }
            })
        }, 500)
    })

})