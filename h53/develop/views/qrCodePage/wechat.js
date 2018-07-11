require(['jquery', 'Vue', 'api'], function($, Vue, api) {

        $(function() {
    
            // settimeout 防止页面假死
            setTimeout(function() {
                new Vue({
                    el: '#app',
                    data: {
                        timeOutEvent:0
                    },
                    components: {
                       
                    },
                    created: function() {



                    },
                    mounted: function() {
                        var _this = this;

                            // 阻止安卓实体键后退
                            // 页面载入时使用pushState插入一条历史记录
                            history.pushState(null, null, '#' );
                            window.addEventListener('popstate', function(event) {
                            // 点击回退时再向历史记录插入一条，以便阻止下一次点击回退
                                history.pushState(null, null, '#' );
                            }); 


                                $("#wechatImage").on({
                                    touchstart: function(e){
                                    if(_this.timeOutEvent==0){
                                        setTimeout(function(){
                                        _this.longPress();
                                    },500);
                                    }	
                                        //e.preventDefault();
                                    }
                                });

                            console.log("多次提交判断值:"+this.timeOutEvent);  

                            this.init();
                    },
                    methods:{  
                        /**
                         *
                         *设置图片二维码
                        **/
                        init:function(){
                            document.getElementById("wechatImage").src =  this.GetQueryString("imgeUrl");
                            document.getElementById("code").innerText =  this.GetQueryString("code");
                 
                            var code = this.GetQueryString("code");
                 
                            var codeDom = document.getElementById("codeDom");
                            var code1 = document.getElementById("code1");
                 
                            if(code){
                               codeDom.style.display = "block";
                               code1.style.display = "none";
                            }else{
                                 codeDom.style.display = "none";
                                 code1.style.display = "block";
                            }
                            
                        },
                        //获取URL参数值
                        GetQueryString:function(name){

                            var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
                            var r = window.location.search.substr(1).match(reg);
                            if(r!=null)return  unescape(r[2]); return null;

                        },
                        //长按二维码统计
                        longPress:function(){
                            var _this =this;
                            
                            var machineId = this.GetQueryString("machineId");
                            var accountId = this.GetQueryString("accountId");
                            var unionId = this.GetQueryString("unionId");
                            var data = this.GetQueryString("data");
                            var reqTime = this.GetQueryString("reqTime");

                            if(!unionId){
                                return;
                            }
                            $.ajax({
                                url:api.longpress+"machineId="+machineId+"&accountId="+accountId+"&unionId="+unionId+"&data="+data+"&reqTime="+reqTime,
                                success:function(res){
                                    if(res.code){
                                        _this.timeOutEvent = 1; 
                                        console.log("多次提交判断值:"+_this.timeOutEvent);  
                                    }
                                    
                                }
                            })
                        }
                    }
                })
            }, 500)
        })
    
    })