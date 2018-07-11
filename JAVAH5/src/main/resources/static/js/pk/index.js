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



require(['jquery', 'Vue', 'common', 'api', 'Loading' ,'wechat'], function ($, Vue, common, api, Loading,wechat,IScroll, iosSelect) {
    $(function () {

        common.hideOptionMenu();//禁用分享等按钮
        common.globalAjax();//开始全局ajax监听
        var Loading_vue = Loading.init();

        var jsApiList_arr = [
            'onMenuShareAppMessage',
            'onMenuShareTimeline',
            'hideOptionMenu',
            'showOptionMenu'
        ]
        var wxjs = wechat.sign(jsApiList_arr);
        //分享的链接
        var shareLink = location.origin + location.pathname.substring(0,location.pathname.lastIndexOf("views")) + "views/pk/index.html"+"?_p="+common.getRequest()._p;

        wxjs.error(function(res){
            //alert('微信JSSDK签名失败');
        });


        // settimeout 防止页面假死
        setTimeout(function () {
            new Vue({
                el: '#app',
                data: {
                    stature: null, //身高
                    statureArr: [], //身高数组
                    year: null,
                    yearArr: [],
                    isLoading: false,
                    initData:null,
                    surpassPeople: false,
                    start:null,
                    end:null,
                    topData:null,
                    disabledStatus: false
                },
                components: {
                    'loading': Loading_vue
                },
                created: function () {
                    this.getUserRank();
                    var _this = this;
                    wxjs.ready(function(){
                        //alert('微信JSSDK签名成功');
                        wxjs.showOptionMenu();//显示右上角菜单
                        //监听“分享到朋友圈”

                        wxjs.onMenuShareTimeline({
                            title: "我的身材虽然不消魂，但也打败了全市"+ _this.surpassPeople+"的人。",
                            link: shareLink,
                            imgUrl: _this.initData.user.imageurl,
                            success: function (res) {

                            },
                            fail: function (res) {
                                alert(JSON.stringify(res));
                            }
                        });

                        //监听“分享给朋友”
                        wxjs.onMenuShareAppMessage({
                            title: "我的身材虽然不消魂，但也打败了全市"+ _this.surpassPeople+"的人。",
                            desc: '来看看你的身材能得几分？',
                            link: shareLink,
                            imgUrl: _this.initData.user.imageurl,
                            success: function (res) {

                            },
                            fail: function (res) {
                                alert(JSON.stringify(res));
                            }
                        });
                    });
                },
                mounted: function () {
                    //解决ios返回不刷新问题
                    var isPageHide = false;
                    window.addEventListener('pageshow', function () {
                        if (isPageHide) {
                            window.location.reload();
                        }
                    });
                    window.addEventListener('pagehide', function () {
                        isPageHide = true;
                    });
                },
                methods: {
                    //跳转到得分列表页面
                    linkToScore: function(index){
                        $(".pk-user-list li").eq(index).addClass("listBg").siblings().removeClass("listBg");
                        var scoreStart=Math.abs(this.initData.orderList[index].scoreStart);
                        var scoreEnd=this.initData.orderList[index].scoreEnd;
                        var params = {
                            start:scoreStart,
                            end: scoreEnd
                        }
                        window.location.href = './score-list.html?' + "_p=" + common.getRequest()._p + "&scoreStart=" + params.start + "&scoreEnd=" + params.end;
                    },
                    //获取用户体重 注册数据
                    getHometTopData: function() {
                        var _this = this;
                        if(!_this.isLoading){
                            $.ajax({
                                type: "get",
                                async: false,
                                data: {
                                    _p: common.getRequest()._p
                                },
                                url: api.getHomeTopDate,
                                success: function (response) {
                                    closeLoading();//关闭loading页面
                                    if (response.retcode==1) {
                                        _this.topData = response;
                                    }
                                }
                            })
                        }
                    },
                    //获取分段用户信息
                    getUserRank: function(){
                        var _this = this;

                        if(!_this.isLoading){
                            $.ajax({
                                type: "get",
                                async: false,
                                url: api.showRankData,
                                data: {
                                    _p: common.getRequest()._p
                                },
                                success: function(response){
                                    closeLoading();//关闭loading页面
                                    if (response.retcode == 1){
                                        _this.initData=response;
                                        // _this.start=response.orderList.scoreStart;//开始分数
                                        //_this.end=response.orderList.scoreStart;//结束分数
                                        _this.surpassPeople = ((1-(_this.initData.myOrder.rank-1) / _this.initData.myOrder.total)*100).toFixed(1)+"%";//超越多少用户
                                        if(!_this.initData.orderList || _this.initData.orderList.length<=5){
                                            $(".pk-list").css("height","17.30667rem");
                                        }else{
                                            $(".pk-list").css("height","auto");
                                        }
                                    }else{

                                    }
                                },
                                complete: function() {
                                    closeLoading();
                                }
                            })
                        }
                    }

                }
            })
        }, 50)
    });
});