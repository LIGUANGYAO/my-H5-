define(['Vue','common','jquery','api','echarts'],

function(Vue,common,$,api,echarts){

    var exports = {};

    exports.init = function(){
        var myChars = Vue.extend({
            data: function(){
                return {
                    initData: null,
                    chartsOption: null
                }
            },
            template: '<div id="JS_echars" class="change-report__echars boxshadow"></div>',
            created: function(){
                // this.getPresentWeightRecord();
            },
            mounted: function(){
                var chartsData = undefined;
                if( this.historyrecords ){
                    chartsData = this.historyrecords;
                }else{
                    //如果调用该组件时没有带数据，那么自己请求数据回来
                    this.getPresentWeightRecord();
                    chartsData = this.initData.historyRecords;
                }
                //初始化
                this.initCharts(chartsData,this.chartscolor);
            },
            methods: {
                /**
                 * chartscolor: "white"-白色  "black"-黑色  "black_deep"-深黑色;默认 黑色
                 */
                initCharts: function(historyRecords,chartscolor){
                    var _this = this;
                    var _historyRecords = historyRecords.slice();
                    
                    //chartsData数据
                    var chartsData = {
                        date:[],
                        weight:[]
                    };
                    
                    var min=_historyRecords[0].weight.toFixed(1);
                    var max=_historyRecords[0].weight.toFixed(1);
                    
                    for (var i = historyRecords.length - 1; i > 0; i--) {
                        //显示5条记录
                        if (i == 5) {
                            break;
                        }
                        
                        chartsData.date.push( _historyRecords[i].createTime.substring(5,10).replace("-","/") );
                        chartsData.weight.push( _historyRecords[i].weight.toFixed(1) );
                        if(_historyRecords[i].weight.toFixed(1)>=max){
                        	max = _historyRecords[i].weight.toFixed(1);
                        }
                        if(_historyRecords[i].weight.toFixed(1)<=min){
                        	min = _historyRecords[i].weight.toFixed(1);
                        }
                    }
                    
                    var temp = max-min;
                    if(temp==0){
                    	  max = max+10;
                          min = min-10>0?min-10:min;
                    }else{
//                    	temp = temp<2?2:temp;
//                    	temp = temp>10?10:temp;
 
                    	max = max+temp/8;
                    	min= (min-temp/8)?(min-temp/8):min;
                    }
                  
                    //console.log(max+":"+min);
                    chartsData.date.reverse();//数组倒叙（按时间先后）
                    chartsData.weight.reverse();//数组倒叙（按时间先后）

                    //console.log(chartscolor);

                    if(chartscolor==='white'){
                        this.chartsOption = {
                            // backgroundColor: '#1e1d23',//背景色 
                            title: {
                                show: false
                            },
                            tooltip: {
                                trigger: 'axis'
                            },
                            legend: {
                                show: false
                            },
                            grid: {
                            	  left: '7%',
                                  right: '7%',
                                  bottom: '32',
                                  containLabel: false
//                                left: '-7%',
//                                right: '7%',
//                                bottom: '3%',
//                                containLabel: true
                            },
                            xAxis: {
                                // type: 'value',
                                type: 'category',
                                boundaryGap: false,
                                axisLine: {
                                    lineStyle: {
                                        color: 'rgba(100,100,100,.8)'
                                    }
                                },
                                data: ['3/2','3/3','3/4','3/5']
                            },
                            yAxis: {
                                show: false,
                                min:min,
                                max:max
                            },
                            series: [
                                {
                                    name:'体重',
                                    type:'line',
                                    data:[40, 55, 55, 60],
                                    smooth: true,//平滑过渡
                                    symbolSize: 10,
                                    label: {
                                        //显示具体数值
                                        normal: {
                                            show: true,
                                            textStyle: {
                                                color: 'rgba(100,100,100,.8)'
                                            },
                                            formatter: function(params){
                                                return params.data + 'KG';
                                            }
                                        }
                                    },
                                    itemStyle: {
                                        //折线拐点标志的样式
                                        normal: {
                                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                                offset: 0,
                                                color: 'rgb(89, 215, 208)'
                                            }, {
                                                offset: 1,
                                                color: 'rgb(89, 215, 208)'
                                            }])
                                        }
                                    },
                                    lineStyle: {
                                        normal: {
                                            width: 3
                                        }
                                    }
                                }
                            ]
                        };
                    }else{
                        _this.chartsOption = {
                            backgroundColor: '#20273a',//背景色
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
                                left: '7%',
                                right: '7%',
                                bottom: '32',
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
                             
                                data: ['3/2','3/3','3/4','3/5']
                            },
                            yAxis: {
                                show: false,
                                min:min,
                                max:max
                            },                         
                            series: [
                                {
                                    // data: ['3/2','3/3','3/4','3/5'],
                                    name:'体重',
                                    type:'line',
                                    // stack: '总量',
                                    data:[1, 1, 1, 1],
                                    smooth: true,//平滑过渡
                                    symbolSize: 10,
                                    label: {
                                        normal: {
                                            show: true,
                                            color: '#ffffff',
                                            formatter: function(params){
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
                                }
                            ]
                        };
                        //深黑色
                        if(chartscolor==='black_deep'){
                            _this.chartsOption.backgroundColor = '#1e1d23';
                        }
                    }
                    
                    _this.chartsOption.xAxis.data = chartsData.date;
//                    console.log(chartsData.date.length)
//                    _this.chartsOption.xAxis.splitNumber = chartsData.date.length;
//                    _this.chartsOption.xAxis.minInterval = 3;
                    _this.chartsOption.series[0].data = chartsData.weight;
                    //option.end

                    var myChart = echarts.init($('#JS_echars')[0]);
                    myChart.setOption(_this.chartsOption);
                },
                getPresentWeightRecord: function(){
                    var _this = this;
                    $.ajax({
                        type: "POST",
                        async: false,
                        url: api.getPresentWeightRecord,
                        data: {
                            _p: common.getRequest()._p,
                            type: 1 //1-本月，2-半年，3-年
                        },
                        success: function (response) {
                            // console.info("myChart:"+response);
                            if(response.retcode==1){
                                _this.initData = response;
                            }else{
                                
                            }
                        }
                    });
                }
            },
            props: {
                historyrecords: {
                    type: Array
                },
                chartscolor: {
                    type: String
                }
            },
        });

        return myChars;

    }

    return exports;

});