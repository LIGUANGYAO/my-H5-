//@see 有背景的loading框
function openLoading(msg) {
    var loadingBox = document.createElement('div');
    loadingBox.id = 'loadingBox';
    loadingBox.style.cssText = "width:100%;height:100%;background-color: white;position:fixed;top:0;left:0;z-index:9999";
    var loading = document.createElement('div');
    loading.id = 'loading';
    loading.style.cssText = "display:-webkit-box;-webkit-box-align:center; -webkit-box-pack: center;-webkit-box-orient: vertical; width:8em;height:7em;color:#ffffff;text-shadow: none; background:#000; opacity:0.4; border-radius:5px; position:fixed; top:50%; left:50%; margin-top:-3.5em;margin-left:-4em;z-index:9999";
    var loadingImg = document.createElement('div');
    loadingImg.id = 'loadingImg';
    loadingImg.style.cssText = "width:5em;;height:4.5em;background-image:url('../../assets/images/logo.gif');background-size:65%;background-position:center;background-repeat:no-repeat;";
    var loadingText = document.createElement('div');
    loadingText.id = 'loadingText';
    loadingText.innerHTML = msg
    loadingText.style.cssText = "-webkit-box-flex:1;font-family:Microsoft Yahei;font-size:1.1em;color: rgb(153,207,22);"
    loading.appendChild(loadingImg);
    loading.appendChild(loadingText);
    loadingBox.appendChild(loading);
    document.getElementsByTagName('body')[0].appendChild(loadingBox);
}
//@see 关闭有背景的loading框
function closeLoading() {
    $("div#loadingBox").remove();
}

//openLoading("加载中......");//在require加载模块js之前显示loading
var time = 0;

require(['jquery', 'Vue', 'common', 'api'], function ($, Vue, common, api) {
    $(function () {

        common.globalAjax();//开始全局ajax监听
        common.hideOptionMenu();//禁用分享等按钮
        // var Loading_vue = Loading.init();

        var startScore = decodeURIComponent(common.getRequest().scoreStart);
        var endScore = decodeURIComponent(common.getRequest().scoreEnd);

        // settimeout 防止页面假死
        setTimeout(function(){
            new Vue({
                el:'#app',
                data:{
                    initList: null,
                    loading: false,
                    orderList:[],
                    listLength:null,
                    pageIndex:1,
                    pageCount:12,
                    flag:true,
                    pageOver:true
                },
                components:{

                },
                created:function(){


                },
                mounted:function(){
                    this.initShowRank();
                },
                methods:{
                    initShowRank: function(){
                        var _this=this;
                        $.ajax({
                            type: "get",
                            url: api.showRankDataList,
                            data: {
                                _p: common.getRequest()._p,
                                scoreStart: startScore,
                                scoreEnd: endScore,
                                pageIndex: _this.pageCount*0,
                                pageCount:  _this.pageCount
                            },
                            success: function (response) {
                                if (response.retcode == 1) {
                                    _this.initList = response.orderList;
                                    for(var i=0;i<response.orderList.length;i++){
                                        var  obj ={};
                                        obj["gId"]=response.orderList[i].gId;
                                        obj["goodNum"]=response.orderList[i].goodNum;
                                        obj["imageUrl"]=response.orderList[i].imageUrl;
                                        obj["nickName"]=response.orderList[i].nickName;
                                        obj["openId"]=response.orderList[i].openId;
                                        obj["sex"]=response.orderList[i].sex;
                                        obj["weightScore"]=response.orderList[i].weightScore;
                                        _this.orderList.push(obj);
                                    }
                                    if(_this.orderList.length>=12){
                                        $(".content-list,.score-content").css("height","auto");
                                    }else{
                                        $(".content-list,.score-content").css("height","100%");
                                    }
                                    if(_this.orderList.length==0){
                                        $(".list-length").show();
                                        $("#noLoading").hide();
                                    }else{
                                        $(".list-length").hide();
                                    }

                                    setTimeout(function(){
                                        _this.IsScrollFooter();
                                    },50)

                                } else {
                                    console.log(response.retmsg);
                                }
                            }
                        })

                    },
                    /**
                     * type: “cancelGood”--取消关注，“putGood”--关注
                     * byOpenId: openId
                     * index: 该数据的index
                     */
                    toLike: function (byOpenId, type, gId, index) {
                        var _this = this;
                        var _index = index;
                        //console.log(byOpenId, type, gId, _index);

                        if (!_this.loading) {
                            $.ajax({
                                type: "POST",
                                async: false,
                                url: api.goodItOrCance,
                                data: {
                                    _p: common.getRequest()._p,
                                    byOpenId: byOpenId,
                                    type: type,
                                    gid: gId
                                },
                                beforeSend: function () {
                                    _this.loading = true;
                                },
                                success: function (response) {
                                    if (response.retcode == 1) {
                                        if (type === "putGood") {
                                            _this.orderList[_index].gId=response.gId;
                                            _this.orderList[_index].goodNum++;
                                        } else {
                                            _this.orderList[_index].gId=false;
                                            _this.orderList[_index].goodNum--;
                                        }
                                    } else {

                                    }
                                },
                                complete: function () {
                                    _this.loading = false;
                                }
                            });
                        }
                    },
                    //滚动加载数据
                    IsScrollFooter:function(){
                        var _this=this;
                        //判断条件,条件成立才阻止背景页面滚动，其他情况不会再影响到页面滚动
                        $('#J-content-list').on('touchmove',function() {
                            if ($('#J-content-list ul li').length <=11) {
                                return false;
                            }
                            //是否加载完毕
                            if (_this.initList.length === 0) {
                                //提示数据已加载完毕
                                $("#noLoading").show();
                                $("#loading-more").hide();
                                return;
                            } else {
                                $("#loading-more").show();
                            }

                            clearInterval(time);

                            //判断最后一个元素是否在底部之上
                            if ($('#J-content-list ul li').eq($('#J-content-list ul li').length - 1).offset().top - $(window).scrollTop() < $(window).height()) {

                                time = setTimeout(function() {
                                    $.ajax({
                                        type: "get",
                                        url: api.showRankDataList,
                                        data: {
                                            _p: common.getRequest()._p,
                                            scoreStart: startScore,
                                            scoreEnd: endScore,
                                            pageIndex: _this.pageCount * _this.pageIndex,
                                            pageCount: _this.pageCount
                                        },
                                        beforeSend:function(){
                                        },
                                        success: function(response) {
                                            if (response.retcode == 1) {
                                                //如果成功分页就加1
                                                _this.pageIndex++;
                                                _this.initList = response.orderList;

                                                //组装数据
                                                for (var i = 0; i < response.orderList.length; i++) {
                                                    var obj = {
                                                        gId: response.orderList[i].gId,
                                                        goodNum: response.orderList[i].goodNum,
                                                        imageUrl: response.orderList[i].imageUrl,
                                                        nickName: response.orderList[i].nickName,
                                                        openId: response.orderList[i].openId,
                                                        sex: response.orderList[i].sex,
                                                        weightScore: response.orderList[i].weightScore
                                                    };

                                                    _this.orderList.push(obj);
                                                }
                                                $("#loading-more").hide();
                                            }


                                        },
                                        complete:function(){

                                        }
                                    });
                                }, 300);
                            }
                        });

                    }

                }
            })

        },50)
    });
});