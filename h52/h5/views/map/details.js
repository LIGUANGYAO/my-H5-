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
	loadingImg.style.cssText = "width:5em;;height:4.5em;background-image:url('../../assets/images/logo.gif');background-size:65%;background-position:center;background-repeat:no-repeat ;";
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
	/*document.getElementsByTagName('body')[0].removeChild(document.getElementById('loadingBox'));*/
	$("div#loadingBox").remove();
}

//openLoading("加载中......"); //在require加载模块js之前显示loading



require(['jquery', 'Vue', 'api', 'common', 'Loading', 'Swiper'], function($, Vue, api, common, Loading, Swiper) {
	$(function() {
		common.globalAjax(); //开始全局ajax监听
		var Loading_vue = Loading.init();

		//监听手机返回
		window.addEventListener("popstate", function(e) { 
			stopDefault(e); 
			window.location.href='map.html?_p='+common.getRequest()._p;
			//alert("监听返回");
		}, false);
		function stopDefault(e) { 
		if ( e && e.preventDefault ){
			e.preventDefault(); 
		}else{
			window.event.returnValue = false; 
		}    
		return false; 
		} 
		pushHistory(); 
		function pushHistory() { 
		var state = {  title: "title",  url: "#" }; 
		window.history.pushState(state, "title", "#"); 
		} 

		// settimeout 防止页面假死
		setTimeout(function() {
			var myVue = new Vue({
				el: '#app',
				data: {
					initData: null,
					devicename: '', //设备名
					distance: '', //距离
					appstatu: 0, //设备在线状态[0-不在线，1-在线]
					address: '', //地址
					imgData: [], //图片数组
					serviceTime: '', //服务时间
					tel: '', //联系电话
					introduce: '', //商家介绍		
					latitude:0,//经度
					longitude:0, //维度,
					envImage1: '',
					envImage2: ''
				},
				components: {
					'loading': Loading_vue
				},
				created: function() {

				},
				mounted: function() {
					//closeLoading(); //关闭等待
					this.init();
				},
				methods: {
					//初始化
					init: function() {
						this.getUrlParams();												
					},
					//初始化幻灯片
					swiperInit: function() {
				        //幻灯片广告
						setTimeout(function() {
							var swiper = new Swiper('.swiper-container', {
						        pagination: '.swiper-pagination',
						        paginationClickable: true
						    });
						}, 500);						
					},
					//获取URL参数
					getUrlParams: function() {
						this.devicename = decodeURIComponent(common.getRequest().devicename); //设备名
                        this.distance = decodeURIComponent(common.getRequest().distance); //距离
                        this.appstatu = decodeURIComponent(common.getRequest().appstatu); //设备在线状态[0-不在线，1-在线]
                        this.address = decodeURIComponent(common.getRequest().address); //地址
                        this.serviceTime = decodeURIComponent(common.getRequest().serviceTime); //时间
                        this.tel = decodeURIComponent(common.getRequest().tel); //联系电话
                        this.introduce = decodeURIComponent(common.getRequest().introduce) == 'undefined'?'':decodeURIComponent(common.getRequest().introduce); //简介
                        this.latitude = decodeURIComponent(common.getRequest().latitude);
                        this.longitude = decodeURIComponent(common.getRequest().longitude);
                        this.envImage1 = decodeURIComponent(common.getRequest().envImage1);
                        this.envImage2 = decodeURIComponent(common.getRequest().envImage2);
						
					    console.log(this.introduce);
						this.swiperInit();	
					},
					//返回网点首页
					returnHome: function() {
						var params = {
								latitude:this.latitude,
								longitude:this.longitude,
								_p: common.getRequest()._p
						}
						location.href = 'map.html'+ common.jsonToQueryString(params);		
					},
					//获取进入附近称的URL
					goNearMap:function(){
						location.href='map.html?_p='+ common.getRequest()._p;
					}
				}
			});
		}, 50);
	});
});