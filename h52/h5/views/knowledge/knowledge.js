
require(['jquery', 'Vue', 'FooterBar', 'common', 'api', 'PageLoad','Spin','dropLoad'], function($, Vue, FooterBar, common, api,PageLoad,Spin) {

    $(function() {

        var FooterBar_vue = FooterBar.init();
        var PageLoad_vue = PageLoad.init();
        // settimeout 防止页面假死
        setTimeout(function() {
            new Vue({
                el: '#app',
                data: {
                    list: [],
                    list1: [],
                    list2: [],
                    secondCats: [],
                    loaded: false,
                    registeredData:{},
                    pageNum:1,
                    pageNum1:1,
                    pageNum2:1,
                    timer1:null,
                    timer2:null,
                    timer3:null,
                    getManiangData:{
                        targetType:null
                    },
                    showLoading:false,
                    showLoading1:false,
                    showLoading2:false,
                    tab1LoadEnd:false,
                    tab2LoadEnd:false,
                    tab3LoadEnd:false,
                    dropload:null,
                    code:1
                },
                components: {
                    'footer-bar': FooterBar_vue,
                    'page-load': PageLoad_vue

                },
                created: function() {



                },
                mounted: function() {
                    // var isManage = common.getRequest().manage;
                    // if (isManage==1) {
                    //     $('.nav1 > li:first').trigger('click');
                    // }else if(isManage==3){
                    //     $('.nav1 > li:last').trigger('click');
                    // }


                    var _this = this;

                     $(".nav1 li").click(function(){
                           $(this).addClass('active').siblings().removeClass('active');
                           var index = $(this).index();
                           $(".list").eq(index).fadeIn().siblings(".list").hide();

                             _this.code = $(this).attr('code');
                             //选择1
                             if(_this.code==1){
                                 if(!_this.tab1LoadEnd){
                                   // 解锁
                                     _this.dropload.unlock();
                                      _this.dropload.noData(false);
                                 }else{
                                   // 锁定
                                     _this.dropload.lock('down');
                                     _this.dropload.noData();
                                 }
                             }else if (_this.code==2) {

                               if(!_this.tab2LoadEnd){
                                        // 解锁
                                         _this.dropload.unlock();
                                         _this.dropload.noData(false);
                                    }else{
                                        // 锁定
                                         _this.dropload.lock('down');
                                         _this.dropload.noData();
                                    }
                             }else if(_this.code==3){
                               if(!_this.tab3LoadEnd){
                                        // 解锁
                                         _this.dropload.unlock();
                                         _this.dropload.noData(false);
                                    }else{
                                        // 锁定
                                         _this.dropload.lock('down');
                                         _this.dropload.noData();
                                    }
                             }
                             // 重置
                              _this.dropload.resetload();
                     })


                     var a = this.getProfile();

                     $.when(a).then(function(a){
                          this.healRepoTypeArtis();
                          _this.loaded = true;
                     }.bind(this));



                },
                directives: {
                    tab: {
                        bind: function(elm, binding, vnode) {
                            var _this = vnode.context;
                            $(elm).find(' > li, > span').on('click', function() {
                                $(this).addClass('active').siblings().removeClass('active');

                                var index = $(this).index();

                                $(".list").eq(index).fadeIn().siblings(".list").hide();

                                var code = $(this).attr('code');
                            })
                        }
                    }
                },

                methods: {
                    toArtical: function(id) {
                        // common.linkTo('./artical.html', $.param({
                        //     _p: common.getRequest()._p,
                        //     artical: id
                        // }));

                        if(typeof(Storage) !== "undefined"){
                            sessionStorage.artical= id;
                        }
                        common.linkTo2('./artical.html');

                    },
                    //获取注册信息接口
                    getProfile:function(){
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

                                    _this.registeredData = res.result.data[0];

                                    _this.getManagementid(res.result.data[0].weChatUser.unionid);

                                }
                            }
                        })
                    },
                    //获取目标及周期
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
                    //类型下文章列表
                    healRepoTypeArtis:function(){

                      var _this = this;

                        if(this.code==1){
                            this.list = [];
                        }else if(this.code==2){
                            this.list1 = [];
                        }else if(this.code==3){
                            this.list2 = [];
                        }

                        this.dropload = $('.content-nav').dropload({
                              scrollArea:window,
                              loadDownFn:function(me){
                                if(_this.code==1){

                                  clearTimeout(_this.timer1);
                                  _this.timer1 = setTimeout(function(){

                                  var data={
                                      _p:common.getRequest()._p,
                                      type:1,
                                      pageNum: _this.pageNum,
                                      pageSize: 10,
                                      targetType:_this.getManiangData.targetType,
                                      gender: _this.registeredData.gender,
                                      femaleType:_this.registeredData.femaleType
                                  }

                                  $.ajax({
                                      type: 'GET',
                                      url: api.healRepoTypeArtis+'?'+$.param(data),
                                      async: false,
                                      dataType: 'json',
                                      success:function(res){
                                        _this.pageNum+=1;
                                        if(res.result.data.length>0){
                                          for(var i=0;i<res.result.data.length;i++){
                                              var obj={}
                                              obj['title'] = res.result.data[i].title;
                                              obj['publishTime'] = _this.formatDate(res.result.data[i].publishTime);
                                              obj['picRealPath'] = res.result.data[i].picRealPath;
                                              obj['id'] = res.result.data[i].id;
                                              _this.list.push(obj);
                                          }

                                        }else{

                                          _this.tab1LoadEnd =true;
                                          me.lock();
                                          me.noData();
                                        }

                                        setTimeout(function(){
                                             me.resetload();
                                        },800);
                                      }

                                  })

                                },100);

                                }else if(_this.code==2){

                                clearTimeout(_this.timer2);

                                _this.timer2 = setTimeout(function(){

                                  var data={
                                      _p:common.getRequest()._p,
                                      type:2,
                                      pageNum: _this.pageNum1,
                                      pageSize: 10,
                                      targetType:_this.getManiangData.targetType,
                                      gender: _this.registeredData.gender,
                                      femaleType:_this.registeredData.femaleType
                                  }

                                  $.ajax({
                                      type: 'GET',
                                      url: api.healRepoTypeArtis+'?'+$.param(data),
                                      async: false,
                                      dataType: 'json',
                                      success:function(res){
                                        _this.pageNum1++;

                                        if(res.result.data.length>0){

                                          for(var i=0;i<res.result.data.length;i++){
                                              var obj={}
                                              obj['title'] = res.result.data[i].title;
                                              obj['publishTime'] = _this.formatDate(res.result.data[i].publishTime);
                                              obj['picRealPath'] = res.result.data[i].picRealPath;
                                              obj['id'] = res.result.data[i].id;
                                              _this.list1.push(obj);
                                          }

                                        }else{
                                          _this.tab2LoadEnd =true;
                                           me.lock();
                                           me.noData();
                                        }

                                        setTimeout(function(){
                                             me.resetload();
                                        },800);

                                      }

                                  })
                                },100);
                                }else if(_this.code==3){


                                  clearTimeout(_this.timer3);


                                  _this.timer3 = setTimeout(function(){


                                  var data={
                                      _p:common.getRequest()._p,
                                      type:3,
                                      pageNum: _this.pageNum2,
                                      pageSize: 10,
                                      targetType:_this.getManiangData.targetType,
                                      gender: _this.registeredData.gender,
                                      femaleType:_this.registeredData.femaleType
                                  }


                                  $.ajax({
                                      type: 'GET',
                                      url: api.healRepoTypeArtis+'?'+$.param(data),
                                      async: false,
                                      dataType: 'json',
                                      success:function(res){

                                         _this.pageNum2++;

                                        if(res.result.data.length>0){

                                          for(var i=0;i<res.result.data.length;i++){
                                              var obj={}
                                              obj['title'] = res.result.data[i].title;
                                              obj['publishTime'] = _this.formatDate(res.result.data[i].publishTime);
                                              obj['picRealPath'] = res.result.data[i].picRealPath;
                                              obj['id'] = res.result.data[i].id;
                                              _this.list2.push(obj);
                                          }



                                        }else{
                                             _this.tab3LoadEnd =true;
                                              me.lock();
                                              me.noData();
                                        }
                                          setTimeout(function(){
                                               me.resetload();
                                          },800);
                                      }

                                  })

                                },100)

                                }

                              }
                        })
                    },
                formatDate:function(input){
                  var d = new Date(input);
                  var year = d.getFullYear();
                  var month = (d.getMonth() + 1) < 10 ? '0' + (d.getMonth() + 1) : '' + (d.getMonth() + 1);
                  var day = d.getDate() < 10 ? '0' + d.getDate() : '' + d.getDate();
                  var hour = d.getHours();
                  var minutes = d.getMinutes();
                  var seconds = d.getSeconds();
                  return year + '-' + month + '-' + day;
                },
                filters: {
                    // formatDate: function(input) {
                    //     var d = new Date(input);
                    //     var year = d.getFullYear();
                    //     var month = (d.getMonth() + 1) < 10 ? '0' + (d.getMonth() + 1) : '' + (d.getMonth() + 1);
                    //     var day = d.getDate() < 10 ? '0' + d.getDate() : '' + d.getDate();
                    //     var hour = d.getHours();
                    //     var minutes = d.getMinutes();
                    //     var seconds = d.getSeconds();
                    //     return year + '-' + month + '-' + day;
                    // }
                }
              }
            });
        }, 500)
    })

})
