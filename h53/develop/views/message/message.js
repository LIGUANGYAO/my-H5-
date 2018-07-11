require(['jquery', 'Vue',  'common', 'api','FooterBar'], function($, Vue, common, api,FooterBar) {      
 
    $(function() {

        var FooterBar_vue = FooterBar.init();


        // settimeout 防止页面假死
        setTimeout(function() {

            new Vue({
                el: '#app',
                data:{
                   message:{},
                   Info:{},
                   InfoTime:null,
                   picdomInfo:null,//评论
                   picdomInfoName:null,
                   picdomInfoCreatTime:null,
                   pigupsInfo:null,//点赞
                   pigupsInfoName:null,
                   pigupsInfoCreatTime:null
                },
                created:function(){
                    
                },
                components: {
                    'footer-bar': FooterBar_vue
                },
                mounted:function(){
                    
                     var _this = this;

                    this.getMessage();
                    //查询谁评论
                    this.getPicdomInfo();
                     //查询谁点赞我
                    this.getPigupsInfo();
                   //查询系统公告
                   this.getNoticeInfo();

                   $(".sysinfos").on('click',function(){
                         common.linkTo2("./system.html");
                   })

                },
                methods:{
                    //消息列表
                    getMessage:function(){
                        var _this = this;
                        $.ajax({
                            url:api.getMmessageList+"?_p="+common.getRequest()._p,
                            type:"GET",
                            async: true,
                            success:function(res){
                                if(res){
                                    _this.message = res[0];
                                }
                            }
                        })
                    },
                    //查询谁评论
                    getPicdomInfo:function(){
                        var _this = this;
                        var data={
                            _p:common.getRequest()._p,
                            isread:false
                        }
                        $.ajax({
                            url:api.getPicdomInfo+"?"+$.param(data),
                            type:"GET",
                            async: true,
                            dataType:"json",
                            success:function(res){
                                if(res.result.data[0]!==undefined){

                                if(res.result.data){
                                    _this.picdomInfo = res.result.data[0];
                                    _this.picdomInfoName = res.result.data[0].userInfo.name;
                                    _this.picdomInfoCreatTime = (res.result.data[0].createTime).substr(0,10);

                                    $(".picdomInfo").on('click',function(){
                                        common.linkTo2("./comment.html");
                                    });

                                }else{

                                  
                                }

                            }else{

                                $(".picdomInfo").on('click',function(){
                                    common.linkTo2("./empty.html",null,"titleName=评论");
                                });

                            }
                                
                            }
                        })
                    },
                    //查询谁点赞我
                    getPigupsInfo:function(){
                        var _this = this;
                        var data={
                            _p:common.getRequest()._p,
                            isread:false
                        }
                        $.ajax({
                            url:api.getPigupsInfo+"?"+$.param(data),
                            type:"GET",
                            async: true,
                            dataType:"json",
                            success:function(res){
                                if(res.result.data[0]!==undefined){                               
                                if(res.result.data){
                                    _this.pigupsInfo = res.result.data[0];
                                    _this.pigupsInfoName = res.result.data[0].userInfo.name;
                                    _this.pigupsInfoCreatTime = (res.result.data[0].create_time).substr(0,10);
                                    $(".pigupsInfo").on('click',function(){
                                        common.linkTo2("./tickle.html");
                                    });
                                }else{
                                  
                                }
                             }else{
                                $(".pigupsInfo").on('click',function(){
                                    common.linkTo2("./empty.html",null,"titleName=点赞");
                                });
                             }
                            }
                        })

                    },
                    getNoticeInfo:function(){
                        var _this = this;
                        var data={
                            _p:common.getRequest()._p,
                            isread:false
                        }
                        $.ajax({
                            url:api.getNoticeInfo+"?"+$.param(data),
                            type:"GET",
                            async: true,
                            dataType:"json",
                            success:function(res){
                            if(res.result.data[0]!==undefined){
                                if(res.result.data){
                                   _this.Info = res.result.data[0];
                                   _this.InfoTime = (res.result.data[0].create_time).substr(0,10);
                                }
                             }
                            }
                        })
                    }

                }
            })

        },50)

    })

})