require(['jquery', 'Vue',  'common', 'api'], function($, Vue, common, api) { 
    
        $(function(){
            // settimeout 防止页面假死
            setTimeout(function() {
    
                new Vue({
                    el: '#app',
                    data:{
                        activityInfo:null
                    },
                    created:function(){
    
                    },
                    mounted:function(){
                        
                        this.getActivityInfo();
                    },
                    methods:{
                           // 查询系统活动
                           getActivityInfo:function(){
                            var _this = this;
                            var data={
                                _p:common.getRequest()._p,
                                isread:true
                            }
                            $.ajax({
                                url:api.getActivityInfo+"?"+$.param(data),
                                type:"GET",
                                async: true,
                                dataType:"json",
                                success:function(res){
                                    if(res.result.data){
                                        _this.activityInfo = res.result.data;
                                    }else{
    
                                    }
                                    
                                }
                            })
                        },
                    }
                })
    
            },500)
        })
    
     })