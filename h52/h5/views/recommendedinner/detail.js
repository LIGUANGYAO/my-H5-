
require(['jquery','Vue','common','api','PageLoad','dropLoad'],function($,Vue,common,api,PageLoad,dropLoad){
    
        $(function(){

            var hotId = sessionStorage.hotId;

            var PageLoad_vue = PageLoad.init();
    
            // settimeout 防止页面假死
            setTimeout(function(){
                new Vue({
                    el: '#app',
                    data: {
                        detailsData:null,
                        detailsDataTtile:null,
                        detailsDataCreateTime:null,
                        pageLoad:false
                    },
                    components: {
                        'page-load': PageLoad_vue
                    },
                    created: function(){
                       this.ThemeArtiDetail();
                    },
                    mounted: function(){
                      
                     },
                     methods: {

                        ThemeArtiDetail:function(){

                            var _this = this;

                            var data={
                                _p:common.getRequest()._p,
                                id: parseInt(hotId)
                            }

                            $.ajax({
                                type:'GET',
                                url: api.ThemeArtiDetail+'?'+$.param(data),
                                dataType:'json',
                                async: true,
                                success:function(res){
                                    _this.pageLoad =true;
                                    _this.detailsData = res.result.data[0].content;
                                    _this.detailsDataTtile = res.result.data[0].title;
                                    _this.detailsDataCreateTime = res.result.data[0].publishTime;
                                }
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
                        // + ' ' + hour + ':' + minutes + ':' + seconds;
                    }
                 }
               
             }
            )
            },50)
    
        })
     
    
    })