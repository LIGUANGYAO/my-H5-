require(['jquery', 'Vue',  'common', 'api'], function($, Vue, common, api) { 
    
        $(function(){
            // settimeout 防止页面假死
            setTimeout(function() {
    
                new Vue({
                    el: '#app',
                    data:{
                        activityInfo:{},
                        Info:{},
                        activityInfoTime:null,
                        InfoTime:null,
                        registeredData:{},
                        listTime:null,
                        MessLis:{},
                        sysreply:null
                    },
                    created:function(){
    
                    },
                    mounted:function(){

                       // this.getReporrtList();
    
                        this.getActivityInfo();

                        this.getNoticeInfo();

                        this.getProfile();

                        this.getsSysMessList();//系统消息列表

                        this.getSysreply();


                      

                       $(".activity").on("click",function(){
                        common.linkTo2("./systemActive.html");
                       })

                       $(".announ").on("click",function(){
                        common.linkTo2("./systemAnnoun.html");
                       })



                      
    
                    },
                    methods:{


                        getSysreply:function(){
                            var _this =this;
                            $.ajax({
                                url:api.getSysreply+"?_p="+common.getRequest()._p,
                                type:"GET",
                                async: true,
                                dataType:"json",
                                success:function(res){
                                    if(res.result.data){
                                        if(res.result.data[0]!==undefined){
                                           
                                            $(".feedback").on('click',function(){
                                                common.linkTo2("./feedback.html");
                                                
                                            })
                                        }else{
                                            $(".feedback").on('click',function(){
                                                common.linkTo2("./empty.html");
                                            })
                                        }
                                    }
                                }
                            })
                        },

                        //系统消息列表
                        getsSysMessList:function(){

                            var _this = this;
                            $.ajax({
                                url:api.getsSysMessList+"?_p="+common.getRequest()._p,
                                type:"GET",
                                async: true,
                                dataType:"json",
                                success:function(res){
                                  if(res){
                                      if(res[0]!==undefined){
                                        _this.MessLis = res[0];
                                      }
                                  }
                                    
                                }
                            })

                        },
                         // 查询系统活动
                         getActivityInfo:function(){
                            var _this = this;
                            var data={
                                _p:common.getRequest()._p,
                                isread:false
                            }
                            $.ajax({
                                url:api.getActivityInfo+"?"+$.param(data),
                                type:"GET",
                                async: true,
                                dataType:"json",
                                success:function(res){
                                    if(res.result.data[0]!==undefined){
                                    if(res.result.data){
                                        _this.activityInfo = res.result.data[0];
                                        _this.activityInfoTime = res.result.data[0].create_time.substr(0,10);
                                    }else{
    
                                    }
                                }
                                    
                                }
                            })
                        },
                        //健康分析
                        getProfile:function(){
                            var _this = this;
                            var _this = this;
                            return $.ajax({
                            type:'POST',
                            url: api.profile,
                            async: true,
                            data:{
                                _p:common.getRequest()._p
                            },
                            dataType:'json',
                            success: function(res){
                                 if(res.result.data||res.result.data!==null){
                                     _this.registeredData = res.result.data[0];
                                     if(_this.registeredData.age==null||_this.registeredData.gender==null||_this.registeredData.height==null){
                                        $(".healtRport").on("click",function(){
                                            common.linkTo2("../my/my.html");
                                        })
                                     }else{
                                        $(".healtRport").on("click",function(){
                                            common.linkTo2("../report/report.html");
                                        })
                                     }
                                   
                                 }
                               }
                            })
                        },
                        getReporrtList: function() {
        
                            var _this = this;
                            $.ajax({
                                type: 'POST',
                                url: api.reportList,
                                data:{
                                    _p: common.getRequest()._p
                                },
                                dataType: 'json',
                                success: function(res) {

                                    if(res.result.data){
                                        _this.listTime = res.result.data[0].createTime
                                    }

                                },
                                error: function() {

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
                                       _this.InfoTime = res.result.data[0].create_time.substr(0,10);
                                    }
                                }
                                }
                            })
                        }
                    },
                    filters: {
                        formatDate: function(input) {
                            var d = new Date(input);
                            var year = d.getFullYear();
                            var month = (d.getMonth() + 1) < 10 ? '0' + (d.getMonth() + 1) : '' + (d.getMonth() + 1);
                            var day = d.getDate() < 10 ? '0' + d.getDate() : '' + d.getDate();
                            var hour = d.getHours();
                            var minutes = d.getMinutes();
                            var seconds = d.getSeconds();
                            return year + '-' + month + '-' + day;
                        }
                    }
                })
    
            },500)
        })
    
     })