
require(['jquery','Vue','common','api','Spin','PageLoad','dropLoad'],function($,Vue,common,api,Spin,PageLoad,dropLoad){
    
        $(function(){

            var mainid = decodeURIComponent(common.getRequest().mainid);
            var Spin_vue = Spin.init();
            var PageLoad_vue = PageLoad.init();
    
            // settimeout 防止页面假死
            setTimeout(function(){
                new Vue({
                    el: '#app',
                    data: {
                        queryHotData:[],
                        pageSize: 2,
                        createTime:null,
                        initList:[],
                        showLoading: false,
                        pageLoad:false
                    },
                    components: {
                        'spin': Spin_vue,
                        'page-load': PageLoad_vue
                    },
                    created: function(){
                         
                    },
                    mounted: function(){
                        this.queryHot();
                     },
                     methods: {
                        queryHot: function(){
                            var _this = this;
                            $.ajax({
                                type:'POST',
                                url: api.queryHot,
                                data:{
                                    _p:common.getRequest()._p,
                                    mainid:mainid,
                                    pageSize: 1,
                                    pageNum: 10
                                },
                                dataType:'json',
                                async: true,
                                success:function(res){
                                    _this.pageLoad = true;
                                    if(res.result.data){
                                        for(var i=0;i<res.result.data.length;i++){
                                            var  obj ={};
                                            obj["titel"] = res.result.data[i].titel,
                                            obj["createTime"] = res.result.data[i].createTime,
                                            obj["picUrl"] = res.result.data[i].picUrl,
                                            obj["hotId"] = res.result.data[i].hot_id,
                                            _this.queryHotData.push(obj);
                                           }
                                    }
                                   setTimeout(function(){
                                     if($(".recomm li").length<3){
                                         return false;
                                     }else{
                                        _this.IsScrollFooter();
                                     }
                                     
                                   },500)
                                }
                            })
                        },
                         //滚动加载数据
                         IsScrollFooter: function(){
                            
                            var _this=this;
                            $(window).on('scroll',function(){

                                var scrollTop = $(this).scrollTop();
                                var scrollHeight = $(document).height();
                                var windowHeight = $(this).height();

                                

                                if( _this.initList==null){
                                    $(".over").show();
                                    return;
                                }else{
                                    _this.showLoading = true;
                                }

                                setTimeout(_this.timer);
                                //判断最后一个元素是否在底部之上
                                if(scrollTop  + windowHeight  == scrollHeight){
                                    _this.timer= setTimeout(function(){
                                        
                                        $.ajax({
                                            type:'POST',
                                            url: api.queryHot,
                                            data:{
                                                _p:common.getRequest()._p,
                                                mainid:mainid,
                                                pageSize: _this.pageSize,
                                                pageNum: 10
                                            },
                                            dataType:'json',
                                            success:function(res){
                                                _this.pageSize++;
                                                _this.initList = res.result.data;
                                                _this.showLoading = false;
                                                if(_this.initList){
                                                for(var i=0;i<res.result.data.length;i++){
                                                    var obj = {
                                                        titel: res.result.data[i].titel,
                                                        createTime: res.result.data[i].createTime,
                                                        picUrl: res.result.data[i].picUrl,
                                                        hotId: res.result.data[i].hot_id
                                                    };
                                                    _this.queryHotData.push(obj);
                                                }
                                            }
                                            }
                                        })
                                    },1000)

                                }

                            })
                        },
                        linkTo: function(index){
                            var hotId = this.queryHotData[index].hotId;
                            location.href = 'detail.html?'+'_p='+common.getRequest()._p+ "&hotId=" + encodeURIComponent(hotId);
                       }
                },
                filters:{
                    formatDate:function (input) {
                        var d = new Date(input);
                        var year = d.getFullYear();
                        var month = (d.getMonth() + 1)<10 ? '0' + (d.getMonth() + 1) : '' + (d.getMonth() + 1);
                        var day = d.getDate() <10 ? '0' + d.getDate() : '' + d.getDate();
                        var hour = d.getHours();
                        var minutes = d.getMinutes();
                        var seconds = d.getSeconds();
                        return  year+ '-' + month + '-' + day;
                    }
                }
             }
            )
            },500)
    
        })
     
    
    })