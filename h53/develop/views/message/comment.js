require(['jquery', 'Vue',  'common', 'api'], function($, Vue, common, api) { 

    $(function(){
        // settimeout 防止页面假死
        setTimeout(function() {

            new Vue({
                el: '#app',
                data:{
                    picdomInfo:null,
                    picdomInfoName:null,
                    picdomInfoCreatTime:null,
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
                mounted:function(){

                    this.getPicdomInfo();

                },
                methods:{
                    preview: function(url) {
                        wx.previewImage({
                            current: url,
                            urls: [url]
                        });
                    },
                     //查询谁评论
                     getPicdomInfo:function(){
                        var _this = this;
                        var data={
                           _p:common.getRequest()._p,
                           isread:true
                        }
                        $.ajax({
                            url:api.getPicdomInfo+"?"+$.param(data),
                            type:"GET",
                            async: true,
                            dataType:"json",
                            success:function(res){
                                //console.log(res);
                                if(res.result.data){
                                    _this.picdomInfo = res.result.data;
                                    // _this.picdomInfoName = res.result.data[0].userInfo.name;
                                    // _this.picdomInfoCreatTime = res.result.data[0].createTime;
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
                }
            })

        },500)
    })

 })