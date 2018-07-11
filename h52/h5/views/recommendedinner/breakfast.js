
require(['jquery','Vue','common','api','Spin','PageLoad'],function($,Vue,common,api,Spin,PageLoad){

        $(function(){

            var mealType = sessionStorage.mealType;

            console.log("type值："+mealType)

            var Spin_vue = Spin.init();
            var PageLoad_vue = PageLoad.init();

            // settimeout 防止页面假死
            setTimeout(function(){
                new Vue({
                    el: '#app',
                    data: {
                        queryHotData:[],
                        pageNum: 2,
                        createTime:null,
                        initList:[],
                        showLoading: false,
                        pageLoad:false,
                        registeredData:{},
                        getManiangData:{
                            targetType:null
                        }
                    },
                    components: {
                        'spin': Spin_vue,
                        'page-load': PageLoad_vue
                    },
                    created: function(){


                          this.getProfile();

                    },
                    mounted: function(){
                       // this.queryHot();


                     },
                     methods: {

                        getProfile:function(){
                            var _this = this;
                             $.ajax({
                                type: 'POST',
                                url: api.profile,
                                async: false,
                                data: {
                                    _p: common.getRequest()._p
                                },
                                dataType: 'json',
                                success: function(res) {
                                    if (res.result.data) {
                                        _this.pageLoad = true;
                                        _this.registeredData = res.result.data[0];

                                        var unionid = res.result.data[0].weChatUser.unionid;

                                        _this.getManagementid(unionid);

                                        _this.teachEatThemeArtis();
                                    }
                                }
                            })
                        },
                        getManagementid:function(unionid){

                            var _this = this;

                            var data={
                                unionid:unionid
                            }

                            $.ajax({
                                type:"get",
                                url:api.getManagementid+'?'+$.param(data),
                                async: false,
                                success:function(res){
                                     if(res.vo){

                                        _this.getManiangData.targetType = res.vo.targetType;
                                     }
                                }

                            })

                        },
                        teachEatThemeArtis:function(){
                            var _this = this;

                            var data={
                                _p:common.getRequest()._p,
                                pageSize:5,
                                pageNum:1,
                                mealType: mealType,
                                gender: _this.registeredData.gender,
                                femaleType: _this.registeredData.femaleType,
                                targetType: _this.getManiangData.targetType
                            }
                            $.ajax({
                                type:'GET',
                                url: api.teachEatThemeArtis+'?'+$.param(data),
                                dataType:'json',
                                async: false,
                                success:function(res){
                                   // _this.pageLoad = true;
                                    if(res.result.data||res.result.data.length>0){
                                        for(var i=0;i<res.result.data.length;i++){
                                            var  obj ={};
                                            obj["titel"] = res.result.data[i].title,
                                            obj["createTime"] = res.result.data[i].publishTime,
                                            obj["picUrl"] = res.result.data[i].picRealPath,
                                            obj["hotId"] = res.result.data[i].id,
                                            _this.queryHotData.push(obj);
                                           }
                                    }else{
                                      $(".noData").show();
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


                                        var data={
                                            _p:common.getRequest()._p,
                                            pageSize:5,
                                            pageNum: _this.pageNum,
                                            mealType: mealType,
                                            gender: _this.registeredData.gender,
                                            femaleType: _this.registeredData.femaleType,
                                            targetType: _this.getManiangData.targetType
                                        }


                                        $.ajax({
                                            type:'GET',
                                            url: api.teachEatThemeArtis+'?'+$.param(data),
                                            dataType:'json',
                                            async: false,
                                            success:function(res){

                                               _this.pageNum++;
                                               _this.initList = res.result.data;
                                               _this.showLoading = false;
                                                if(res.result.data){
                                                    for(var i=0;i<res.result.data.length;i++){
                                                        var  obj ={};
                                                        obj["titel"] = res.result.data[i].title,
                                                        obj["createTime"] = res.result.data[i].publishTime,
                                                        obj["picUrl"] = res.result.data[i].picRealPath,
                                                        obj["hotId"] = res.result.data[i].id,
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
                            if(typeof(Storage) !== "undefined"){
                                sessionStorage.hotId= hotId;
                            }
                            common.linkTo2('./detail.html');
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
