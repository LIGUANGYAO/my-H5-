//全局变量
var map = null;
var myVue = null;
var markersArr = [];

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
	$("div#loadingBox").remove();
}
openLoading("加载中......"); //在require加载模块js之前显示loading

//监听手机返回
window.addEventListener("popstate", function(e) { 
     stopDefault(e); 
	 if(typeof(sessionStorage.siteUrl)=="undefined"){
	       myVue.linkTo('../home/index.html');
		}else{
			window.location.href=sessionStorage.siteUrl;
		}
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
require(['jquery', 'Vue', 'api', 'common','async!amap'], function($, Vue, api, common) {
	$(function() {				        
		common.globalAjax(); //开始全局ajax监听
		common.hideOptionMenu(); //禁用分享等按钮
		// settimeout 防止页面假死
		setTimeout(function() {
			myVue = new Vue({
				el: '#app',
				data: {
					initData: null, //地图网点数据
					
					//当前定位坐标信息
					lng: '', //经度
					lat: '', //纬度
					
					//当前网点点击查看信息
					currentDot: {
						index: 0, //对象索引
						modalDisplay: false, //当前网点点击查看信息弹窗是否显示状态
						devicename: '', //设备名
						distance: '', //距离
						appstatu: 0, //设备在线状态[0-不在线，1-在线]
						address: '', //地址
						logUrl: '', //logo图片
						logImgArr: [],
						lng: 0, //经度
						lat: 0 //纬度
					},
					
					//附近网点列表
					dotSearch: '', //搜索
					time: 0,
					
					nearby: {
						modalDisplay: false, //弹窗开启状态
						dotData: [], //存储附近网点数据
						dotCacheData: [], //存储附近网点数据缓存
						deviceData: [], //存储设备信息
						devicename: '', //设备名
						distance: '', //距离
						appstatu: 0, //设备在线状态[0-不在线，1-在线]
						address: '', //地址
						addressIdArr: '', //地址字符串拼接
						logUrl: '', //logo图片
						serviceTime: '', //服务时间
						tel: '', //联系电话
						introduce: '', //商家介绍
						lng: 0, //经度
						lat: 0 //纬度						
					}					
				},
				mounted: function() {
					this._init();
					
				},
				methods: {
					/*----------------------------------------------------------------------------------
					 | 私有函数
					 |----------------------------------------------------------------------------------
					 */
					//初始化
					_init: function() {
						closeLoading();
						this._getInitMap();
						this._listenBack();
						this._closeDotModal();
						//this.swiperFn();
						
					},
					//swiper
					swiperFn:function(){
						var swiper = new Swiper('#JS-container-body', {
							scrollbar: '.swiper-scrollbar',
							direction: 'vertical',
							slidesPerView: 'auto',
							mousewheelControl: true,
							freeMode: true
						});
					},
					//关闭选择的网点信息及信息框
					_closeDotModal: function() {
						var that = this;
						
						map.on('click', function() {
							that.currentDot.modalDisplay = false;
							map.clearInfoWindow();
							
							//点标记更新图标
							var marker = that.initData[that.currentDot.index].marker;
							var markerContent = document.createElement("div");				        
					        var markerImg = document.createElement("img");
					        markerImg.className = "markerlnglat";
					        markerImg.src = '../../assets/images/dot_green.png';
					        markerContent.appendChild(markerImg);
					        var markerSpan = document.createElement("span");
					        marker.setContent(markerContent); //更新点标记内容
					        marker.setPosition([that.initData[that.currentDot.index].longitude, that.initData[that.currentDot.index].latitude]);							
						});						
					},
					//监听手机返回
					_listenBack: function() {
						window.addEventListener("popstate", function(e) {
							stopDefault(e);
							
							if (typeof(sessionStorage.siteUrl) == "undefined") {
								common.replaceTo('../home/index.html');
							} else {
								window.location.href = sessionStorage.siteUrl;
							}
						}, false);
						
						var stopDefault = function(e) {
							if (e && e.preventDefault) {
								e.preventDefault();
							} else {
								window.event.returnValue = false;
							}
							
							return false;
						}						
					},					
					//初始化地图、获取当前位置显示图标
					_getInitMap: function() {
						var that = this;
						
						//加载地图
						map = new AMap.Map('JS-map', {
							mapStyle: 'amap://styles/3ead39ea3c47af7bc52e306900716ef9',
					        resizeEnable: true,
					        zoom: 13
						});
						
						//获取当前定位坐标
						map.plugin('AMap.Geolocation', function() {
					        geolocation = new AMap.Geolocation({
					            enableHighAccuracy: true, //是否使用高精度定位，默认:true
					            timeout: 10000, //超过10秒后停止定位，默认：无穷大
					            showButton: false, //显示定位按钮，默认：true
					            buttonOffset: new AMap.Pixel(10, 20), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
					            zoomToAccuracy: false, //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
					            buttonPosition:'RB'
					        });

							//map.enableScrollWheelZoom();//启动鼠标滚轮缩放地图
							//map.enableKeyboard();//启动键盘操作地图

					        //获取定位信息
					        map.addControl(geolocation);
					        //geolocation.getCityInfo(); //城市定位
					        geolocation.getCurrentPosition(); //精准定位

					        AMap.event.addListener(geolocation, 'complete', function(data) {
					        	that.lng = data.position.getLng(); //经度
								that.lat = data.position.getLat(); //纬度
								
								//获取附近10公里网点设备
							    that._getNearbyDevice();
					        });
					        
					        //返回定位出错信息
					        AMap.event.addListener(geolocation, 'error', function(data) {
					        	that.lng = '113.323703'; //经度
								that.lat = '23.143357'; //纬度

								//获取附近10公里网点设备
							    that._getNearbyDevice();								
					        	console.log('定位失败');
					        });
					   });							    
					},
					//获取附近10公里网点设备并显示图标
					_getNearbyDevice: function() {
						var that = this;

						$.ajax({
							url: api.getNearWeightScale,
							type: 'POST',
							async: false,
							dataType: 'json',
							data: {
								lng: that.lng,
								lat: that.lat
							},
							success: function(data) {
								if (data.retcode == 1) {	  																																																										
									that.initData = data.list;
									var markers = null;

									//获取当前位置在地图上显示图标
								 	/*new AMap.Marker({
								        map: map,
										position: [that.lng, that.lat],
								        icon: new AMap.Icon({            
								            size: new AMap.Size(40, 48), //图标大小
								            image: '../../assets/images/location.png'
								        })        
								    });*/
					   
									//批量显示附近设备图标
									that.initData.forEach(function(marker, index) {										
								        markers = new AMap.Marker({
								            map: map,
								            position: [marker.longitude, marker.latitude],
									        icon: new AMap.Icon({            									            
									            image: '../../assets/images/dot_green.png',
									            size: new AMap.Size(35, 39) //图标大小
									        })							            
								        });
								        
								        that.initData[index].marker = markers;
								        
								        //点击查看网点弹出信息
								        AMap.event.addListener(markers, 'click', function(e) {
											that.currentDot.modalDisplay = true;										
											that._getDotInformation(e, index, marker);
								        });
								    });    
								} else {
									console.log('抱歉,附近搜索不到网点！');
								}
							}
						});
						
						//接收来自网点内容页去这里路线参数
						that._getUrlRouteParams();
					},
					/**
					 * 点击网点获取网点信息
					 * @author Sea 5684346@qq.com
					 * @param {object} e
					 * @param {int} index 索引
					 * @param {object} marker 当前网点数据对象
					 * @date 2017-09-21
					 * @return void
					 */
					_getDotInformation: function(e, index, marker) {
						//防止重复点击
						if (e.target.Pg.contentDom.innerHTML.indexOf('dot_blue.png') > -1) {
							return false;
						}
						
						var that = this;

						//点击下一个初始化上一个标注图标
						if (that.currentDot.index > 0) {							
							that._switchIco('green');
						}
						
						//计算两点距离
						var lnglat = new AMap.LngLat(that.lng, that.lat);
						that.currentDot.distance = (lnglat.distance([marker.longitude, marker.latitude])).toFixed(2);					
						that.currentDot.index = index;
						that.currentDot.appstatu = marker.appStatu;
						that.currentDot.lng = marker.longitude;
						that.currentDot.lat = marker.latitude;						
						
						//获取详细信息
						$.ajax({
							url: api.getWeightScaleAddress,
							type: 'POST',
							async: false,
							dataType: 'json',
							data: {
								addressId: marker.addressId
							},						
							success: function(data) {
								if (data.retcode == 1) {
									that.currentDot.devicename = data.weightScaleAddress.mr_ShopName;
									that.currentDot.address = data.weightScaleAddress.provinceName + data.weightScaleAddress.cityName + data.weightScaleAddress.countyName + data.weightScaleAddress.addressDetail;
									that.nearby.serviceTime = data.weightScaleAddress.mr_ServiceTime; //服务时间
									that.nearby.tel = data.weightScaleAddress.mr_Telephone; //联系电话
									that.nearby.introduce = data.weightScaleAddress.mr_ShopRemark; //商家介绍	

									//地址不存在则等于空
									if (typeof that.currentDot.address === 'number') {
										that.currentDot.address = '  ';
									}									
									
									//图片不存在则等于空							
									if (data.weightScaleAddress.mr_NameUrl != null && data.weightScaleAddress.mr_NameUrl != '&##&##&##&##') {
										that.currentDot.logImgArr = data.weightScaleAddress.mr_NameUrl.split('&');
										that.currentDot.logUrl = that.currentDot.logImgArr[0];
									} else {
										that.currentDot.logUrl = '';
									}
									
									//信息框提示
									var infoWindow = new AMap.InfoWindow({offset: new AMap.Pixel(0, -30)});
									infoWindow.setContent(that.currentDot.devicename);
									infoWindow.open(map, e.target.getPosition());
											
									//切换标注图标									
									that._switchIco('blue');
								}
							}
						});										
					},
					/**
					 * 点击网点切换图标
					 * @author Sea 5684346@qq.com
					 * @param {string} color 图标颜色
					 * @param {object} obj e-e,index=索引，marker-当前网点数据对象
					 * @date 2017-09-21
					 * @return void
					 */
					_switchIco: function(color) {				
						var that = this;					
						
						if (color == 'green') {
							var imagesUrl = '../../assets/images/dot_green.png';
						} else if (color == 'blue') {
							var imagesUrl = '../../assets/images/dot_blue.png';
						} else {
							throw new Error('参数不准确');
						}
						
						//点标记更新图标
						var marker = that.initData[that.currentDot.index].marker;
						var markerContent = document.createElement("div");				        
				        var markerImg = document.createElement("img");
				        markerImg.className = "markerlnglat";
				        markerImg.src = imagesUrl;
				        markerContent.appendChild(markerImg);
				        var markerSpan = document.createElement("span");
				        marker.setContent(markerContent); //更新点标记内容
				        marker.setPosition([that.initData[that.currentDot.index].longitude, that.initData[that.currentDot.index].latitude]);
					},
					/**
					 * 搜索附近网点列表数据
					 * @author Sea 5684346@qq.com
					 * @param {string} search 关键词
					 * @date 2017-09-21
					 * @return void
					 */
					_getSearchData: function(search) {
						var that = this;
						
						if (search != '') {
							$.ajax({
								url: api.getWeightScaleAddress,
								type: 'POST',
								async: false,
								dataType: 'json',
								data: {
									keyWord: search
								},
								success: function(data) {
									if (data.retcode == 1) {
										//如果没有数据初始化
										if (data.weightScaleAddressList === undefined) {
											that.nearby.dotData = [];
											return false;
										}
										
										that.nearby.dotData = data.weightScaleAddressList;
										
										//便利处理列表数据
										for (var i = 0; i < that.nearby.dotData.length > 0; i++) {
											//地址
											that.nearby.dotData[i].address = that.nearby.dotData[i].provinceName + that.nearby.dotData[i].cityName + that.nearby.dotData[i].countyName + that.nearby.dotData[i].addressDetail;
											
											if (typeof that.nearby.dotData[i].address === 'number') {
												that.nearby.dotData[i].address = '  ';
											}

											that.nearby.dotData[i].logoUrl = that.nearby.dotData[i].mr_NameUrl != undefined ? that.nearby.dotData[i].mr_NameUrl.split('&')[0] : ''; //LOGO图片
											
											if (that.nearby.deviceData[that.nearby.dotData[i].addressId] != undefined) {
												that.nearby.dotData[i].deviceStatus = that.nearby.deviceData[that.nearby.dotData[i].addressId].deviceStatus;//设备在线状态
											
												//通过坐标计算距离多少米
												var lnglat = new AMap.LngLat(that.lng, that.lat);
												that.nearby.dotData[i].distance = (lnglat.distance([that.initData[i].longitude, that.initData[i].latitude])).toFixed(2);
											} else {
												that.nearby.dotData[i].deviceStatus = 0;
												that.nearby.dotData[i].distance = '--';
											}
										}
									} else {
										alert(data.retmsg);
									}
								}
							});							
						} else {
							that.nearby.dotData = that.nearby.dotCacheData;						
						}					
					},
					//接收来自网点内容页去这里路线
					_getUrlRouteParams: function() {
						var longitude = decodeURIComponent(common.getRequest().longitude);
						var latitude = decodeURIComponent(common.getRequest().latitude);					
						
						if (longitude != 'undefined' && this.latitude != 'undefined') {
							//加载路线
						 	var driving = new AMap.Driving({
						        map: map
						    });
						    
						    //根据起终点经纬度规划驾车导航路线
						    var index = this.currentDot.index;
						    driving.search([this.lng, this.lat], [longitude, latitude], function(status, result) {
						    	if (status != 'complete' && result.info != 'OK') {
						    		alert('加载路线错误，请刷新重试');
						    	}
						    });							
						}						
					},
					/*----------------------------------------------------------------------------------
					 | 公有函数
					 |----------------------------------------------------------------------------------
					 */
					//去这里
					goHere: function() {
						//清除地图
						//map.clearMap('Driving');
						
						//加载路线
					 	var driving = new AMap.Driving({
					        map: map
					    });					   					    
					    
					    //根据起终点经纬度规划驾车导航路线
					    var index = this.currentDot.index;
					    driving.search([this.lng, this.lat], [this.initData[index].longitude, this.initData[index].latitude], function(status, result) {
					    	if (status != 'complete' && result.info != 'OK') {
					    		alert('加载路线错误，请刷新重试');
					    	}
					    });
					},
					//定位事件
					location: function() {
						this._getInitMap();
					},
					//刷新事件
					refresh: function() {
						location.reload();
					},
					//返回事件
					goBack: function() {
						if (sessionStorage.siteUrl === undefined) {
							common.replaceTo('../home/index.html');
						} else {
							window.location.href = sessionStorage.siteUrl;
						}
					},
					//打开附近网点详情页
					openNearbyOutletsDetails: function(e) {
						e.preventDefault();
						
						var params = {
							devicename: this.currentDot.devicename,
							distance: this.currentDot.distance,
							appstatu: this.currentDot.appstatu,
							address: this.currentDot.address,
							logImgArr: this.currentDot.logImgArr,
							serviceTime: this.nearby.serviceTime,
							tel: this.nearby.tel,
							introduce: this.nearby.introduce,
							latitude: this.currentDot.lat,
							longitude: this.currentDot.lng
						}
						
						window.location.href = './dot_details.html' + common.jsonToQueryString(params);
					},
					//打开附近网点列表
					openNearbyOutletsList: function() {
						var that = this;						
						that.nearby.modalDisplay = true;
						that.dotSearch = '';
						
						//获取地图ID数组
						if (that.initData) {
							that.nearby.addressIdArr = [];
							var coordinateArr = [];
							var deviceStatusArr = [];							
							
							for (var i = 0; i < that.initData.length; i++) {
								//地址ID数组
								that.nearby.addressIdArr.push(that.initData[i].addressId);
								
								//坐标、设备在线状态
								that.nearby.deviceData[that.initData[i].addressId] = {
									coordinate: {
										lng: that.initData[i].longitude, //经度
										lat: that.initData[i].latitude //纬度
									},
									deviceStatus: that.initData[i].appStatu
								}															
							}
						}
						
						//获取列表
						$.ajax({
							url: api.getWeightScaleAddress,
							type: 'POST',
							async: false,
							dataType: 'json',
							data: {
								addressIdList: that.nearby.addressIdArr.join(',')
							},
							success: function(data) {
								if (data.retcode == 1) {									
									that.nearby.dotData = data.weightScaleAddressList;

									//便利处理列表数据
									for (var i = 0; i < that.nearby.dotData.length > 0; i++) {
										//地址
										that.nearby.dotData[i].address = that.nearby.dotData[i].provinceName + that.nearby.dotData[i].cityName + that.nearby.dotData[i].countyName + that.nearby.dotData[i].addressDetail;
										
										if (typeof that.nearby.dotData[i].address === 'number') {
											that.nearby.dotData[i].address = '  ';
										}
						
										//坐标
										that.nearby.dotData[i].lat = that.initData[i].latitude;
										that.nearby.dotData[i].lng = that.initData[i].longitude;
										that.nearby.dotData[i].logoUrl = that.nearby.dotData[i].mr_NameUrl.length > 0 ? that.nearby.dotData[i].mr_NameUrl.split('&')[0] : ''; //LOGO图片
										
										if (that.nearby.deviceData[that.nearby.dotData[i].addressId] != undefined) {
											that.nearby.dotData[i].deviceStatus = that.nearby.deviceData[that.nearby.dotData[i].addressId].deviceStatus;//设备在线状态
										
											//通过坐标计算距离多少米
											var lnglat = new AMap.LngLat(that.lng, that.lat);
											that.nearby.dotData[i].distance = (lnglat.distance([that.initData[i].longitude, that.initData[i].latitude])).toFixed(2);
										} else {
											that.nearby.dotData[i].deviceStatus = 0;
											that.nearby.dotData[i].distance = '--';
										}
									}
									
									//缓存数据
									that.nearby.dotCacheData = that.nearby.dotData;
								} else {
									alert(data.retmsg);
								}
							}
						});						
					},
					//打开附近网点列表详情
					openNearbyListDetails: function(index) {						
						//处理图片
						if (this.nearby.dotData[index].mr_NameUrl != null && this.nearby.dotData[index].mr_NameUrl != '&##&##&##&##') {
							this.nearby.dotData[index].logImgArr = this.nearby.dotData[index].mr_NameUrl.split('&');
						} else {
							this.nearby.dotData[index].logImgArr = '';
						}

						var params = {
							devicename: this.nearby.dotData[index].mr_ShopName,
							distance: this.nearby.dotData[index].distance,
							appstatu: this.nearby.dotData[index].deviceStatus,
							address: this.nearby.dotData[index].address,
							logImgArr: this.nearby.dotData[index].logImgArr,
							serviceTime: this.nearby.dotData[index].mr_ServiceTime,
							tel: this.nearby.dotData[index].mr_Telephone,
							introduce: this.nearby.dotData[index].mr_ShopRemark,
							latitude: this.nearby.dotData[index].lat,
							longitude: this.nearby.dotData[index].lng
						}
						
						window.location.href = './dot_details.html' + common.jsonToQueryString(params);						
					},					
					//关闭附近网点列表弹窗
					closeNearbyModal: function() {
						this.nearby.modalDisplay = false;
					}
				},
				watch: {
					//附近设备列表搜索
					dotSearch: function(value) {
						var that = this;
						clearInterval(this.time);
						
						this.time = setTimeout(function() {
							that._getSearchData(value);
						}, 1500);				
					}
				}				
			});
		}, 50);
	});
});