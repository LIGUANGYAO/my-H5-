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

openLoading("加载中......"); //在require加载模块js之前显示loading

require(['jquery', 'Vue', 'api', 'common', 'Loading', 'async!BMap'], function($, Vue, api, common, Loading) {
	$(function() {
		common.globalAjax(); //开始全局ajax监听
		common.hideOptionMenu(); //禁用分享等按钮
		var Loading_vue = Loading.init();

		// settimeout 防止页面假死
		setTimeout(function() {
			var myVue = new Vue({
				el: '#app',
				data: {
					initData: null
				},
				components: {
					'loading': Loading_vue
				},
				created: function() {

				},
				mounted: function() {
					closeLoading();
					this.init();
				},
				methods: {
					//初始化地图
					init: function() {
						this.getMap();					
					},
					//获取地图
					getMap: function() {
						console.log('aaaaaaa');
						// 百度地图API功能
						var map = new BMap.Map("js-map"); // 创建Map实例
						map.centerAndZoom(new BMap.Point(116.404, 39.915), 11); // 初始化地图,设置中心点坐标和地图级别
						map.addControl(new BMap.MapTypeControl());   //添加地图类型控件
						map.setCurrentCity("北京"); // 设置地图显示的城市 此项是必须设置的
						map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放							
					}
				}
			});
		}, 50);
	});
});