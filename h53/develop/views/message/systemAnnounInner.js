require(['jquery', 'Vue',  'common', 'api'], function($, Vue, common, api) { 
    
        $(function(){
            // settimeout 防止页面假死
            setTimeout(function() {
    
                new Vue({
                    el: '#app',
                    data:{
                        detailInfo:{},
                        updatetime:null
                    },
                    created:function(){
    
                    },
                    mounted:function(){
     
                      this.getDetailInfo();
                    },
                    methods:{

                        getDetailInfo:function(){
                            var _this = this;
                            var data={
                                _p:common.getRequest()._p,
                                id:common.getRequest().meassageId
                            }
                            $.ajax({
                                url:api.getDetailInfo+'?'+$.param(data),
                                type:"GET",
                                async: true,
                                dataType:"json",
                                success:function(res){
                                   if(res){
                                       if(res[0]!==undefined){
                                          _this.detailInfo = res[0];
                                          _this.updatetime = res[0].last_update_time.substr(0,10)
                                       }
                                   }
                                }
                            })
                        }
                 
                    }
                })
    
            },500)
        })
    
     })