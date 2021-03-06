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

require(['jquery','Vue','FooterBar','common','api','bmi','Loading','sbw', 'echarts', 'html2canvas','IScroll', 'iosSelect'], function($,Vue,FooterBar,common,api,bmi,Loading,sbw, echarts, html2canvas,IScroll,iosSelect){ // Swiper 暂时隐藏插件
  $(function(){
	//wx.hideOptionMenu();
    common.globalAjax();//开始全局ajax监听
    common.hideOptionMenu();//禁用分享等按钮
    var FooterBar_vue = FooterBar.init();
	var Loading_vue = Loading.init();

	
    // settimeout 防止页面假死
    setTimeout(function(){
      new Vue({
        el: '#app',
        data: {
        	weightTabActive: 'month',
			topData: null,
            initData: null,
            betweenWeight: null,//最新两次的体重比较值
            bodyTypeChinese: null,
            chartsOption: null,
            shareChartsOption: null,
            weightAnimationValue: null,
            bmi:null,
            flag:true,//是否请求标识
			sbw:null,
			userinfo:{
				sex:null,
				nickname:null
			},
			shareWeigthWorld:{
				windType:null,
				windIdiom:null
			},
			shareImages:{
				one:'../../assets/images/1/80-90.png',
				two:'../../assets/images/1/91-105.png',
				three:'../../assets/images/1/106-120.png',
				four:'../../assets/images/1/121-135.png',
				five:'../../assets/images/1/136-150.png',
				seven:'../../assets/images/1/151-160.png',
				eight:'../../assets/images/1/161-200.png',
				nine:'../../assets/images/1/201.png'
			},
			shareImage:null,
            isLoading: false,
            sexData:null,
            womenClass:'women',
			menClass:'men',
            //体重图表
            openModalStatus: false,
            tipdisplayStatus: true,
            noDataStatus: false,
            weightTabMonthArr: [],
            weightTabHalfYearArr: [],
            weightTabAYearArr: [],
            weightTabArr: [//选项卡
            	{
            		name: '本月',
            		active: 'month'
            	},
            	{
            		name: '半年',
            		active: 'halfYear'
            	},
            	{
            		name: '一年',
            		active: 'aYear'
            	}
            ],
            
            //分享保存图片弹窗
            pkData: [],
            nickname: '',
            avatar: '',
            accountQRCode: '',
            surpassPeople: '--', //超过全市/人
            pkRank: '--',
			pkTotal: '--',
			stature: null, //身高
			statureArr: [], //身高数组
			year: null,
			age:null,
			yearArr: [],
			disabledStatus: false
        },
        components: {
          'footer-bar': FooterBar_vue,
          'loading': Loading_vue
        },
        created: function(){
        	this.getHometTopData();
            this.bmi = bmi.toMath(this.topData.newestWeight ,this.topData.userinfo.height);
            this.bodyTypeChinese = bmi.getBodyTypeChinese( this.bmi.bmi);
            this.sbw = sbw.toMath( this.topData.userinfo.sex, this.topData.userinfo.height); 
        },
        mounted: function(){
		  var _this=this;
		  this.shareWind();
		  this.homeLink();
		  this.init();
          //初始化
          this.weightAnimation(0,this.topData.newestWeight);
		  this.getDashboard(this.topData.newestWeight);
		  this.stature=150;
		  this.year=20;
		  this.age=this.getAge(20);

    	 $(window).scroll(function() {
    	 	if(_this.flag) {
				_this.getHometTopData();
				//临时更改开始
				_this.noDataStatus = true;
				_this.tipdisplayStatus = false;
				//临时更改结束
				//_this.getPresentWeightRecord(1);
    	 		_this.flag = false;
    	 	}
		 }); 	
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
			//初始化
			init: function () {
				this.statureSelect();
				this.yearSelect();
			},
			//年龄计算
			getAge: function (param) {
				var myDate = new Date();
				var year = myDate.getFullYear(); //获取当前年份
				return year - param;
			},
			//获取身高数据
			getStatureData: function () {
				for (var i = 1; i <= 200; i++) {
					var data = {
						id: i,
						value: i
					}
					this.statureArr.push(data);
				}
				return this.statureArr;
			},
			 //获取年龄数据
			 getYearData: function () {
				for (var i = 1; i <= 100; i++) {
					var data = {
						id: i,
						value: i
					}
					this.yearArr.push(data);
				}
				return this.yearArr;
			},
			 //身高下拉选择弹窗事件
			 statureSelect: function () {
				var that = this;
				$('#JS-stature').click(function () {
					var dom = $(this);
					var bankId = dom.find('input').attr('data-id');
					var bankSelect = new iosSelect(1, [that.getStatureData()], {
						itemHeight: 50,
						itemShowCount: 5,
						oneLevelId: bankId,
						callback: function (obj) {
							that.stature = obj.value;
							dom.find('input').val(obj.value + 'cm');
							dom.find('input').attr('data-id', obj.id);
						}
					});
				});
			},
			 //年龄下拉选择弹窗事件
			 yearSelect: function () {
				var that = this;
				$('#JS-year').click(function () {
					var dom = $(this);
					var bankId = dom.find('input').attr('data-id');
					var bankSelect = new iosSelect(1, [that.getYearData()], {
						itemHeight: 50,
						itemShowCount: 5,
						oneLevelId: bankId,
						callback: function (obj) {
							that.year = obj.value;
							that.age = that.getAge(obj.value);
							dom.find('input').val(obj.value + '岁');
							dom.find('input').attr('data-id', obj.id);
						}
					});
				});
			},
			 //提交注册
			 toRegister: function () {
				var _this = this;
				if(!_this.isLoading){
					$.ajax({
						type: "POST",
						url: api.updateOrSavePersoInfo,
						data: {
							_p: common.getRequest()._p,
							sex: _this.topData.userinfo.user.sex,
							height: _this.stature,
							birthDate: _this.age,
							updateState: '1',
							nickname: _this.topData.userinfo.user.nickname
						},
						beforeSend: function(){
							_this.isLoading = true;
							_this.disabledStatus = true;
						},
						success: function(response){
							if(response.retcode == 1){
								$(".registration-model,.mask").hide();
								common.linkTo2('../pk/index.html');
							}else{
								$(".registration-model,.mask").hide();
							}
						},
						complete: function(){
							_this.isLoading = false;
							_this.disabledStatus = false;
						}
					})
				}
			},
		  //首页跳转
		  homeLink: function(){
			  var _this=this;
              $(".weight-link").click(function(){
				 if(_this.topData.userinfo.updateState==0){
					 $(".registration-model-content").show();
					 _hmt.push(['_trackEvent', '首页', '跳转', '体重pk跳转']);
				  }else{
				  	//临时更改代码
					common.linkTo2('../mall/index.html');
					//common.linkTo2('../pk/index.html');
					_hmt.push(['_trackEvent', '首页', '跳转', '体重pk跳转']);
				  } 
			  });
			  $(".about-link").click(function(){
				common.linkTo2('../about/index2.html');
				_hmt.push(['_trackEvent', '首页', '跳转', '关于我们跳转']);
			  });
			  $(".health-link").click(function(){
				common.linkTo2('../healthSense/index.html');
				_hmt.push(['_trackEvent', '首页', '跳转', '健康小常识跳转']);
			  });
			  $(".my-link").click(function(){
				  	//临时更改代码
					common.linkTo2('../mall/index.html');
				//common.linkTo2('../my/index.html');
				_hmt.push(['_trackEvent', '首页', '跳转', '个人中心跳转']);
			  });
			  $(".check_bnt").click(function(){
				common.linkTo2("../healthAnalysis/build.html");
				_hmt.push(['_trackEvent', '首页', '跳转', '跳转到健康分析']);
			});
            $(".item-month").click(function(){
				_hmt.push(['_trackEvent', '首页', '体重变化', '本月']);
			});
			$(".item-halfYear").click(function(){
				_hmt.push(['_trackEvent', '首页', '体重变化', '半年']);
			});
			$(".item-halfYear").click(function(){
				_hmt.push(['_trackEvent', '首页', '体重变化', '一年']);
			});

		  },
          //分享弹窗文字
		 shareWind: function(){
			var userWeight=(this.topData.newestWeight*2).toFixed(0);
			if(userWeight>0&&userWeight<=90){
				this.shareWeigthWorld.windType="7级抗风型";
				this.shareWeigthWorld.windIdiom="轻若鸿毛";
				this.shareImage=this.shareImages.one;
			}else if(userWeight>=91&&userWeight<=105){
                this.shareWeigthWorld.windType="7.5级抗风型";
				this.shareWeigthWorld.windIdiom="弱不禁风";
				this.shareImage=this.shareImages.two;
			}else if(userWeight>=106&&userWeight<=120){
                this.shareWeigthWorld.windType="8级抗风型";
				this.shareWeigthWorld.windIdiom="抱电线杆";
				this.shareImage=this.shareImages.three;
			}else if(userWeight>=121&&userWeight<=135){
				this.shareWeigthWorld.windType="8.5级抗风型";
				this.shareWeigthWorld.windIdiom="东倒西歪";
				this.shareImage=this.shareImages.four;
			}else if(userWeight>=136&&userWeight<=150){
                this.shareWeigthWorld.windType="9级抗风型";
				this.shareWeigthWorld.windIdiom="脚踏实地";
				this.shareImage=this.shareImages.five;
			}else if(userWeight>=151&&userWeight<=160){
				this.shareWeigthWorld.windType="9.5级抗风型";
				this.shareWeigthWorld.windIdiom="稳如泰山";
				this.shareImage=this.shareImages.seven;
			}else if(userWeight>=161&&userWeight<=200){
				this.shareWeigthWorld.windType="10级抗风型";
				this.shareWeigthWorld.windIdiom="牢不可摧";
				this.shareImage=this.shareImages.eight;
			}else if(userWeight>=201){
                this.shareWeigthWorld.windType="12级抗风型";
				this.shareWeigthWorld.windIdiom="愚公都搬不动你";
				this.shareImage=this.shareImages.nine;
			}
		},
		/*
		 * 统计广告点击次数
		 * @author Sea
		 * @param {string} adId   广告唯一标识
		 * @param {string} adName 广告名字
		 * @param {int} adType  广告类型  1,首页；2，PK榜页；3,附近的秤；4，推荐页；5，我的中心页
		 * @param {string} adUrl 广告连接
		 * @date 2017-09-30
		 * @return void
		 */
		addAdCount: function(adId, adName, adType, adUrl) {
			$.ajax({
				type: "POST",
				url: api.getClickADCount,
				data: {
					_p: common.getRequest()._p,
					adId: adId,
					name: adName,
					type: adType
				},
				success: function(response) {
					if(response.retcode == 1) {

					} else {
						console.log(response);
					}
					
					setTimeout(function() {
						location.href = adUrl;
					}, 500);
				}
			});
		},
            weightAnimation: function(weight_begin,weight_end) {
                var _this = this;
                var _step = 6;
                var _weight_begin = weight_begin;
                setTimeout(function(){
                    if (weight_end>_weight_begin) {
                        _weight_begin += _step;
                        _this.weightAnimation( _weight_begin , weight_end );
                    }else{
                        _weight_begin = weight_end;
                    }
                    _this.weightAnimationValue = _weight_begin;
                },100);
            },
			/**
			 * 体重选项卡
			 * @author Sea 5684346@qq.com
			 * @param {string} param 选项卡状态
			 * @date 2017-08-10
			 * @return void
			 */            
            weightTab: function(param) {
            	this.weightTabActive = param;

            	if (param === 'month') {
            		if (this.weightTabMonthArr.length == 0) {
            			this.getPresentWeightRecord(1);
            		} else {
            			this.initCharts(this.weightTabMonthArr);
            		}
            	} else if (param === 'halfYear') {
            		if (this.weightTabHalfYearArr.length == 0) {
            			this.getPresentWeightRecord(2);
            		} else {
            			this.initCharts(this.weightTabHalfYearArr);
            		}            		            		
            	} else if (param === 'aYear') {
            		if (this.weightTabAYearArr.length == 0) {
            			this.getPresentWeightRecord(3);
            		} else {
            			this.initCharts(this.weightTabAYearArr);
            		} 
            	} else {
            		throw new Error('参数不准确');
            	}
            },
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
								 _this.userinfo.nickname=response.userinfo.user.nickname;
                        		  //增重or减重
                                if (_this.topData.weightChange != null) {
                                    _this.betweenWeight = _this.topData.weightChange.toFixed(2);
                                }
                        	}
                        }
                    })
                }
            },
            getPresentWeightRecord: function(type) {
                var _this = this;

                if(!_this.isLoading){
                    $.ajax({
                        type: "POST",
                        url: api.getPresentWeightRecord,
                        data: {
                            _p: common.getRequest()._p,
                            type: type
                        },
                        beforeSend: function(){
                        	_this.initData = null;
							_this.tipdisplayStatus = true;
                        },
                        success: function (response) {
                        	closeLoading();//关闭loading页面

                            if (response.retcode==1) {
                            	_this.initData = response;
								
								//缓存数据
						    	if (_this.weightTabActive === 'month') {
						    		_this.weightTabMonthArr = _this.initData.historyRecords;
						    	} else if (_this.weightTabActive === 'halfYear') {
						    		_this.weightTabHalfYearArr = _this.initData.historyRecords;       		            		
						    	} else if (_this.weightTabActive === 'aYear') {
						    		_this.weightTabAYearArr = _this.initData.historyRecords;
						    	} else {
						    		throw new Error('参数不准确');
						    	}

                            	_this.initCharts(_this.initData.historyRecords);
                                
                           }else{
                            	_this.initData = null;	
                            }
                        },
                        complete: function() {
							_this.tipdisplayStatus = false;
                            closeLoading();//关闭loading页面
                        }
                    });
                }
            },
			/**
			 * 初始化图表
			 * @author Sea 5684346@qq.com
			 * @param {string} historyRecords 图表数据
			 * @date 2017-08-10
			 * @return void
			 */               
            initCharts: function(historyRecords) {
                var _this = this;

                //如果没有数据就改变提示没有数据为显示
            	if (_this.initData.historyRecords.length == 0) {
            		_this.noDataStatus = true;
            	} else {
            		_this.noDataStatus = false;
            	}
                
				var _historyRecords = historyRecords.slice();
				
                //chartsData数据
                var chartsData = {
                	date: [],
                	weight: []
                };
                
                var min = _historyRecords.length == 0 ? 0 :_historyRecords[0].weight.toFixed(1);
                var max = _historyRecords.length == 0 ? 0 :_historyRecords[0].weight.toFixed(1);
                
                for(var i = 0; i < _historyRecords.length; i++) {
                	//显示5条记录 2017-8-14 去掉限制
                    /*	if(i == 5) {
                		break;
                	}*/
                	if (this.weightTabActive == 'month') {
                		chartsData.date.push(_historyRecords[i].createTime.substring(5, 10).replace("-", "/"));
                	} else {
                		chartsData.date.push(_historyRecords[i].createTime.substring(0,7).replace("-", "/"));
                	}
                	
                	chartsData.weight.push(_historyRecords[i].weight.toFixed(1));
                	
                	if (_historyRecords[i].weight.toFixed(1) >= max) {
                		max = _historyRecords[i].weight.toFixed(1);
                	}
                	
                	if (_historyRecords[i].weight.toFixed(1) <= min) {
                		min = _historyRecords[i].weight.toFixed(1);
                	}
                }
                
                var temp = max - min;
                
                if (temp == 0) {
                	max = max + 10;
                	min = min - 10 > 0 ? min - 10 : min;
                } else {
                	//temp = temp<2?2:temp;
                	//temp = temp>10?10:temp;

                	max = max + temp / 8;
                	min = (min - temp / 8) ? (min - temp / 8) : min;
                }

                //chartsData.date.reverse(); //数组倒叙（按时间先后）
                //chartsData.weight.reverse(); //数组倒叙（按时间先后）
				
				//图表配置
            	_this.chartsOption = {
            		backgroundColor: '#18191b', //背景色
            		title: {
            			show: false
            		},
            		tooltip: {
            			trigger: 'axis'
            		},
            		legend: {
            			show: false,
            			x: 'center',
            		},
            		grid: {
            			left: '9%',
            			right: '9%',
            			bottom: '70',
            			containLabel: false

            		},
            		xAxis: {
            			// type: 'value',
            			type: 'category',
            			boundaryGap: false,
            			axisLine: {
            				lineStyle: {
            					color: 'rgba(255,255,255,.8)'
            				}
            			},

            			data: ['3/2', '3/3', '3/4', '3/5']
            		},
            		yAxis: {
            			show: false,
            			min: min,
            			max: max
            		},
				    dataZoom: [{
				        type: 'inside',
				        start: 100,
				        end: 30
				    }, {
				        start: 0,
				        end: 0,
						//handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
				        handleSize: '80%',
				        handleStyle: {
				            color: '#fff',
				            shadowBlur: 3,
				            shadowColor: 'rgba(0, 0, 0, 0.6)',
				            shadowOffsetX: 2,
				            shadowOffsetY: 2
				        }
				    }],				   
            		series: [{
            			name: '体重',
            			type: 'line',
            			data: [1, 1, 1, 1],
            			smooth: true, //平滑过渡
            			symbolSize: 10,
            			label: {
            				normal: {
            					show: true,
            					color: '#ffffff',
            					formatter: function(params) {
            						return params.data + 'KG';
            					}
            				}
            			},
            			itemStyle: {
            				normal: {
            					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            						offset: 0,
            						color: 'rgb(124, 40, 159)'
            					}, {
            						offset: 1,
            						color: 'rgb(8, 181, 237)'
            					}])
            				}
            			},
            			lineStyle: {
            				normal: {
            					width: 3
            				}
            			}
            		}]
            	};
                	
                _this.chartsOption.xAxis.data = chartsData.date;
                _this.chartsOption.series[0].data = chartsData.weight;

                var myChart = echarts.init($('#JS_echars')[0]);
                _this.tipdisplayStatus = false;
				myChart.setOption(_this.chartsOption);
            },
			/**
			 * 用于保存、分享图片弹窗
			 * @author Sea 5684346@qq.com
			 * @param {string} historyRecords 图表数据
			 * @date 2017-08-17
			 * @return void
			 */              
            shareCharts: function() {
                var _this = this;
                //执行截图
                setTimeout(function() {
		            var shareContent = document.getElementById('JS-modalContent');// 需要绘制的部分的 (原生）dom 对象 ，注意容器的宽度不要使用百分比，使用固定宽度，避免缩放问题
		            var width = shareContent.offsetWidth;  // 获取(原生）dom 宽度
		            var height = shareContent.offsetHeight; // 获取(原生）dom 高
		            var offsetTop = shareContent.offsetTop;  //元素距离顶部的偏移量
		
		            var canvas = document.createElement('canvas');  //创建canvas 对象
		            var context = canvas.getContext('2d');
		            var scaleBy = _this.getPixelRatio(context);  //获取像素密度的方法 (也可以采用自定义缩放比例)
		            canvas.width = width * scaleBy + 66;   //这里 由于绘制的dom 为固定宽度，居中，所以没有偏移
		            canvas.height = (height + offsetTop) * scaleBy + 46;  // 注意高度问题，由于顶部有个距离所以要加上顶部的距离，解决图像高度偏移问题
		            context.scale(scaleBy, scaleBy);
		
		            var opts = {
		                allowTaint: false,//允许加载跨域的图片
		                tainttest: true, //检测每张图片都已经加载完成
		                scale: scaleBy, // 添加的scale 参数
		                canvas: canvas, //自定义 canvas
		                logging: false, //日志开关，发布的时候记得改成false		                
		            };
    
		            html2canvas(shareContent, opts).then(function (canvas) {		
		                //新Image对象，可以理解为DOM  
		                var image = new Image();
		                image.src = canvas.toDataURL("image/png");		                
		                document.getElementById('JS-generate-pictures').appendChild(image);
		                closeLoading();//关闭loading页面
		            });                	
                }, 1000);     
            },
            //获取会员信息、PK榜数据
            getPkData: function() {
            	var that = this;
            	
                $.ajax({
                    type: "POST",
                    async: false,
                    url: api.getSharedPic,
                    data: {
                        _p: common.getRequest()._p
                    },
                    success: function (response) {        
                        if (response.retcode == 1) {
							that.pkData = response;                         
							that.nickname = that.pkData.user.nickname;
                            that.avatar = 'data:image/png;base64,' + that.pkData.base64data.avatar;
                            that.accountQRCode = 'data:image/png;base64,' + that.pkData.base64data.accountQRCode;
                            
                            $('#JS-generate-pictures').empty(); //清空
            				that.openModalStatus = true; //打开弹窗
            	
            				//判断条件,条件成立才阻止背景页面滚动,其他情况不会再影响到页面滚动
							document.addEventListener('touchmove', function (event) {  
							    if (that.openModalStatus) {  
							        event.preventDefault();  
							    }  
							});
							
							that.shareCharts();                     
                        } else {
                            
                        }
                    }
                });            	
            },
	        //获取像素密度
	        getPixelRatio:function(context) {
	            var backingStore = context.backingStorePixelRatio ||
	                    context.webkitBackingStorePixelRatio ||
	                    context.mozBackingStorePixelRatio ||
	                    context.msBackingStorePixelRatio ||
	                    context.oBackingStorePixelRatio ||
	                    context.backingStorePixelRatio || 1;
	            return (window.devicePixelRatio || 1) / backingStore;
	        },            
            //分享体重
            shareWeight: function() {
            	var that = this;
            	that.getPkData();
            	openLoading("图片生成中......");     
           },
           //关闭弹窗
           closeShareModal: function() {
           	  this.openModalStatus = false;
           },
           //仪表盘
           getDashboard: function(newestWeight) {
				var option = {
				    tooltip : {
				        formatter: "{a} <br/>{b} : {c}%"
					},
				    series: [
				        {
				            name: '业务指标',
				            title: {
				               offsetCenter: [0, '20%'],
				               color: '#fff',
				            },            
				            type: 'gauge',
				            markArea: {
				            	itemStyle: {
				            		normal: {
				            			color: 'red'
				            		}
				            	}
				            },
				            max: 200,
							radius: '80%',
				            detail: {
				            	formatter:'{value}kg',
				            	color: '#ffffff',
				            	fontSize: 20
				            },
				            axisLine: {
				            	lineStyle: {
				            		color: [[0.2, '#169BD4'], [0.8, '#169BD4'], [1, '#169BD4']],
				            		width: 25,
				            		opacity: 0.6
				            	}
				            },
						    pointer: {
						    	length: '60%',
						    	width: 4
						    },
				            data: [{value: newestWeight, name: '当前体重'}]
				        }
				    ]
				};
				
				var myChart = echarts.init($('#JS-dashboard')[0]);
                myChart.setOption(option);
           }
         }
      });

    }, 50);

  });

});