define(['jquery', 'count'], function($, Count) {
    'use strict';
    //执行统计插件
    $(document).ready(function() {
        setTimeout(function() {
            Count.init();
        }, 3000)
    })

    var exportsObj = {};
    /**=======获取url参数=======*/
    exportsObj.getRequest = function() {
        var url = location.search; //获取url中"?"符后的字串
        var theRequest = new Object();
        if (url.indexOf("?") != -1) {
            var str = url.substr(1);
            var strs = str.split("&");
            for (var i = 0; i < strs.length; i++) {
                theRequest[strs[i].split("=")[0]] = (strs[i].split("=")[1]);
            }
        }
        return theRequest;
    }

    //跳转
    exportsObj.linkTo = function(url, par) {
        var URL;
        if (par) {
            URL = url + '?' + par;
        } else {
            URL = url + window.location.search;
        }
        if (typeof(Storage) !== "undefined") {
            sessionStorage.siteUrl = window.location.href;
        }
        URL = URL.replace('&v=v11.1.0', '')
        window.location.href = URL + '&v=v11.1.0'
    }
    //跳转
    exportsObj.linkTo2 = function(url, par, append) {
        if (append) {
            append = '&' + append;
        } else {
            append = ''
        }

        var URL;
        if (par) {
            URL = url + '?' + par;
        } else {
            URL = url + window.location.search + append;
        }
        URL = URL.replace('&v=v11.1.0', '');
        window.location.href = URL + '&v=v11.1.0'
    }
    //跳转
    exportsObj.replaceTo = function(url, par) {
        if (par) {
            window.location.replace(url + '?' + par);
        } else {
            window.location.replace(url + window.location.search);
        }
    }
    //对象转URL参数
    exportsObj.jsonToQueryString = function(json) {
        return '?' +
            Object.keys(json).map(function(key) {
                return encodeURIComponent(key) + '=' +
                    encodeURIComponent(json[key]);
            }).join('&');
    }
    //隐藏分享按钮
    exportsObj.hideOptionMenu = function() {

        function onBridgeReady() {
            var path = location.pathname;

           if(location.href.indexOf("error.html")==-1||location.href.indexOf("wonderful.html")==-1){
               WeixinJSBridge.call('hideOptionMenu');
            }
        }
        if (typeof WeixinJSBridge == "undefined") {
            if (document.addEventListener) {
                document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
            } else if (document.attachEvent) {
                document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
                document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
            }
        } else {
            onBridgeReady();
        }
        //wx.hideOptionMenu();
    };

    exportsObj.hideOptionMenu();

    // toastr
    exportsObj.showToastr = function(text, timeout) {

        var timeout = timeout || 2000;

        $('.toastr').remove();
        var elm = $('<div class="toastr" style="position: fixed; z-index: 10000000;top: 0px; left: 0px; text-align: center; right: 0px; color: rgb(255, 255, 255); display: table; vertical-align: middle; height: 100%; width: 100%;"><div class="wrap" style="    display: table-cell;    vertical-align: middle;"><div class="text" style="    background: #8e8e93;    display: inline-block;    padding: .25rem 1rem;    border-radius: .2rem;">123</div></div></div>');

        elm.hide().find('.text').text(text);

        $('body').append(elm);

        elm.fadeIn();

        setTimeout(function() {
            elm.fadeOut(200, function() {
                elm.remove()
            });
        }, timeout)
    }
    exportsObj.getDate = function() {
        var d = new Date();
        var year = d.getFullYear();
        var month = (d.getMonth() + 1) < 10 ? '0' + (d.getMonth() + 1) : '' + (d.getMonth() + 1);
        var day = d.getDate() < 10 ? '0' + d.getDate() : '' + d.getDate();
        var hour = d.getHours();
        var minutes = d.getMinutes();
        var seconds = d.getSeconds();
        return year + month + day + hour + minutes + seconds;
    }
    //当前时间少一天
    exportsObj.addDate = function(date, days) {
        var d = new Date(date);
        d.setDate(d.getDate() + days);
        var month = d.getMonth() + 1;
        var day = d.getDate();
        if (month < 10) { month = "0" + month; }
        if (day < 10) { day = "0" + day; }
        var val = d.getFullYear() + "-" + month + "-" + day;
        return val;
    }

    //周、月、年
    exportsObj.addDate2 = function(date, days) {
        var d = new Date(date);
        d.setDate(d.getDate() + days);
        var month = d.getMonth() + 1;
        var day = d.getDate();
        var hour = d.getHours();
        var min = d.getMinutes();
        var second = d.getSeconds();
        if (month < 10) { month = "0" + month; }
        if (day < 10) { day = "0" + day; }
        if (hour < 10) { hour = "0" + hour }
        if (min < 10) { min = "0" + min }
        if (second < 10) { second = "0" + second }
        var val = d.getFullYear() + "-" + month + "-" + day + " " + hour + ":" + min + ":" + second;
        return val;
    }

    //当前日期  格式2018-04-03 00:00:00
    exportsObj.getDate3 = function() {
        var d = new Date();
        var year = d.getFullYear();
        var month = (d.getMonth() + 1) < 10 ? '0' + (d.getMonth() + 1) : '' + (d.getMonth() + 1);
        var lessOne = d.getDate();
        var hour = d.getHours();
        var min = d.getMinutes();
        var second = d.getSeconds();
        var day = lessOne < 10 ? ('0' + lessOne) : lessOne;
        var hour = hour < 10 ? ('0' + hour) : hour;
        var min = min < 10 ? ('0' + min) : min;
        var second = second < 10 ? ('0' + second) : second;
        return year + "/" + month + "/" + day + " " + hour + ":" + min + ":" + second;
    }

    //当前日期  格式2018-04-03
    exportsObj.getDate2 = function() {
        var d = new Date();
        var year = d.getFullYear();
        var month = (d.getMonth() + 1) < 10 ? '0' + (d.getMonth() + 1) : '' + (d.getMonth() + 1);
        var lessOne = d.getDate();
        var day = lessOne < 10 ? '0' + lessOne : '' + lessOne;
        return year + "-" + month + "-" + day;
    }
    //日期 2018-04-03转换为时间戳 精确到日
    exportsObj.curentStamp = function(str) {
        var date = new Date(str);
        return date.getTime();
    }

    //时间戳转换成日期  2018-04-03
    exportsObj.formatDate = function(now) {
        var d = new Date(now);
        var year = d.getFullYear();
        var month = (d.getMonth() + 1) < 10 ? '0' + (d.getMonth() + 1) : '' + (d.getMonth() + 1);
        var date = d.getDate() < 10 ? '0' + d.getDate() : '' + d.getDate();
        return year + "-" + month + "-" + date
    }

    exportsObj.kg = function(val) {
        return (val * 2).toFixed(1);
    }
    exportsObj.computeFat = function(item, profile, bmi) {

        var sex = profile.gender;
        var age = profile.age;
        var Height = profile.height;
        var currentWeight = item.weight;

        //肥胖等级
        if (sex == 1) {
            if (age < 20) {

                if (parseInt(item.fat * 100) < 5) {
                    item.fatLevelTitle = '偏瘦';
                } else if (parseInt(item.fat * 100) >= 5 && parseInt(item.fat * 100) <= 9) {
                    item.fatLevelTitle = '苗条';
                } else if (parseInt(item.fat * 100) >= 10 && parseInt(item.fat * 100) <= 17) {
                    item.fatLevelTitle = '标准';
                } else if (parseInt(item.fat * 100) >= 18 && parseInt(item.fat * 100) <= 20) {
                    item.fatLevelTitle = '偏胖';
                } else if (parseInt(item.fat * 100) > 20) {
                    item.fatLevelTitle = '肥胖';
                }

            }
            else if (age >= 20 && age <= 29) {

                if (parseInt(item.fat * 100) <= 9) {
                    item.fatLevelTitle = '偏瘦';
                } else if (parseInt(item.fat * 100) > 9 && parseInt(item.fat * 100) <= 13) {
                    item.fatLevelTitle = '苗条';
                } else if (parseInt(item.fat * 100) >= 14 && parseInt(item.fat * 100) <= 20) {
                    item.fatLevelTitle = '标准';
                } else if (parseInt(item.fat * 100) >= 21 && parseInt(item.fat * 100) <= 23) {
                    item.fatLevelTitle = '偏胖';
                } else if (parseInt(item.fat * 100) > 23) {
                    item.fatLevelTitle = '肥胖';
                }

            } else if (age >= 30 && age <= 39) {

                if (parseInt(item.fat * 100) <= 12) {
                    item.fatLevelTitle = '偏瘦';
                } else if (parseInt(item.fat * 100) > 12 && parseInt(item.fat * 100) <= 14) {
                    item.fatLevelTitle = '苗条';
                } else if (parseInt(item.fat * 100) >= 15 && parseInt(item.fat * 100) <= 21) {
                    item.fatLevelTitle = '标准';
                } else if (parseInt(item.fat * 100) >= 22 && parseInt(item.fat * 100) <= 24) {
                    item.fatLevelTitle = '偏胖';
                } else if (parseInt(item.fat * 100) > 24) {
                    item.fatLevelTitle = '肥胖';
                }

            } else if (age >= 40 && age <= 49) {

                if (parseInt(item.fat * 100) <= 14) {
                    item.fatLevelTitle = '偏瘦';
                } else if (parseInt(item.fat * 100) > 14 && parseInt(item.fat * 100) <= 16) {
                    item.fatLevelTitle = '苗条';
                } else if (parseInt(item.fat * 100) >= 17 && parseInt(item.fat * 100) <= 23) {
                    item.fatLevelTitle = '标准';
                } else if (parseInt(item.fat * 100) >= 24 && parseInt(item.fat * 100) <= 26) {
                    item.fatLevelTitle = '偏胖';
                } else if (parseInt(item.fat * 100) > 26) {
                    item.fatLevelTitle = '肥胖';
                }

            } else if (age >= 50 && age <= 59) {

                if (parseInt(item.fat * 100) <= 15) {
                    item.fatLevelTitle = '偏瘦';
                } else if (parseInt(item.fat * 100) > 15 && parseInt(item.fat * 100) <= 17) {
                    item.fatLevelTitle = '苗条';
                } else if (parseInt(item.fat * 100) >= 18 && parseInt(item.fat * 100) <= 24) {
                    item.fatLevelTitle = '标准';
                } else if (parseInt(item.fat * 100) >= 25 && parseInt(item.fat * 100) <= 27) {
                    item.fatLevelTitle = '偏胖';
                } else if (parseInt(item.fat * 100) > 27) {
                    item.fatLevelTitle = '肥胖';
                }

            } else if (age >= 60) {

                if (parseInt(item.fat * 100) <= 16) {
                    item.fatLevelTitle = '偏瘦';
                } else if (parseInt(item.fat * 100) > 16 && parseInt(item.fat * 100) <= 18) {
                    item.fatLevelTitle = '苗条';
                } else if (parseInt(item.fat * 100) >= 19 && parseInt(item.fat * 100) <= 25) {
                    item.fatLevelTitle = '标准';
                } else if (parseInt(item.fat * 100) >= 26 && parseInt(item.fat * 100) <= 28) {
                    item.fatLevelTitle = '偏胖';
                } else if (parseInt(item.fat * 100) > 28) {
                    item.fatLevelTitle = '肥胖';
                }

            }

        } else if (sex == 2) {
            if (age < 20) {

                if (parseInt(item.fat * 100) < 11) {
                    item.fatLevelTitle = '偏瘦';
                } else if (parseInt(item.fat * 100) >= 11 && parseInt(item.fat * 100) <= 13) {
                    item.fatLevelTitle = '苗条';
                } else if (parseInt(item.fat * 100) >= 14 && parseInt(item.fat * 100) <= 22) {
                    item.fatLevelTitle = '标准';
                } else if (parseInt(item.fat * 100) >= 23 && parseInt(item.fat * 100) <= 25) {
                    item.fatLevelTitle = '偏胖';
                } else if (parseInt(item.fat * 100) > 25) {
                    item.fatLevelTitle = '肥胖';
                }

            }
            else if (age >= 20 && age <= 29) {

                if (parseInt(item.fat * 100) <= 17) {
                    item.fatLevelTitle = '偏瘦';
                } else if (parseInt(item.fat * 100) > 17 && parseInt(item.fat * 100) <= 19) {
                    item.fatLevelTitle = '苗条';
                } else if (parseInt(item.fat * 100) >= 20 && parseInt(item.fat * 100) <= 28) {
                    item.fatLevelTitle = '标准';
                } else if (parseInt(item.fat * 100) >= 29 && parseInt(item.fat * 100) <= 31) {
                    item.fatLevelTitle = '偏胖';
                } else if (parseInt(item.fat * 100) > 31) {
                    item.fatLevelTitle = '肥胖';
                }

            } else if (age >= 30 && age <= 39) {

                if (parseInt(item.fat * 100) <= 18) {
                    item.fatLevelTitle = '偏瘦';
                } else if (parseInt(item.fat * 100) > 18 && parseInt(item.fat * 100) <= 20) {
                    item.fatLevelTitle = '苗条';
                } else if (parseInt(item.fat * 100) >= 21 && parseInt(item.fat * 100) <= 29) {
                    item.fatLevelTitle = '标准';
                } else if (parseInt(item.fat * 100) >= 30 && parseInt(item.fat * 100) <= 32) {
                    item.fatLevelTitle = '偏胖';
                } else if (parseInt(item.fat * 100) > 32) {
                    item.fatLevelTitle = '肥胖';
                }

            } else if (age >= 40 && age <= 49) {

                if (parseInt(item.fat * 100) <= 19) {
                    item.fatLevelTitle = '偏瘦';
                } else if (parseInt(item.fat * 100) > 19 && parseInt(item.fat * 100) <= 21) {
                    item.fatLevelTitle = '苗条';
                } else if (parseInt(item.fat * 100) >= 22 && parseInt(item.fat * 100) <= 30) {
                    item.fatLevelTitle = '标准';
                } else if (parseInt(item.fat * 100) >= 31 && parseInt(item.fat * 100) <= 33) {
                    item.fatLevelTitle = '偏胖';
                } else if (parseInt(item.fat * 100) > 33) {
                    item.fatLevelTitle = '肥胖';
                }

            } else if (age >= 50 && age <= 59) {

                if (parseInt(item.fat * 100) <= 20) {
                    item.fatLevelTitle = '偏瘦';
                } else if (parseInt(item.fat * 100) > 20 && parseInt(item.fat * 100) <= 22) {
                    item.fatLevelTitle = '苗条';
                } else if (parseInt(item.fat * 100) >= 23 && parseInt(item.fat * 100) <= 31) {
                    item.fatLevelTitle = '标准';
                } else if (parseInt(item.fat * 100) >= 32 && parseInt(item.fat * 100) <= 33) {
                    item.fatLevelTitle = '偏胖';
                } else if (parseInt(item.fat * 100) > 34) {
                    item.fatLevelTitle = '肥胖';
                }

            } else if (age >= 60) {

                if (parseInt(item.fat * 100) <= 21) {
                    item.fatLevelTitle = '偏瘦';
                } else if (parseInt(item.fat * 100) > 21 && parseInt(item.fat * 100) <= 23) {
                    item.fatLevelTitle = '苗条';
                } else if (parseInt(item.fat * 100) >= 24 && parseInt(item.fat * 100) <= 32) {
                    item.fatLevelTitle = '标准';
                } else if (parseInt(item.fat * 100) >= 33 && parseInt(item.fat * 100) <= 35) {
                    item.fatLevelTitle = '偏胖';
                } else if (parseInt(item.fat * 100) > 35) {
                    item.fatLevelTitle = '肥胖';
                }

            }

        }


        //内脏脂肪
        if (parseInt(item.visceralFat) >= 1 && parseInt(item.visceralFat) <= 4) {
            item.fatWeightTitle = '健康型';
        } else if (parseInt(item.visceralFat) >= 5 && parseInt(item.visceralFat) <= 9) {
            item.fatWeightTitle = '警示型';
        } else if (parseInt(item.visceralFat) >= 10 && parseInt(item.visceralFat) <= 14) {
            item.fatWeightTitle = '危险型';
        } else if (parseInt(item.visceralFat) > 14) {
            item.fatWeightTitle = '极度危险';
        }


        //蛋白质
        if (item.protein <= 16) {
            item.proteinTitle = '偏低';
        } else if (item.protein > 16 && item.protein <= 19) {
            item.proteinTitle = '正常';
        } else if (item.protein > 19) {
            item.proteinTitle = '偏高';
        }

        if (sex == 1) {
            //水份
            if (age <= 30) {

                if ((item.water * 100).toFixed(1) < 37.8) {
                    item.waterTitle = '胖';
                } else if ((item.water * 100).toFixed(1) >= 37.8 && (item.water * 100).toFixed(1) <= 50.1) {
                    item.waterTitle = '胖';
                } else if ((item.water * 100).toFixed(1) >= 50.2 && (item.water * 100).toFixed(1) <= 53.5) {
                    item.waterTitle = '偏胖';
                } else if ((item.water * 100).toFixed(1) >= 53.6 && (item.water * 100).toFixed(1) <= 57.0) {
                    item.waterTitle = '标准';
                } else if ((item.water * 100).toFixed(1) >= 57.1 && (item.water * 100).toFixed(1) <= 60.4) {
                    item.waterTitle = '偏瘦';
                } else if ((item.water * 100).toFixed(1) >= 60.5 && (item.water * 100).toFixed(1) <= 66.0) {
                    item.waterTitle = '瘦';
                } else if ((item.water * 100).toFixed(1) > 66.0) {
                    item.waterTitle = '瘦';
                }

            } else if (age > 30) {

                if ((item.water * 100).toFixed(1) < 37.8) {
                    item.waterTitle = '胖';
                } else if ((item.water * 100).toFixed(1) >= 37.8 && (item.water * 100).toFixed(1) <= 48.7) {
                    item.waterTitle = '胖';
                } else if ((item.water * 100).toFixed(1) >= 48.8 && (item.water * 100).toFixed(1) <= 52.5) {
                    item.waterTitle = '偏胖';
                } else if ((item.water * 100).toFixed(1) >= 52.3 && (item.water * 100).toFixed(1) <= 55.6) {
                    item.waterTitle = '标准';
                } else if ((item.water * 100).toFixed(1) >= 55.7 && (item.water * 100).toFixed(1) <= 59.0) {
                    item.waterTitle = '偏瘦';
                } else if ((item.water * 100).toFixed(1) >= 59.1 && (item.water * 100).toFixed(1) <= 66.0) {
                    item.waterTitle = '瘦';
                } else if ((item.water * 100).toFixed(1) > 66.0) {
                    item.waterTitle = '瘦';
                }

            }


            //骨量
            if (age <= 55) {
                if (item.bon <= 2.16) {
                    item.bonTitle = '偏低';
                } else if (item.bon > 2.16 && item.bon <= 2.64) {
                    item.bonTitle = '标准';
                } else if (item.bon > 2.64) {
                    item.bonTitle = '偏高';
                }
            } else if (age > 55 && age <= 75) {
                if (item.bon <= 2.52) {
                    item.bonTitle = '偏低';
                } else if (item.bon > 2.52 && item.bon <= 3.08) {
                    item.bonTitle = '标准';
                } else if (item.bon > 3.08) {
                    item.bonTitle = '偏高';
                }
            } else if (age > 75) {
                if (item.bon <= 2.79) {
                    item.bonTitle = '偏低';
                } else if (item.bon > 2.79 && item.bon <= 3.41) {
                    item.bonTitle = '标准';
                } else if (item.bon > 3.41) {
                    item.bonTitle = '偏高';
                }
            }

            //肌肉率
            if (item.muscle <= 30) {
                item.muscleTitle = '低';
            } else if (item.muscle >= 31 && item.muscle <= 34) {
                item.muscleTitle = '标准';
            } else if (item.muscle >= 35 && item.muscle <= 38) {
                item.muscleTitle = '偏高';
            } else if (item.muscle >= 39) {
                item.muscleTitle = '高';
            }


        } else if (sex == 2) {

            //水份
            if (age <= 30) {

                if ((item.water * 100).toFixed(1) < 37.8) {
                    item.waterTitle = '胖';
                } else if ((item.water * 100).toFixed(1) >= 37.8 && (item.water * 100).toFixed(1) <= 46.0) {
                    item.waterTitle = '胖';
                } else if ((item.water * 100).toFixed(1) >= 46.1 && (item.water * 100).toFixed(1) <= 49.4) {
                    item.waterTitle = '偏胖';
                } else if ((item.water * 100).toFixed(1) >= 49.5 && (item.water * 100).toFixed(1) <= 52.9) {
                    item.waterTitle = '标准';
                } else if ((item.water * 100).toFixed(1) >= 53.0 && (item.water * 100).toFixed(1) <= 56.3) {
                    item.waterTitle = '偏瘦';
                } else if ((item.water * 100).toFixed(1) >= 56.4 && (item.water * 100).toFixed(1) <= 66.0) {
                    item.waterTitle = '瘦';
                } else if ((item.water * 100).toFixed(1) > 66.0) {
                    item.waterTitle = '瘦';
                }

            } else if (age > 30) {
                if ((item.water * 100).toFixed(1) < 37.8) {
                    item.waterTitle = '胖';
                } else if ((item.water * 100).toFixed(1) >= 37.8 && (item.water * 100).toFixed(1) <= 44.6) {
                    item.waterTitle = '胖';
                } else if ((item.water * 100).toFixed(1) >= 44.7 && (item.water * 100).toFixed(1) <= 48.0) {
                    item.waterTitle = '偏胖';
                } else if ((item.water * 100).toFixed(1) >= 48.1 && (item.water * 100).toFixed(1) <= 51.5) {
                    item.waterTitle = '标准';
                } else if ((item.water * 100).toFixed(1) >= 51.6 && (item.water * 100).toFixed(1) <= 54.9) {
                    item.waterTitle = '偏瘦';
                } else if ((item.water * 100).toFixed(1) >= 55.0 && (item.water * 100).toFixed(1) <= 66.0) {
                    item.waterTitle = '瘦';
                } else if ((item.water * 100).toFixed(1) > 66.0) {
                    item.waterTitle = '瘦';
                }

            }



            //骨量
            if (age <= 40) {
                if (item.bon <= 1.53) {
                    item.bonTitle = '偏低';
                } else if (item.bon > 1.53 && item.bon <= 1.87) {
                    item.bonTitle = '标准';
                } else if (item.bon > 1.87) {
                    item.bonTitle = '偏高';
                }
            } else if (age > 40 && age <= 60) {
                if (item.bon <= 1.89) {
                    item.bonTitle = '偏低';
                } else if (item.bon > 1.89 && item.bon <= 2.31) {
                    item.bonTitle = '标准';
                } else if (item.bon > 2.31) {
                    item.bonTitle = '偏高';
                }
            } else if (age > 60) {
                if (item.bon <= 2.16) {
                    item.bonTitle = '偏低';
                } else if (item.bon > 2.16 && item.bon <= 2.64) {
                    item.bonTitle = '标准';
                } else if (item.bon > 2.64) {
                    item.bonTitle = '偏高';
                }
            }

            //肌肉率
            if (item.muscle <= 25) {
                item.muscleTitle = '低';
            } else if (item.muscle > 25 && item.muscle <= 27) {
                item.muscleTitle = '标准';
            } else if (item.muscle >= 28 && item.muscle <= 29) {
                item.muscleTitle = '偏高';
            } else if (item.muscle >= 30) {
                item.muscleTitle = '高';
            }


        }
        //脂肪率
        if (age <= 30) {
            if (sex == 1) {
                if ((item.fat * 100) < 5.0) {
                    item.fatRateTitle = '瘦';
                } else if ((item.fat * 100) >= 5.0 && (item.fat * 100) <= 12.0) {
                    item.fatRateTitle = '瘦';
                } else if ((item.fat * 100) >= 12.1 && (item.fat * 100) <= 17.0) {
                    item.fatRateTitle = '偏瘦';
                } else if ((item.fat * 100) >= 17.1 && (item.fat * 100) <= 22.0) {
                    item.fatRateTitle = '标准';
                } else if ((item.fat * 100) >= 22.1 && (item.fat * 100) <= 27.0) {
                    item.fatRateTitle = '偏胖';
                } else if ((item.fat * 100) > 27.0) {
                    item.fatRateTitle = '偏胖';
                }
            } else if (sex == 2) {
                if ((item.fat * 100) < 5) {
                    item.fatRateTitle = '瘦';
                } else if ((item.fat * 100) >= 5.0 && (item.fat * 100) <= 18.0) {
                    item.fatRateTitle = '瘦';
                } else if ((item.fat * 100) >= 18.1 && (item.fat * 100) <= 23.0) {
                    item.fatRateTitle = '偏瘦';
                } else if ((item.fat * 100) >= 13.1 && (item.fat * 100) <= 28.0) {
                    item.fatRateTitle = '标准';
                } else if ((item.fat * 100) >= 28.1 && (item.fat * 100) <= 33.0) {
                    item.fatRateTitle = '偏胖';
                } else if ((item.fat * 100) >= 33.1 && (item.fat * 100) <= 45.0) {
                    item.fatRateTitle = '胖';
                } else if ((item.fat * 100) > 45.0) {
                    item.fatRateTitle = '胖';
                }
            }

        } else if (age > 30) {

            if (sex == 1) {
                if ((item.fat * 100) < 5.0) {
                    item.fatRateTitle = '瘦';
                } else if ((item.fat * 100) >= 5.0 && (item.fat * 100) <= 14.0) {
                    item.fatRateTitle = '瘦';
                } else if ((item.fat * 100) >= 14.1 && (item.fat * 100) <= 19.0) {
                    item.fatRateTitle = '偏瘦';
                } else if ((item.fat * 100) >= 19.1 && (item.fat * 100) <= 24.0) {
                    item.fatRateTitle = '标准';
                } else if ((item.fat * 100) >= 24.1 && (item.fat * 100) <= 29.0) {
                    item.fatRateTitle = '偏胖';
                } else if ((item.fat * 100) >= 29.1 && (item.fat * 100) <= 45.0) {
                    item.fatRateTitle = '胖';
                } else if ((item.fat * 100) > 45.0) {
                    item.fatRateTitle = '胖';
                }
            } else if (sex == 2) {
                if ((item.fat * 100) < 5.0) {
                    item.fatRateTitle = '瘦';
                } else if ((item.fat * 100) >= 5.0 && (item.fat * 100) <= 20.0) {
                    item.fatRateTitle = '瘦';
                } else if ((item.fat * 100) >= 20.1 && (item.fat * 100) <= 25.0) {
                    item.fatRateTitle = '偏瘦';
                } else if ((item.fat * 100) >= 25.1 && (item.fat * 100) <= 30.0) {
                    item.fatRateTitle = '标准';
                } else if ((item.fat * 100) >= 30.1 && (item.fat * 100) <= 35.0) {
                    item.fatRateTitle = '偏胖';
                } else if ((item.fat * 100) >= 35.1 && (item.fat * 100) <= 45.0) {
                    item.fatRateTitle = '胖';
                } else if ((item.fat * 100) > 45.0) {
                    item.fatRateTitle = '胖';
                }
            }

        }

        // 脂肪重量
        var max, min;
        if (sex == 1) {

            min = (Height - 105) * (1 - 0.1) * .15;

            max = (Height - 105) * (1 + 0.1) * .20;

            if (item.fatWeight < min) {
                item.fatWeightText = '偏低'
            } else if (item.fatWeight > max) {
                item.fatWeightText = '偏高'
            } else {
                item.fatWeightText = '正常'
            }

        } else if (sex == 2) {

            min = (Height - 110) * (1 - .10) * .20;

            max = (Height - 110) * (1 + .10) * .30;

            if (item.fatWeight < min) {
                item.fatWeightText = '偏低'
            } else if (item.fatWeight > max) {
                item.fatWeightText = '偏高'
            } else {
                item.fatWeightText = '正常'
            }

        }
        //体型分数
        var fatN, muscleN, visceralFatN, bodyYearN, bmrN, bmiN;

        //体脂
        if (item.fatRateTitle == '偏瘦' || item.fatRateTitle == '偏胖') {
            fatN = (-2);
        } else if (item.fatRateTitle == '瘦' || item.fatRateTitle == '胖') {
            fatN = (-4);
        } else {
            fatN = 0;
        }

        //肌肉率
        if (item.muscleTitle == '低') {
            muscleN = (-4);
        } else if (item.muscleTitle == '标准') {
            muscleN = 2;
        } else if (item.muscleTitle == '偏高') {
            muscleN = 4;
        } else if (item.muscleTitle == '高') {
            muscleN = 6;
        }
        //内脏脂肪

        if (item.fatWeightTitle == '警示型') {
            visceralFatN = (-2);
        } else if (item.fatWeightTitle == '危险型') {
            visceralFatN = (-4);
        } else if (item.fatWeightTitle == '极度危险') {
            visceralFatN = (-6);
        }

        //身体年龄
        if (item.bodyAge > age) {
            bodyYearN = (-2);
        } else {
            bodyYearN = 2;
        }

        //基础代谢率
        if (sex == 1) {
            if (age >= 1 && age <= 2) {
                if (item.bmr < 700) {
                    bmrN = (-2);
                } else {
                    bmrN = 0;
                }
            } else if (age >= 3 && age <= 5) {
                if (item.bmr < 900) {
                    bmrN = (-2);
                } else {
                    bmrN = 0;
                }
            } else if (age >= 6 && age <= 8) {
                if (item.bmr < 1090) {
                    bmrN = (-2);
                } else {
                    bmrN = 0;
                }
            } else if (age >= 9 && age <= 11) {
                if (item.bmr < 1290) {
                    bmrN = (-2);
                } else {
                    bmrN = 0;
                }
            } else if (age >= 12 && age <= 14) {
                if (item.bmr < 1480) {
                    bmrN = (-2);
                } else {
                    bmrN = 0;
                }
            } else if (age >= 15 && age <= 17) {
                if (item.bmr < 1610) {
                    bmrN = (-2);
                } else {
                    bmrN = 0;
                }
            } else if (age >= 18 && age <= 29) {
                if (item.bmr < 1550) {
                    bmrN = (-2);
                } else {
                    bmrN = 0;
                }
            } else if (age >= 30 && age <= 49) {
                if (item.bmr < 1500) {
                    bmrN = (-2);
                } else {
                    bmrN = 0;
                }
            } else if (age >= 50 && age <= 69) {
                if (item.bmr < 1350) {
                    bmrN = (-2);
                } else {
                    bmrN = 0;
                }
            } else if (age > 70) {
                if (item.bmr < 1220) {
                    bmrN = (-2);
                } else {
                    bmrN = 0;
                }
            }
        } else if (sex == 2) {

            if (age >= 1 && age <= 2) {
                if (item.bmr < 700) {
                    bmrN = (-2);
                } else {
                    bmrN = 0;
                }
            } else if (age >= 3 && age <= 5) {
                if (item.bmr < 860) {
                    bmrN = (-2);
                } else {
                    bmrN = 0;
                }
            } else if (age >= 6 && age <= 8) {
                if (item.bmr < 1000) {
                    bmrN = (-2);
                } else {
                    bmrN = 0;
                }
            } else if (age >= 9 && age <= 11) {
                if (item.bmr < 1180) {
                    bmrN = (-2);
                } else {
                    bmrN = 0;
                }
            } else if (age >= 12 && age <= 14) {
                if (item.bmr < 1340) {
                    bmrN = (-2);
                } else {
                    bmrN = 0;
                }
            } else if (age >= 15 && age <= 17) {
                if (item.bmr < 1300) {
                    bmrN = (-2);
                } else {
                    bmrN = 0;
                }
            } else if (age >= 18 && age <= 29) {
                if (item.bmr < 1210) {
                    bmrN = (-2);
                } else {
                    bmrN = 0;
                }
            } else if (age >= 30 && age <= 49) {
                if (item.bmr < 1170) {
                    bmrN = (-2);
                } else {
                    bmrN = 0;
                }
            } else if (age >= 50 && age <= 69) {
                if (item.bmr < 1110) {
                    bmrN = (-2);
                } else {
                    bmrN = 0;
                }
            } else if (age > 70) {
                if (item.bmr < 1010) {
                    bmrN = (-2);
                } else {
                    bmrN = 0;
                }
            }

        }

        item.BMI = bmi.toMathBmi(currentWeight, Height); //计算BMI值
        item.bodyTypeChinese = bmi.getBodyTypeChinese(item.BMI.bmi);

        //BMI值
        if (item.BMI.bmi < 18.5) {
            bmiN = (-2);
        } else if (item.BMI.bmi >= 18.5 && item.BMI.bmi <= 23.9) {
            bmiN = 0;
        } else if (item.BMI.bmi >= 24 && item.BMI.bmi < 26) {
            bmiN = (-2);
        } else if (item.BMI.bmi >= 26 && item.BMI.bmi < 28) {
            bmiN = (-4);
        } else if (item.BMI.bmi >= 28) {
            bmiN = (-6);
        }


        item.bodyTypeNum = 82 + fatN + muscleN + visceralFatN + bodyYearN + bmrN + bmiN;

        if (item.bodyTypeNum <= 60) {

            item.bodyTypeTitle = '危险性';

        } else if (item.bodyTypeNum > 60 && item.bodyTypeNum < 70) {

            item.bodyTypeTitle = '肥胖型';

        } else if (item.bodyTypeNum >= 70 && item.bodyTypeNum <= 78) {

            if (sex == 1) {

                var standardWeight = (Height - 105);


                if (parseFloat(currentWeight) > standardWeight) {
                    item.bodyTypeTitle = '微胖';
                } else if (parseFloat(currentWeight) <= standardWeight) {
                    item.bodyTypeTitle = '偏瘦';
                }

            } else if (sex == 2) {

                var standardWeight = (Height - 110);

                if (parseFloat(currentWeight) > standardWeight) {
                    item.bodyTypeTitle = '微胖';
                } else if (parseFloat(currentWeight) <= standardWeight) {
                    item.bodyTypeTitle = '偏瘦';
                }
            }
        } else if (item.bodyTypeNum > 78 && item.bodyTypeNum <= 90) {
            item.bodyTypeTitle = '健康型';
        } else if (item.bodyTypeNum >= 90) {
            item.bodyTypeTitle = '强壮型';
        }

        return item
    }

    exportsObj.when = function(cb, test, interval) {

        _a();
        function _a() {
            setTimeout(function() {
                if  (test()) {

                    cb();
                } else {
                    _a();
                }
            }, interval)
        }
    }
    return exportsObj;

});
