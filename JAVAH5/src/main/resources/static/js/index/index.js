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
    loadingImg.style.cssText = "width:5em;;height:4.5em;background-image:url('../../images/logo.gif');background-size:65%;background-position:center;background-repeat:no-repeat;";
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

require(['jquery','Vue','common', 'FooterBar','echarts' ,'html2canvas'], function($,Vue,common,FooterBar,echarts ,html2canvas){ // Swiper 暂时隐藏插件
  $(function(){
	//wx.hideOptionMenu();
    common.globalAjax();//开始全局ajax监听
    //common.hideOptionMenu();//禁用分享等按钮
     var FooterBar_vue = FooterBar.init();

    // settimeout 防止页面假死
    setTimeout(function(){
      new Vue({
        el: '#app',
        data: {
        	weightTabActive: 'month',
            initData: null,
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
			shareImage:null,
            isLoading: false,
            sexData:null,
            womenClass:'women',
			menClass:'men',
            //体重图表
            openModalStatus: false,
            tipdisplayStatus: false,
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
			disabledStatus: false,
			path: null,
            qrcode: null
        },
        components: {
          'footer-bar': FooterBar_vue
        },
        created: function(){
            this.getAdvertising();
        },
        mounted: function(){

          var _this = this;
		  this.homeLink();
		  this.init();
		  this.getDashboard(userWeight);
		  this.stature=150;
		  this.year=20;
		  this.age=this.getAge(20);

          $(".share").click(function(){
              _this.shareWeight();
		  });
          $(".icon-guanbi").click(function(){
             $(".modal").hide();
              _this.openModalStatus = false;
		  });
         // $(window).scroll(function() {
    	 	// if(_this.flag) {
			// 	_this.getPresentWeightRecord(1);
    	 	// 	_this.flag = false;
    	 	// }
		 // });


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
				// 加载体重记录
				this.weightTab('month');
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
		  //首页跳转
		  homeLink: function(){
			  var _this=this;
			  $(".about-link").click(function(){
                  common.linkTo2('about.html');
				  _hmt.push(['_trackEvent','首页','跳转','关于我们跳转']);
			  });
			  $(".health-link").click(function(){
                  common.linkTo2('healthSense.html');
				  _hmt.push(['_trackEvent','首页','跳转','健康小常识跳转']);
			  });
			  $(".my-link").click(function(){
				  common.linkTo2('profile.html');
				  _hmt.push(['_trackEvent','首页','跳转','个人中心跳转']);
			  });
			  $(".check_bnt").click(function(){
				  common.linkTo2('health.html');
				  _hmt.push(['_trackEvent','首页','跳转','跳转到健康分析']);
			});
            $(".item-month").click(function(){
				 _hmt.push(['_trackEvent','首页','体重变化','本月']);
			});
			$(".item-halfYear").click(function(){
				_hmt.push(['_trackEvent','首页','体重变化','半年']);
			});
			$(".item-halfYear").click(function(){
				_hmt.push(['_trackEvent','首页','体重变化','一年']);
			});

		  },
		//获取广告图片
		getAdvertising: function (){
		  var _this = this;
			$.ajax({
				type: "post",
                contentType: "application/json",
                dataType:'json',
				data: JSON.stringify(['home1','home2']),
				url: '/getAdvertising?_p='+common.getRequest()._p,
				success: function(response){
					_this.path= response.path;
				}
			})
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
            getPresentWeightRecord: function(type) {
                var _this = this;

                if(!_this.isLoading){
                    $.ajax({
                        type: "GET",
                        url: '/weUserWeightList?_p='+common.getRequest()._p,
                        data: {
                            type: type
                        },
                        beforeSend: function(){
                        	_this.initData = null;
							_this.tipdisplayStatus = true;
                        },
                        success: function (response) {
                            	_this.initData = {
                                    historyRecords: response.data
                                };
								
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
                        },
                        complete: function() {
							_this.tipdisplayStatus = false;
                            //closeLoading();//关闭loading页面
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
            	if (!historyRecords) {
            		return;
				}
                var _this = this;


                
                //如果没有数据就改变提示没有数据为显示
            	if (_this.initData && _this.initData.historyRecords && _this.initData.historyRecords.length == 0) {
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
                
                var min = _historyRecords.length == 0 ? 0 : _historyRecords[0].weight.toFixed(1);
                var max = _historyRecords.length == 0 ? 0 :_historyRecords[0].weight.toFixed(1);
                
                for(var i = 0; i < _historyRecords.length; i++) {
                	//显示5条记录 2017-8-14 去掉限制
                    /*	if(i == 5) {
                		break;
                	}*/
                   // _historyRecords[i].receiverTime = this.formatDate(_historyRecords[i].receiverTime, '/');
                    //console.log(_historyRecords[i].receiverTime);
                	if (this.weightTabActive == 'month') {
                		chartsData.date.push(_this.formatDate(_historyRecords[i].receiverTime,'/', 1));
                	} else {
                		chartsData.date.push(_this.formatDate(_historyRecords[i].receiverTime,'/', 1));
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
				max -= 0;
				min -= 0;
                if (temp == 0) {
                	max = parseFloat(max + 12).toFixed(1);
                	min = min - 12 > 0 ? parseFloat(min - 12).toFixed(1) : min;
                } else {
                	//temp = temp<2?2:temp;
                	//temp = temp>10?10:temp;

                	max = parseFloat(max + temp / 8).toFixed(1);
                	min = (min - temp / 8) ? parseFloat(min - temp / 8).toFixed(1) : min;
                	console.log('max:'+max);
                	console.log('min:'+min);
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
            //获取微信二维码图片
            getCodeImge: function(){
                var _this = this;
                var headimgurl = $("#weChaheadimgurl").val();

                $.ajax({
                    type:'get',
                    url: '/getQrcodeImg',
                    data:{
                        _p:common.getRequest()._p
                    },
                    success: function(response){

                        var codeImge= JSON.parse(response);

                        console.log(response.qrcode);
						if(codeImge.qrcode){
                            _this.qrcode = 'data:image/png;base64,'+codeImge.qrcode;
                            $(".code-img img").attr("src",_this.qrcode);
                            $("#JS-imageurl").attr("src",headimgurl);


                            $('#JS-generate-pictures').empty(); //清空
                            $(".modal").show();
                            _this.openModalStatus = true; //打开弹窗
                            //判断条件,条件成立才阻止背景页面滚动,其他情况不会再影响到页面滚动
                            document.addEventListener('touchmove', function (event) {
                                if (_this.openModalStatus) {
                                    event.preventDefault();
                                }
                            });

                             _this.shareCharts();
                        }
                    }

                })

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
                    });
                }, 1000);

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
            	this.getCodeImge();
           },
           //关闭弹窗
           closeShareModal: function() {
           	  $(".modal").hide();
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
           },
			// 转换日期
			formatDate: function(date, split, type) {
				var result;
				if (type === 1) {					
					return date.toString().substr(0,8).replace(/(\d{4})(\d{2})(\d{2})/, '$2-$3');
				} else {
					var d = new Date(parseInt(date));
					var year = d.getFullYear();
					var month = d.getMonth() + 1;
					var day = d.getDate();
	
					if (month < 10) {
						month = '0' + month;
					}
					if (day < 10) {
						day = '0' + day;
					}
					split = split || '/';
					
					result = month + split + day;
				}

				return result
			}

         }
      });

    }, 50);

  });

});