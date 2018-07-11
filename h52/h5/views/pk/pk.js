
require(['jquery','Vue','common','api','FooterBar','PageLoad','dropLoad'],function($,Vue,common,api,FooterBar,PageLoad){

    var FooterBar_vue = FooterBar.init();
    var PageLoad_vue = PageLoad.init();

      $(function(){

            // settimeout 防止页面假死
            setTimeout(function(){
                new Vue({
                    el: '#app',
                    data: {
                      loaded: false,
                        scoreInfor:{},
                        scorerRank:{},
                        showPklistData:[],
                        showPklistData2:null,
                        rank:null,
                        rankNumber:null,
                        timer:null,
                        initList:null,
                        showLoading:false,
                        meUnionid:null,
                        initListDown:null,
                        upNumber:null,
                        downNumber:null,
                        toStingNumber:null,
                        tenUpPage:null,
                        tenDownPage:null,
                        pageLoad:false
                    },
                    components: {
                        'footer-bar': FooterBar_vue,
                        'page-load': PageLoad_vue
                    },
                    created: function(){

                       var _this = this;

                       var a =this.getScore();

                       $.when(a).then(function(a){

                        _this.pageLoad= true;

                        if(_this.scorerRank.rank){

                            _this.getPkList();



                        }

                       })

                    },
                    mounted: function(){



                     },
                     methods: {
                      getScore: function(){
                        var _this = this;
                        return $.ajax({
                            type:'get',
                            url: api.showScore,
                            data:{
                                _p:common.getRequest()._p
                            },
                            dataType:'json',
                            async: true,
                            success:function(res){
                               _this.scoreInfor = res[1];
                               _this.scorerRank = res[0];
                               _this.loaded = true;

                                _this.meUnionid = res[1].unionid;


                                console.log("排名值:"+_this.scorerRank.rank);

                               if(_this.scorerRank.rank!== null){

                                 if(_this.scorerRank.rank==10){
                                    _this.toStingNumber = "0"
                                 }else{
                                    _this.toStingNumber = (Number(_this.scorerRank.rank)/10).toString();
                                 }


                                   if(_this.toStingNumber.indexOf(".")>0){

                                     _this.rank =  _this.toStingNumber.substring(0, _this.toStingNumber.indexOf("."));
                                      console.log("存在小数");
                                   }else{
                                      _this.rank = Number(_this.toStingNumber)-1;
                                      console.log("整数:"+_this.rank);
                                   }


                               }else if(_this.scorerRank.rank== "0"){
                                  _this.rank = 0
                               }else if(_this.scorerRank.rank== "null"){
                                  _this.rank = null
                               }

                            }
                        })
                      },
                      getPkList: function(){
                         var _this = this;
                         $.ajax({
                            type:'GET',
                            url: api.showPklist,
                            data:{
                                _p:common.getRequest()._p,
                                start: _this.rank,
                                rows: 10
                            },
                            async: true,
                            success: function(res){
                               _this.initList = res.data;
                               if(res.data){

                                for(var i=0;i<res.data.list.length;i++){
                                    var  obj ={};

                                    obj["score"] = res.data.list[i].score;
                                    obj["gender"] = res.data.list[i].gender;
                                    obj["likeSize"] = res.data.list[i].likeSize;
                                    obj["name"] = res.data.list[i].name;
                                    obj["headImgUrl"] = res.data.list[i].headImgUrl;
                                    obj["likeStatus"] = res.data.list[i].likeStatus;
                                    obj["unionid"] = res.data.list[i].unionid;
                                    obj["rank"] = res.data.list[i].rank;

                                    if(res.data.list[i].unionid == _this.meUnionid){
                                        if(res.data.list[i].headImgUrl!==_this.scoreInfor.headimgurl){
                                           obj["headImgUrl"] = _this.scoreInfor.headimgurl;
                                           console.log("头像不相等");
                                        }else{
                                           obj["headImgUrl"] = res.data.list[i].headImgUrl;
                                           console.log("头像相等");
                                        }

                                      }

                                    _this.showPklistData.push(obj);


                                    // if(_this.showPklistData[i].unionid== _this.meUnionid ){
                                    //     //console.log(_this.showPklistData[i].rank);
                                    //     //console.log(_this.showPklistData.splice(i,1));
                                    //     _this.showPklistData2 = _this.showPklistData.splice(i,1);
                                    //     console.log(_this.showPklistData2);
                                    //     var obj2 = {}
                                    //     obj2["score"] = _this.showPklistData2[0].score,
                                    //     obj2["gender"] = _this.showPklistData2[0].gender,
                                    //     obj2["headImgUrl"] = _this.showPklistData2[0].headImgUrl,
                                    //     obj2["likeSize"] = _this.showPklistData2[0].likeSize,
                                    //     obj2["name"] = _this.showPklistData2[0].name,
                                    //     obj2["likeStatus"] = _this.showPklistData2[0].likeStatus,
                                    //     obj2["unionid"] = _this.showPklistData2[0].unionid,
                                    //     obj2["rank"] = _this.showPklistData2[0].rank,
                                    //     _this.showPklistData.unshift(obj2);
                                    // }

                                }

                               }
                              setTimeout(function(){

                                if($(".pkList ul li").length<10){
                                    return false;
                                }else{

                                    _this.IsScrollFooter();
                                }
                              },500)
                            }
                         })
                      },
                      //
                      IsScrollFooter: function(){
                        var _this = this;

                        _this.rankNumber = Number(_this.rank);
                        _this.upNumber = _this.rankNumber;
                        _this.downNumber = _this.rankNumber;
                        if(_this.upNumber>10){
                            _this.tenUpPage = _this.upNumber-10;//上翻页10
                        }
                        _this.tenDownPage = _this.downNumber+10;//下翻页10


                        console.log('当前页数:'+ _this.rankNumber)

                        $('.lodeDate').dropload({
                            scrollArea : window,
                            domUp : {
                                domClass   : 'dropload-up',
                                domRefresh : '<div class="dropload-refresh">↓下拉加载更多</div>',
                                domUpdate  : '<div class="dropload-load"><span class="loading"></span>加载中...</div>',
                                domLoad    : '<div class="dropload-noData"></div>'
                            },
                            domDown : {
                                domClass   : 'dropload-down',
                                domRefresh : '<div class="dropload-refresh">↑上拉加载更多</div>',
                                domLoad    : '<div class="dropload-load"><span class="loading"></span>加载中...</div>',
                                domNoData  : '<div class="dropload-noData">我们是有底线的</div>'
                            },
                            loadUpFn: function(me){

                              if(_this.upNumber<= -1){
                                  console.log('到头了');
                                  $(".noData").show();
                                  setTimeout(function(){
                                    $(".noData").fadeOut();
                                  },500);
                                  me.resetload();
                                  return;
                               }



                                _this.timer = setTimeout(function(){

                                    _this.upNumber--
                                    console.log('上页:'+_this.upNumber);

                                    if (_this.upNumber <= -1) {
                                        _this.upNumber = "";
                                        $(".noData").show();
                                        setTimeout(function(){
                                          $(".noData").fadeOut();
                                        },500);
                                        me.resetload();
                                        return;
                                    }

                                    $.ajax({
                                        type:'GET',
                                        url: api.showPklist,
                                        data:{
                                            _p:common.getRequest()._p,
                                            start: _this.upNumber,
                                            rows: 10
                                        },
                                        success: function(res){
                                            if(res.data||res.data.list[0]!==undefined){
                                                    for(var i=res.data.list.length - 1;i>=0;i--){
                                                        var  obj ={};
                                                        obj["score"] = res.data.list[i].score,
                                                        obj["gender"] = res.data.list[i].gender,
                                                        obj["headImgUrl"] = res.data.list[i].headImgUrl,
                                                        obj["likeSize"] = res.data.list[i].likeSize,
                                                        obj["name"] = res.data.list[i].name,
                                                        obj["likeStatus"] = res.data.list[i].likeStatus,
                                                        obj["unionid"] = res.data.list[i].unionid,
                                                        obj["rank"] = res.data.list[i].rank,
                                                        _this.showPklistData.unshift(obj);
                                                    }

                                            }else{
                                                console.log("没数据")
                                            }

                                        },
                                        error: function(xhr, type){
                                            // 即使加载出错，也得重置
                                            //me.resetload();
                                        }
                                    })
                                      me.resetload();
                                    // me.lock('up');
                                    // me.noData();
                                },1000)

                            },
                            loadDownFn: function(me){




                                    //  console.log("没数据");
                                    //  me.noData();
                                    //  me.resetload();


                                _this.timer = setTimeout(function(){
                                    _this.downNumber+=1

                                    console.log('下一页:'+_this.downNumber);
                                    $.ajax({
                                        type:'GET',
                                        url: api.showPklist,
                                        data:{
                                            _p:common.getRequest()._p,
                                            start: _this.downNumber,
                                            rows: 10
                                        },
                                        success: function(res){
                                            _this.initListDown = res.data

                                            if(res.data==null||res.data.list[0]===undefined){
                                                console.log("没数据");
                                                me.noData();
                                                me.resetload();
                                            }else{
                                                for(var i=0;i<res.data.list.length;i++){
                                                    var  obj ={};
                                                    obj["score"] = res.data.list[i].score,
                                                    obj["gender"] = res.data.list[i].gender,
                                                    obj["headImgUrl"] = res.data.list[i].headImgUrl,
                                                    obj["likeSize"] = res.data.list[i].likeSize,
                                                    obj["name"] = res.data.list[i].name,
                                                    obj["likeStatus"] = res.data.list[i].likeStatus,
                                                    obj["unionid"] = res.data.list[i].unionid,
                                                    obj["rank"] = res.data.list[i].rank,
                                                    _this.showPklistData.push(obj);
                                                }

                                            }

                                        },
                                        error: function(xhr, type){
                                            // 即使加载出错，也得重置
                                          // me.resetload();
                                        }
                                    })
                                  //  me.lock();
                                    me.resetload();
                                   // me.noData();
                                },1000)


                            },
                            threshold : 50
                        })


                      },
                      showGood: function(index,status){
                          var _this = this;
                          var likeUnionId = _this.showPklistData[index].unionid;

                          $.ajax({
                            type:'post',
                            url: api.showGood,
                            data: {
                                _p:common.getRequest()._p,
                                unionid: _this.scoreInfor.unionid,
                                likeUnionId: likeUnionId,
                                status: status
                            },
                            success:function(res){
                                if(res==1){
                                     if(status==1){
                                        _this.showPklistData[index].likeSize++;
                                        _this.showPklistData[index].likeStatus = true;
                                     }else{
                                        _this.showPklistData[index].likeSize--
                                        _this.showPklistData[index].likeStatus = false;

                                     }
                                }
                            }
                          })
                      }
                }

             }
            )
            },500)

        })


    })
