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
    loadingImg.style.cssText = "width:5em;;height:4.5em;background-image:url('images/logo.gif');background-size:65%;background-position:center;background-repeat:no-repeat;";
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
require(['jquery','Vue','common'],function($,Vue,common){
    $(function(){

        common.globalAjax();//开始全局ajax监听
        common.hideOptionMenu();//禁用分享等按钮

        setTimeout(function(){
            new Vue({
                el: '#app',
                data:{
                    topData:null,
                    bmi:null,
                    bodyTypeChinese:null,
                    isLoading:false,
                    bmr:null,
                    waterNum:[],
                    birthDate:null,
                    cup:null,
                    modifyYear:null
                },
                components:{
                },
                created: function(){

                },
                mounted: function(){

                },
                methods: {


                }
            })
        },50)
    })

})