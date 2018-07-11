
require(['jquery','Vue','common','api','PageLoad','dropLoad'],function($,Vue,common,api,PageLoad,dropLoad){
    
        $(function(){

            var hotId = decodeURIComponent(common.getRequest().hotId);

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
                        this.queryHotDetail();
                    },
                    mounted: function(){
                      
                     },
                     methods: {
                        queryHotDetail: function(){
                            var _this = this;
                            $.ajax({
                                type:'POST',
                                url: api.queryHotDetail,
                                data:{
                                    _p:common.getRequest()._p,
                                    hotId: parseInt(hotId)
                                },
                                dataType:'json',
                                async: true,
                                success:function(res){
                                    _this.pageLoad =true;
                                    _this.detailsData = res.result.data[0].details;
                                    _this.detailsDataTtile = res.result.data[0].titel;
                                    _this.detailsDataCreateTime = res.result.data[0].createTime;
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