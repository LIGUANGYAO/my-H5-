
require(['jquery', 'Vue', 'common', 'api'], function($, Vue, common, api) {
    $(function() {


        // settimeout 防止页面假死
        setTimeout(function() {
            new Vue({
                el: '#app',
                data: {
                    adImgeData:{},
                    adData:null
                },
                components: {
    
                },
                created: function() {
                  
                },
                mounted: function(){
                    this.Tologin();
                },
                methods:{
                    Tologin:function(){
                        
                    }
                }
            })
        }, 500)
    })

})