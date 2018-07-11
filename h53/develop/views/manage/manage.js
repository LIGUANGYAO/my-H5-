
require(['jquery', 'Vue', 'FooterBar', 'common', 'api','Swiper','PageLoad'], function($, Vue, FooterBar, common, api,Swiper,PageLoad) {
    $(function() {

        var FooterBar_vue = FooterBar.init();
        var PageLoad_vue = PageLoad.init();

        // settimeout 防止页面假死
        setTimeout(function() {
            new Vue({
                el: '#app',
                data: {
                    unionidStorage:null,
                    adImge:null,
                    ManagementVo:{},
                    progInfo:null,
                    holdTime:null,
                    heightStorage:null,
                    ageStorage:null,
                    genderStorage:null,
                    targetType:null,
                    homeData:{},
                    CardVo:{},
                    CardVoIs:{},//判断是否打卡
                    curentDay:null,
                    foodDay:null,
                    MykallMana:null,
                    breakfast:[],//早餐
                    dinner:[],//晚餐
                    lunch:[],//午餐
                    addFood:[],//加餐
                    sport:[],//运动
                    stageObject:[],
                    kllTotal1:[],
                    kllTotal2:[],
                    kllTotal3:[],
                    kllTotal4:[],
                    kllTotal5:[],
                    allCalorie:null,
                    listData:null,
                    adImgeData:{},
                    adImgeData1:null,
                    currentWeightStorage:null,
                    storageType:null,
                    pageLoad:false
                },
                components: {
                    'footer-bar': FooterBar_vue,
                    'page-load': PageLoad_vue
                },
                created: function() {

                    this.unionidStorage = sessionStorage.unionidStorage;//首页缓存过来的unionid
                    this.heightStorage = sessionStorage.Height;//首页缓存过来的身高
                    this.ageStorage = sessionStorage.Age;//首页缓存过来的年龄
                    this.genderStorage = sessionStorage.Gender;//首页缓存过来的性别
                   // this.currentWeightStorage =  sessionStorage.currentWeight;//获取缓存当前体重
                },
                mounted: function() {

                    var _this =this;

                    //获取当前时间-1
                    this.curentDay = common.addDate(common.getDate2(),-1); 
                      
                    //当前时间的时间戳
                    this.curentStamp = common.getDate2();


                    //当天时间 2018-04-04
                    this.foodDay = common.getDate2();

                    console.log("当前时间:"+this.foodDay)


                    this.getAdvertising();//获取广告
                    this.getsignIs(this.unionidStorage,common.getDate2(),1)//判断今天是否打卡

                   var a= this.getManagementid(this.unionidStorage,1);//获取体重管理

                   $.when(a).then(function(a){
                       _this.pageLoad = true;
                      _this.getMykallMana(_this.unionidStorage,_this.foodDay);//获取今天的食材、运动信息
                   })

                   this.init();
                },
                methods:{

                    init:function(){
                        var _this = this;
                        $("#btn-card").on('click.a',function(){
                            _this.addsign();//打卡
                       })

                       $(".top-a ul li").click(function(){
                             $(this).addClass("active").siblings().removeClass();
                             var index = $(this).index();
                             $(".middle-b,.top-a-btn2").hide();
                             $(".middle-b").eq(index).show();
                             $(".top-a-btn2").eq(index).show();

                             var dataName = $(this).data("name");
                             _hmt.push(['_trackEvent','体重管理打卡页','体重管理打卡页',dataName]);
                       })

                       this.swiperInit();

                    },
                    //获取体重秤广告位
                    getAdvertising:function(){
                        var _this = this;
                        var codes = ['weight_1', 'weight_2'];

                        $.ajax({
                            type: 'POST',
                            url: api.getAdvertising + '?_p=' + common.getRequest()._p,
                            processData: false,
                            'contentType': 'application/json',
                            data: JSON.stringify(codes),
                            success: function(res){
                                _this.adImgeData = JSON.parse(res);
                                if (_this.adImgeData.result.data){
                                    if(_this.adImgeData.result.data[0]){
                                        if(_this.adImgeData.result.data[0][0]){
                                        _this.adImgeData1 = _this.adImgeData.result.data[0];
                                        if(_this.adImgeData1.length>1){
                                            _this.swiperInit2("#swiper-container2");
                                        }
                                    }
                                    }

                                    

                                }
                            }
                        })

                    },
                    swiperInit2:function(dom){
                        var _this =this;
                         //幻灯片广告
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
                                    _hmt.push(['_trackEvent','体重管理','体重管理页广告',adTitle]);
                              }else{

                              }
                            }

                        })

                    },
                    //初始化幻灯片
					swiperInit: function() {

                        var _this =this;
				        //幻灯片广告
						   setTimeout(function(){
                            var swiper = new Swiper('#swiper-container', {
                                prevButton:'.swiper-button-prev',
                                nextButton:'.swiper-button-next',
                                slidesPerView : 'auto',
                                preventClicksPropagation: true
                            });
                           },300)
						

                           setTimeout(function(){

                              $("#swiper-container ul li").click(function(){

                                $(this).addClass('active').siblings().removeClass('active');

                                var time = $(this).data('time');

                                var index = $(this).data('index');

                                var singSate = $(this).data('sate');

                                 console.log("点击当前时间："+ time);


                                 _hmt.push(['_trackEvent','体重管理打卡页','体重管理打卡页','第'+index+'天']);


                                 _this.getsignIs(_this.unionidStorage,time,2,singSate);//点击判断当前时间是否打卡


                                 if(time > _this.curentStamp){
                                    time = _this.curentStamp;
                                    $(".middleBg").show();
                                    $(".middleBg p span").text(index);
                                 }else{
                                    $(".middleBg p span").text(index);
                                    $(".middleBg").hide();
                                 }

                                _this.getMykallMana(_this.unionidStorage,time);//不同时间段套餐信息

                              })
                           },500)
					
					},
                    //获取当前体重
                    getWeight: function() {
                    var _this = this;
                        $.ajax({
                        type: 'get',
                        url: api.getHomeTopDate,
                        data: {
                            _p: common.getRequest()._p
                        },
                        async: false,
                        success: function(res) {
                            _this.homeData = res[0];
                           
                        }
                    })
                  },
                   //获取体重管理
                   getManagementid:function(unionid,num){
                       var _this =this;

                       var data={
                        unionid:unionid
                       }
                      return $.ajax({
                        type: 'get',
                        url:api.getManagementid+'?'+$.param(data),
                        async:true,
                        success:function(res){

                        if(res){
                                
                          _this.ManagementVo =res;

                          _this.listData = res.list;//阶段时间

                          if(res.vo){
                            
                            _this.progInfo = res.vo.progInfo
                            _this.targetType = res.vo.targetType;//获取到的targetType

                            _this.currentWeightStorage = res.vo.currentWeight;//返回体重

                             var  star = common.formatDate(res.vo.startDate);

                             var  end = common.formatDate(res.vo.endDate);

                             console.log("开始日期："+star);

                             console.log("结束日期："+end);

                            var daty = Math.floor(Number(res.vo.endDate - res.vo.startDate)/1000 / 60 / 60 / 24)+1;
                            console.log("共多少天"+daty);

                            if(num==1){
                                
                               }

                               
                          if(num==2){

                            var stageNumber = Math.floor(Number(res.vo.endDate - res.vo.startDate)/1000 / 60 / 60 / 24/14)+1;

                            console.log("多少阶段"+stageNumber);

                            var stageArry = [];

                            for(var i=1;i<=stageNumber;i++){
                                stageArry.push(i);
                            }


                                //更改按钮缓存targetType
                                if(typeof(Storage)!=="undefined"){
                                    sessionStorage.storageType =  res.vo.targetType;

                                    sessionStorage.stageArry =  stageArry;//阶段数

                                    sessionStorage.stageTargetWeight = (res.vo.targetWeight)*2;//目标体重

                                    sessionStorage.stageN =  res.stage;//处于第几阶段
                                }

                                common.linkTo2("./question.html");
                            }


                          }
                    }
                         
                        }
                      })
                   },
                   //食材、运动卡路里总和计算
                getCalorie:function(){

                    var kil1,kil2,kil3,kil4,kil5

                  if(this.kllTotal1.length==0){
                        kil1 = 0
                    }else{
                        kil1 = eval(this.kllTotal1.join('+'))
                    }

                    if(this.kllTotal2.length==0){
                        kil2 = 0
                    }else{
                        kil2 = eval(this.kllTotal2.join('+'))
                    }

                    if(this.kllTotal3.length==0){
                        kil3 = 0
                    }else{
                        kil3 = eval(this.kllTotal3.join('+'))
                    }

                    if(this.kllTotal4.length==0){
                        kil4 = 0
                    }else{
                        kil4 = eval(this.kllTotal4.join('+'))
                    }

                     this.allCalorie = kil1+kil2+kil3+kil4;
                   },
                   //获取食材、运动信息
                   getMykallMana:function(unionid,daysDate){
                     var _this =this;

                     this.breakfast = [];
                     this.lunch = [];
                     this.dinner = [];
                     this.addFood = [];
                     this.sport = [];
 
                     this.kllTotal1 = [];
                     this.kllTotal2 = [];
                     this.kllTotal3 = [];
                     this.kllTotal4 = [];
                     this.kllTotal5 = [];

                     var data={
                        daysDate: daysDate,
                        mcid: _this.ManagementVo.vo.mcid,
                        unionid:unionid
                     }

                     $.ajax({
                        type: 'GET',
                        url:api.getMykallMana+'?'+$.param(data),
                        async:false,
                        success:function(res){
                            _this.MykallMana=res.vo;
                            
                            if(_this.MykallMana==null||_this.MykallMana[0]===undefined){
                                console.log("无数据");
                                _this.addMykallMana(_this.unionidStorage,daysDate);//添加食物  运动信息
                           
                            }else{

                                console.log("获取的数据"+_this.MykallMana.length);

                                console.log("有数据")
                                
                                var dataMana = _this.MykallMana;
    
                                    for(var i=0;i<dataMana.length;i++){
                                        if(dataMana[i].havedrinType==1){//早餐
                                        var  obj ={};
                                        obj["mykallName"] = dataMana[i].mykallName,
                                        obj["kllTotal"] = dataMana[i].kllTotal,
                                        obj["intake"] = dataMana[i].intake,
                                        obj["mykallUrl"] = dataMana[i].mykallUrl
                                        _this.breakfast.push(obj);
                                    
                                        _this.kllTotal1.push(dataMana[i].kllTotal);

                                        }else if(dataMana[i].havedrinType==2){//午餐
    
                                        var  obj ={};
                                        obj["mykallName"] = dataMana[i].mykallName,
                                        obj["kllTotal"] = dataMana[i].kllTotal,
                                        obj["intake"] = dataMana[i].intake,
                                        obj["mykallUrl"] = dataMana[i].mykallUrl
                                        _this.lunch.push(obj);
    
                                         _this.kllTotal2.push(dataMana[i].kllTotal);
                                        
                                        }else if(dataMana[i].havedrinType==3){//晚餐
    
                                        var  obj ={};
                                        obj["mykallName"] = dataMana[i].mykallName,
                                        obj["kllTotal"] = dataMana[i].kllTotal,
                                        obj["intake"] = dataMana[i].intake,
                                        obj["mykallUrl"] = dataMana[i].mykallUrl
                                        _this.dinner.push(obj);
    
                                        _this.kllTotal3.push(dataMana[i].kllTotal);
                                      
                                        }else if(dataMana[i].havedrinType==4){//加餐
    
                                        var  obj ={};
                                        obj["mykallName"] = dataMana[i].mykallName,
                                        obj["kllTotal"] = dataMana[i].kllTotal,
                                        obj["intake"] = dataMana[i].intake,
                                        obj["mykallUrl"] = dataMana[i].mykallUrl
                                        _this.addFood.push(obj);
    
                                         _this.kllTotal4.push(dataMana[i].kllTotal);
                                        
                                        }else if(dataMana[i].havedrinType==5){//运动
    
                                        var  obj ={};
                                        obj["mykallName"] = dataMana[i].mykallName,
                                        obj["kllTotal"] = dataMana[i].kllTotal,
                                        obj["intake"] = dataMana[i].intake,
                                        obj["mykallUrl"] = dataMana[i].mykallUrl
                                            _this.sport.push(obj);
                                            _this.kllTotal5.push(dataMana[i].kllTotal);
                                        }
                                    }

                                    _this.getCalorie();

                            }
                              
                             
                        }
                     })

                   },
                   //换一换点击2秒执行
                   changeTime:function(obj,Type){

                    var typeName;

                    if(Type==1){
                        typeName='早餐';
                    }else if(Type==2){
                        typeName='午餐';
                    }else if(Type==3){//晚餐
                        typeName='晚餐';
                    }else if(Type==4){//下午加餐
                        typeName='下午加餐';
                    }else if(Type==5){//运动
                        typeName='运动';
                    }

                    _hmt.push(['_trackEvent','体重管理打卡页','体重管理打卡页',typeName+'换一换']);

                    var btn = $(obj);

                    this.updateMykallMana(Type);
                    
                    btn.addClass("disabled");
                    btn.attr("disabled","true")
                    setTimeout(function(){
                     btn.removeAttr('disabled');
                     btn.removeClass("disabled");
                    },2000)

                   },
                   //换取食材 运动信息
                   updateMykallMana:function(Type){

                    var _this = this;
                        $.ajax({
                            type:'POST',
                            url: api.updateMykallMana,
                            data:{
                                mcid:_this.ManagementVo.vo.mcid,
                                unionid:_this.unionidStorage,
                                height: _this.heightStorage,
                                weight: _this.currentWeightStorage,
                                gender:_this.genderStorage,
                                age:_this.ageStorage,
                                targetType:_this.targetType,
                                havedrinType:Type,
                                dayDate: _this.foodDay
                            },
                            async:false,
                            success:function(res){
                               if(res==true){
                                    _this.getMykallMana(_this.unionidStorage,_this.foodDay);
                                }else{
                                    alert("换取不成功！")
                                }

                            }
                        })
                   },
                   //添加食材 运动信息
                   addMykallMana:function(unionid,daysDate){
                    var _this = this;
                    var data={
                        mcid:_this.ManagementVo.vo.mcid,
                        unionid:unionid,
                        height:_this.heightStorage,
                        weight: _this.currentWeightStorage,
                        gender: _this.genderStorage,
                        age: _this.ageStorage,
                        targetType:_this.targetType,
                        dayDate:daysDate
                    }
                    $.ajax({
                        type:'post',
                        url: api.addMykallMana+'?'+$.param(data),
                        async:false,
                        success:function(res){
                          if(res==true){
                            _this.getMykallMana(_this.unionidStorage,daysDate);
                          }
                         }

                    })
                   },
                   //打卡
                   addsign: function(){
       
                     var _this = this;

                     _hmt.push(['_trackEvent','体重管理打卡页面','体重管理打卡页面','打卡']);

                     this.getsign(this.unionidStorage,this.curentDay);//获取打卡前一天的金币

                     var gold = this.CardVo.gold;

                      if(gold==null){
                        gold=5;
                      }else{
                        gold+=1
                      }

                     $.ajax({
                         type:'post',
                         url: api.addsign,
                         data:{
                            unionid: _this.unionidStorage,
                            gold: gold
                         },
                         async:false,
                         success: function(res){
                            if(res==true){
                                $("#punchModel").fadeIn();
                                $("#btn-card").addClass("events");
                                _this.getsignIs(_this.unionidStorage,common.getDate2(),1)//判断今天是否打卡
                            }else{
                                
                            }
                         }
                     })

                   },
                   //判断今天是否打卡
                   getsignIs:function(unionid,daysDate,num,singsate){

                    var _this = this;
                    var data={
                        unionid:unionid,
                        daysDate:daysDate
                    }

                    $.ajax({
                        type:'get',
                        url: api.getsign+'?'+$.param(data),
                        async:true,
                        success: function(res){
                           _this.CardVoIs = res;//今天打卡金币

                           if(num==1){
                           if(_this.CardVoIs.gold){

                               $("#btn-card").show().text("已打卡");
                               $("#btn-card").addClass("events");
                                console.log("今天已经打卡");
                                $("#over-card").hide();
                           }else{
                             $("#btn-card").show().text("打卡");
                             $("#btn-card").removeClass("events");
                             $("#over-card").hide();
                           }
                        }

                        if(num==2){
                             if(_this.CardVoIs.gold){
                              $("#btn-card").show();
                              $("#btn-card").text("已打卡");
                              $("#btn-card").addClass("events");
                              $("#over-card").hide();
                             }else{
                                if(singsate==true){
                                    $("#btn-card").show().text("打卡");
                                    $("#btn-card").removeClass("events");
                                    $("#over-card").hide();
                                    console.log('今天');
                                }else{
                                    $("#over-card").show();
                                    $("#btn-card").hide();
                                }
                                
                             }
                        }
                    }

                    })

                   },
                   //获取打卡信息昨天 
                   getsign: function(unionid,daysDate){

                    var _this = this;

                    var data={
                        unionid:unionid,
                        daysDate:daysDate
                    }
                    $.ajax({
                        type:'get',
                        url: api.getsign+'?'+$.param(data),
                        async:false,
                        success: function(res){
                           _this.CardVo = res;
                           console.log("昨天打卡的金币："+_this.CardVo.gold);
                        }

                    })

                   },
                   //更改体重管理
                   changManage:function(){

                      this.getManagementid(this.unionidStorage,2);//获取体重管理

                      _hmt.push(['_trackEvent','体重管理打卡页','体重管理打卡页','去更改']);
                   },
                   //关闭
                   close:function(){
                       $("#punchModel").hide();
                   },
                   close2:function(){
                      $(".clocked").hide();
                   },
                   goTo:function(){
                     common.linkTo2('../knowledge/knowledge.html',null,'manage=1');
                   }
                }
            })
        }, 500)
    })

})