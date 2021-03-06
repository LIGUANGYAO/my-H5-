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

openLoading("加载中......");//在require加载模块js之前显示loading

require(['jquery','Vue','common','api','bmi','Loading' , 'bmr'],function($,Vue,common,api,bmi,Loading,bmr){
    $(function(){
       
        common.globalAjax();//开始全局ajax监听
        common.hideOptionMenu();//禁用分享等按钮
        var Loading_vue = Loading.init();

        setTimeout(function(){
          new Vue({
              el: '#app',
              data:{
                topData:null,
                bmi:null,
                bodyTypeChinese:null,
                isLoading:false,
                birthDate:null,
                bmr:null,
                modifyYear:null
              },
              components:{
                'loading': Loading_vue
              },
              created: function(){
                 this.getHometTopData();
                 if(this.topData.userinfo.updateState==0){//没注册
                    this.bmr=null;
                 }else if(this.topData.userinfo.updateState==1){//注册
                    var stringYear = this.topData.userinfo.birthDate.toString();//计算1990 之前的年龄
                    if(stringYear.length==4){
                      this.modifyYear = this.getAge(this.topData.userinfo.birthDate)
                    }else{
                      this.modifyYear = this.topData.userinfo.birthDate;
                    }                
                    this.bmr = bmr.toMath(this.topData.userinfo.sex, this.topData.newestWeight, this.topData.userinfo.height, this.modifyYear);
                    console.log(this.bmr);
                 }
                    this.bmi = bmi.toMath( this.topData.newestWeight ,this.topData.userinfo.height);
                    this.bodyTypeChinese = bmi.getBodyTypeChinese( this.bmi.bmi);
              },
              mounted: function(){
                  
              },
              methods: {
                //计算年龄
                getAge: function(param) {
                    var myDate = new Date();
                    var year = myDate.getFullYear(); //获取当前年份
                    return year - param;
                },
                //获取体重 用户信息
                getHometTopData: function() {
                    var _this = this;
                    if(!_this.isLoading){
                        $.ajax({
                            type: "POST",
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
                }
              }
          })
        },50)
    })

})