
require(['jquery', 'Vue', 'common', 'api'], function($, Vue, common, api) {
    $(function() {



        // settimeout 防止页面假死
        setTimeout(function() {
            new Vue({
                el: '#app',
                data: {
                    imageDat:{},
                    code:null,
                    imgUrl:null
                },
                components: {

                },
                created: function() {

                    this.code= common.getRequest("citycode");
                },
                mounted: function() {

                 this.getCode();
 
                },
                methods:{
                    getCode:function(){
                        var _this = this;
                        $.ajax({
                            type:'get',
                            url:api.getusercode+'?citycode='+ _this.code.citycode,
                            async: true, 
                            success:function(res){
                             if(res){
                              _this.imgUrl = res.imgUrl
                             }
                            }
                            
                        })
                    }
                }
            })
        }, 500)
    })

})