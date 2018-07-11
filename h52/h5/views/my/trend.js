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



require(['jquery', 'Vue', 'FooterBar', 'common', 'api', 'echarts', 'bmi'], function($, Vue, FooterBar, common, api, echarts, bmi) {
    var map = {
        1: '',
        2: 'Fat',
        3: 'Water',
        4: 'Muscle'
    }

    $(function() {

        var FooterBar_vue = FooterBar.init();
        var timesecond = new Date().getTime();
        // settimeout 防止页面假死
        setTimeout(function() {
            new Vue({
                el: '#app',
                data: {
                    list: [],
                    isloading: true,
                    pageNum: 10,
                    pageSize: 1,
                    bodyFat: {},
                    registeredData: {},


                    week: null,
                    month: null,
                    year: null,
                    typeNum: 1,
                    dateNum: 1,

                    records: []
                },
                components: {
                    'footer-bar': FooterBar_vue
                },
                created: function() {
                    this.week= common.addDate2(common.getDate3(),-7);
                    this.month= common.addDate2(common.getDate3(),-30);
                    this.year= common.addDate2(common.getDate3(),-365);
                },
                mounted: function() {
                    var _this = this;

                    this.getProfile(function() {

                        _this.switchWeight(1,_this.week)
                    })
                },
                directives: {
                    tab: {
                        bind: function(elm, binding, vnode) {
                            var _this = vnode.context;
                            // $(elm).find(' > li, > div').on('click', function() {
                            //     $(this).addClass('active').siblings().removeClass('active');


                            // })
                        }
                    }
                },
                methods: {

                    goHistory: function() {
                        common.linkTo2('./history.html')
                    },
                    /**
                     * 初始化图表
                     * @author liu
                     * @param {string} historyRecords 图表数据
                     * @date 2018-1-5
                     * @return void
                     */
                    initCharts: function() {
                        var _this = this;

                        

                            _this.historyWeight.sort(function(a, b) {
                                return a.receiverTime - b.receiverTime
                            });

                            //chartsData数据
                            var chartsData = {
                                date: [],
                                weight: []
                            };

                            var max = _this.historyWeightLength == 0 ? 0 : (_this.historyWeight[0].weight).toFixed(1);
                            var min = _this.historyWeightLength == 0 ? 0 : (_this.historyWeight[0].weight).toFixed(1);


                            for (var i = 0; i < _this.historyWeight.length; i++) {

                                chartsData.date.push(_this.historyWeight[i].receiverTime.substring(4, 6)+"/"+_this.historyWeight[i].receiverTime.substring(6, 8));

                                var histwei = (_this.historyWeight[i].weight.toFixed(1)) * 2;

                                chartsData.weight.push(histwei.toFixed(1));

                                if (_this.historyWeight[i].weight.toFixed(1) -0 >= max) {
                                    max = _this.historyWeight[i].weight.toFixed(1);
                                }

                                if (_this.historyWeight[i].weight.toFixed(1) -0 < min) {
                                    min = _this.historyWeight[i].weight.toFixed(1);
                                }
                            }

                            //

                            _this.records = []
                            for (var i = _this.historyWeight.length - 1, j = 0; i >= 0&& j < 2 ; i--,j++) {
                                var item = _this.historyWeight[i];
                                item.value = ((item.weight.toFixed(1) - 0) * 2).toFixed(1) + '斤';
                                common.computeFat(item, _this.registeredData, bmi);
                                item.word = item.bodyTypeChinese
                                _this.records.push(item);
                            }

                           console.log("最后一次体重:"+chartsData.weight[chartsData.weight.length - 1]);

                            end = _this.getEnd()
                            var temp = (max - min);

                            max -= 0;
                            min -= 0;
                            if (temp == 0) {
                                max = parseFloat(max + 12) * 2;
                                min = min - 12 > 0 ? parseFloat(min - 12) * 2 : min;
                                console.log('max1:' + max);
                                console.log('min1:' + min);
                            } else {
                                max = (parseFloat(max + temp / 8) * 2).toFixed(1);
                                min = (min - temp / 3) ? (parseFloat(min - temp / 3) * 2).toFixed(1) : min;
                                console.log('max2:' + max);
                                console.log('min2:' + min);
                            }

                            end = 100 - 100 *(5 / _this.historyWeightLength)

                            if (end > 88) {
                                end = 88
                            }

                            //图表配置
                            _this.chartsOption = {
                                backgroundColor: '', //背景色
                                animationDuration: 0,
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
                                            color: 'rgba(142,142,147,1)'
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
                                    end: end
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
                                    },
                                    textStyle: {
                                        color: '#f9860b'
                                    }
                                }],
                                series: [{
                                    name: '体重',
                                    type: 'line',
                                    data: [1, 1, 1, 1],
                                    smooth: true, //平滑过渡
                                    symbolSize: 12,
                                    label: {
                                        normal: {
                                            show: true,
                                            color: '#f9860b',
                                            formatter: function(params) {
                                                return params.data + '斤';
                                            }
                                        }
                                    },
                                    itemStyle: {
                                        normal: {
                                            color: '#f9860b'
                                            // color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                            //     offset: 0,
                                            //     color: '#f9860b'
                                            // }, {
                                            //     offset: 1,
                                            //     color: '#f9860b'
                                            // }])
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

                           
                            var myChart = echarts.init($('#JS-echars')[0]);
                             myChart.setOption(_this.chartsOption);
                           
                           
                        
                    },
                    initChartsFat: function() {
                        var _this = this;

                        
                            var list = JSON.parse(JSON.stringify(_this.historyWeight));

                            _this.historyWeight = _this.historyWeight.filter(function(a) {
                                return a.fat
                            })
                            _this.historyWeightLength = _this.historyWeight.length;
                            _this.records = []
                            for (var i = _this.historyWeight.length - 1, j = 0; i >= 0&& j < 2 ; i--,j++) {
                                var item = _this.historyWeight[i];
                                common.computeFat(item, _this.registeredData, bmi);
                                item.value = (item.fat * 100).toFixed(1)+'%';
                                item.word = item.fatRateTitle
                                _this.records.push(item);
                            }


                            _this.historyWeight = _this.historyWeight.filter(function(a) {
                                a.fat *= 100;
                                return a
                            })
                            _this.historyWeight.sort(function(a, b) {
                                return a.receiverTime - b.receiverTime
                            });

                            //chartsData数据
                            var chartsData = {
                                date: [],
                                weight: []
                            };

                            var max = _this.historyWeightLength == 0 ? 0 : (_this.historyWeight[0].fat).toFixed(1);
                            var min = _this.historyWeightLength == 0 ? 0 : (_this.historyWeight[0].fat).toFixed(1);


                            for (var i = 0; i < _this.historyWeight.length; i++) {

                                chartsData.date.push(_this.historyWeight[i].receiverTime.substring(4, 6)+"/"+_this.historyWeight[i].receiverTime.substring(6, 8));

                                var histwei = (_this.historyWeight[i].fat.toFixed(1)) - 0;

                                chartsData.weight.push(histwei.toFixed(1));

                                if (_this.historyWeight[i].fat.toFixed(1) -0 >= max) {
                                    max = _this.historyWeight[i].fat.toFixed(1);
                                }

                                if (_this.historyWeight[i].fat.toFixed(1) -0 < min) {
                                    min = _this.historyWeight[i].fat.toFixed(1);
                                }
                            }



                            end = _this.getEnd()
                           console.log("最后一次fat:"+chartsData.weight[chartsData.weight.length - 1]);

                            var temp = (max - min);

                            max -= 0;
                            min -= 0;
                            if (temp == 0) {
                                max = parseFloat(max + 12) ;
                                min = min - 12 > 0 ? parseFloat(min - 12)  : min;
                                console.log('max1:' + max);
                                console.log('min1:' + min);
                            } else {
                                max = (parseFloat(max + temp / 8) ).toFixed(1);
                                min = (min - temp / 3) ? (parseFloat(min - temp / 3) ).toFixed(1) : min;
                                console.log('max2:' + max);
                                console.log('min2:' + min);
                            }


                            _this.historyWeight = list;
                            //图表配置
                            _this.chartsOption = {
                                backgroundColor: '', //背景色
                                animationDuration: 0,
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
                                            color: 'rgba(142,142,147,1)'
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
                                    end: end
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
                                    },
                                    textStyle: {
                                        color: '#f9860b'
                                    }
                                }],
                                series: [{
                                    name: '脂肪率',
                                    type: 'line',
                                    data: [1, 1, 1, 1],
                                    smooth: true, //平滑过渡
                                    symbolSize: 12,
                                    label: {
                                        normal: {
                                            show: true,
                                            color: '#f9860b',
                                            formatter: function(params) {
                                                return params.data + '%';
                                            }
                                        }
                                    },
                                    itemStyle: {
                                        normal: {
                                            color: '#f9860b'
                                            // color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                            //     offset: 0,
                                            //     color: '#f9860b'
                                            // }, {
                                            //     offset: 1,
                                            //     color: '#f9860b'
                                            // }])
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

                           
                            myChart = echarts.init($('#JS-echars')[0]);
                            myChart.setOption(_this.chartsOption);

                            // myChart.dispatchAction({
                            //     type: 'dataZoom',
                            //     start: 100,
                            //     end: end
                            // });

                            console.log('end=' + end)
                           
                                                 
                    },
                    initChartsMuscle: function() {
                        var _this = this;

                        
                            var list = JSON.parse(JSON.stringify(_this.historyWeight));

                            _this.historyWeight = _this.historyWeight.filter(function(a) {
                                return a.muscle
                            })

                            _this.historyWeightLength = _this.historyWeight.length;
                            
                            // _this.historyWeight = _this.historyWeight.filter(function(a) {
                            //     a.muscle *= 100;
                            //     return a
                            // })
                            _this.historyWeight.sort(function(a, b) {
                                return a.receiverTime - b.receiverTime
                            });

                            //chartsData数据
                            var chartsData = {
                                date: [],
                                weight: []
                            };

                            var max = _this.historyWeightLength == 0 ? 0 : (_this.historyWeight[0].muscle).toFixed(1);
                            var min = _this.historyWeightLength == 0 ? 0 : (_this.historyWeight[0].muscle).toFixed(1);


                            for (var i = 0; i < _this.historyWeight.length; i++) {

                                chartsData.date.push(_this.historyWeight[i].receiverTime.substring(4, 6)+"/"+_this.historyWeight[i].receiverTime.substring(6, 8));

                                var histwei = (_this.historyWeight[i].muscle.toFixed(1)) - 0;

                                chartsData.weight.push(histwei.toFixed(1));

                                if (_this.historyWeight[i].muscle.toFixed(1) -0 >= max) {
                                    max = _this.historyWeight[i].muscle.toFixed(1);
                                }

                                if (_this.historyWeight[i].muscle.toFixed(1) -0< min) {
                                    min = _this.historyWeight[i].muscle.toFixed(1);
                                }
                            }

                            _this.records = []
                            for (var i = _this.historyWeight.length - 1, j = 0; i >= 0&& j < 2 ; i--,j++) {
                                var item = _this.historyWeight[i];
                                common.computeFat(item, _this.registeredData, bmi);
                                item.value = item.muscle.toFixed(1)+'%';
                                item.word = item.muscleTitle
                                _this.records.push(item);
                            }

                           console.log("最后一次muscle:"+chartsData.weight[chartsData.weight.length - 1]);

                           end = _this.getEnd()
                            var temp = (max - min);

                            max -= 0;
                            min -= 0;
                            if (temp == 0) {
                                max = parseFloat(max + 12) ;
                                min = min - 12 > 0 ? parseFloat(min - 12)  : min;
                                console.log('max1:' + max);
                                console.log('min1:' + min);
                            } else {
                                max = (parseFloat(max + temp / 8) ).toFixed(1);
                                min = (min - temp / 3) ? (parseFloat(min - temp / 3) ).toFixed(1) : min;
                                console.log('max2:' + max);
                                console.log('min2:' + min);
                            }


                            _this.historyWeight = list;
                            //图表配置
                            _this.chartsOption = {
                                backgroundColor: '', //背景色
                                animationDuration: 0,
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
                                            color: 'rgba(142,142,147,1)'
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
                                    end: end
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
                                    },
                                    textStyle: {
                                        color: '#f9860b'
                                    }
                                }],
                                series: [{
                                    name: '脂肪率',
                                    type: 'line',
                                    data: [1, 1, 1, 1],
                                    smooth: true, //平滑过渡
                                    symbolSize: 12,
                                    label: {
                                        normal: {
                                            show: true,
                                            color: '#f9860b',
                                            formatter: function(params) {
                                                return params.data + '%';
                                            }
                                        }
                                    },
                                    itemStyle: {
                                        normal: {
                                            color: '#f9860b'
                                            // color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                            //     offset: 0,
                                            //     color: '#f9860b'
                                            // }, {
                                            //     offset: 1,
                                            //     color: '#f9860b'
                                            // }])
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

                           
                            var myChart = echarts.init($('#JS-echars')[0]);
                             myChart.setOption(_this.chartsOption);
                           
                                                 
                    },
                    initChartsWater: function() {
                        var _this = this;

                        
                            var list = JSON.parse(JSON.stringify(_this.historyWeight));

                            _this.historyWeight = _this.historyWeight.filter(function(a) {
                                return a.water
                            })
                            _this.historyWeightLength = _this.historyWeight.length;
                            _this.records = []
                            for (var i = _this.historyWeight.length - 1, j = 0; i >= 0&& j < 2 ; i--,j++) {
                                var item = _this.historyWeight[i];
                                common.computeFat(item, _this.registeredData, bmi);
                                item.value = (item.water*100).toFixed(1)+'%';
                                item.word = item.waterTitle
                                _this.records.push(item);
                            }

                            _this.historyWeight = _this.historyWeight.filter(function(a) {
                                a.water *= 100;
                                return a
                            })
                            _this.historyWeight.sort(function(a, b) {
                                return a.receiverTime - b.receiverTime
                            });

                            //chartsData数据
                            var chartsData = {
                                date: [],
                                weight: []
                            };

                            var max = _this.historyWeightLength == 0 ? 0 : (_this.historyWeight[0].water).toFixed(1);
                            var min = _this.historyWeightLength == 0 ? 0 : (_this.historyWeight[0].water).toFixed(1);


                            for (var i = 0; i < _this.historyWeight.length; i++) {

                                chartsData.date.push(_this.historyWeight[i].receiverTime.substring(4, 6)+"/"+_this.historyWeight[i].receiverTime.substring(6, 8));

                                var histwei = (_this.historyWeight[i].water.toFixed(1)) - 0;

                                chartsData.weight.push(histwei.toFixed(1));

                                if (_this.historyWeight[i].water.toFixed(1) - 0 >= max) {
                                    max = _this.historyWeight[i].water.toFixed(1);
                                }

                                if (_this.historyWeight[i].water.toFixed(1) - 0 < min) {
                                    min = _this.historyWeight[i].water.toFixed(1);
                                }
                            }


                           console.log("最后一次water:"+chartsData.weight[chartsData.weight.length - 1]);
                           end = _this.getEnd()
                            var temp = (max - min);

                            max -= 0;
                            min -= 0;
                            if (temp == 0) {
                                max = parseFloat(max + 12) ;
                                min = min - 12 > 0 ? parseFloat(min - 12)  : min;
                                console.log('max1:' + max);
                                console.log('min1:' + min);
                            } else {
                                max = (parseFloat(max + temp / 8) ).toFixed(1);
                                min = (min - temp / 3) ? (parseFloat(min - temp / 3) ).toFixed(1) : min;
                                console.log('max2:' + max);
                                console.log('min2:' + min);
                            }


                            _this.historyWeight = list;
                            //图表配置
                            _this.chartsOption = {
                                backgroundColor: '', //背景色
                                animationDuration: 0,
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
                                            color: 'rgba(142,142,147,1)'
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
                                    end: end
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
                                    },
                                    textStyle: {
                                        color: '#f9860b'
                                    }
                                }],
                                series: [{
                                    name: '脂肪率',
                                    type: 'line',
                                    data: [1, 1, 1, 1],
                                    smooth: true, //平滑过渡
                                    symbolSize: 12,
                                    label: {
                                        normal: {
                                            show: true,
                                            color: '#f9860b',
                                            formatter: function(params) {
                                                return params.data + '%';
                                            }
                                        }
                                    },
                                    itemStyle: {
                                        normal: {
                                            color: '#f9860b'
                                            // color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                            //     offset: 0,
                                            //     color: '#f9860b'
                                            // }, {
                                            //     offset: 1,
                                            //     color: '#f9860b'
                                            // }])
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

                           
                            var myChart = echarts.init($('#JS-echars')[0]);
                             myChart.setOption(_this.chartsOption);
                           
                                                 
                    },
                     //获取注册信息接口
                    getProfile:function(callback){
                        var _this = this;
                        $.ajax({
                        type:'POST',
                        url: api.profile,
                        async: false,
                        data:{
                            _p:common.getRequest()._p
                        },
                        dataType:'json',
                        success: function(res){
                             if(res.result.data){
                                _this.registeredData = res.result.data[0];

                                if (_this.registeredData.age == 0) {
                                    _this.registeredData.age = 1;
                                }
                               
                                if (typeof callback === "function"){
                                    callback();
                                }
                              
                             }
                           }
                        })
                    },
                    //切换
                    switchWeight:function(typeNum,dateNum){
                        var _this = this;
                        this.dateNum = typeNum;
                        this.getWeightAll(dateNum,function(){

                            var name = map[_this.typeNum]
                            _this['initCharts' + name]();
                        });
                    },
                    //切换
                    switchType:function(typeNum){
                        var _this = this;
                        this.typeNum = typeNum;

                        var name = map[typeNum]
                        _this['initCharts' + name]();
                    },
                    //获取周、月体重
                    getWeightAll:function(dateNum,callback){

                        this.historyWeight = [];

                        var _this = this;
                        var data={
                            _p:common.getRequest()._p,
                            startTime:dateNum
                        }
                        $.ajax({
                            type:'get',
                            url:api.getWeightList+'?'+$.param(data),
                            async: false,
                            dataType: 'json',
                            success:function(res){
                                // res = JSON.parse(JSON.stringify(DATA));
                               if(res.result.data.length>0||res.result.data[0] !==undefined){
                                _this.historyWeight = res.result.data;
                                _this.historyWeightLength = res.result.data.length;
                               }else{
                                _this.historyWeight = [];
                                _this.historyWeightLength = 0;
                               }

                               callback && callback()
                            }
                        })
                    },
                    // 转换日期
                    formatDate: function(date, split, type) {
                        var result;
                        if (type === 1) {
                            return date.toString().substr(0, 8).replace(/(\d{4})(\d{2})(\d{2})/, '$2-$3');
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
                    },

                    getEnd: function() {
                        var end = 100 - 100 *(5 / this.historyWeight.length)

                        if (end > 88) {
                            end = 88
                        }

                        if (end < 50 ) {
                            end = 50
                        }

                        return end
                    }
                },

                filters: {
                    formatDate2: function(input) {

                        return input.replace(/(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/, '$1-$2-$3 $4:$5');
                        // + ' ' + hour + ':' + minutes + ':' + seconds;
                    }
                }
            })
        }, 500)
    })

})




