

require(['jquery', 'Vue', 'FooterBar', 'common', 'IScroll', 'iosSelect', 'echarts', 'api', 'bmi'], function($, Vue, FooterBar, common, IScroll, iosSelect, echarts, api, bmi) {

    $(function() {

        var FooterBar_vue = FooterBar.init();
        var timesecond = new Date().getTime();

        // settimeout 防止页面假死
        setTimeout(function() {
            new Vue({
                el: '#app',
                data: {
                  data: {}
                },
                components: {
                    'footer-bar': FooterBar_vue
                },
                created: function() {

                },
                mounted: function() {
                    var _this = this;
                    _this.getWeightList(function() {
                        _this.initCharts();
                    });

                    _this.getDetail()
                },
                methods: {
                    //称重历史记录
                    getWeightList: function(callback) {
                        var _this = this;
                        //alert('准备请求')
                        return $.ajax({
                            type: 'POST',
                            url: api.queryWeightUser,
                            data: {
                                _p: common.getRequest()._p,
                                v: timesecond,
                                reportId: common.getRequest().reportId
                            },
                            async: true,
                            dataType: 'json',
                            success: function(res) {
                                _this.historyWeight = res.result.data;
                                var log = _this.historyWeight.map(function(item) {
                                    return item.weight
                                })
                                _this.log = JSON.stringify(log);
                                _this.historyWeightLength = res.result.data.length;

                                callback && callback()
                            }
                        })
                    },
                    initCharts: function() {
                        var _this = this;

                        if (_this.historyWeight) {


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

                                chartsData.date.push(_this.formatDate(_this.historyWeight[i].receiverTime, '-', 1));

                                var histwei = (_this.historyWeight[i].weight.toFixed(1)) * 2;

                                chartsData.weight.push(histwei.toFixed(1));

                                if (_this.historyWeight[i].weight.toFixed(1) >= max) {
                                    max = _this.historyWeight[i].weight.toFixed(1);
                                }

                                if (_this.historyWeight[i].weight.toFixed(1) < min) {
                                    min = _this.historyWeight[i].weight.toFixed(1);
                                }
                            }

                            // alert(chartsData.weight[chartsData.weight.length - 1])
                            var temp = (max - min);

                            max -= 0;
                            min -= 0;
                            if (temp == 0) {
                                max = parseFloat(max + 12) * 2;
                                min = min - 12 > 0 ? parseFloat(min - 12) * 2 : min;
                                console.log('max:' + max);
                                console.log('min:' + min);
                            } else {
                                max = (parseFloat(max + temp / 8) * 2).toFixed(1);
                                min = (min - temp / 3) ? (parseFloat(min - temp / 3) * 2).toFixed(1) : min;
                                console.log('max:' + max);
                                console.log('min:' + min);
                            }



                            //图表配置
                            _this.chartsOption = {
                                backgroundColor: '', //背景色
                                animationDuration: 500,
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
                                    },
                                    textStyle: {
                                        color: '#ffffff'
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
                                                return params.data + '斤';
                                            }
                                        }
                                    },
                                    itemStyle: {
                                        normal: {
                                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                                offset: 0,
                                                color: 'rgb(255, 255, 255)'
                                            }, {
                                                offset: 1,
                                                color: 'rgb(255, 255, 255)'
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

                            var myChart = echarts.init($('#JS-echars')[0]);
                            myChart.setOption(_this.chartsOption);
                        }
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
                    getDetail: function() {

                        var data = {
                            _p: common.getRequest()._p,
                            id: common.getRequest().id,
                            reportId: common.getRequest().reportId
                        }

                        var _this = this;
                        $.ajax({
                            type: 'POST',
                            url: api.report + '?' + $.param(data),
                            dataType: 'json',
                            success: function(res) {
                                _this.data = res.result.data[0];
                            },
                            error: function() {}
                        })
                    }
                }
            })
        }, 500)
    })

})