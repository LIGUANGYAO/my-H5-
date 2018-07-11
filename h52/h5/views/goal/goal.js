require(['jquery', 'Vue', 'FooterBar', 'common', 'api', 'datetimepicker', 'Swiper', 'iosSelect', 'bmi', 'Spin', 'echarts', 'PageLoad'], function($, Vue, FooterBar, common, api, datetimepicker, Swiper, iosSelect, bmi, Spin, echarts, PageLoad) {

    $(function() {

        var FooterBar_vue = FooterBar.init();
        var Spin_vue = Spin.init();
        var PageLoad_vue = PageLoad.init();

        // settimeout 防止页面假死
        setTimeout(function() {
            new Vue({
                el: '#app',
                data: {
                    cur: 'card',
                    test: '',
                    today: '',
                    showModifyDlg: false,
                    hasGoal: false,
                    profile: {},
                    articalList: [],
                    recently: {
                        bmiArry: [],
                        fatArry: [],
                        weightArry: [],
                        dateArry: []
                    },
                    chartsOption: {},
                    articalPageNum: 1,
                    preventArtical: false,
                    progress: 0,
                    progress2: 0,
                    weightProgress: 0,
                    isAddWeight: false,
                    cavansWeight: 0,
                    manageData: {
                        vo: {}
                    },
                    selectedWeight: 0,
                    selectedDays: 0,
                    toThin: false,
                    toFat: false,
                    showTip: false,
                    currentWeight: 0,
                    startDate: '',
                    endDate: '',
                    todayDone: false,
                    reportData: {
                        BMI: {}
                    },
                    calorie: 0,
                    bmiLeft: 0,
                    bmiPhoto: '',
                    reportList: [],
                    reportCount: 0,
                    todayGold: 0,
                    goalLoaded: false,
                    reportLoaded: false,

                    adImgeData1: [],
                    adImgeData2: [],
                    adImgeData3: [],

                    adImgeData4: [],
                    adImgeData5: [],
                    adImgeData6: [],

                    showModal: false,
                    showGoalModal: false,
                    initedSwiper: [],
                    weightArr: [],
                    stageArr: [],
                    targetMinWeight: '',
                    registeredData: {
                        height: 170
                    }
                },
                components: {
                    'spin': Spin_vue,
                    'footer-bar': FooterBar_vue,
                    'page-load': PageLoad_vue
                },
                created: function() {

                },
                mounted: function() {
                    var _this = this;


                    var today = new Date();
                    var year = today.getFullYear();
                    var month = today.getMonth() + 1;
                    var day = today.getDate();

                    if (month < 10) {
                        month = '0' + month;
                    }

                    if (day < 10) {
                        day = '0' + day;
                    }

                    today = year + '-' + month + '-' + day;

                    _this.today = today;

                    $('.calendar').datetimepicker({
                        inline: true,
                        locale: 'zh-cn'
                    }).on("dp.update", function(e) {
                        $('.day').wrapInner('<span>')
                        _this.setCalendar()
                    });

                    $('.day').wrapInner('<span>')

                    this.tab(sessionStorage.page || this.cur);
                    sessionStorage.page = ''

                    $('.goal.modal').on('click', ' .row span', function(e) {
                        $('.goal.modal span').removeClass('active')
                        $(this).addClass('active')
                    });

                    

                    this.getProfile(function() {
                        _this.getManage(function() {
                            // _this.weightProgress = 70;
                            _this.drawCanvas(_this.weightProgress / 100)

                            // _this.getSign()

                            _this.getTargetHealRepoArtis()
                            _this.getWeight()

                            
                        });


                        _this.getReportList()

                        setTimeout(function() {

                            _this.getWeightAll();
                        }, 200)

                    })

                    this.getAdvertising()


                    this.swiperInit("#swiper-container4");

                    if (this.historyWeightLength) {

                        setTimeout(function() {

                            _this.initCharts();
                        }, 200)
                    }
                },
                methods: {
                    tab: function(name) {
                        this.cur = name;
                        var _this = this;
                        if (name == 'goal') {


                            // document.title = '目标管理'
                        } else if (name == 'card') {
                            this.swiperInit("#swiper-container1", 2000);
                            this.swiperInit("#swiper-container2", 4000);
                            this.swiperInit("#swiper-container3", 6000);

                            // document.title = '称重打卡'
                        } else if (name == 'report') {
                            this.swiperInit("#swiper-container5", 2000);
                            this.swiperInit("#swiper-container6", 4000);

                            // document.title = '健康报表'
                        }
                    },
                    closeModal: function() {

                        this.hmt('目标页','关闭打卡按钮');
                        this.showModal = false
                        this.showGoalModal = false

                        if (this.today >= this.manageData.vo.endDate) {
                            this.showModifyDlg = true;
                        }
                    },
                    // 取消对话框
                    cancelDlg: function() {
                        this.showModifyDlg = false;
                    },
                    confirm: function() {
                        sessionStorage.goalFromMy = true;
                        common.linkTo('../goal/goal.html')
                    },
                    drawCanvas: function(s) {
                        // s = .7
                        var n = window.innerWidth / 750;

                        var c1 = this.$refs.c1;
                        c1.width = 320;
                        c1.height = 320;
                        var width = c1.width;
                        var height = c1.height;
                        var ctx = c1.getContext('2d');

                        var image1 = new Image();
                        image1.src = '/assets/images/goal/cavans1.png';

                        image1.onload = function() {

                            ctx.drawImage(image1, 0, 0, 320, 320, 0,0,width, height)
                            


                            ctx.globalCompositeOperation = 'destination-out'
                            ctx.lineWidth = 2;

                            // ctx.arc(160, 160, 120, Math.PI / 2 , Math.PI /2 + (Math.PI * 2) );

                            // ctx.arc(160, 160, 160, Math.PI / 2 , Math.PI /2 + (Math.PI * 2) );

                            // ctx.stroke()

                            var lineWidth = 40;

                            ctx.lineWidth = lineWidth;
                            ctx.lineCap = 'round'
                            ctx.globalCompositeOperation = 'destination-out'



setTimeout(function() {
                            var h =setInterval(function() {
                                draw();

                                if (n2 >= s) {
                                    clearInterval(h)
                                }
                            }, 10);
                        }, 500);
                        }
                        
                        var c2 = this.$refs.c2;
                        c2.width = 320;
                        c2.height = 320;
                        var ctx2 = c2.getContext('2d');
                        ctx2.imageSmoothingEnabled = true;

                        var image2 = new Image();
                        image2.src = '/assets/images/goal/cavans2.png';

                        var n1 = s / 50;
                        var n2 = 0;
                        image2.onload = function() {

                            ctx2.drawImage(image2, 0, 0, 320, 320, 0,0,width, height)


                        }

                        function draw(a) {
                            n2 += n1
                            ctx.globalCompositeOperation = 'destination-out'
                            ctx.moveTo(160, 320)
                            ctx.lineCap = 'round'
                            ctx.arc(160, 160, 140, Math.PI / 2 , Math.PI /2 + (Math.PI * 2) * n2);

                            // console.log(n2)

                            ctx.stroke()                            
                        }
                    },
                    setCalendar: function() {
                        var days = $('.calendar [data-day]');
                        days.removeClass('stage').removeClass('done')
                        var _this = this;
                        days.each(function(i, day) {

                            var d = $(day).data('day');

                            if (d >= _this.startDate && d <= _this.endDate) {
                                $(day).addClass('stage');

                                // _this.test = 'test'
                            }
                        });




                        for (var i = 0; i < _this.signs.length; i++) {

                            if (_this.today == _this.signs[i].endDate) {
                                _this.todayDone = true;
                            }
                            var d = _this.signs[i].endDate.replace(/-/g, '/');

                            $('.calendar [data-day="' + d + '"]').addClass('done');
                        }

                        $('.calendar .today span').text('今')

                    },

                    getTargetHealRepoArtis: function() {
                        var _this = this;

                        var data = {
                            _p: common.getRequest()._p,
                            targetType: this.manageData.vo.targetType,
                            gender: this.profile.gender,
                            femaleType: this.profile.femaleType,
                            pageSize: 5,
                            pageNum: this.articalPageNum++
                        }
                        $.ajax({
                            type: 'GET',
                            url: api.targetHealRepoArtis + '?' + $.param(data),
                            dataType: 'json',
                            success: function(res) {
                                var data = res.result.data || [];
                                _this.articalList = _this.articalList


                                if (data.length < 5 || _this.articalPageNum > 3) {
                                    _this.preventArtical = true;
                                }

                                if (_this.articalPageNum > 3) {
                                    data = data.slice(0, 2);
                                }
                                if (data && data.length) {

                                    _this.articalList = _this.articalList.concat(data);
                                }
                            }
                        })
                    },
                    onArticalScroll: function() {
                        this.getTargetHealRepoArtis()
                    },
                    getManage: function(cb) {
                        var _this = this;

                        var data = {
                            unionid: this.profile.unionid
                        }
                        $.ajax({
                            type: 'GET',
                            url: api.getManagementid + '?' + $.param(data),
                            dataType: 'json',
                            success: function(res) {
                                // res.vo = null;
                                res.vo = res.vo || {}
                                // res.vo.targetWeight = NaN;
                                _this.manageData = res;
                                // res.cardCount = 28;
                                setTimeout(function() {

                                    _this.progress = parseInt(res.cardCount / res.vo.days * 100) || '';

                                    _this.progress2 = _this.progress;
                                    if (_this.progress < 12) {
                                        _this.progress2 = 12;
                                    }
                                    if (_this.progress > 95) {
                                        _this.progress2 = 95;
                                    }
                                }, 0)

                                _this.selectedDays = res.vo.days || 14;

                                if (!res.vo.targetWeight) {
                                    _this.selectedWeight = ''
                                } else {
                                    _this.selectedWeight = (res.vo.targetWeight * 2).toFixed(0) || (res.currentWeight * 2).toFixed(0);
                                }

                                if (sessionStorage.goalFromMy) {
                                    _this.showGoalModal = true;

                                    sessionStorage.goalFromMy = '';
                                } else {
                                    _this.showGoalModal = !res.vo.targetWeight
                                }

                                _this.hasGoal = !!res.vo.targetWeight
                                // res.currentWeight = 60;

                                if (res.currentWeight < res.vo.currentWeight) {
                                    _this.isAddWeight = false;
                                    _this.cavansWeight = (res.vo.currentWeight - res.currentWeight)
                                    _this.weightProgress = (res.vo.currentWeight - res.currentWeight) / (res.vo.currentWeight - res.vo.targetWeight) * 100;

                                    if (_this.weightProgress < 0) {
                                        _this.weightProgress = 0;
                                    }
                                    if (_this.weightProgress > 100) {
                                        _this.weightProgress = 100;
                                    }

                                    _this.cavansWeight = res.vo.currentWeight - res.currentWeight;


                                } else {
                                    _this.isAddWeight = true;

                                    _this.weightProgress = (res.currentWeight - res.vo.currentWeight) / (res.vo.targetWeight - res.vo.currentWeight) * 100;

                                    if (_this.weightProgress < 0) {
                                        _this.weightProgress = 0;

                                    }
                                    if (_this.weightProgress > 100) {
                                        _this.weightProgress = 100;
                                    }

                                    _this.cavansWeight = res.currentWeight - res.vo.currentWeight
                                }
                                
                                console.log(_this.weightProgress )
                                _this.currentWeight = (res.currentWeight * 2).toFixed(1);

                                if ((res.vo.targetWeight * 2).toFixed(0) - 0 > _this.currentWeight - 0) {
                                    _this.toThin = true;
                                    _this.toFat = false;
                                } else if ((res.vo.targetWeight * 2).toFixed(0) - 0 <= _this.currentWeight - 5) {
                                    _this.toFat = true;
                                    _this.toThin = false;
                                } else {
                                    _this.toFat = false;
                                    _this.toThin = false;
                                }
                                $('.goal.modal [code]').removeClass('active')
                                $('.goal.modal [code=' + res.vo.targetType + ']').addClass('active');

                                if (res.vo.startDate)
                                    _this.startDate = res.vo.startDate.replace(/-/g, '/');
                                _this.startDate2 = res.vo.startDate

                                if (res.vo.endDate)
                                    _this.endDate = res.vo.endDate.replace(/-/g, '/');
                                _this.endDate2 = res.vo.endDate;


                                _this.goalLoaded = true;

                                cb && cb()

                            },
                            error: function() {}
                        })
                    },
                    // 实验室列表
                    getReportList: function() {

                        var data = {
                            _p: common.getRequest()._p
                        }

                        var _this = this;
                        $.ajax({
                            type: 'POST',
                            url: api.reportList + '?' + $.param(data),
                            dataType: 'json',
                            success: function(res) {
                                _this.reportList = res.result.data || [];

                                _this.reportList = _this.reportList.slice(0, 2)

                                _this.reportCount = res.result.count;
                            },
                            error: function() {}
                        })
                    },
                    hmt: function(a, b) {
                         var x = ['_trackEvent',"目标管理",a,b || ''];
                         console.log(x)
                        _hmt.push(x);
                    },
                    toReport: function() {
                        this.hmt('目标页','健康报表 更多');
                        common.linkTo('../report/report.html');
                    },
                    toHistory: function() {
                        this.hmt('目标页','健康指标 更多（称重历史）');
                        common.linkTo('../my/trend.html');
                    },

                    toReportDetail: function(id, reportId) {
                        common.linkTo2('../report/detail.html', null, 'id=' + id + '&reportId=' + reportId);
                    },

                    toKnowledge: function() {
                        this.hmt('目标页','猜你喜欢 更多');
                        common.linkTo('../knowledge/knowledge.html');
                    },
                    //获取点击广告次数
                    getAdCount:function(adid,spaceid,adTitle, index, page){
                        $.ajax({
                            type: 'POST',
                            url: api.getAdCount + '?_p=' + common.getRequest()._p,
                            data:{
                                adId:adid,
                                spaceId:spaceid,
                                clickTime:common.getDate()
                            },
                            success: function(res){
                                var resData= JSON.parse(res);
                              if(resData.result.status==0){
                                    var arr = ['_trackEvent','目标', page + index,adTitle]
                                    _hmt.push(arr);

                                    console.log(arr)
                              }else{

                              }
                            },
                            error: function() {

                            }

                        })

                    },
                    toArtical: function(id) {

                        sessionStorage.artical = id;
                        common.linkTo2('../knowledge/artical.html', null);


                    },

                    getProfile: function(cb) {
                        var data = {
                            _p: common.getRequest()._p
                        }

                        var _this = this;
                        $.ajax({
                            type: 'POST',
                            url: api.profile + '?' + $.param(data),
                            dataType: 'json',
                            success: function(res) {

                                _this.profile = res.result.data[0];

                                cb && cb()
                            },
                            error: function() {}
                        })
                    },
                    getSign: function(cb) {
                        var data = {
                            unionid: this.profile.unionid,
                            startDate: '2017-01-01'|| this.startDate2,
                            endDate: this.today
                        }

                        var _this = this;
                        $.ajax({
                            type: 'GET',
                            url: api.getsign + '?' + $.param(data),
                            dataType: 'json',
                            success: function(res) {

                                _this.signs = res;
                                _this.setCalendar()

                            },
                            error: function() {}
                        })
                    },
                    getWeight: function() {
                        var data = {
                            _p: common.getRequest()._p,
                            pageSize: 1,
                            pageNum: 2,
                            startTime: '2017-01-01 00:00:00'
                        }

                        var _this = this;
                        $.ajax({
                            type: 'GET',
                            url: api.weUserWeightAll + '?' + $.param(data),
                            dataType: 'json',
                            success: function(res) {
                                // res = JSON.parse(JSON.stringify(DATA));
                                if (res.result.data && res.result.data.length) {
                                    var item = res.result.data[0];


                                    common.computeFat(item, _this.profile, bmi)
                                    _this.reportData = item;

                                    var obj = {
                                        '偏瘦': 7,
                                        '正常': 31,
                                        '偏胖': 55,
                                        '肥胖': 77
                                    }

                                    var map1 = {
                                        '偏瘦': 'm1',
                                        '正常': 'm2',
                                        '偏胖': 'm3',
                                        '肥胖': 'm4'
                                    }

                                    var map2 = {
                                        '偏瘦': 'l1',
                                        '正常': 'l2',
                                        '偏胖': 'l3',
                                        '肥胖': 'l4'
                                    }
                                    _this.bmiLeft = obj[item.bodyTypeChinese]

                                    if (_this.profile.gender == 1) {

                                        _this.bmiPhoto = map1[item.bodyTypeChinese]
                                    } else {
                                        _this.bmiPhoto = map2[item.bodyTypeChinese]
                                    }

                                    _this.calorie = bmi.toBMR(_this.profile.gender, item.weight, _this.profile.height, _this.profile.age, _this.manageData.vo.targetType) || 0

                                    _this.reportLoaded = true;
                                }
                            }
                        })
                    },
                    //获取广告
                    getAdvertising: function() {
                        var _this = this;
                        var codes = ['goal_1',  'card_1', 'card_2', 'card_3', 'report_1', 'report_2'];
                        $.ajax({
                            type: 'POST',
                            url: api.getAdvertising + '?_p=' + common.getRequest()._p,
                            processData: false,
                            cache: false,
                            async: true,
                            'contentType': 'application/json',
                            data: JSON.stringify(codes),
                            success: function(res) {
                                _this.adImgeData = JSON.parse(res);

                                if (_this.adImgeData.result.data) {

                                    if (_this.adImgeData.result.data[0]) {
                                        if (_this.adImgeData.result.data[0][0]) {
                                            _this.adImgeData1 = _this.adImgeData.result.data[0]
                                            if (_this.adImgeData1.length > 1) {
                                            }
                                        }
                                    }

                                    if (_this.adImgeData.result.data[1]) {
                                        if (_this.adImgeData.result.data[1][0]) {
                                            _this.adImgeData2 = _this.adImgeData.result.data[1]
                                            if (_this.adImgeData2.length > 1) {
                                            }
                                        }
                                    }

                                    if (_this.adImgeData.result.data[2]) {
                                        if (_this.adImgeData.result.data[2][0]) {
                                            _this.adImgeData3 = _this.adImgeData.result.data[2]
                                            if (_this.adImgeData3.length > 1) {
                                            }
                                        }
                                    }

                                    if (_this.adImgeData.result.data[3]) {
                                        if (_this.adImgeData.result.data[3][0]) {
                                            _this.adImgeData4 = _this.adImgeData.result.data[3]
                                            if (_this.adImgeData4.length > 1) {
                                            }
                                        }
                                    }

                                    if (_this.adImgeData.result.data[4]) {
                                        if (_this.adImgeData.result.data[4][0]) {
                                            _this.adImgeData5 = _this.adImgeData.result.data[4]
                                            if (_this.adImgeData5.length > 1) {
                                            }
                                        }
                                    }

                                    if (_this.adImgeData.result.data[5]) {
                                        if (_this.adImgeData.result.data[5][0]) {
                                            _this.adImgeData6 = _this.adImgeData.result.data[5]
                                            if (_this.adImgeData6.length > 1) {
                                            }
                                        }
                                    }


                                    



                                }

                            }
                        })
                    },
                    confirmGoal: function() {
                        var code = $('.goal.modal .row span.active').attr('code');

                        if (this.toThin || this.toFat) {
                            if (!code) {
                                return common.showToastr('请选择类型')
                            }
                        }

                        if (!this.selectedWeight) {
                            return common.showToastr('请设置目标')
                        }
                        var data = {
                            _p: common.getRequest()._p,
                            unionid: this.profile.unionid,
                            days: this.selectedDays,
                            targetWeight: this.selectedWeight / 2,
                            currentWeight: this.manageData.currentWeight,
                            gender: this.profile.gender,
                            birthDate: this.profile.birthdate,
                            height: this.profile.height,
                            targetType: code || 1
                        }

                        var _this = this;
                        $.ajax({
                            type: 'POST',
                            url: api.adupWeightManagement + '?' + $.param(data),
                            dataType: 'json',
                            success: function(res) {
                                _this.showGoalModal = false;

                                if (!res) {
                                    return common.showToastr('操作失败')
                                }
                                common.showToastr('成功')
                                _this.getManage(function() {
                                    _this.getSign()

                                });
                                if (res === true) {


                                } else {
                                    // common.showToastr('出错了')
                                }

                            },
                            error: function() {}
                        })
                    },
                    showGoalModalClick: function() {
                        this.showGoalModal = true;

                        this.hmt('目标页','修改目标');
                    },
                    getWeightData: function() {
                        this.targetMinWeight = parseInt((this.registeredData.height - 80) * 0.7 * 0.9 * 0.8);
                        for (var i = this.targetMinWeight; i <= 400; i++) {
                            var data = {
                                id: i,
                                value: i + '斤'
                            }
                            this.weightArr.push(data);
                        }
                        return this.weightArr;
                    },
                    showWeight: function() {

                        this.hmt('完善目标','体重输入框');
                        var that = this;
                        new iosSelect(1, [this.getWeightData()], {
                            itemHeight: 50,
                            itemShowCount: 5,
                            oneLevelId: that.selectedWeight || (that.manageData.vo.targetWeight * 2).toFixed(0) || (that.manageData.currentWeight * 2).toFixed(0),
                            callback: function(obj) {
                                that.selectedWeight = obj.id;

                                if (that.selectedWeight - 0 > that.currentWeight - 0) {
                                    that.toThin = true;
                                    that.toFat = false;
                                    that.showTip = false;
                                    $('.goal.modal [code]').removeClass('active')
                                    $('.goal.modal [code=' + 3 + ']').addClass('active');
                                } else if (that.selectedWeight - 0 <= that.currentWeight - 5) {
                                    that.toFat = true;
                                    that.toThin = false;

                                    $('.goal.modal [code]').removeClass('active')
                                    $('.goal.modal [code=' + 5 + ']').addClass('active');

                                } else {
                                    that.toFat = false;
                                    that.toThin = false;
                                }

                                if (!that.toThin) {
                                    var stage = Math.ceil((that.currentWeight - that.selectedWeight )/ 4) * 14;

                                    that.selectedDays = stage;

                                    that.showTip = false;
                                }
                            }
                        });
                    },
                    getStageData: function() {
                        for (var i = 1; i * 14 <= 365; i++) {
                            var j = i * 14;
                            var data = {
                                id: j,
                                value: j + '天'
                            }
                            this.stageArr.push(data);
                        }
                        return this.stageArr;
                    },
                    showStage: function() {
                        this.hmt('完善目标','天数输入框');
                        var that = this;
                        new iosSelect(1, [this.getStageData()], {
                            itemHeight: 50,
                            itemShowCount: 5,
                            oneLevelId: that.selectedDays || that.manageData.vo.days || 14,
                            callback: function(obj) {
                                that.selectedDays = obj.id;

                                if ((that.currentWeight - that.selectedWeight) / (that.selectedDays / 7) > 2) {
                                    that.showTip = true;
                                } else {
                                    that.showTip = false;
                                }
                            }
                        });
                    },
                    //幻灯片广告
                    swiperInit: function(dom, time) {

                        if (this.initedSwiper.indexOf(dom) != -1) {
                            // return;
                        }

                        this.initedSwiper.push(dom)
                        var _this = this;

                        setTimeout(function() {
                            new Swiper(dom, {
                                direction: 'horizontal',
                                autoplay: time || 3000,
                                preventClicks: true,
                                preventClicksPropagation: true,
                                pagination: '.swiper-pagination'
                            });
                        }, 300)
                    },

                    addSign: function() {
                        this.showModal = true
                        var _this = this;

                        this.hmt('目标页','点击打卡按钮');
                        $.ajax({
                            type: 'post',
                            url: api.addsign,
                            data: {
                                unionid: _this.profile.unionid

                            },
                            async: false,
                            success: function(res) {
                                if (res) {
                                    _this.todayGold = res.todayGold

                                    _this.getManage(function() {
                                        _this.getSign()
                                    })
                                } else {

                                }
                            }
                        })
                    },

                    initCharts: function() {
                        var _this = this;

                        var max, min

                        //chartsData数据
                        var chartsData = {
                            date: null,
                            weight: null,
                            BMI: null,
                            fatNum: null
                        };

                        chartsData.weight = _this.recently.weightArry;
                        chartsData.BMI = _this.recently.bmiArry;
                        chartsData.fatNum = _this.recently.fatArry;

                        chartsData.date = _this.recently.dateArry;

                        _this.recently.bmiArry.sort(function(a, b) {
                            return a - b > 0
                        });

                        _this.recently.fatArry.sort(function(a, b) {
                            return a - b < 0
                        });

                        _this.recently.weightArry.sort(function(a, b) {
                            return a - b > 0
                        });
                        _this.recently.bmiArry.map(function(a, b) {
                            return a - b > 0
                        });

                        _this.recently.fatArry.map(function(a, b) {
                            return a - b < 0
                        });

                        _this.recently.weightArry = _this.recently.weightArry.map(function(a) {
                            return parseInt(a)
                        });

                        var maxBmi = _this.recently.bmiArry[0];
                        var minBmi = _this.recently.bmiArry[_this.recently.bmiArry.length - 1];

                        maxBmi = Math.max.apply(null, _this.recently.bmiArry)

                        var maxFat = _this.recently.fatArry[0];
                        var minFat = _this.recently.fatArry[_this.recently.fatArry.length - 1];

                        var maxWeigth = _this.recently.weightArry[0];
                        var minWeigth = _this.recently.weightArry[_this.recently.weightArry.length - 1];

                         maxWeigth = Math.max.apply(null, _this.recently.weightArry)


                        // var maxData = [maxBmi, maxFat, maxWeigth];

                        // var minData = [minBmi, minFat, minWeigth];

                        var maxData = [maxBmi,  maxWeigth];

                        var minData = [minBmi,  minWeigth];


                        // maxData.sort(function(a, b) {
                        //     return (a - b - 0) < 0
                        // });

                        // minData.sort(function(a, b) {
                        //     return a - b > 0
                        // })

                        // max = maxData[0];
                        // alert
                        max = Math.max.apply(null, maxData) + 50

                        min = minData[0];

                        // alert("最大值:" + max)
                        // alert("最小值:" + min)

                        //图表配置
                        _this.chartsOption = {
                            backgroundColor: '', //背景色
                            title: {
                                show: false
                            },
                            tooltip: {
                                trigger: 'axis',
                                axisPointer: {
                                    animation: true
                                }
                            },
                            legend: {
                                show: true,
                                x: 'center',
                                // itemHeight: 20,
                                data: [{
                                    name: '体重',
                                    icon: 'line'
                                }, {
                                    name: 'BMI',
                                    icon: 'line'
                                }]
                            },
                            grid: {
                                left: '0%',
                                right: '10%',
                                bottom: '0',
                                containLabel: true

                            },
                            xAxis: {
                                type: 'category',
                                boundaryGap: false,
                                axisLine: {
                                    lineStyle: {
                                        // color: 'rgba(142,142,147,1)'
                                    }
                                },

                                data: []
                            },
                            yAxis: {
                                show: false,
                                min: 0,
                                max: max
                                // type: 'value'
                            },
                            dataZoom: [{
                                type: 'inside',
                                start: 100,
                                end: 40,
                                show: false
                            }, {
                                show: false,
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
                                // smooth: false, //平滑过渡
                                // symbolSize: 10,
                                 // symbol: 'none', 
                                label: {
                                    normal: {
                                        show: true,
                                        color: '#04040f',
                                        formatter: function(params) {
                                            return (params.data - 100).toFixed(1) + '斤';
                                        }
                                    }
                                },
                                areaStyle: {
                                    normal: {
                                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                            offset: 0,
                                            color: '#fff1d8'
                                        }, {
                                            offset: 1,
                                            color: '#fff7e9'
                                        }])
                                    }
                                },

                                itemStyle: {
                                    normal: {
                                        color: '#f9860b'
                                    }
                                },
                                lineStyle: {
                                    normal: {
                                        width: 3
                                    }
                                }
                            }, {
                                name: 'BMI',
                                type: 'line',
                                data: [1, 1, 1, 1],
                                smooth: false, //平滑过渡
                                symbolSize: 10,
                                label: {
                                    normal: {
                                        show: true,
                                        color: '#04040f',
                                        formatter: function(params) {
                                            return (params.data - 50).toFixed(1);
                                        }
                                    }
                                },
                                areaStyle: {
                                    normal: {
                                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                            offset: 0,
                                            color: '#d9f7f2'
                                        }, {
                                            offset: 1,
                                            color: '#f1fefb'
                                        }])
                                    }
                                },
                                itemStyle: {
                                    normal: {
                                        color: '#89c997'
                                    }
                                },
                                lineStyle: {
                                    normal: {
                                        width: 3
                                    }
                                }
                            }],
                            animationEasing: 'elasticOut',
                            animationDelayUpdate: function(idx) {
                                return idx * 5;
                            }
                        };

                        var end = 100 - 100 * (5 / _this.historyWeightLength);


                        if (end > 88) {
                            end = 88;
                        } else if (end <= 0) {
                            end = 20;
                        }

                        _this.chartsOption.dataZoom[0].end = end;

                        _this.chartsOption.xAxis.data = chartsData.date;
                        _this.chartsOption.series[0].data = chartsData.weight;
                        _this.chartsOption.series[1].data = chartsData.BMI;
                        // _this.chartsOption.series[2].data = chartsData.fatNum;

                        var myChart = echarts.init($('#JS-echars')[0]);
                        myChart.setOption(_this.chartsOption);
                    },
                    //获取体重 脂肪率  BMI数据
                    getWeightAll: function() {

                        var _this = this;

                        var data = {
                            _p: common.getRequest()._p,
                            pageNum: 0,
                            pageSize: 7,
                            startTime: '2017-01-01 00:00:00'
                        }
                        $.ajax({
                            type: 'get',
                            url: api.weUserWeightAll + '?' + $.param(data),
                            async: true,
                            dataType: 'json',
                            success: function(res) {

                                if (res.result.data) {

                                    $("#weight-curve").fadeIn();

                                    res.result.data.sort(function(a, b) {
                                        return a.createTime - b.createTime
                                    });

                                    _this.historyWeightLength = res.result.data.length;

                                    for (var i = 0; i < res.result.data.length; i++) {
                                        _this.recently.bmiArry.push(parseFloat((res.result.data[i].bmi) + 50).toFixed(1));
                                        _this.recently.weightArry.push(parseFloat((res.result.data[i].weight * 2) + 100).toFixed(1));
                                        _this.recently.fatArry.push(parseFloat((res.result.data[i].fat * 100) + 100).toFixed(1));
                                        _this.recently.dateArry.push(  String(res.result.data[i].createTime).substr(4, 2) + '/' + String(res.result.data[i].createTime).substr(6, 2));
                                    }
                                    _this.initCharts();

                                } else {

                                    $("#weight-curve").hide();

                                }

                            }
                        })
                    }
                },
                filters: {
                    number: function(val, num, a) {
                        if (num == undefined) {
                            num = 1;
                        }
                        if (a == undefined) {
                            a = 2;
                        }
                        var r = (val * a).toFixed(num);

                        if (isNaN(r)) {
                            r = '';
                        }

                        if (r === "0.0")
                            r = 0;

                        return r;
                    },
                    formatDate: function(input) {
                        var d = new Date(input);
                        var year = d.getFullYear();
                        var month = (d.getMonth() + 1) < 10 ? '0' + (d.getMonth() + 1) : '' + (d.getMonth() + 1);
                        var day = d.getDate() < 10 ? '0' + d.getDate() : '' + d.getDate();
                        var hour = d.getHours();
                        var minutes = d.getMinutes();
                        var seconds = d.getSeconds();
                        return year + '/' + month + '/' + day;
                        // + ' ' + hour + ':' + minutes + ':' + seconds;
                    }
                }
            })
        }, 500)
    })

})