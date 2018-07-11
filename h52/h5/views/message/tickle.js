

require(['jquery', 'Vue',  'common', 'api'], function($, Vue, common, api) { 
    
        $(function(){
            // settimeout 防止页面假死
            setTimeout(function() {



                new Vue({
                    el: '#app',
                    data:{
                        pigupsInfo:null,
                        sexR:null
                    },
                    created:function(){
                       this.getProfile();
                    },
                    computed:{
                        portrait:function(){
                          var data;
                          if(this.sexR==1){
                            data= '../../assets/images/my/boy.png';
                          }else{
                            data= '../../assets/images/my/girl.png';
                          }
                          return data;
                        }
                    },
                    components: {

                    },
                    mounted:function(){
    
                        this.getPigupsInfo();
    
                    },
                    methods:{
                        preview: function(url) {
                            wx.previewImage({
                                current: url,
                                urls: [url]
                            });
                        },
                         //查询谁点赞我
                        getPigupsInfo:function(){
                            var _this = this;
                            var data={
                                _p:common.getRequest()._p,
                                isread:true
                            }
                            $.ajax({
                                url:api.getPigupsInfo+"?"+$.param(data),
                                type:"GET",
                                async: true,
                                dataType:"json",
                                success:function(res){
                                    if(res.result.data){
                                        _this.pigupsInfo = res.result.data;

                                        console.log(_this.pigupsInfo);
                       
                                    }else{
                                  
                                    }
                                }
                            })

                        },
                        getProfile: function() {
                            var _this = this;
                            return $.ajax({
                                type: 'POST',
                                url: api.profile,
                                async: true,
                                data: {
                                    _p: common.getRequest()._p
                                },
                                dataType: 'json',
                                success: function(res) {
                                    if (res.result.data) {
                                        _this.sexR = res.result.data[0].gender; //注册后的性别
                                    }
                                }
                            })
    
                        }
                    },
                    filters:{
                        filterSting:function(value){
                            if (!value) { return ''}
                            value = value.toString();
                            return value.substr(0,10);
                        }
                    }
                })
    
            },500)
        })
    
     })