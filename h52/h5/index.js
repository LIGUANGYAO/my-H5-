
require(['jquery', 'Vue', 'FooterBar', 'common', 'IScroll', 'iosSelect', 'echarts', 'api','Swiper','bmi','PageLoad'], function($, Vue, FooterBar, common, IScroll, iosSelect, echarts, api,Swiper, bmi,PageLoad) {

    $(function() {


        var FooterBar_vue = FooterBar.init();
        var PageLoad_vue = PageLoad.init();
        var timesecond = new Date().getTime();
        // settimeout 防止页面假死
        //setTimeout(function() {
            new Vue({
                el: '#app',
                data: {
                    statureArr: [],
                    targetWeight:[],
                    targetCycle:[],
                    openState: false,
                    chartsOption: null,
                    flag: 1,
                    modify: {
                        nickname: null,
                        sex: 1,
                        height: null,
                        year: null,
                        prepDay:null,
                        childBirth:null
                    },
                    unionid: null,
                    registered: null,
                    registeredData: {},
                    ohm:null,//体脂里面判断
                    BMI: {},
                    sexR: null,
                    homeData: null,
                    wxname:null,//微信名字
                    currentWeightData:null,
                    historyWeight: null,
                    historyWeightLength:null,
                    hotImgData: null,
                    bodyTypeChinese: null,
                    standardWeight: {},
                    adImgeData: {},
                    bodyFat:{},
                    bodyFatSate:false,
                    ManagementVo:{},//体重管理
                    //curentStamp:null,
                    adImgeData:null,
                    adImgeData1:{},
                    adImgeData1S:false,
                    adImgeData2:{},
                    adImgeData2S:false,
                    adImgeData3:{},
                    adImgeData3S:false,
                    adImgeData4:null,
                    adImgeData5:{},
                    adImgeData5S:false,
                    typeNum:null,
                    flags:false,
                      registerStage:null,//注册状态
                      headPortrait:null,
                      targetMinWeight:null,
                      targetWach:'设置目标',
                      targetkg:null,
                      targetDays:14,
                      currentWeight:null,
                      prevWeight:null,//上一次体重
                      comparison:null,
                      anotherStage:false,//弹框男女选择
                      typeNumber:null,
                      showSet:false,
                      IndexImg:[],
                      showLoading: false,
                      initList:null,
                      timer:null,
                      pageNum:2,
                      getManiangData:{
                        targetType:null,
                        days:null,
                        targetWeight:null,
                        mcid:null
                      },//获取目标体重 周期
                      IngredientData1:[],//默认和注册有设置目标和周期数据
                      IngredientData2:[],
                      IngredientData3:[],
                      IngredientData4:[],
                      IngredientData5:[],
                      pregData:null,
                      kllTotal1:[],
                      kllTotal2:[],
                      kllTotal3:[],
                      kllTotal4:[],
                      kllTotal5:[],
                      kil1:null,
                      kil2:null,
                      kil3:null,
                      kil4:null,
                      kil5:null,
                      dataQuestion:null,
                      obesityData:null,
                      recently:{
                          weightArry:[],
                          dateArry:[]
                      },
                      distanceWeight:null,
                      recommendData:{},
                      recommendArry:[//1 塑形 2增肌 3减肥
                          {
                            breakfast:'以优质蛋白为主',
                            lunch:'白肉和蔬菜为主',
                            plus:'缓解饥饿，补充体力',
                            dinner:'用粗粮代替主食'
                          },
                          {
                            breakfast:'以优质蛋白为主',
                            lunch:'肉类以白肉为主',
                            plus:'补充高蛋白食品',
                            dinner:'用粗粮代替主食'
                          },
                          {
                            breakfast:'以优质蛋白为主',
                            lunch:'以优质蛋白为主',
                            plus:'缓解饥饿，补充体力',
                            dinner:'用粗粮代替主食'
                          }
                      ],
                      fatUlStase:false,
                      moveStause:false,
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
                      muscleUlStase:false,
                      pageLoad:false,//页面加载
                      repoArtis:[],//健康小贴士
                      repoArtis2:[
                      {title:'炎炎夏日加餐喝这些，解渴又减肥！',id:1576},
                      {title:'不要吃这几种“高热量”水果，会越减越胖！',id:339},
                      {title:'每年谋杀上百万人，凶手原来是它.....',id:334},
                      {title:'您有一封关于“生酮饮食”的邮件，请查收…',id:329},
                      {title:'为什么吃了早餐更饿？不吃反而不饿？',id:1567},
                      {title:'夜猫子们，请收下这份营养建议',id:313},
                    ],
                      healthTip:null,//高并发小贴士
                      management:null,//高并发体重设置管理
                      showPic:null,//高并发图片
                      diet:null,//高并发饮食
                    //  proteinPercen:null,
                      fatPercen:null,
                      waterPercen:null,
                        title1:'<div class="header">产后型肥胖</div><p class="top-title">由于女性怀孕期间体内激素的增加，和产后身体情况所产生的落差，而导致激素分泌的紊乱，新陈代谢减慢，而导致体重增加，最后导致产后身体发胖。</p><div class="factor">影响因素：</div><p class="bottom-title">1、是因为妊娠过程引起下丘脑-性腺功能暂时紊乱，特别是脂肪代谢失去平衡。<br>2、因为我国有传统的“坐月子”的理论，在产后的头一个月内，为了哺乳，让妈妈吃下大量的高脂肪高蛋白质食品，使摄入的营养量大大超过需要量，而极少的体力活动又使能量消耗大为降低，最终使机体脂肪细胞充盈。</p>',
                        title2:'<div class="header">水肿型肥胖</div><p class="top-title">也称浮肿型肥胖，属于水分太多的肥胖者，所以手指捏最肥的部分，大多呈现凹凸不平状。以手指头按压皮肤后放开，皮肤出现暂时凹下的状况。（建议咨询医生）</p><div class="factor">影响因素：</div><p class="bottom-title">长期站立或坐着工作、精神压力引发的荷尔蒙失调、饮食太咸等，或服用特殊药物，都可能使静脉循环不佳，导致局部出现体质性的水肿。体质性水肿是最常见的水肿，尤其以女性为多。水肿型肥胖者的主要原因是因为身体消化系统的操作功能不足，导致身体多余的水分无法排除而累积在体内。</p>',
                        title3:'<div class="header">虚胖型肥胖</div><p class="top-title">以手指捏起自己最胖的地方可以整块抓起来，此型肥胖者多半全身都会附着脂肪。当肌肉收紧时，可以看到明显的皮下脂肪在游离。</p><div class="factor">影响因素：</div><p class="bottom-title">1、进食能量密度高食物，脂肪含量较高的食物往往具有较高的能量密度；不良的进食行为。<br>2、主要表现在进食时所选择的食物块大，咀嚼少、整个进食较快，以及在短时间里吃的块数较多等。<br>3、过多地进食肉和奶油，喜欢甜食和油炸的高脂、高能量食物，饮用大量具有高能量的饮料和酒精是导致肥胖的重要因素。<br>4、看电视进食、临睡前进食等不良的饮食习惯均可导致能量过剩，引起肥胖。</p>',
                        title4:'<div class="header">腹部型肥胖</div><p class="top-title">指的是患者体内脂肪沉积是以心脏、腹部为中心而开始发展的一种肥胖类型。</p><div class="factor">影响因素：</div><p class="bottom-title">多见于皮质醇增多症患者。患者得病后食欲亢进，同时出现异常肥胖，面部胖得像十五的月亮，胸腔部脂肪堆积，而四肢却不肥胖，有时反而消瘦，与肥胖的躯体形成鲜明对照。当人体内糖皮质激素持续存在过多时所产生的一种特殊体型。由于糖皮质激素对身体不同部位脂肪组织的作用不同：四肢脂肪组织分解增强而腹、面、肩及背部脂肪合成有所增加，以致出现的一种以面部圆润、背部肥厚、腰宽且腹部呈球形隆起，四肢近端肥胖粗大而远端细弱、与躯干不相对称的特殊体型。</p>',
                        title5:'<div class="header">单纯性肥胖</div><p class="top-title">主要是指排除由遗传性肥胖、代谢性疾病、外伤或其他疾病所引起的继发性、病理性肥胖，而单纯由于营养过剩所造成的全身性脂肪过量积累。</p><div class="factor">影响因素：</div><p class="bottom-title">1、能量摄入过多或消耗减少也会引起肥胖，主要表现在食欲亢进或活动减少及摄入与排出不平衡造成的。<br>2、碳水化合物是人体的主要供能物质，它本身并不导致肥胖，只有能量过多时，过多的碳水化合物才能转化为脂肪而引起肥胖。<br>3、当摄入的食物中含有高脂肪（包括同时高碳水化合物）或脂肪摄入过多时，脂肪的储存量就会明显加快，导致肥胖。</p>',
                        title6:'<div class="header">遗传性肥胖</div><p class="top-title">主要指遗传物质（染色体、 DNA)发生改变而导致的肥胖，这种肥胖极为罕见，常有家族性肥胖倾向。</p><div class="factor">影响因素：</div><p class="bottom-title">多项研究表明这类肥胖具有遗传倾向，肥胖者的基因可能存在多种变化或缺陷。一些对双胞胎、领养子女家庭和家系的调查发现，肥胖有一定的家族聚集性。双亲均为肥胖者，子女中有70%~80%的人表现为肥胖，双亲之一（特别是母亲）为肥胖者，子女中有40%的人比较胖。人群的种族、性别不同和年龄差别对致肥胖因子的易感性不同。研究表明遗传因素对肥胖形成的作用约占20%~40%</p>'

                },
                components: {
                    'footer-bar': FooterBar_vue,
                    'page-load': PageLoad_vue
                },
                computed:{
                    shape:function(){
                        var url='';
                        if(this.sexR==1){
                            if(this.bodyTypeChinese=="偏瘦"){
                                url="./assets/images/home/M0.png";
                            }else if(this.bodyTypeChinese=="正常"){
                                url="./assets/images/home/M1.png";
                            }else if(this.bodyTypeChinese=="偏胖"){
                                url="./assets/images/home/M2.png";
                            }else if(this.bodyTypeChinese=="肥胖"){
                                url="./assets/images/home/M3.png";
                            }
                        }else if(this.sexR==2){
                            if(this.bodyTypeChinese=="偏瘦"){
                                url="./assets/images/home/G0.png";
                            }else if(this.bodyTypeChinese=="正常"){
                                url="./assets/images/home/G1.png";
                            }else if(this.bodyTypeChinese=="偏胖"){
                                url="./assets/images/home/G2.png";
                            }else if(this.bodyTypeChinese=="肥胖"){
                                url="./assets/images/home/G3.png";
                            }
                        }
                       return url;
                    },
                    disabledStyle:function(){
                        var off=null;
                        if(this.targetWach!=='设置目标'){
                            off=false;
                        }else{
                            off=true;
                        }
                        return off;
                    },
                    comparisonData:function(){
                        var disfft = null;
                         if(this.comparison>0){
                             disfft = '+'+this.comparison;
                         }else if(this.comparison<0){
                            disfft= this.comparison;
                         }else if(this.comparison==0){
                            disfft = '+'+this.comparison
                         }
                         return disfft;
                    },
                    proteinPercen:function(){

                      var protein =  (parseFloat(this.bodyFat.protein)/parseFloat(this.homeData)).toFixed(3);
                      return (protein*100).toFixed(1)+'%';
                    }
                },
                watch:{

                },
                created: function() {



                },
                mounted: function() {

                    var _this = this;

                   this.highconcurrency().then(function(){


                    var a = _this.getProfile();//注册信息调用
                    var b = _this.getWeightAll();//称重历史体重和日期
                    var c = _this.getAdvertising();//广告加载

                    $.when(a,b,c).then(function(a,b,c) {

                       _this.pageLoad = true;

                     var backStause = sessionStorage.getItem("backStause");

                       if(backStause=='true'){
                           // $('html,body').animate({
                           //   scrollTop: '840px'
                           // },700,function(){
                           //    sessionStorage.removeItem("backStause");
                           // })

                         setTimeout(function(){
                             // $(window).scrollTop(840);
                             $('.management-nav')[0].scrollIntoView()
                            setTimeout(function(){
                                 sessionStorage.removeItem("backStause");
                            },300)
                         },500)


                       }
                        setTimeout(function(){
                            _this.initCharts();//体重图表
                          },300)

                        if (_this.registerStage) {
                            console.log("没注册");

                            _this.recommendData = _this.recommendArry[0];

                            if(_this.diet==0||_this.diet==1){
                                _this.getdefaultkallmana();//默认饮食运动数据
                            }

                            if(_this.healthTip==0){
                                _this.indexHealRepoArtis(null,null,null);//没注册推送小贴士列表
                            }else{
                               _this.repoArtis = _this.repoArtis2;
                               _this.upscroll();
                            }

                            if(_this.management==0){
                                $(".install-target").show();
                            }else{
                                $(".target-contanier").hide();
                            }

                            _this.modify.height=170;
                            _this.modify.year=19931010;

                            _this.modify.prepDay = null;
                            _this.modify.childBirth = null;

                        }else{

                            _this.standardWeight = bmi.toMathSBW(_this.sexR, _this.registeredData.height); //计算标准体重

                            _this.BMI = bmi.toMathBmi(_this.homeData, _this.registeredData.height); //计算BMI值

                            _this.bodyTypeChinese = bmi.getBodyTypeChinese(_this.BMI.bmi);

                            if(_this.sexR==1){
                                _this.targetMinWeight = parseInt((_this.registeredData.height-80)*0.7*0.9*0.8);
                            }else{
                                _this.targetMinWeight = parseInt((_this.registeredData.height-70)*0.6*0.9*0.8);
                            }

                            console.log("注册");
                            _this.generateReport();

                            if(_this.management==0){
                                _this.getManagementid(_this.unionid,1);//获取目标和周期
                            }else{
                                $(".target-contanier").hide();
                            }

                            setTimeout(function(){

                                if(_this.management==0){
                                if(_this.getManiangData.mcid){
                                    if(_this.healthTip==0){
                                        _this.indexHealRepoArtis(_this.getManiangData.targetType,_this.sexR,_this.registeredData.femaleType);//注册推送小贴士列表
                                    }else{
                                        _this.repoArtis = _this.repoArtis2;
                                        _this.upscroll();
                                    }
                                }else{
                                    if(_this.healthTip==0){
                                        _this.indexHealRepoArtis(null,null,null);//注册推送小贴士列表
                                    }else{
                                        _this.repoArtis = _this.repoArtis2;
                                        _this.upscroll();
                                    }
                                    if(_this.diet==0||_this.diet==1){
                                        _this.getdefaultkallmana();//默认饮食运动数据
                                    }

                                }

                            }else{

                                if(_this.healthTip==0){
                                    _this.indexHealRepoArtis(null,null,null);//注册推送小贴士列表
                                }else{
                                    _this.repoArtis = _this.repoArtis2;
                                    _this.upscroll();
                                }

                                _this.getdefaultkallmana();//默认饮食运动数据
                            }

                            },500)

                        }

                        setTimeout(function(){

                            if(_this.ohm){
                                if(_this.registerStage){
                                    $(".registration-model-content").show();
                                }else{
                                    $(".registration-model-content").hide();
                                }
                            }
                            console.log("体脂"+_this.ohm);

                        },2000)

                    })
                 });


                    this.init();

                     //当前时间的时间戳
                     // var d = new Date();
                     // this.curentStamp = d.getTime();


                      this.getDataFat();//体脂调用



                },
                methods: {
                    init: function() {
                        var _this = this;
                        this.statureSelect();//身高选择
                        this.daytataSelect("#JS-year",3);//年龄选择
                        this.daytataSelect1("#JS-preproduction",1);//预产期选择
                        this.daytataSelect1("#JS-lactation",2);//BB出生日期选择

                        this.targetSelectWeight();//目标体重选择
                        this.targetSelectCycle();//周期时间


                        if(this.adImgeData1S==false&&this.adImgeData2S==false&&this.adImgeData3S==false){
                             $(".link-icon").css("padding","0.4rem 0.8rem")
                        }


                   $(".management-nav li").click(function(){
                        $(this).addClass("active").siblings().removeClass("active");
                        var index= $(this).index();
                        var activeNum = $(this).data("active");
                        $(".management-content").eq(index).fadeIn().siblings(".management-content").hide();
                   })

                   $(".muscle-ul .check-left").on("click",function(){
                        $(".muscle-ul .pay_list_c1").removeClass("on");
                        $(this).find(".pay_list_c1").addClass("on");
                        _this.typeNumber = $(this).find(".pay_list_c1").data('target');

                        if(_this.typeNumber==2){
                            _hmt.push(['_trackEvent','首页','目标','增肌']);
                        }else if(_this.typeNumber==3){
                            _hmt.push(['_trackEvent','首页','目标','塑形']);
                        }
                        console.log("目标类型："+_this.typeNumber);
                  });




                  $(".fat-ul .check-left").on("click",function(){
                        $(".fat-ul .pay_list_c1").removeClass("on");
                        $(this).find(".pay_list_c1").addClass("on");
                        _this.typeNumber = $(this).find(".pay_list_c1").data('target');

                        if(_this.typeNumber==4){
                            _hmt.push(['_trackEvent','首页','选择肥胖类型','遗传性肥胖']);
                        }else if(_this.typeNumber==5){
                            _hmt.push(['_trackEvent','首页','选择肥胖类型','单纯性肥胖']);
                        }else if(_this.typeNumber==6){
                            _hmt.push(['_trackEvent','首页','选择肥胖类型','腹部型肥胖']);
                        }else if(_this.typeNumber==7){
                            _hmt.push(['_trackEvent','首页','选择肥胖类型','虚胖型肥胖']);
                        }else if(_this.typeNumber==8){
                            _hmt.push(['_trackEvent','首页','选择肥胖类型','水肿型肥胖']);
                        }else if(_this.typeNumber==9){
                            _hmt.push(['_trackEvent','首页','选择肥胖类型','产后型肥胖']);
                        }

                        console.log("目标类型："+_this.typeNumber)
                  });



                  $(".fat-ul .question").on('click',function(event){

                    event.stopPropagation();
                     _this.flags = true;
                     _this.dataQuestion = $(this).data('question');

                     if(_this.dataQuestion==4){//遗传性肥胖
                        _this.obesityData = _this.title6;
                        $(".obesity-content").css("height","10.3rem");
                        _hmt.push(['_trackEvent','首页','解释按钮','遗传性肥胖']);
                      }else if(_this.dataQuestion==5){//单纯性肥胖
                        $(".obesity-content").css("height","11rem");
                        _hmt.push(['_trackEvent','首页','解释按钮','单纯性肥胖']);
                        _this.obesityData = _this.title5;
                      }else if(_this.dataQuestion==6){//腹部型肥胖
                        _this.obesityData = _this.title4;
                        $(".obesity-content").css("height","11.4rem");
                        _hmt.push(['_trackEvent','首页','解释按钮','腹部型肥胖']);
                      }else if(_this.dataQuestion==7){//虚胖型肥胖
                        _this.obesityData = _this.title3;
                        $(".obesity-content").css("height","11.8rem");
                        _hmt.push(['_trackEvent','首页','解释按钮','虚胖型肥胖']);
                      }else if(_this.dataQuestion==8){//水肿型肥胖
                        _this.obesityData =  _this.title2;
                        $(".obesity-content").css("height","10.11rem");
                        _hmt.push(['_trackEvent','首页','解释按钮','水肿型肥胖']);
                      }else if(_this.dataQuestion==9){//产后型肥胖
                        _this.obesityData = _this.title1;
                        $(".obesity-content").css("height","10rem");
                        _hmt.push(['_trackEvent','首页','解释按钮','产后型肥胖']);
                      }

                      $("#obesity-model").show();
                     console.log("肥胖"+_this.dataQuestion)

                     if (_this.flags) {
                        event.preventDefault();
                     }

                  });


                  $("#Js-button").on('click',function(){

                    _hmt.push(['_trackEvent','首页','首页设置目标','保存按钮']);

                    var cycle = _this.targetDays/14;
                    var num = Math.abs(_this.currentWeight - _this.targetkg)/cycle;

                    var cycleNum = 4*cycle;

                    console.log("周期："+num+'大于多少个周期体重：'+cycleNum);

                    if(num>cycleNum){
                        $(".error").fadeIn();
                    }else{
                        $(".error").hide();
                    _this.indexHealRepoArtis(_this.getManiangData.targetType,_this.sexR,_this.registeredData.femaleType);//注册推送小贴士列表
                    _this.addWeightManagement(_this.typeNumber,_this.homeData,_this.targetkg,_this.targetDays,_this.sexR,_this.registeredData.birthdate,_this.registeredData.height,_this.unionid);//设置目标及周期
                }
                     $(this).addClass('disabled');
                     var indexDom = $(this);
                     setTimeout(function(){
                        indexDom.removeClass('disabled');
                         console.log('执行到');
                     },1000);

                  });
                    $(".li").on("click",function(){

                        var that = $(this);
                        $(this).addClass('disable');
                        $(this).hide();
                        $(this).siblings(".li-ul").slideDown(function(){
                           that.removeClass('disable');
                        });
                        var paren = $(this).parent().siblings(".slide");
                        // paren.find(".li").fadeIn('fast',function(){
                        //     paren.find(".li-ul").slideUp();
                        // });

                        var li = $(this).data('li');

                        console.log(li);
                        if(li==1){
                            _hmt.push(['_trackEvent','首页','展开键','早餐展开键']);
                        }else if(li==2){

                            _hmt.push(['_trackEvent','首页','展开键','午餐展开键']);
                        }else if(li==3){
                            _hmt.push(['_trackEvent','首页','展开键','加餐展开键']);
                        }else if(li==4){
                            _hmt.push(['_trackEvent','首页','展开键','晚餐展开键']);

                        }

                    });



                    $(".break-first").on('click',function(e){
                        var that = $(this);
                        // console.log(123)
                         $(this).addClass('disable');
                         $(this).parent().siblings(".li").addClass('disable');
                         $(this).parent().siblings(".li").fadeIn();
                         $(this).parent().slideUp(function(){
                            that.removeClass('disable');
                            that.parent().siblings(".li").removeClass('disable');
                            console.log("执行到")
                         });
                         // e.stopPropagation()
                    })

                    $('html,body,#app').on('touchmove', function (event) {
                        if (_this.moveStause) {
                           event.preventDefault();
                       }
                   });
                    },
                    closeObesity:function(){
                         this.flags = false;
                        $("#obesity-model").hide();
                    },
                    //添加食材
                    addMykallMana:function(mcid,unionid,height,weight,gender,birthDate,targetType){

                        var _this = this;

                        $.ajax({
                            type:'POST',
                            url:api.addMykallMana,
                            data:{
                                mcid:mcid,
                                unionid:unionid,
                                height:height,
                                weight:weight,
                                gender:gender,
                                birthDate:birthDate,
                                targetType:targetType
                            },
                            async: true,
                            dataType: 'json',
                            success:function(res){
                                console.log(res);
                            }
                        })

                    },
                    //高并发接口
                    highconcurrency:function(){
                        var _this =this;
                       return new Promise(function(resolve,reject){
                        $.ajax({
                            type:'get',
                            url:api.highconcurrency,
                            async: true,
                            dataType: 'json',
                            success:function(res){
                                if(res){
                                    _this.healthTip = res.healthTip;//健康小贴士
                                    _this.management = res.management;//目标体重管理
                                    _this.showPic = res.showPic;//嗮一嗮
                                    _this.diet = res.diet;//饮食推荐

                                    resolve();
                                }
                            }
                        })
                       })
                    },
                    //修改性别
                    changeSex:function(sexNum){

                        var _this =this;

                        this.modify.sex = sexNum;
                        if(sexNum==2){
                            $(".registrationModel").css("height"," 10.2rem");
                             _this.pregData = 1;//默认
                             if(this.registerStage){
                                this.modify.height=160;
                                $("#JS-stature").find('input').attr('data-id','160');
                                $("#JS-stature").find('input').val('160cm');
                             }

                             this.anotherStage=true;
                            $(".pay_list_c2").on('click',function(){
                                $(".select-box .pay_list_c2").removeClass("active");
                                $(this).addClass("active");
                                var preg = $(this).data("preg");
                                $("#JS-preproduction").hide();
                                $("#lactation").hide();

                                if(preg==1){
                                    $("#lactation").hide();
                                    $("#JS-preproduction").hide();
                                    _this.modify.childBirth = null;
                                    _this.modify.prepDay = null;

                                    _hmt.push(['_trackEvent','首页','首页完善资料','未孕']);

                                }else if(preg==2){

                                  $("#JS-preproduction").show();
                                  $("#lactation").hide();

                                 // _this.modify.childBirth = null;

                                 _hmt.push(['_trackEvent','首页','首页完善资料','孕期']);

                                }else if(preg==3){

                                    $("#lactation").show();
                                    $("#JS-preproduction").hide();
                                   // _this.modify.prepDay = null;

                                   _hmt.push(['_trackEvent','首页','首页完善资料','哺乳期']);
                                }

                                _this.pregData = preg;

                                console.log("孕期值:"+_this.pregData);
                            })

                            _hmt.push(['_trackEvent','首页','首页完善资料','女']);

                        }else{
                            $(".registrationModel").css("height"," 8rem");
                             this.anotherStage=false;

                            if(this.registerStage){
                               this.modify.height=170;
                               $("#JS-stature").find('input').attr('data-id','170');
                               $("#JS-stature").find('input').val('170cm');
                            }

                            _this.pregData = null;//默认
                            _this.modify.prepDay = null;
                            _this.modify.childBirth = null;
                            _hmt.push(['_trackEvent','首页','首页完善资料','男']);
                        }

                        console.log(this.modify.sex);
                    },
                      //幻灯片广告
                      swiperInit:function(dom){
                        var _this =this;

                            setTimeout(function(){
                                new Swiper(dom, {
                                  direction:'horizontal',
                                  autoplay:5000,
                                  preventClicks:true,
                                  preventClicksPropagation:true,
                                  pagination:'.swiper-pagination'
                              });
                             },300)
                    },
                     // 实现移动端拖拽
                     down:function(){
                        this.moveStause = true;
                        var touch;
                        if(event.touches){
                            touch = event.touches[0];
                        }else {
                            touch = event;
                        }
                        this.position.x = touch.clientX;
                        this.position.y = touch.clientY;
                        this.dx = document.getElementById("float-ad").offsetLeft;
                        this.dy = document.getElementById("float-ad").offsetTop;
                    },
                    move:function(){

                        if(this.moveStause){
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
                          }else if(this.xPum>$(window).width()-$("#float-ad").width()){
                            this.xPum = $(window).width()-$("#float-ad").width();
                          }

                          if(this.yPum>$(window).height()-$("#float-ad").height()){
                            this.yPum = $(window).height()-$("#float-ad").height();
                          }else if(this.yPum<0){
                            this.yPum = 0;
                          }

                          document.getElementById("float-ad").style.left= this.xPum+"px";
                          document.getElementById("float-ad").style.top= this.yPum +"px";

                        }
                      },
                      //鼠标释放时候的函数
                    end:function(){
                        this.moveStause = false;
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
                    //获取体重 脂肪率  BMI数据
                    getWeightAll:function(){

                        var _this = this;

                        var data={
                            _p:common.getRequest()._p,
                            pageNum:0,
                            pageSize:7,
                            startTime:'2017-01-01 00:00:00'
                        }
                        return $.ajax({
                            type:'get',
                            url:api.weUserWeightAll+'?'+$.param(data),
                            async: true,
                            dataType: 'json',
                            success:function(res){

                               if(res.result.data){

                                res.result.data.sort(function(a, b) {
                                     return a.createTime - b.createTime
                                  });

                                _this.historyWeightLength = res.result.data.length;

                                if(_this.historyWeightLength>1){
                                    $("#weight-curve").fadeIn();
                                }else{
                                    $("#weight-curve").hide();
                                }

                                if(_this.historyWeightLength>=0){
                                    _this.homeData = res.result.data[_this.historyWeightLength-1].weight;

                                    console.log("当前体重:"+_this.homeData);
                                    _this.currentWeight = parseInt(res.result.data[_this.historyWeightLength-1].weight*2);
                                    _this.prevWeight = res.result.data[_this.historyWeightLength-2].weight;


                                    if(_this.historyWeightLength==0){
                                        _this.comparison = 0;
                                    }else{
                                       _this.comparison = ((_this.homeData*2)-(_this.prevWeight*2)).toFixed(1);
                                    }

                                    for(var i=0;i<res.result.data.length;i++){
                                        _this.recently.weightArry.push(parseFloat((res.result.data[i].weight*2)).toFixed(1));
                                       // _this.recently.dateArry.push(String(res.result.data[i].createTime).substr(0,4)+'/'+String(res.result.data[i].createTime).substr(4,2)+'/'+String(res.result.data[i].createTime).substr(6,2));
                                       _this.recently.dateArry.push(String(res.result.data[i].createTime).substr(4,2)+'/'+String(res.result.data[i].createTime).substr(6,2));
                                    }

                                  }

                               }else{

                                $("#weight-curve").hide();

                               }

                            }
                        })
                    },
                   //获取体脂数据
                    getDataFat:function(){
                        var _this = this;
                        $.ajax({
                        type:'get',
                        url:api.bodyFat,
                        async: true,
                        data:{
                            _p:common.getRequest()._p
                        },
                        dataType:'json',
                        success: function(res){
                            if(res.result.data){

                            if(res.result.data[0].protein!==null||res.result.data[0].water!==null||res.result.data[0].fat!==null){

                                _this.bodyFat = res.result.data[0];

                              //  _this.proteinPercen = (parseFloat(_this.bodyFat.protein)/parseFloat(homeWeight)).toFixed(3);
                                console.log('蛋白质:'+_this.bodyFat.protein)
                              //  console.log(_this.homeData)
                              //  console.log(  _this.proteinPercen);
                                _this.fatPercen = Number(_this.bodyFat.fat).toFixed(3);
                                _this.waterPercen = Number(_this.bodyFat.water).toFixed(3);
                              }

                              if(res.result.data[0].ohm){
                                _this.ohm=true;
                                _this.bodyFatSate= true
                             }else{
                                _this.ohm=false;
                                _this.bodyFatSate= false;
                             }



                               console.log('体脂状态:'+_this.bodyFatSate)
                               //判断体脂DOM
                               if(_this.bodyFatSate){

                                 $(".body-cloum").show();
                                 $(".BMI-cloum ul").removeClass("marginTop");
                                 $(".current-cloum").removeClass("currentTop");
                                 $(".sex-box").removeClass("currentTop");
                               }else{
                                 $(".body-cloum").hide();
                                 $(".BMI-cloum ul").addClass("marginTop");
                                 $(".current-cloum").addClass("currentTop");
                                 $(".sex-box").addClass("currentTop");
                               }


                            }else{
                                _this.bodyFatSate= false;
                                console.log('体脂状态:'+_this.bodyFatSate)
                                //判断体脂DOM
                                if(_this.bodyFatSate){
                                  $(".body-cloum").show();
                                  $(".BMI-cloum ul").removeClass("marginTop");
                                  $(".current-cloum").removeClass("currentTop");
                                  $(".sex-box").removeClass("currentTop");
                                }else{
                                  $(".body-cloum").hide();
                                  $(".BMI-cloum ul").addClass("marginTop");
                                  $(".current-cloum").addClass("currentTop");
                                  $(".sex-box").addClass("currentTop");
                                }
                            }
                           }
                        })
                    },
                    //晒一晒点击跳转
                    linkToDetial:function(Id){

                        common.linkTo2('./views/show/post.html',null,'imgId='+Id)
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
                        var codes = ['index_1','index_2','index_3','index_4','index_p'];
                       return $.ajax({
                            type: 'POST',
                            url: api.getAdvertising + '?_p=' + common.getRequest()._p,
                            processData: false,
                            async: true,
                            'contentType': 'application/json',
                            data: JSON.stringify(codes),
                            success: function(res) {
                               _this.adImgeData = JSON.parse(res);

                                if (_this.adImgeData.result.data) {

                                    if(_this.adImgeData.result.data[0][0]){
                                       _this.adImgeData1 = _this.adImgeData.result.data[0][0];
                                       _this.adImgeData1S = true;
                                    }

                                    if(_this.adImgeData.result.data[1][0]){
                                        _this.adImgeData2 = _this.adImgeData.result.data[1][0];
                                        _this.adImgeData2S = true;
                                     }

                                     if(_this.adImgeData.result.data[2][0]){
                                        _this.adImgeData3 = _this.adImgeData.result.data[2][0];
                                        _this.adImgeData3S = true;
                                     }

                                     if(_this.adImgeData.result.data[3][0]){
                                        _this.adImgeData4 = _this.adImgeData.result.data[3];

                                        if(_this.adImgeData4.length>1){
                                            _this.swiperInit("#swiper-container4");
                                        }
                                     }

                                     if(_this.adImgeData.result.data[4][0]){
                                        _this.adImgeData5 = _this.adImgeData.result.data[4][0];
                                        _this.adImgeData5S =true;
                                     }

                                }

                            }
                        })
                    },
                    //获取注册信息接口
                    getProfile: function(callback) {
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



                                    if(!res.result.data[0].weChatUser.headimgurl){
                                        if(_this.sexR==1){
                                          _this.headPortrait= './assets/images/home/boy.png';
                                        }else if(_this.sexR==2){
                                            _this.headPortrait= './assets/images/home/girl.png';
                                        }
                                    }else{
                                        _this.headPortrait = res.result.data[0].weChatUser.headimgurl;
                                    }

                                   if( _this.registeredData.height == null || _this.registeredData.age == null||_this.registeredData.gender == null){
                                       _this.registerStage =true;

                                       if(typeof(Storage)!=="undefined") {
                                        sessionStorage.registerStage = _this.registerStage;
                                       }
                                   }else{

                                     _this.registerStage =false;

                                     if(typeof(Storage)!=="undefined") {
                                        sessionStorage.registerStage = _this.registerStage;
                                       }

                                   }

                                   callback && callback();
                                }
                            }
                        })

                    },
                    //食材、运动卡路里总和计算
                    getCalorie:function(){

                        if(this.kllTotal1.length==0){
                            this.kil1 = 0
                        }else{
                            this.kil1 = eval(this.kllTotal1.join('+')).toFixed(0)
                        }

                        if(this.kllTotal2.length==0){
                            this.kil2 = 0
                        }else{
                            this.kil2 = eval(this.kllTotal2.join('+')).toFixed(0)
                        }

                        if(this.kllTotal3.length==0){
                            this.kil3 = 0
                        }else{
                            this.kil3 = eval(this.kllTotal3.join('+')).toFixed(0)
                        }

                        if(this.kllTotal4.length==0){
                            this.kil4 = 0
                        }else{
                            this.kil4 = eval(this.kllTotal4.join('+')).toFixed(0)
                        }

                        if(this.kllTotal5.length==0){
                            this.kil5 = 0
                        }else{
                            this.kil5 = eval(this.kllTotal5.join('+')).toFixed(0)
                        }

                    },
                    //换一换饮食运动数据
                    changeType:function(obj,type,Title){

                         if(this.registerStage){
                             if(this.diet==0||this.diet==1){
                                this.getdefaultkallmana(type);//默认饮食运动数据
                             }
                         }else{
                           if(this.getManiangData.mcid){
                               if(this.diet==0){
                                this.updateMykallMana(type);
                               }else{
                                this.getdefaultkallmana(type);//默认饮食运动数据
                               }

                           }else{
                             this.getdefaultkallmana(type);//默认饮食运动数据
                           }
                         }


                         var btn = $(obj);
                         btn.addClass("events");
                         setTimeout(function(){
                          btn.removeClass("events");
                         },2000);

                         _hmt.push(['_trackEvent','首页','餐单-换一换',Title]);

                    },
                    //注册后换一换饮食运动
                    updateMykallMana:function(type){
                        var _this =this;

                        if(type==1){
                            this.kllTotal1 = [];
                            this.IngredientData1 = [];
                        }else if(type==2){
                            this.kllTotal2 = [];
                            this.IngredientData2 = [];
                        }else if(type==3){
                            this.kllTotal3 = [];
                            this.IngredientData3 = [];
                        }else if(type==4){
                            this.kllTotal4 = [];
                            this.IngredientData4 = [];
                        }else if(type==5){
                            this.kllTotal5 = [];
                            this.IngredientData5 = [];
                        }

                        $.ajax({
                            type:"post",
                            url:api.updateMykallMana,
                            data:{
                                mcid:_this.getManiangData.mcid,
                                unionid:_this.unionid,
                                height: _this.registeredData.height,
                                weight:_this.homeData,
                                gender:_this.registeredData.gender,
                                age:_this.registeredData.age,
                                targetType:_this.getManiangData.targetType,
                                havedrinType:type,
                                birthDate: _this.registeredData.birthdate
                            },
                            async: false,
                            success:function(res){
                               if(res.vo){
                                var a=[];
                                    b=[];
                                for(var i=0;i<res.vo.length;i++){
                                        var obj={};
                                        obj['mykallName'] = res.vo[i].mykallName;
                                        obj['kllTotal'] = res.vo[i].kllTotal;
                                        if(type==5){
                                            obj['intake'] = Math.round(res.vo[i].intake/10)*10+'分钟';
                                        }else{
                                            obj['intake'] = Math.round(res.vo[i].intake/10)*10+'克';
                                        }
                                        a.push(obj);
                                        b.push(res.vo[i].kllTotal);
                                  }
                               if(type==1){
                                _this.IngredientData1 = a;
                                _this.kllTotal1 = b;
                             }else if(type==2){
                                _this.IngredientData2 = a;
                                _this.kllTotal2 = b;
                            }else if(type==3){
                                _this.IngredientData3 = a;
                                _this.kllTotal3 = b;
                            }else if(type==4){
                                _this.IngredientData4 = a;
                                _this.kllTotal4 = b;
                            }else if(type==5){
                                _this.IngredientData5 = a;
                                _this.kllTotal5 = b;
                            }

                               _this.getCalorie();
                               }
                            }

                        })

                    },
                    //主页健康小贴士
                    indexHealRepoArtis:function(targetType,gender,femaleType){
                        var _this =this;

                        if(gender==1){
                            femaleType=null;
                        }

                        if(targetType==4||targetType==5||targetType==6||targetType==7||targetType==8||targetType==9){
                            targetType = 1;
                        }

                        var data={
                            _p:common.getRequest()._p,
                            targetType:targetType,
                            gender:gender,
                            femaleType:femaleType
                        }

                        $.ajax({
                            type:'GET',
                            url:api.indexHealRepoArtis+'?'+$.param(data),
                            async: true,
                            dataType: 'json',
                            success:function(res){
                                if(res.result.data){

                                    for(var i=0;i<res.result.data.length;i++){
                                        var obj={}
                                        obj['title'] = res.result.data[i].title;
                                        obj['id'] = res.result.data[i].id;
                                        _this.repoArtis.push(obj);
                                    }

                                    setTimeout(function(){
                                        var length = $(".perfect-scoll ul").find("li").length;
                                        if(length>1){
                                            _this.upscroll();
                                        }
                                    },500)
                                }
                            }

                        })
                    },
                    //小贴士上下滚动
                    upscroll:function(){

                        var timer=null
                         timer=setInterval(function(){
                            $(".perfect-scoll").find("ul").animate({ marginTop: '-0.46667rem'},'slow',function(){
                                $(this).find("li:first").appendTo(this);
                                $(this).css({marginTop : "0rem"});
                            });
                        },4000);
                    },
                    //获取默认食材和运动
                    getdefaultkallmana:function(type){
                        var _this = this;

                        var data={
                            havedrinType:type
                        }
                        if(type){
                            console.log("存在"+type)
                            if(type==1){
                                this.kllTotal1 = [];
                                this.IngredientData1 = [];
                            }else if(type==2){
                                this.kllTotal2 = [];
                                this.IngredientData2 = [];
                            }else if(type==3){
                                this.kllTotal3 = [];
                                this.IngredientData3 = [];
                            }else if(type==4){
                                this.kllTotal4 = [];
                                this.IngredientData4 = [];
                            }else if(type==5){
                                this.kllTotal5 = [];
                                this.IngredientData5 = [];
                            }

                            $.ajax({
                                type: 'get',
                                url: api.getdefaultkallmana+'?'+$.param(data),
                                async: false,
                                dataType: 'json',
                                success:function(res){
                                    if(res){
                                        var a=[];
                                            b=[];
                                        for(var i=0;i<res.length;i++){

                                               for(var j=0;j<res[i].diet.length;j++){
                                                var obj={}
                                                obj['mykallName'] = res[i].diet[j].name;
                                                obj['kllTotal'] = res[i].diet[j].calorie;
                                                obj['intake'] = res[i].diet[j].quantity+res[i].diet[j].unit;
                                                a.push(obj);
                                                b.push(res[i].diet[j].calorie);
                                               }
                                        }
                                        if(type==1){
                                            _this.IngredientData1 = a;
                                            _this.kllTotal1 = b;
                                        }else if(type==2){
                                            _this.IngredientData2 = a;
                                            _this.kllTotal2 = b;
                                        }else if(type==3){
                                            _this.IngredientData3 = a;
                                            _this.kllTotal3 = b;
                                        }else if(type==4){
                                            _this.IngredientData4 = a;
                                            _this.kllTotal4 = b;
                                        }else if(type==5){
                                            _this.IngredientData5 = a;
                                            _this.kllTotal5 = b;
                                        }
                                        _this.getCalorie();

                                    }

                                }
                            })

                        }else{
                            console.log("不存在")

                            this.kllTotal1 = [];
                            this.kllTotal2 = [];
                            this.kllTotal3 = [];
                            this.kllTotal4 = [];
                            this.kllTotal5 = [];

                            this.IngredientData1 = [];
                            this.IngredientData2 = [];
                            this.IngredientData3 = [];
                            this.IngredientData4 = [];
                            this.IngredientData5 = [];
                            $.ajax({
                                type: 'get',
                                url: api.getdefaultkallmana,
                                async: true,
                                dataType: 'json',
                                success:function(res){
                                    if(res){
                                        for(var i=0;i<res.length;i++){
                                            if(res[i].havedrinType==1){
                                               for(var j=0;j<res[i].diet.length;j++){
                                                var obj={}
                                                obj['mykallName'] = res[i].diet[j].name;
                                                obj['kllTotal'] = res[i].diet[j].calorie;
                                                obj['intake'] = res[i].diet[j].quantity+res[i].diet[j].unit;
                                                _this.IngredientData1.push(obj);
                                                _this.kllTotal1.push(res[i].diet[j].calorie);
                                               }
                                            }else if(res[i].havedrinType==2){
                                                for(var j=0;j<res[i].diet.length;j++){
                                                    var obj={}
                                                    obj['mykallName'] = res[i].diet[j].name;
                                                    obj['kllTotal'] = res[i].diet[j].calorie;
                                                    obj['intake'] = res[i].diet[j].quantity+res[i].diet[j].unit;
                                                    _this.IngredientData2.push(obj);
                                                    _this.kllTotal2.push(res[i].diet[j].calorie);
                                                   }
                                            }else if(res[i].havedrinType==3){
                                                for(var j=0;j<res[i].diet.length;j++){
                                                    var obj={}
                                                    obj['mykallName'] = res[i].diet[j].name;
                                                    obj['kllTotal'] = res[i].diet[j].calorie;
                                                    obj['intake'] = res[i].diet[j].quantity+res[i].diet[j].unit;
                                                    _this.IngredientData3.push(obj);
                                                    _this.kllTotal3.push(res[i].diet[j].calorie);
                                                   }
                                            }else if(res[i].havedrinType==4){
                                                for(var j=0;j<res[i].diet.length;j++){
                                                    var obj={}
                                                    obj['mykallName'] = res[i].diet[j].name;
                                                    obj['kllTotal'] = res[i].diet[j].calorie;
                                                    obj['intake'] = res[i].diet[j].quantity+res[i].diet[j].unit;
                                                    _this.IngredientData4.push(obj);
                                                    _this.kllTotal4.push(res[i].diet[j].calorie);
                                                   }
                                            }else if(res[i].havedrinType==5){
                                                for(var j=0;j<res[i].diet.length;j++){
                                                    var obj={}
                                                    obj['mykallName'] = res[i].diet[j].name;
                                                    obj['kllTotal'] = res[i].diet[j].calorie;
                                                    obj['intake'] = res[i].diet[j].quantity+res[i].diet[j].unit;
                                                    _this.IngredientData5.push(obj);
                                                    _this.kllTotal5.push(res[i].diet[j].calorie);
                                                   }
                                            }
                                        }

                                        _this.getCalorie();

                                    }

                                }
                            })
                        }
                    },
                    //注册之后获取食材和运动
                    getMykallMana:function(mcid,unionid,height,weight,gender,birthDate,targetType){

                     this.kllTotal1 =[];
                     this.kllTotal2 = [];
                     this.kllTotal3 = [];
                     this.kllTotal4 = [];
                     this.kllTotal5 = [];

                     this.IngredientData1 =[];
                     this.IngredientData2 = [];
                     this.IngredientData3 = [];
                     this.IngredientData4 = [];
                     this.IngredientData5 = [];

                        var _this = this;
                        var data={
                            mcid:mcid,
                            unionid:unionid,
                            height:height,
                            weight:weight,
                            gender:gender,
                            birthDate:birthDate,
                            targetType:targetType
                        }
                        $.ajax({
                            type:'get',
                            url: api.getMykallMana+'?'+$.param(data),
                            async: true,
                            dataType: 'json',
                            success:function(res){
                               if(res.vo){
                                   for(var i=0;i<res.vo.length;i++){
                                        if(res.vo[i].havedrinType==1){
                                            var obj={};
                                            obj['mykallName'] = res.vo[i].mykallName;
                                            obj['kllTotal'] = res.vo[i].kllTotal;
                                            obj['intake'] = Math.round(res.vo[i].intake/10)*10+'克';
                                           _this.IngredientData1.push(obj);
                                           _this.kllTotal1.push(res.vo[i].kllTotal);

                                        }else if(res.vo[i].havedrinType==2){
                                            var obj={};
                                            obj['mykallName'] = res.vo[i].mykallName;
                                            obj['kllTotal'] = res.vo[i].kllTotal;
                                            obj['intake'] = Math.round(res.vo[i].intake/10)*10+'克';
                                           _this.IngredientData2.push(obj);
                                           _this.kllTotal2.push(res.vo[i].kllTotal);

                                        }else if(res.vo[i].havedrinType==3){
                                            var obj={};
                                            obj['mykallName'] = res.vo[i].mykallName;
                                            obj['kllTotal'] = res.vo[i].kllTotal;
                                            obj['intake'] = Math.round(res.vo[i].intake/10)*10+'克';
                                           _this.IngredientData3.push(obj);
                                           _this.kllTotal3.push(res.vo[i].kllTotal);

                                        }else if(res.vo[i].havedrinType==4){
                                            var obj={};
                                            obj['mykallName'] = res.vo[i].mykallName;
                                            obj['kllTotal'] = res.vo[i].kllTotal;
                                            obj['intake'] = Math.round(res.vo[i].intake/10)*10+'克';
                                           _this.IngredientData4.push(obj);
                                           _this.kllTotal4.push(res.vo[i].kllTotal);

                                        }else if(res.vo[i].havedrinType==5){
                                            var obj={};
                                            obj['mykallName'] = res.vo[i].mykallName;
                                            obj['kllTotal'] = res.vo[i].kllTotal;
                                            obj['intake'] = Math.round(res.vo[i].intake/10)*10+'分钟';
                                           _this.IngredientData5.push(obj);

                                           _this.kllTotal5.push(res.vo[i].kllTotal);
                                        }
                                   }

                                   _this.getCalorie();

                               }
                            }
                        })

                    },
                    //获取目标及周期
                    getManagementid:function(unionid,num){

                        var _this = this;

                        var data={
                            unionid:unionid
                        }

                        $.ajax({
                            type:"get",
                            url:api.getManagementid+'?'+$.param(data),
                            async: true,
                            success:function(res){
                                 if(res.vo){
                                    _this.getManiangData.days = res.vo.days;
                                    _this.getManiangData.mcid= res.vo.mcid;
                                    _this.getManiangData.targetType = res.vo.targetType;
                                    _this.getManiangData.targetWeight = (res.vo.targetWeight*2).toFixed(1);

                                    _this.distanceWeight =  Math.abs((_this.homeData*2)-(res.vo.targetWeight*2)).toFixed(1);

                                    if(typeof(Storage) !== "undefined"){
                                        sessionStorage.mcid= res.vo.mcid;
                                    }


                                    console.log("距离目标"+_this.distanceWeight)

                                    console.log("mcid"+_this.getManiangData.mcid);

                                    if(_this.getManiangData.targetType==3){
                                       _this.recommendData = _this.recommendArry[1];
                                    }else if(_this.getManiangData.targetType==1){
                                        _this.recommendData = _this.recommendArry[2];
                                    }else{
                                        _this.recommendData = _this.recommendArry[0];
                                    }

                                    if(num==1){//设置过目标和周期
                                        _this.showSet = true;
                                        $(".install-target,#Js-select").hide();

                                        if(_this.diet==0){
                                            _this.getMykallMana(_this.getManiangData.mcid,_this.unionid,_this.registeredData.height,_this.homeData,_this.sexR,_this.registeredData.birthdate,_this.getManiangData.targetType);//设置目标体重 后推送出来的 饮食 运动数据
                                        }else{
                                            _this.getdefaultkallmana();//默认饮食运动数据
                                        }

                                        $("#Js-weight").attr('data-id', parseInt(_this.getManiangData.targetWeight)+'斤');

                                    }

                                 }else{
                                     //没有设置过目标和周期
                                    $(".install-target,#Js-select").show();
                                    _this.showSet = false;
                                    _this.getdefaultkallmana();//默认饮食运动数据

                                    $("#Js-weight").attr('data-id', parseInt(_this.homeData*2)+'斤');

                                 }
                            }

                        })
                    },
                    //修改目标和周期
                    Tomodify:function(){

                        _hmt.push(['_trackEvent','首页','首页设置目标','修改按钮']);

                        var _this = this;
                           this.showSet =false;


                           this.getManagementid(this.unionid,2);//获取目标和周期

                           setTimeout(function(){

                            $("#Js-cycle").attr("data-id",_this.getManiangData.days+'天');
                            $("#Js-cycle").text(_this.getManiangData.days+'天');


                            $("#Js-weight").attr('data-id',parseInt(_this.getManiangData.targetWeight)+'斤');
                            $("#Js-weight").val(parseInt(_this.getManiangData.targetWeight)+'斤');

                            _this.targetWach = parseInt(_this.getManiangData.targetWeight)+'斤';

                            _this.typeNumber = _this.getManiangData.targetType;//目标类型

                            _this.targetkg = _this.getManiangData.targetWeight;//目标体重
                            _this.targetDays = _this.getManiangData.days;//目标天数

                            $(".install-target").fadeIn();

                        },300)
                    },
                    //设置目标及周期
                    addWeightManagement:function(typeNumber,currentWei,targetWeight,dayNum,sex,year,height,unionid){

                        var _this =this;
                        if(typeNumber==null){
                            typeNumber = 1
                        }


                        $.ajax({
                            type: 'POST',
                            url: api.addWeightManagement,
                            async: true,
                            data: {
                                _p:common.getRequest()._p,
                                targetType: typeNumber,//目标类型
                                currentWeight: currentWei,//当前体重kg
                                targetWeight: targetWeight/2,//目标体重kg
                                days:dayNum,//targetWeight
                                gender:sex,
                                birthDate:year,
                                height:height,
                                unionid:unionid
                            },
                            success:function(res){
                                if(res==true){
                                    $(".install-target,#Js-select").hide();
                                     _this.showSet = true;
                                     _this.getManagementid(_this.unionid,1);//获取目标和周期
                                   }else{
                                    alert("设置目标周期失败！");
                                   }
                            }
                        })
                    },
                    like:function(item){
                        var data = {
                            _p: common.getRequest()._p,
                            picid: item.picid
                        }
                        var _this = this;
                        $.ajax({
                            type: 'POST',
                            url: api.likeImg + '?' + $.param(data),
                            dataType: 'json',
                            success: function(res) {
                                if (res.result.status === 0) {
                                    item.light = !item.light;
                                    item.light ? item.thuupSum++ : item.thuupSum--
                                   this.IndexImg = JSON.parse(JSON.stringify(this.IndexImg));
                                }
                            }.bind(this),
                            error: function() {}
                        })
                    },
                    daytataSelect1:function(dom,num){

                        var that = this;

                        var selectDateDom = $(dom);
                        // 初始化时间
                        var now = new Date();
                        var nowYear = now.getFullYear();
                        var nowMonth = now.getMonth() + 1;
                        var nowDate = now.getDate();

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




                         function formatYear(nowYear) {
                                var arr = [];
                                for (var i = nowYear; i <= nowYear+2; i++) {
                                    arr.push({
                                        id: i + '',
                                        value: i + '年'
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

                                    if(num==1){
                                        that.modify.prepDay = selectOneObj.id + selectTwoObj.id + selectThreeObj.id;
                                        console.log("预生产期:"+that.modify.prepDay);
                                    }else if(num==2){
                                        that.modify.childBirth = selectOneObj.id + selectTwoObj.id + selectThreeObj.id;
                                        console.log("小孩出生:"+that.modify.childBirth);
                                    }


                                }
                            });

                            if(num==1){
                                _hmt.push(['_trackEvent','首页','首页完善资料','预生产期']);
                            }else if(num==2){
                                _hmt.push(['_trackEvent','首页','首页完善资料','出生日期']);
                            }

                        });

                    },
                    //年龄下拉选择弹窗事件
                    daytataSelect: function(dom,num) {

                        _hmt.push(['_trackEvent','首页','首页完善资料','年龄选择']);

                        var that = this;

                        var selectDateDom = $(dom);
                        // 初始化时间
                        var now = new Date();
                        var nowYear = now.getFullYear();
                        var nowMonth = now.getMonth() + 1;
                        var nowDate = now.getDate();

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
                                    if(num==3){
                                        that.modify.year = selectOneObj.id + selectTwoObj.id + selectThreeObj.id;
                                        console.log("年龄:"+that.modify.year)
                                    }
                                }
                            });
                        });
                    },
                    //获取目标体重数据
                    getTargetWeight:function(){
                        var min = this.targetMinWeight;

                        for (var i = min; i <= 400; i++) {
                            var data = {
                                id: i+'斤',
                                value: i+'斤',
                                kg:i
                            }
                            this.targetWeight.push(data);
                        }
                        return this.targetWeight;

                    },
                    //目标体重选择
                    targetSelectWeight:function(){
                       var _this = this;

                       $("#Js-weight").on('click',function(){

                        _hmt.push(['_trackEvent','首页','目标体重设置','目标体重设置']);

                        if(_this.registerStage){
                            $(".registration-model-content").show();
                        }else{
                            $("#mastBg").show();
                            var dom = $(this);
                            var bankId = dom.attr('data-id');
                            var bankSelect = new iosSelect(1, [_this.getTargetWeight()], {
                              itemHeight: 50,
                              itemShowCount: 5,
                              oneLevelId: bankId,
                              callback: function(obj) {
                                   _this.targetWach = obj.value;

                                   _this.targetkg = obj.kg;
                                   console.log("目标体重选择:"+obj.kg);
                                   dom.attr('data-id', obj.id);

                                   var disWeight = Math.abs((_this.homeData*2)-obj.kg);


                                   if(disWeight>=4){
                                    $("#Js-cycle").attr('data-id',Math.ceil(disWeight/4)*14+'天');
                                    $("#Js-cycle").text(Math.ceil(disWeight/4)*14+'天');
                                    _this.targetDays = Math.ceil(disWeight/4)*14;//目标天数
                                    $(".error").hide();
                                   }else{

                                    $("#Js-cycle").attr('data-id','14天');
                                    $("#Js-cycle").text('14天');
                                    _this.targetDays = 14;//目标天数
                                    $(".error").hide();
                                   }

                                   console.log("设置的差值："+disWeight);

                                   if(Number(_this.homeData*2)-obj.kg>=5){
                                       $(".select-box").fadeIn(function(){
                                            _this.fatUlStase = true;
                                            _this.muscleUlStase = false;
                                       });

                                       if(_this.fatUlStase){
                                          _this.typeNumber=5;
                                       }else{
                                          _this.typeNumber=null;
                                       }

                                       console.log("默认："+_this.typeNumber);
                                    }else if(obj.kg>=Number(_this.homeData*2)){
                                        $(".select-box").fadeIn(function(){
                                           _this.fatUlStase = false;
                                           _this.muscleUlStase = true;
                                     });

                                   if(_this.muscleUlStase){
                                      _this.typeNumber=3;
                                   }else{
                                     _this.typeNumber=null;
                                   }
                                  console.log("默认："+_this.typeNumber);
                                 }else{
                                      $(".select-box").hide();
                                      _this.fatUlStase = false;
                                      _this.muscleUlStase = false;
                                      _this.typeNumber=null;
                                      console.log("默认："+_this.typeNumber);
                                 }

                              }
                          });
                        }
                    })

                    },
                    //获取目标周期时间
                    getTargetCycle:function(){

                        for (var i = 1; i <=26; i++) {
                            var data = {
                                id: i*14+'天',
                                value: i*14+'天',
                                day:i*14
                            }
                            this.targetCycle.push(data);
                        }
                        return this.targetCycle;

                    },
                    //目标周期选择
                    targetSelectCycle:function(){

                        var _this = this;
                        $("#Js-cycle").click(function(){

                            _hmt.push(['_trackEvent','首页','目标周期设置','目标周期设置']);

                            $("#mastBg").show();
                           var dom = $(this);
                           var bankId = dom.attr('data-id');
                           var bankSelect = new iosSelect(1, [_this.getTargetCycle()], {
                             itemHeight: 50,
                             itemShowCount: 5,
                             oneLevelId: bankId,
                             callback: function(obj) {

                                 _this.targetDays = obj.day;
                                  dom.html(obj.value);
                                  dom.attr('data-id', obj.id);
                                  console.log("目标天数:"+ _this.targetDays);
                             }
                         });

                        })

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
                                    that.modify.height = (obj.value).replace('cm',"");
                                    dom.find('input').val(obj.value);
                                    dom.find('input').attr('data-id', obj.id);
                                }
                            });

                            _hmt.push(['_trackEvent','首页','首页完善资料','身高选择']);
                        });
                    },
                    //获取身高数据
                    getStatureData: function() {
                        for (var i = 70; i <= 220; i++) {
                            var data = {
                                id: i+'cm',
                                value: i+'cm'
                            }
                            this.statureArr.push(data);
                        }
                        return this.statureArr;
                    },
                    //注册接口
                    savePersoInfo: function() {

                        _hmt.push(['_trackEvent','首页','首页完善资料','确定按钮']);

                        var _this = this;
                        var nowDate = common.getDate2().replace(/-/g, '');

                        if(_this.modify.year>nowDate){

                          alert("你选择的日期有误，请重新选择!");
                        }else{


                        if(_this.modify.sex==1){
                            _this.modify.prepDay = null;
                            _this.modify.childBirth = null;
                            _this.pregData = 1;//默认
                         }


                         if(_this.pregData==2){
                            _this.modify.childBirth = null;
                         }else if(_this.pregData==3){
                            _this.modify.prepDay = null;
                         }


                        $.ajax({
                            type: "POST",
                            url: api.updateUserInfo,
                            data: {
                                _p: common.getRequest()._p,
                                unionid: _this.unionid,
                                name: _this.registeredData.weChatUser.nickname,
                                gender: _this.modify.sex,
                                height: _this.modify.height,
                                birthdate: _this.modify.year,
                                femaleType: _this.pregData,
                                expectedDate:_this.modify.prepDay,
                                childBirthday: _this.modify.childBirth
                            },
                            success: function(res) {
                                var resData = JSON.parse(res);
                                if (resData.result.status == 0) {
                                    _this.closeModel();//关闭注册弹框



                                    _this.getProfile(function() {
                                        _this.BMI = bmi.toMathBmi(_this.homeData, _this.registeredData.height); //计算BMI值
                                        _this.standardWeight = bmi.toMathSBW(_this.sexR, _this.registeredData.height); //计算标准体重
                                        _this.bodyTypeChinese = bmi.getBodyTypeChinese(_this.BMI.bmi);


                                        if(_this.sexR==1){
                                            _this.targetMinWeight = parseInt((_this.registeredData.height-80)*0.7*0.9*0.8);
                                        }else{
                                            _this.targetMinWeight = parseInt((_this.registeredData.height-70)*0.6*0.9*0.8);
                                        }

                                        console.log("目标体重最小值"+_this.targetMinWeight);

                                         _this.getTargetWeight();//目标体重的最小值

                                        _this.generateReport();

                                        _this.getManagementid(_this.unionid,1);//获取目标和周期

                                        setTimeout(function(){

                                            if(_this.management==0){
                                                if(_this.getManiangData.mcid){//如果设置了目标体重
                                                    $("#isModify-Target").show();//是否修改目标体重弹框
                                                }
                                            }

                                            if(_this.healthTip==0){
                                                _this.indexHealRepoArtis(_this.getManiangData.targetType,_this.sexR,_this.registeredData.femaleType);//注册推送小贴士列表
                                            }else{

                                            }

                                        },400)
                                    });
                                }else{
                                    alert("修改信息失败");
                                }
                            }
                        })
                      }
                    },
                    //关闭修改目标体重管理
                    closeIsTarget:function(){
                        $("#isModify-Target").hide();//是否修改目标体重弹框
                    },
                    //去修改目标体重管理
                    goToModifyTarget:function(){


                        $("#isModify-Target").hide();//是否修改目标体重弹框
                        if(this.getManiangData.mcid){//已经设置过目标体重
                            this.Tomodify();
                        }else{

                        }
                      // this.showSet =false;
                      // $(".install-target").fadeIn();
                         var scrollTop = $(".target-title").offset().top;
                        $(window).scrollTop(scrollTop);
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

                           var max,min

                            //chartsData数据
                            var chartsData = {
                                date: null,
                                weight: null
                            };

                            chartsData.date = _this.recently.dateArry;
                            chartsData.weight = _this.recently.weightArry;


                             max = _this.historyWeightLength == 0 ? 0 : (_this.recently.weightArry[0]);
                             min = _this.historyWeightLength == 0 ? 0 : (_this.recently.weightArry[0]);


                             for (var i = 0; i < _this.recently.weightArry.length; i++){

                                if ((_this.recently.weightArry[i]-0) >= max) {
                                    max = _this.recently.weightArry[i];
                                }

                                if ((_this.recently.weightArry[i]-0) < min) {
                                    min = _this.recently.weightArry[i];
                                }
                             }


                             var temp = parseInt(max - min);

                             if (temp == 0) {
                                max = parseFloat((max) + 12);
                                min = min - 12 > 0 ? parseFloat((min) - 12)  : min;
                                console.log('max1:' + max);
                                console.log('min1:' + min);
                            } else {
                                max = (parseFloat(max + temp / 8)).toFixed(1);
                                min = ((min) - temp / 2) ? (parseFloat((min - temp)/ 2)).toFixed(1) : min;
                                console.log('max2:' + max);
                                console.log('min2:' + min);
                            }

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
                                    show: false,
                                    x: 'left',
                                },
                                grid: {
                                    left: '9%',
                                    right: '9%',
                                    bottom: '45',
                                    containLabel: false

                                },
                                xAxis: {
                                    type: 'category',
                                    boundaryGap: false,
                                    axisLine: {
                                        lineStyle: {
                                           // color: 'rgba(142,142,147,1)'
                                        }
                                    },
                                    axisPointer:{
                                        snap: true,
                                        lineStyle: {
                                            color: '#004E52',
                                            opacity: 0.5,
                                            width: 2
                                        },
                                        label: {
                                            show: true,
                                            backgroundColor: '#004E52'
                                        },
                                        handle: {
                                            show: true,
                                            color: '#004E52'
                                        }
                                    },
                                    splitLine: {
                                        show: false
                                    },

                                    data: []
                                },
                                yAxis: {
                                    show: false,
                                    min: min,
                                    max: max,
                                    type: 'value'
                                },
                                // dataZoom: [{
                                //     type: 'inside',
                                //     show: false,
                                //     start: 100,
                                //     end: 40
                                //  }
                                //  {
                                //     start: 0,
                                //     end: 0,
                                //     //handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
                                //     handleSize: '80%',
                                //     handleStyle: {
                                //         color: '#fff',
                                //         shadowBlur: 3,
                                //         shadowColor: 'rgba(0, 0, 0, 0.6)',
                                //         shadowOffsetX: 2,
                                //         shadowOffsetY: 2
                                //     },
                                //     textStyle: {
                                //         color: '#f9860b'
                                //     }
                                // }
                              // ],
                                series: [{
                                    name: '体重',
                                    type: 'line',
                                    data: [1, 1, 1, 1],
                                    smooth: false, //平滑过渡
                                    // symbol: 'circle',
                                    symbolSize: 10,
                                    sampling: 'average',
                                    label: {
                                        normal: {
                                            show: true,
                                            color: '#04040f',
                                            formatter: function(params) {
                                                return params.data+'斤';
                                            }
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
                                    },
                                    areaStyle: {
                                        normal: {
                                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                                offset: 0,
                                                color: '#fff2d9'
                                            }, {
                                                offset: 1,
                                                color: '#fffbf5'
                                            }])
                                        }
                                    }
                                }],
                                animationEasing: 'elasticOut',
                                animationDelayUpdate: function (idx) {
                                    return idx * 5;
                                }
                            };

                            // var end = 100 - 100 *(5 / _this.historyWeightLength);


                            //   if(end>88){
                            //      end = 88;
                            //   }else if(end<=0){
                            //     end = 20;
                            //   }

                            // _this.chartsOption.dataZoom[0].end = end;

                            console.log(chartsData.weight);
                            console.log(chartsData.date);

                            _this.chartsOption.xAxis.data = chartsData.date;
                            _this.chartsOption.series[0].data = chartsData.weight;
                            var myChart = echarts.init($('#JS-echars')[0]);
                             myChart.setOption(_this.chartsOption);
                    },
                    //打开弹框
                    openModel:function(){

                        var _this = this;
                        this.flags = true;
                       $(".registration-model-content").show();

                       if(this.registerStage){//没注册

                        this.modify.height=170;
                        this.modify.year=19931010;

                        _hmt.push(['_trackEvent','首页','完善按钮','点击完善按钮']);


                    }else{//注册

                        _hmt.push(['_trackEvent','首页','修改按钮','点击修改按钮']);

                        this.modify.height= this.registeredData.height;
                        this.modify.sex= this.registeredData.gender;
                        this.modify.year= this.registeredData.birthdate;

                        this.pregData = this.registeredData.femaleType;//孕期类型
                        this.modify.prepDay = this.registeredData.expectedDate;//孕期时间
                        this.modify.childBirth = this.registeredData.childBirthday;//BB出生时间

                        //性别
                        _this.changeSex(this.registeredData.gender);


                       //孕期时间
                       if(this.registeredData.expectedDate){
                           var  preproduction = $("#JS-preproduction").find("input");
                           preproduction.attr("data-year",this.registeredData.expectedDate.substr(0,4));
                           preproduction.attr("data-month",this.registeredData.expectedDate.substr(4,2));
                           preproduction.attr("data-date",this.registeredData.expectedDate.substr(6,2));

                           var year2 = this.registeredData.expectedDate.substr(0,4);
                           var month2 = this.registeredData.expectedDate.substr(4,2);
                           var date2 = this.registeredData.expectedDate.substr(6,2);
                           preproduction.val(year2+'-'+month2+'-'+date2);
                       }else{
                          var  preproduction = $("#JS-preproduction").find("input");
                          preproduction.val('(填选)');
                       }

                       //BB出生时间
                       if(this.registeredData.childBirthday){

                         var lactation = $("#JS-lactation").find("input");

                         lactation.attr("data-year",this.registeredData.childBirthday.substr(0,4));
                         lactation.attr("data-month",this.registeredData.childBirthday.substr(4,2));
                         lactation.attr("data-date",this.registeredData.childBirthday.substr(6,2));

                        var year1 = this.registeredData.childBirthday.substr(0,4);
                        var month1 = this.registeredData.childBirthday.substr(4,2);
                        var date1 = this.registeredData.childBirthday.substr(6,2);
                        lactation.val(year1+'-'+month1+'-'+date1);

                       }else{
                        var lactation = $("#JS-lactation").find("input");
                        lactation.val('(填选)');
                       }

                        //身高
                        var statureDom = $("#JS-stature").find("input");
                        statureDom.attr("data-id",this.registeredData.height+'cm');
                        statureDom.val(this.registeredData.height+'cm');
                        //年龄
                        var yearDom = $("#JS-year").find("input");
                        yearDom.attr("data-year",this.registeredData.birthdate.substr(0,4));
                        yearDom.attr("data-month",this.registeredData.birthdate.substr(4,2));
                        yearDom.attr("data-date",this.registeredData.birthdate.substr(6,2));
                        var year = this.registeredData.birthdate.substr(0,4);
                        var month = this.registeredData.birthdate.substr(4,2);
                        var date = this.registeredData.birthdate.substr(6,2);
                        yearDom.val(year+'-'+month+'-'+date);
                        //孕期类型
                        $(".select-box .pay_list_c2").each(function(){
                            var preg = $(this).data("preg");
                            if(_this.registeredData.femaleType==preg){
                                $(".pay_list_c2").removeClass("active");
                                $(this).addClass("active");
                            }
                        })
                        //孕期 哺乳期不通展示
                        if(_this.registeredData.femaleType==2){
                            $("#JS-preproduction").show();
                            $("#lactation").hide();
                          }else if(_this.registeredData.femaleType==3){
                              $("#lactation").show();
                              $("#JS-preproduction").hide();
                          }else if(_this.registeredData.femaleType==1){
                            $("#lactation,#JS-preproduction").hide();
                          }
                    }
                    },
                   //主题页注册没注册判断
                   judgeGoTo:function(code,Title){

                      if(this.registerStage){//没注册
                          this.goToRecommended(code);
                      }else{
                        if(this.getManiangData.mcid){
                            this.goToRecommended2(code)
                        }else{
                            this.goToRecommended(code);
                        }
                      }

                      _hmt.push(['_trackEvent','首页','教你吃',Title]);

                   },
                   //跳转到健康报表
                   goToReport:function(){
                        if(this.registerStage){
                            $(".registration-model-content").show();
                        }else{
                            common.linkTo2('./views/report/report.html');
                        }
                     },
                     //广告跳转
                    goToAd:function(obj,title){

                        if(!obj){
                            if(title=='目标管理'){
                                if(this.registerStage){
                                  $(".registration-model-content").show();
                                }else{
                                    common.linkTo2('./views/goal/goal.html');
                                }
                            }else if(title=='称重打卡'){
                                if(this.registerStage){
                                    $(".registration-model-content").show();
                                }else{
                                    common.linkTo2('./views/goal/card.html');
                                }

                            }else if(title=='健康报表'){
                                if(this.registerStage){
                                    $(".registration-model-content").show();
                                }else{
                                    common.linkTo2('./views/goal/report.html');
                                }
                            }
                        }else{
                            location.href=obj;
                        }
                    },
                    //目标跳转
                    goToTarget:function(title){
                        if(title=='目标管理'){

                          if(this.registerStage){
                             $(".registration-model-content").show();
                          }else{
                             common.linkTo2('./views/goal/goal.html');
                          }

                        }else if(title=='称重打卡'){
                            if(this.registerStage){
                                $(".registration-model-content").show();
                            }else{
                                common.linkTo2('./views/goal/card.html');
                            }
                        }else if(title=='健康报表'){

                            if(this.registerStage){
                                $(".registration-model-content").show();
                            }else{
                                common.linkTo2('./views/goal/report.html');
                            }
                        }
                    },
                    //漂浮广告跳转
                    goToPut:function(obj){
                        location.href = obj;
                    },
                   //小贴士跳转
                   goToTips:function(){
                    common.linkTo2('./views/knowledge/knowledge.html');
                    _hmt.push(['_trackEvent','首页','首页健康小贴士图片','点击跳转健康小贴士']);
                   },
                   //跳转到小贴士
                   goToTipsImg:function(){
                    common.linkTo2('./views/tips/tips.html');
                    _hmt.push(['_trackEvent','首页','食物估量贴士','食物估量贴士跳转']);
                   },
                   //注册弹框
                   goToRegister:function(){
                       $(".registration-model-content").show();
                       _hmt.push(['_trackEvent','首页','比比看','比比看你的身材跳转']);
                   },
                   //跳转到查看报表
                   goHealthStatements:function(){

                    common.linkTo2('./views/goal/report.html');

                    _hmt.push(['_trackEvent','首页','首页健康报表','比比看']);
                   },
                   //跳转文章列表页
                   linkList:function(code){

                    if(typeof(Storage) !== "undefined"){
                        sessionStorage.artical= code;
                    }
                     common.linkTo2('./views/knowledge/artical.html');
                   },
                   //注册有目标体重
                   goToRecommended2:function(code){

                    if(typeof(Storage) !== "undefined"){
                        sessionStorage.mealType= code;
                    }
                      common.linkTo2('./views/recommendedinner/breakfast.html');
                    },
                    //进入主题页
                    goToRecommended:function(code){

                        if(typeof(Storage) !== "undefined"){
                            sessionStorage.recommended= code;
                        }
                        common.linkTo2('./views/recommended/recommended.html');
                    },
                    //换一换进入发布页面传值code
                    goToCode:function(code,Title){

                        if(typeof(Storage) !== "undefined"){
                            sessionStorage.code= code;
                        }

                        sessionStorage.removeItem("backStause");

                        common.linkTo2('./views/show/submit.html');

                        _hmt.push(['_trackEvent','首页','餐单打卡',Title]);

                    },
                    //大家嗮一嗮进入
                    goToShow:function(){
                        common.linkTo2('./views/show/show.html');
                    },
                    //关闭弹框
                    closeModel:function(){
                        $(".registration-model-content").hide();
                       // this.flags = false;

                       _hmt.push(['_trackEvent','首页','首页完善资料','关闭按钮']);
                    }

                }
            })
      //  }, 50)
    })

})
