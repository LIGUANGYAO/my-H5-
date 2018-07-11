
require(['jquery', 'Vue', 'FooterBar', 'common', 'api'], function($, Vue, FooterBar, common, api) {
    $(function() {

        var FooterBar_vue = FooterBar.init();

        var articalId = common.getRequest().articalId;

        // settimeout 防止页面假死
        setTimeout(function() {
            new Vue({
                el: '#app',
                data: {
                    detail: {},
                    detailStause:false
                },
                components: {
                    'footer-bar': FooterBar_vue
                },
                created: function() {

                },
                mounted: function() {

                    if(articalId){
                        this.TypeArtiDetail2();
                    }else{
                        this.TypeArtiDetail();
                    }
                },
                methods: {

                    TypeArtiDetail:function(){

                        var artical = sessionStorage.artical;

                        var data = {
                            _p: common.getRequest()._p,
                            id: artical
                        }
                        var _this = this;
                        $.ajax({
                            type: 'GET',
                            url: api.TypeArtiDetail + '?' + $.param(data),
                            dataType: 'json',
                            async: false,
                            success: function(res) {
                                if(res.result.data||res.result.data[0]!==undefined){
                                    _this.detail = res.result.data[0];
                                    _this.detailStause =true;
                                }else{
                                    _this.detailStause = false;
                                }
                               
                            },
                            error: function() {}
                        })
                    },
                    TypeArtiDetail2:function(){
                        var data = {
                            _p: common.getRequest()._p,
                            id: articalId
                        }
                        var _this = this;
                        $.ajax({
                            type: 'GET',
                            url: api.TypeArtiDetail + '?' + $.param(data),
                            dataType: 'json',
                            async: false,
                            success: function(res) {

                                   if(res.result.data||res.result.data[0]!==undefined){
                                    _this.detail = res.result.data[0];
                                    _this.detailStause =true;
                                }else{
                                    _this.detailStause = false;
                                }
                            },
                            error: function() {}
                        })
                    }
                },
                filters: {
                   formatDate:function (input) {
                       var d = new Date(input);
                       var year = d.getFullYear();
                       var month = (d.getMonth() + 1)<10 ? '0' + (d.getMonth() + 1) : '' + (d.getMonth() + 1);
                       var day = d.getDate() <10 ? '0' + d.getDate() : '' + d.getDate();
                       var hour = d.getHours();
                       var minutes = d.getMinutes();
                       var seconds = d.getSeconds();
                       return  year+ '-' + month + '-' + day;
                   }
                }
            })
        }, 500)
    })

})