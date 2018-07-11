require(['jquery', 'Vue',  'common', 'api'], function($, Vue, common, api) { 
    
        $(function(){
            // settimeout 防止页面假死
            setTimeout(function() {
    
                new Vue({
                    el: '#app',
                    data:{
                        sysreply:null
                    },
                    created:function(){
    
                    },
                    mounted:function(){
    
                       this.getSysreply();
     
                    },
                    methods:{
                        preview: function(url) {
                            wx.previewImage({
                                current: url,
                                urls: [url]
                            });
                        },
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
                                            _this.sysreply = res.result.data;

                                        }
                                    }
                                }
                            })
                        },

                        linkTo:function(id){
                            common.linkTo2('../my/detail.html',null,'id='+id);
                        },
                 
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