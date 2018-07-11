
require(['jquery', 'Vue', 'FooterBar', 'common', 'IScroll', 'iosSelect', 'echarts', 'api', 'bmi','Swiper','PageLoad'], function($, Vue, FooterBar, common, IScroll, iosSelect, echarts, api, bmi,Swiper,PageLoad) {

    $(function() {


    function globalSet(){
            $.ajaxSetup({
                timeout:4500,
                complete:function(xhr, textStatus){
                if(textStatus=="timeout"){
                    //如果超时就处理 ，指定要跳转的页面(比如登陆页)
                    xhr.abort();
                    console.log("加载超时");
                }
                },
                error:function(jqXHR, textStatus, errorMsg){
                    // jqXHR 是经过jQuery封装的XMLHttpRequest对象
                // textStatus 可能为： null、"timeout"、"error"、"abort"或"parsererror"
                // errorMsg 可能为： "Not Found"、"Internal Server Error"等
                common.linkTo2("../views/standby/wonderful.html");
                console.log('发送AJAX请求到"' + this.url + '"时出错[' + jqXHR.status + ']：' + errorMsg);
                }
            })
            }

        globalSet();
        
        var FooterBar_vue = FooterBar.init();
        var PageLoad_vue = PageLoad.init();
        var timesecond = new Date().getTime();
        // settimeout 防止页面假死
        setTimeout(function() {
            new Vue({
                el: '#app',
                data: {
                    statureArr: [],
                    openState: false,
                    chartsOption: null,
                    flag: 1,
                    modify: {
                        nickname: null,
                        sex: 2,
                        height: null,
                        year: null
                    },
                    unionid: null,
                    registered: null,
                    registeredData: {},
                    BMI: {},
                    BeauBody: {},
                    sexR: null,
                    homeData: {},
                    currentWeightData:null,
                    historyWeight: null,
                    historyWeightLength:null,
                    hotImgData: null,
                    bodyTypeChinese: null,
                    standardWeight: {},
                    adImgeData: {},
                    log: '',
                    bodyFat:{},
                    bodyFatStaus:null,
                    ohm:null,
                    ManagementVo:{},//体重管理
                    curentStamp:null,
                    adImgeData:null,
                    adImgeData1:null,
                    adImgeData2:null,
                    adImgeData3:null,
                    adImgeData4:null,
                    adImgeData5Staus:false,
                    loadstage:true,
                    handle:null,
                    d:0,
                    week:null,
                    month:null,
                    typeNum:null,
                    flags:false,
                    position:{
                        x: 0,
                        y: 0
                      },
                      nx:'', 
                      ny:'', 
                      dx:'',
                      dy:'', 
                      xPum:'',
                      yPum:'',
                      targetLinke:null,
                      pageLoad:false
                },
                components: {
                    'footer-bar': FooterBar_vue,
                    'page-load': PageLoad_vue
                },
                computed:{
                    styleWidth1:function(){
                        if(this.bodyTypeChinese=='偏瘦'){
                            return '10%';
                        }else if(this.bodyTypeChinese=='正常'){
                            return '40%';
                        }else if(this.bodyTypeChinese=='偏胖'){
                            return '60%';
                        }else if(this.bodyTypeChinese=='肥胖'){
                            return '80%';
                        } 
                    },
                    styleWidth2:function(){
                        if(this.bodyTypeChinese=='偏瘦'){
                            return '25%';
                        }else if(this.bodyTypeChinese=='正常'){
                            return '55%';
                        }else if(this.bodyTypeChinese=='偏胖'){
                            return '75%';
                        }else if(this.bodyTypeChinese=='肥胖'){
                            return '95%';
                        } 
                    }
                   
                },
                created: function() {

                    var _this = this;


                    var a = this.getDataFat();
                    var b = this.getProfile();
                    var c = this.getWeight();
                    var d = this.getWeightAll();


                    $.when(a,b, c,d).then(function(a,b, c,d) {

                        this.pageLoad = true;
 
                        this.BeauBody = bmi.BeauBody(this.registeredData.height, this.sexR); //计算美体体重
                        this.BMI = bmi.toMathBmi(this.homeData.currentWeight, this.registeredData.height); //计算BMI值
                        this.standardWeight = bmi.toMathSBW(this.sexR, this.registeredData.height); //计算标准体重
                        this.bodyTypeChinese = bmi.getBodyTypeChinese(this.BMI.bmi);

                        var BMIData = this.BMI.bmi;
                        setTimeout(function(){
                            _this.initCharts();//图表
                        },500)

                        
                        
                        //BMI值储存
                        if(typeof(Storage)!=="undefined"){
                            sessionStorage.BMIStorage = BMIData;
                        }

                        if (this.registeredData.height == null || this.registeredData.age == null||this.registeredData.gender == null) {
                            this.modify.height = 160;
                            this.modify.year = 19901010;
                            console.log("没注册")
                        }else{
                            console.log("注册");
                            this.generateReport();
                        }
 
                        var registBoon2 = this.registeredData.height==null || this.registeredData.age==null || this.registeredData.gender==null;


                        setTimeout(function(){

                            if(_this.ohm){

                                if(registBoon2){
                                    $(".registration-model-content").show();
                                }else{
                                    $(".registration-model-content").hide();
                                }

                            }
                            console.log("注册"+registBoon2);
                            console.log("体脂"+_this.ohm);

                        },2000)
                    }.bind(this))
                  
                },
                mounted: function() {
                    
                    var _this = this;
                    this.init();

                    this.getAdvertising();//广告加载


                     //当前时间的时间戳
                     var d = new Date();
                     this.curentStamp = d.getTime();
 
        
                    $(window).scroll(function() {
                        if (_this.flag === 0) {
                            _this.hotRecommended();
                         
                            _this.flag = -1;
                        } else {
                            _this.flag--;
                        }
                    });

                    $('html,body,#app').on('touchmove', function (event) {  
                        if (_this.flags) {  
                           event.preventDefault();  
                       }  
                   });

                   console.log("目标跳转："+_this.targetLinke);
                },
                methods: {
                    
                    init: function() {
                        var _this = this;
                        setTimeout(function() {
                            _this.linkTo();
                        }, 500)
                        this.statureSelect();
                        this.yearSelect();
                        
                    },
                    //修改性别
                    changeSex:function(sexNum){
                        this.modify.sex = sexNum;

                        console.log(this.modify.sex);
                    },
                    // 实现移动端拖拽
                    down:function(){
                        this.flags = true;
                        var touch;
                        if(event.touches){
                            touch = event.touches[0];
                        }else {
                            touch = event;
                        }
                        this.position.x = touch.clientX;
                        this.position.y = touch.clientY;
                        this.dx = document.getElementById("floatAd").offsetLeft;
                        this.dy = document.getElementById("floatAd").offsetTop;
                    },
                    move:function(){
                        
                        if(this.flags){
                          var touch ;
                          if(event.touches){
                              touch = event.touches[0];
                          }else {
                              touch = event;
                          }
                          this.nx = touch.clientX - this.position.x;
                          this.ny = touch.clientY - this.position.y;

                          this.xPum = this.dx+this.nx;
                          this.yPum = this.dy+this.ny;

                          if(this.xPum<0){
                            this.xPum = 0
                          }else if(this.xPum>$(window).width()-$("#floatAd").width()){
                            this.xPum = $(window).width()-$("#floatAd").width();
                          }

                          if(this.yPum>$(window).height()-$("#floatAd").height()){
                            this.yPum = $(window).height()-$("#floatAd").height();
                          }else if(this.yPum<0){
                            this.yPum = 0;
                          }

                          document.getElementById("floatAd").style.left= this.xPum+"px";
                          document.getElementById("floatAd").style.top= this.yPum +"px";

                        }
                      },
                      //鼠标释放时候的函数
                    end:function(){
                        this.flags = false;
                    },
                    //漂浮广告
                    getFloatAd:function(adLink){
                        var _this = this;
                        var URL = adLink;

                        // 获取节点  
                        $("#floatAd").bind("click",function(){
                            window.location.href= URL;
                        })  
                    },
                    drawImage2:function(){
                        var canvas = document.getElementById("myCanvas"); 
                        var ctx=canvas.getContext('2d'); 

                        if(canvas==null){
                            return false;
                        }

                        ctx.beginPath();

                        ctx.strokeStyle = "#f9f9fb";

                        var circle = {
                            x: 240, //圆心的x轴坐标值
                            y: 240, //圆心的y轴坐标值
                            r: 229 //圆的半径
                        };
                     
                        ctx.arc(circle.x, circle.y, circle.r, Math.PI *0.75,Math.PI *2.25, false);
                        ctx.lineWidth = 23;
                        ctx.stroke();

                    },
                    //仪表盘
                    drawImage:function(weight){
                        var _this = this;
                        
                        var img=new Image();
                        img.src="./assets/images/home/ctx.png";
                        
                        var canvas = document.getElementById("myCanvas"); 
                        var ctx=canvas.getContext('2d'); 

                        img.onload= function(){
                            ctx.drawImage(img,0,0,480,407);
                        }

                        $(".judgment").show();

                        setTimeout(function(){

                            clearInterval(_this.handle);
                            _this.handle = setInterval(function(){

                                if(canvas==null){
                                    return false;
                                }
                                ctx.beginPath();
                                // ctx.strokeStyle = "red";
                                var circle = {
                                    x: 240, //圆心的x轴坐标值
                                    y: 240, //圆心的y轴坐标值
                                    r: 229 //圆的半径
                                };
                                var speed = (weight - _this.d) / weight;
                                _this.d += (1 + speed * 20);

                                if(_this.d>=weight){
                                    clearInterval(_this.handle);
                                }else{
        
                                ctx.arc(circle.x, circle.y, circle.r, Math.PI *0.75, Math.PI *0.75+(_this.d * Math.PI) / 180, false);
                                ctx.lineWidth = 22;
                                ctx.globalCompositeOperation = 'destination-out'; 
                                ctx.stroke();
                               }

                            },50)
                        },200)
                    },
                    //幻灯片广告
                    swiperInit:function(dom){
                        var _this =this;
                       
                            setTimeout(function(){
                                new Swiper(dom, {
                                  direction:'horizontal',
                                  autoplay:3000,
                                  preventClicks:false,
                                  preventClicksPropagation:true,
                                  pagination:'.swiper-pagination'
                              });
                             },300)
                        
                          
                    },
                    generateReport: function() {
                        $.ajax({
                            type: 'POST',
                            url: api.generateReport,
                            cache:false,
                            data: {
                                _p: common.getRequest()._p
                            },
                            async: true,
                            success: function(res) {
                            }
                        })
                    },
                    //获取当前体重
                    getWeight: function() {
                        var _this = this;
                        return $.ajax({
                            type: 'get',
                            url: api.getHomeTopDate,
                            data: {
                                _p: common.getRequest()._p
                            },
                            async: true,
                            success: function(res) {
                                _this.homeData = res[0];

                                if(_this.homeData){
                                 
                                if(_this.homeData.currentWeight){

                                 _this.drawImage2();
                                 _this.drawImage((_this.homeData.currentWeight*2)-30);

                              }
                            }else{

                            }
                        },
                        error:function(){
                            _this.drawImage2();
                            _this.drawImage(0);
                        }
                        })
                    },
                    //切换
                    switchWeight:function(){
                        var _this = this;
                        this.getWeightAll(function(){
                            _this.initCharts();
                        });
                    },
                    //获取周、月体重
                    getWeightAll:function(){

                        var _this = this;
                        var data={
                            _p:common.getRequest()._p,

                        }
                       return $.ajax({
                            type:'get',
                            url:api.getWeightList+'?'+$.param(data),
                            async: true,
                            dataType: 'json',
                            success:function(res){
                            if(res.result.data){
                               if(res.result.data.length>0||res.result.data[0] !==undefined){
                                _this.historyWeight = res.result.data;
                                _this.historyWeightLength = res.result.data.length;
                               }else{
                                _this.historyWeight = [];
                                _this.historyWeightLength = 0;
                               }
                            }

                               
                            }
                        })
                    },
                   //获取体脂数据
                    getDataFat:function(){
                        var _this = this;
                       return $.ajax({
                        type:'get',
                        url:api.bodyFat,
                        async: true,
                        data:{
                            _p:common.getRequest()._p
                        },
                        dataType:'json',
                        success: function(res){
                            if(res.result.data){
                                if(res.result.data[0]!==null){

                                    _this.bodyFat = res.result.data[0];


                                     if(res.result.data[0].ohm){
                                        _this.ohm=true;
                                     }else{
                                        _this.ohm=false; 
                                     }

                                    if(_this.bodyFat.fat&& _this.bodyFat.water){
                                      //  _this.bodyFatStaus = false;
                                    }else{
                                       // _this.bodyFatStaus = true;
                                    }
                                    
                                }else{
                                   // _this.bodyFatStaus = true;
                                }
                            }else{
                               // _this.bodyFatStaus = true;
                            }
                           }
                        })
                    },
                    //获取点击广告次数
                    getAdCount:function(adid,spaceid,adTitle){
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
                                    console.log("点击成功"+adid+':'+spaceid+adTitle);
                                    _hmt.push(['_trackEvent','首页','首页广告',adTitle]);
                              }else{

                              }
                            }

                        })

                    },
                    //获取广告
                    getAdvertising: function() {
                        var _this = this;
                        var codes = ['index_1', 'index_2','index_3','index_4'];
                        $.ajax({
                            type: 'POST',
                            url: api.getAdvertising + '?_p=' + common.getRequest()._p,
                            processData: false,
                            cache:false,
                            async: true,
                            'contentType': 'application/json',
                            data: JSON.stringify(codes), 
                            success: function(res) {
                                _this.adImgeData = JSON.parse(res);

                                if (_this.adImgeData.result.data) {
                         
                                if(_this.adImgeData.result.data[0]){
                                    if(_this.adImgeData.result.data[0][0]){
                                       _this.adImgeData1 = _this.adImgeData.result.data[0]
                                       if(_this.adImgeData1.length>1){
                                           _this.swiperInit("#swiper-container1");
                                       }
                                    }
                                 }

                                if(_this.adImgeData.result.data[1]){
                                    if(_this.adImgeData.result.data[1][0]){
                                       _this.adImgeData2 = _this.adImgeData.result.data[1]
                                       if(_this.adImgeData2.length>1){
                                           _this.swiperInit("#swiper-container2");
                                       }
                                    }
                                 }

                                if(_this.adImgeData.result.data[2]){
                                    if(_this.adImgeData.result.data[2][0]){
                                       _this.adImgeData3 = _this.adImgeData.result.data[2]
                                       if(_this.adImgeData3.length>1){
                                           _this.swiperInit("#swiper-container3");
                                       }
                                    }
                                 }


                                  if(_this.adImgeData.result.data[3]){
                                     if(_this.adImgeData.result.data[3][0]){
                                        _this.adImgeData4 = _this.adImgeData.result.data[3]
                                        if(_this.adImgeData4.length>1){
                                            _this.swiperInit("#swiper-container4");
                                        }
                                     }
                                  }

                                  if(_this.adImgeData.result.data[4]){
                                      if(_this.adImgeData.result.data[4][0]){
                                          _this.adImgeData5Staus = true;
                                          _this.adImgeData5 = _this.adImgeData.result.data[4];
                                          _this.getFloatAd(_this.adImgeData5[0].adLink);
                                      }else{
                                        _this.adImgeData5Staus = false;
                                      }
                                  }

                                  

                                }

                            }
                        })
                    },
                    //获取注册信息接口
                    getProfile: function(cb) {
                        var _this = this;
                        return $.ajax({
                            type: 'POST',
                            url: api.profile,
                            async: true,
                            data: {
                                _p: common.getRequest()._p
                            },
                            dataType: 'json',
                            success: function(res) {
                                if (res.result.data) {
                                    _this.registered = res.result.data[0].height;
                                    _this.sexR = res.result.data[0].gender; //注册后的性别
                                    _this.unionid = res.result.data[0].weChatUser.unionid;
                                    _this.registeredData = res.result.data[0];

                                     //unionid值储存 height，gender，age值储存
                                    if(typeof(Storage)!=="undefined"){
                                        sessionStorage.unionidStorage = res.result.data[0].weChatUser.unionid;
                                        sessionStorage.Height = res.result.data[0].height;
                                        sessionStorage.Gender = res.result.data[0].gender;

                                        if(res.result.data[0].age==0){
                                            sessionStorage.Age = 1
                                        }else{
                                            sessionStorage.Age = res.result.data[0].age; 
                                        }
                                        
                                    }
                                    cb && cb();
                                }
                            }
                        })

                    },
                    //获取体重管理
                    getManagementid:function(unionid){
                        var _this =this;

                        var data={
                            unionid:unionid
                        }

                        $.ajax({
                            type: 'get',
                            url:api.getManagementid+'?'+$.param(data),
                            async:true,
                            success:function(res){
                              _this.ManagementVo =res.vo;

                              if(JSON.stringify(_this.ManagementVo)=='{}' || _this.ManagementVo==null){

                                  common.linkTo2("../views/manage/question.html");

                                  console.log("还没开始体重管理了")
                              }else{
                                if(_this.curentStamp>res.vo.startDate&&_this.curentStamp<res.vo.endDate){
                                    common.linkTo2("../views/manage/manage.html");//开始体重管理阶段
                                 }else{
                                    common.linkTo2("../views/manage/question.html");
                                 }
                                
                              }
    
                            }
                          })
                    },
                    linkTo: function() {
                        var _this = this;

                        var registBoon = this.registeredData.height==null || this.registeredData.age==null || this.registeredData.gender==null;
                        $(".pk").click(function() {
                            var target = $(this).data("target");
                            if (registBoon) {
                                _this.targetLinke = target;
                                $(".registration-model-content").show();
                            } else {
                                common.linkTo2("../views/pk/pk.html");
                            }

                        });

                        $(".manage").click(function(){
                            var target = $(this).data("target");
                            if (registBoon) {
                                _this.targetLinke = target;
                                $(".registration-model-content").show();
                            }else{
                                _this.getManagementid(_this.unionid);
                            }
                        })

                        $("#healthLink,.moreHeath").click(function() {
                            var target = $(this).data("target");
                            if (registBoon) {
                                _this.targetLinke = target;
                                $(".registration-model-content").show();
                            } else {
                                common.linkTo2("../views/health/health.html");
                            }
                        })
                        $(".run").click(function(){
                            common.linkTo2("build.html");
                        })

                        $(".experiment").click(function() {
                            common.linkTo2("../views/lab/lab.html");
                        });
                        $(".knowledge").click(function() {
                            common.linkTo2("../views/knowledge/knowledge.html",window.location.search.replace('&manage=1', '').substr(1));
                        });
                        $(".sun").click(function() {
                            var target = $(this).data("target");
                            if (registBoon) {
                                _this.targetLinke = target;
                                $(".registration-model-content").show();
                            } else {
                                common.linkTo2("../views/show/show.html");
                            }
                        });
                        $("#moreT,.hotRecommend .hotImg").click(function() {
                            common.linkTo2("../views/recommended/recommended.html");
                        });
                        $(".recordsHead #weightAll").click(function() {
                            common.linkTo2("../views/my/trend.html");
                        });
    
                    },
                    //年龄下拉选择弹窗事件
                    yearSelect: function() {
                        var that = this;

                        var selectDateDom = $('#JS-year');
                        // 初始化时间
                        var now = new Date();
                        var nowYear = now.getFullYear();
                        var nowMonth = now.getMonth() + 1;
                        var nowDate = now.getDate();


                        // 数据初始化
                        function formatYear(nowYear) {
                            var arr = [];
                            for (var i = 1900; i <= nowYear; i++) {
                                arr.push({
                                    id: i + '',
                                    value: i + '年'
                                });
                            }
                            return arr;
                        }

                        function formatMonth() {
                            var arr = [];
                            for (var i = 1; i <= 12; i++) {
                                var i2 = i;
                                if (i2 < 10) {
                                    i2 = '0' + i2;
                                }
                                arr.push({
                                    id: i2 + '',
                                    value: i + '月'
                                });
                            }
                            return arr;
                        }

                        function formatDate(count) {
                            var arr = [];
                            for (var i = 1; i <= count; i++) {
                                var i2 = i;
                                if (i2 < 10) {
                                    i2 = '0' + i2;
                                }
                                arr.push({
                                    id: i2 + '',
                                    value: i + '日'
                                });
                            }
                            return arr;
                        }

                        var yearData = function(callback) {
                            callback(formatYear(nowYear))
                        }
                        var monthData = function(year, callback) {
                            callback(formatMonth());
                        };

                        var dateData = function(year, month, callback) {
                            month = month.replace(/^0/, '');
                            if (/^(1|3|5|7|8|10|12)$/.test(month)) {
                                callback(formatDate(31));
                            } else if (/^(4|6|9|11)$/.test(month)) {
                                callback(formatDate(30));
                            } else if (/^2$/.test(month)) {
                                if (year % 4 === 0 && year % 100 !== 0 || year % 400 === 0) {
                                    callback(formatDate(29));
                                } else {
                                    callback(formatDate(28));
                                }
                            } else {
                                throw new Error('month is illegal');
                            }
                        };

                        selectDateDom.bind('click', function() {
                            var oneLevelId = selectDateDom.find('input').attr('data-year');
                            var twoLevelId = selectDateDom.find('input').attr('data-month');
                            var threeLevelId = selectDateDom.find('input').attr('data-date');
                            var bankSelect = new iosSelect(3, [yearData, monthData, dateData], {
                                itemHeight: 50,
                                itemShowCount: 5,
                                oneLevelId: oneLevelId,
                                twoLevelId: twoLevelId,
                                threeLevelId: threeLevelId,
                                callback: function(selectOneObj, selectTwoObj, selectThreeObj) {
                                    selectDateDom.find('input').attr('data-year', selectOneObj.id);
                                    selectDateDom.find('input').attr('data-month', selectTwoObj.id);
                                    selectDateDom.find('input').attr('data-date', selectThreeObj.id);
                                    selectDateDom.find('input').val(selectOneObj.id + '-' + selectTwoObj.id + '-' + selectThreeObj.id);
                                    that.modify.year = selectOneObj.id + selectTwoObj.id + selectThreeObj.id;
                                }
                            });
                        });



                    },
                    //身高下拉选择弹窗事件
                    statureSelect: function() {
                        var that = this;
                        $('#JS-stature').click(function() {
                            var dom = $(this);
                            var bankId = dom.find('input').attr('data-id');
                            var bankSelect = new iosSelect(1, [that.getStatureData()], {
                                itemHeight: 50,
                                itemShowCount: 5,
                                oneLevelId: bankId,
                                callback: function(obj) {
                                    that.modify.height = obj.value;
                                    dom.find('input').val(obj.value + 'cm');
                                    dom.find('input').attr('data-id', obj.id);
                                }
                            });
                        });
                    },
                    //获取身高数据
                    getStatureData: function() {
                        for (var i = 70; i <= 220; i++) {
                            var data = {
                                id: i,
                                value: i
                            }
                            this.statureArr.push(data);
                        }
                        return this.statureArr;
                    },
                    //注册接口
                    savePersoInfo: function() {
                        var _this = this;
                        var nowDate = common.getDate2().replace(/-/g, '');
                        console.log(nowDate);

                        if(_this.modify.year>nowDate){
                            
                          alert("你选择的日期有误，请重新选择!");
                        }else{

                          console.log("身高:" + _this.modify.height + "性别:" + _this.modify.sex + "年龄:" + _this.modify.year);

                        $.ajax({
                            type: "POST",
                            url: api.updateUserInfo,
                            data: {
                                _p: common.getRequest()._p,
                                unionid: _this.unionid,
                                name: _this.modify.nickname,
                                gender: _this.modify.sex,
                                height: _this.modify.height,
                                birthdate: _this.modify.year
                            },
                            success: function(res) {
                                var resData = JSON.parse(res);
                                if (resData.result.status == 0) {
                                    $(".registration-model-content").hide();
                                    _this.getProfile(function() {
                                        _this.BeauBody = bmi.BeauBody(_this.registeredData.height, _this.sexR); //计算美体体重
                                        _this.BMI = bmi.toMathBmi(_this.homeData.currentWeight, _this.registeredData.height); //计算BMI值
                                        _this.standardWeight = bmi.toMathSBW(_this.sexR, _this.registeredData.height); //计算标准体重
                                        _this.bodyTypeChinese = bmi.getBodyTypeChinese(_this.BMI.bmi);

                                        _this.generateReport();
                                    });

                                    if(_this.targetLinke=="health"){

                                        common.linkTo2("../views/health/health.html");

                                    }else if(_this.targetLinke=="pk"){
                                        
                                        common.linkTo2("../views/pk/pk.html");


                                    }else if(_this.targetLinke=="manage"){

                                        _this.getManagementid(_this.unionid);

                                    }else if(_this.targetLinke=="sun"){

                                        common.linkTo2("../views/show/show.html");

                                    }else{
                                         window.location.href = '/index2.html?_p=' + common.getRequest()._p;
                                    }

                                    if(sessionStorage.footerLink=="health"){

                                        common.linkTo2("../views/health/health.html");
                                    }

                                    console.log("目标跳转："+_this.targetLinke);

                                   
                                }


                            }
                        })
                      }
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

                                if ((_this.historyWeight[i].weight.toFixed(1) - 0) >= max) {
                                    max = _this.historyWeight[i].weight.toFixed(1);
                                }

                                if ((_this.historyWeight[i].weight.toFixed(1) - 0) < min) {
                                    min = _this.historyWeight[i].weight.toFixed(1);
                                }
                            }


                            var temp = (max - min)*2;

                            max -= 0;
                            min -= 0;
                            if (temp == 0) {
                                max = parseFloat((max*2) + 12);
                                min = min - 12 > 0 ? parseFloat((min*2) - 12)  : min*2;
                                console.log('max1:' + max);
                                console.log('min1:' + min);
                            } else {
                                max = (parseFloat((max*2) + temp / 8)).toFixed(1);
                                min = ((min*2) - temp / 2) ? (parseFloat((min*2) - temp / 2)).toFixed(1) : min*2;
                                console.log('max2:' + max);
                                console.log('min2:' + min);
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
                                    end: 40
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
                                            color: '#04040f',
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

                            var end = 100 - 100 *(5 / _this.historyWeightLength);

                              if(end>88){
                                 end = 88;
                              }else if(end<=0){
                                end = 20;
                              }
                              
                            _this.chartsOption.dataZoom[0].end = end;
                            
                            _this.chartsOption.xAxis.data = chartsData.date;
                            _this.chartsOption.series[0].data = chartsData.weight;


                            var myChart = echarts.init($('#JS-echars')[0]);
                             myChart.setOption(_this.chartsOption);
                    },
                    //热门推荐
                    hotRecommended: function() {
                        var _this = this;
                        $.ajax({
                            type: "POST",
                            url: api.hotRecommended,
                            data: {
                                _p: common.getRequest()._p
                            },
                            async:true,
                            dataType: 'json',
                            success: function(res) {
                                _this.hotImgData = res.result.data;
                            }
                        })
                    }
                }
            })
        }, 50)
    })

})