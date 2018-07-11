require(['jquery', 'Vue',  'common', 'api'], function($, Vue, common, api) { 
    
        $(function(){
            // settimeout 防止页面假死
            setTimeout(function() {
    
                new Vue({
                    el: '#app',
                    data:{
                        Info:null
                    },
                    created:function(){
    
                    },
                    mounted:function(){
                        
                        this.getNoticeInfo();
                    },
                    methods:{
                           // 查询系公告
                           getNoticeInfo:function(){
                            var _this = this;
                            var data={
                                _p:common.getRequest()._p,
                                isread:true
                            }
                            $.ajax({
                                url:api.getNoticeInfo+"?"+$.param(data),
                                type:"GET",
                                async: true,
                                dataType:"json",
                                success:function(res){
                                if(res.result.data[0]!==undefined){
                                    if(res.result.data){
                                       _this.Info = res.result.data;
                                    }
                                 }
                                }
                            })
                        },
                        linkTo:function(ID){
                            common.linkTo2('./systemAnnounInner.html',null,'meassageId='+ID)
                        }
                    },
                    filters: {
                        strSplice: function(str) {
                           var spliceStr=str.toString().substr(0,10);
                            return spliceStr;
                        }
                    }
                })
    
            },500)
        })
    
     })