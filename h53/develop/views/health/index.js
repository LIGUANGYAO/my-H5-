
require(['jquery','Vue','FooterBar','common','IScroll', 'iosSelect','api','bmi','Swiper','PageLoad'],function($,Vue,FooterBar,common,IScroll,iosSelect,api,bmi,Swiper,PageLoad){
    $(function(){
        var FooterBar_vue = FooterBar.init();
        var PageLoad_vue = PageLoad.init();
       // settimeout 防止页面假死
       setTimeout(function(){
          new Vue({
              el: '#app',
              data: {
                statureArr:[],
                yearArr:[],
                modify:{
                    nickname:null,
                    sex:null,
                    height:null,
                    year:null
                  },
                  unionid:null,
                  registered:null,
                  registeredData:{},
                  BMI:{},
                  homeData:{},
                  standard:{},
                  beautBody:{},
                  bodyTypeChinese:null,
                  sexR:null,
                  standardW:{},
                  BeauBodyW:{},
                  bmr:null,
                  adImgeData:{},
                  bmrWorld:null,
                  foodSuggestTitle:null,
                  sportsuggestTitle:null,
                  openModalStatus: false,
                  bodyFat:{},
                  fatRateTitle:null,
                  waterTitle:null,
                  bonTitle:null,
                  muscleTitle:null,
                  proteinTitle:null,
                  fatWeightTitle:null,
                  fatLevelTitle:null,
                  bodyTypeTitle:null,
                  bodyTypeNum:null,
                  FatData:null,
                  ManagementVo:{},
                  curentStamp:null,
                  adImgeData1:null,
                  adImgeData2:null,
                  pageLoad:false//页面加载
              },
              components: {
                'footer-bar': FooterBar_vue,
                'page-load': PageLoad_vue
              },
              created: function(){

                var _this = this;
                 var a= this.getWeight();
                 var b = this.getAdvertising();
                 var c = this.getProfile();

                 $.when(a,b,c).then(function(a,b,c){

                    if(_this.registered){
                        
                        if(_this.registeredData.age==0){
                            _this.registeredData.age=1
                        }
                        _this.BMI = bmi.toMathBmi(_this.homeData.currentWeight,_this.registeredData.height);//计算BMI值
                        _this.standard = bmi.standMeasur(_this.registeredData.height);//计算标准三围
                        _this.beautBody = bmi.bodyMeasur(_this.registeredData.height);//计算美体三围
                        _this.bodyTypeChinese = bmi.getBodyTypeChinese(_this.BMI.bmi);
                        _this.standardW = bmi.toMathSBW(_this.sexR,_this.registeredData.height);
                        _this.BeauBodyW = bmi.BeauBody(_this.registeredData.height,_this.sexR);
                        _this.bmr = bmi.toMathBMR(_this.sexR,_this.homeData.currentWeight,_this.registeredData.height,_this.registeredData.age);
                        console.log("注册");
                        _this.getDataFat();//体脂计算
                        _this.suggestBmr();
                        _this.suggestAdvice();
                         _this.indicator(_this.BMI.bmi,_this.BMI.bmiValue);

                         _this.pageLoad = true;
                     
                        }
                 })
              },
              mounted: function(){
                var _this = this;

                //当前时间的时间戳
                var d = new Date();
                this.curentStamp = d.getTime();

                setTimeout(function(){
                    _this.init(); 
                },500)
                
              },
              methods: {
                init: function(){
                    this.openHorn();
                    this.linkTo();
                },
                swiperInit:function(dom){
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
                       },200)
                },
                openHorn: function(){
                    var _this = this;
                    
                   $(".horn").click(function(){

                    _this.openModalStatus = true;

                    $(".instruction,#instructionMast").fadeIn();
 
                 //判断条件,条件成立才阻止背景页面滚动,其他情况不会再影响到页面滚动
                   $('html,body,#app').on('touchmove', function (event) {  
                   if (_this.openModalStatus) {  
                      event.preventDefault();  
                  }  
              });
                   });
                    $(".instruction .close").click(function(){
                        $(".instruction, #instructionMast").hide();
                        _this.openModalStatus = false;
                    });
                },
                linkTo: function(){
                    var _this =this;

                  $("#foodLink").click(function(){
                    common.linkTo2("./foodsuggest.html");
                  });
                  $("#sportLink").click(function(){
                    common.linkTo2("./sportsuggest.html");
                  });

                  $(".consulting").click(function(){
                    common.linkTo2("../advice/advice.html");
                  });

                  $(".weightAdminister").click(function(){
                     _this.getManagementid(_this.unionid)
                  });
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
                        async:false,
                        success:function(res){
                          _this.ManagementVo =res.vo;

                          if(JSON.stringify(_this.ManagementVo)=='{}' || _this.ManagementVo==null){

                              common.linkTo2("../manage/question.html");

                              console.log("还没开始体重管理了")
                          }else{
                            if(_this.curentStamp>res.vo.startDate&&_this.curentStamp<res.vo.endDate){
                                common.linkTo2("../manage/manage.html");//开始体重管理阶段
                             }else{
                                common.linkTo2("../manage/question.html");
                             }
                            
                          }

                        }
                      })
                },
                 //获取当前体重
                getWeight: function(){
                    var _this = this;
                   return $.ajax({
                    type:'get',
                    url: api.getHomeTopDate,
                    data:{
                        _p:common.getRequest()._p
                    },
                    async: true,
                    success: function(res){
                        _this.homeData = res[0];
                    }
                    })
                },
                     //运动建议 饮食建议文字
                     suggestAdvice: function(){
                         var _this =this;
                         if(_this.bodyTypeChinese=='偏瘦'){
                            _this.foodSuggestTitle = '主要保证有足够的热量摄入，能量摄入大于消耗，热量的食入完全来源于饮食';
                            _this.sportsuggestTitle= '1、在健身房做无氧运动，如杠铃卧推、杠铃推举、高位下拉等;<br>2、每周训练3天，每次把全身都练一遍，一小时左右;<br>3、每个动作做1~3组，每组做12~15次;';
                         }else if(_this.bodyTypeChinese=='正常'){
                            _this.foodSuggestTitle = '三大营养素的比例要均衡，碳水化合物55%-65%，蛋白质10%-12%，脂肪20%-30%';
                            _this.sportsuggestTitle= '1、每天运动30mins，如慢跑、跳绳、游泳、骑自行车等;<br>2、运动前要热身;<br>3、运动后要做拉伸运动;';
                         }else if(_this.bodyTypeChinese=='偏胖'){
                            _this.foodSuggestTitle = '体型偏重的您，首要做到的是控制总能量的摄入，采取高蛋白质，低碳水化合物，低脂肪的膳食模式....';
                            _this.sportsuggestTitle= '1、锻炼的最佳方式应选择走、游泳、自行车等持续的周期性有氧运动;<br>2、下午4-5点，这是锻炼最好的时候，消耗热量比较快;<br>3、锻炼方式多样交替，慢走——快走——走跑交替——持续慢跑——持续中速跑;';
                         }else if(_this.bodyTypeChinese=='肥胖'){
                            _this.foodSuggestTitle = '针对超重的您，建议开始控制饮食，减少甜食和饮料的摄入，多选择天然的食物.....';
                            _this.sportsuggestTitle= '1、找到自己喜欢的运动并坚持;<br>2、做燃脂类运动以加快减脂进度，每周3-5次，每次20-40分钟，控制好强度;<br>3、第一次十分钟即可，慢慢增加到30分钟左右，完全可以一直保持每周三次，每次只有15分钟的较低运动量;';
                         }
                        
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
                                  _hmt.push(['_trackEvent','健康分析','健康分析页广告',adTitle]);
                              }else{

                              }
                            }

                        })

                    },
                     //获取广告
                    getAdvertising:function(){
                        var _this = this;
                        var codes=['health_1','health_2'];
                       return $.ajax({
                        type:'POST',
                        url: api.getAdvertising+'?_p='+common.getRequest()._p,
                        processData: false,
                        async: true,
                        'contentType': 'application/json',
                        data: JSON.stringify(codes),
                        success: function(res){
                            _this.adImgeData = JSON.parse(res);

                                if (_this.adImgeData.result.data) {
                                    
                                    if(_this.adImgeData.result.data[0]&&_this.adImgeData.result.data[0].length>0){
                                    _this.adImgeData1 = _this.adImgeData.result.data[0]
                                    if( _this.adImgeData1.length>1){
                                        _this.swiperInit("#swiper-container");
                                     }
                                    }

                                    if(_this.adImgeData.result.data[1]&&_this.adImgeData.result.data[1].length>0){
                                    _this.adImgeData2 = _this.adImgeData.result.data[1];
                                    if(_this.adImgeData2>1){
                                        _this.swiperInit("#swiper-container2");
                                    }
                                    
                                    }
                                }
                        }
                        })
                    },
                     //获取注册信息接口
                    getProfile:function(callback){
                        var _this = this;
                        return $.ajax({
                        type:'POST',
                        url: api.profile,
                        async: true,
                        data:{
                            _p:common.getRequest()._p
                        },
                        dataType:'json',
                        success: function(res){
                             if(res.result.data){
                                _this.registered = res.result.data[0].height;
                                // _this.modify.sex = res.result.data[0].weChatUser.gender;//微信性别
                                _this.sexR = res.result.data[0].gender;//注册后的性别
                                _this.unionid = res.result.data[0].weChatUser.unionid;
                                _this.registeredData = res.result.data[0];
                               
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
                                if(res.result.data[0]!==null){
                                    _this.bodyFat = res.result.data[0];
                                    
                                    if(_this.bodyFat&&_this.bodyFat.fat){
    
                                    if((_this.bodyFat.fat*100)>5){
                                      _this.FatData = res.result.data[0].fat;
                                    }else{
                                       _this.FatData = 0.05;
                                    }
                                }
                              _this.getBodyFatWorld();

                             }
                        }
                     }
                      })

                   },
                   //计算体脂的正常值
                   getBodyFatWorld:function(){
                    
                    var age;
                    var  sex= this.registeredData.gender;
                    if(this.registeredData.age==0){
                        age=1
                    }else{
                        age = this.registeredData.age;
                    }

                    var Height = this.registeredData.height;
                    var currentWeight = this.homeData.currentWeight;

                     
                       //肥胖等级
                       if(sex==1){

                        if(age>=20&&age<=29){
                         
                            if(parseInt(this.bodyFat.fat*100)<=9){
                                this.fatLevelTitle= '偏瘦';
                            }else if(parseInt(this.bodyFat.fat*100)>9&&parseInt(this.bodyFat.fat*100)<=13){
                                this.fatLevelTitle= '苗条';
                            }else if(parseInt(this.bodyFat.fat*100)>=14&&parseInt(this.bodyFat.fat*100)<=20){
                                this.fatLevelTitle= '标准';
                            }else if(parseInt(this.bodyFat.fat*100)>=21&&parseInt(this.bodyFat.fat*100)<=23){
                                this.fatLevelTitle= '偏胖';
                            }else if(parseInt(this.bodyFat.fat*100)>23){
                                this.fatLevelTitle= '肥胖';
                            }

                        }else if(age>=30&&age<=39){

                            if(parseInt(this.bodyFat.fat*100)<=12){
                                this.fatLevelTitle= '偏瘦';
                            }else if(parseInt(this.bodyFat.fat*100)>12&&parseInt(this.bodyFat.fat*100)<=14){
                                this.fatLevelTitle= '苗条';
                            }else if(parseInt(this.bodyFat.fat*100)>=15&&parseInt(this.bodyFat.fat*100)<=21){
                                this.fatLevelTitle= '标准';
                            }else if(parseInt(this.bodyFat.fat*100)>=22&&parseInt(this.bodyFat.fat*100)<=24){
                                this.fatLevelTitle= '偏胖';
                            }else if(parseInt(this.bodyFat.fat*100)>24){
                                this.fatLevelTitle= '肥胖';
                            }

                        }else if(age>=40&&age<=49){

                            if(parseInt(this.bodyFat.fat*100)<=14){
                                this.fatLevelTitle= '偏瘦';
                            }else if(parseInt(this.bodyFat.fat*100)>14&&parseInt(this.bodyFat.fat*100)<=16){
                                this.fatLevelTitle= '苗条';
                            }else if(parseInt(this.bodyFat.fat*100)>=17&&parseInt(this.bodyFat.fat*100)<=23){
                                this.fatLevelTitle= '标准';
                            }else if(parseInt(this.bodyFat.fat*100)>=24&&parseInt(this.bodyFat.fat*100)<=26){
                                this.fatLevelTitle= '偏胖';
                            }else if(parseInt(this.bodyFat.fat*100)>26){
                                this.fatLevelTitle= '肥胖';
                            }

                        }else if(age>=50&&age<=59){

                            if(parseInt(this.bodyFat.fat*100)<=15){
                                this.fatLevelTitle= '偏瘦';
                            }else if(parseInt(this.bodyFat.fat*100)>15&&parseInt(this.bodyFat.fat*100)<=17){
                                this.fatLevelTitle= '苗条';
                            }else if(parseInt(this.bodyFat.fat*100)>=18&&parseInt(this.bodyFat.fat*100)<=24){
                                this.fatLevelTitle= '标准';
                            }else if(parseInt(this.bodyFat.fat*100)>=25&&parseInt(this.bodyFat.fat*100)<=27){
                                this.fatLevelTitle= '偏胖';
                            }else if(parseInt(this.bodyFat.fat*100)>27){
                                this.fatLevelTitle= '肥胖';
                            }

                        }else if(age>=60){

                            if(parseInt(this.bodyFat.fat*100)<=16){
                                this.fatLevelTitle= '偏瘦';
                            }else if(parseInt(this.bodyFat.fat*100)>16&&parseInt(this.bodyFat.fat*100)<=18){
                                this.fatLevelTitle= '苗条';
                            }else if(parseInt(this.bodyFat.fat*100)>=19&&parseInt(this.bodyFat.fat*100)<=25){
                                this.fatLevelTitle= '标准';
                            }else if(parseInt(this.bodyFat.fat*100)>=26&&parseInt(this.bodyFat.fat*100)<=28){
                                this.fatLevelTitle= '偏胖';
                            }else if(parseInt(this.bodyFat.fat*100)>28){
                                this.fatLevelTitle= '肥胖';
                            }

                        }

                       }else if(sex==2){

                        if(age>=20&&age<=29){
                            
                               if(parseInt(this.bodyFat.fat*100)<=17){
                                   this.fatLevelTitle= '偏瘦';
                               }else if(parseInt(this.bodyFat.fat*100)>17&&parseInt(this.bodyFat.fat*100)<=19){
                                   this.fatLevelTitle= '苗条';
                               }else if(parseInt(this.bodyFat.fat*100)>=20&&parseInt(this.bodyFat.fat*100)<=28){
                                   this.fatLevelTitle= '标准';
                               }else if(parseInt(this.bodyFat.fat*100)>=29&&parseInt(this.bodyFat.fat*100)<=31){
                                   this.fatLevelTitle= '偏胖';
                               }else if(parseInt(this.bodyFat.fat*100)>31){
                                   this.fatLevelTitle= '肥胖';
                               }
   
                           }else if(age>=30&&age<=39){
   
                               if(parseInt(this.bodyFat.fat*100)<=18){
                                   this.fatLevelTitle= '偏瘦';
                               }else if(parseInt(this.bodyFat.fat*100)>18&&parseInt(this.bodyFat.fat*100)<=20){
                                   this.fatLevelTitle= '苗条';
                               }else if(parseInt(this.bodyFat.fat*100)>=21&&parseInt(this.bodyFat.fat*100)<=29){
                                   this.fatLevelTitle= '标准';
                               }else if(parseInt(this.bodyFat.fat*100)>=30&&parseInt(this.bodyFat.fat*100)<=32){
                                   this.fatLevelTitle= '偏胖';
                               }else if(parseInt(this.bodyFat.fat*100)>32){
                                   this.fatLevelTitle= '肥胖';
                               }
   
                           }else if(age>=40&&age<=49){
   
                               if(parseInt(this.bodyFat.fat*100)<=19){
                                   this.fatLevelTitle= '偏瘦';
                               }else if(parseInt(this.bodyFat.fat*100)>19&&parseInt(this.bodyFat.fat*100)<=21){
                                   this.fatLevelTitle= '苗条';
                               }else if(parseInt(this.bodyFat.fat*100)>=22&&parseInt(this.bodyFat.fat*100)<=30){
                                   this.fatLevelTitle= '标准';
                               }else if(parseInt(this.bodyFat.fat*100)>=31&&parseInt(this.bodyFat.fat*100)<=33){
                                   this.fatLevelTitle= '偏胖';
                               }else if(parseInt(this.bodyFat.fat*100)>33){
                                   this.fatLevelTitle= '肥胖';
                               }
   
                           }else if(age>=50&&age<=59){
   
                               if(parseInt(this.bodyFat.fat*100)<=20){
                                   this.fatLevelTitle= '偏瘦';
                               }else if(parseInt(this.bodyFat.fat*100)>20&&parseInt(this.bodyFat.fat*100)<=22){
                                   this.fatLevelTitle= '苗条';
                               }else if(parseInt(this.bodyFat.fat*100)>=23&&parseInt(this.bodyFat.fat*100)<=31){
                                   this.fatLevelTitle= '标准';
                               }else if(parseInt(this.bodyFat.fat*100)>=32&&parseInt(this.bodyFat.fat*100)<=33){
                                   this.fatLevelTitle= '偏胖';
                               }else if(parseInt(this.bodyFat.fat*100)>34){
                                   this.fatLevelTitle= '肥胖';
                               }
   
                           }else if(age>=60){
   
                               if(parseInt(this.bodyFat.fat*100)<=21){
                                   this.fatLevelTitle= '偏瘦';
                               }else if(parseInt(this.bodyFat.fat*100)>21&&parseInt(this.bodyFat.fat*100)<=23){
                                   this.fatLevelTitle= '苗条';
                               }else if(parseInt(this.bodyFat.fat*100)>=24&&parseInt(this.bodyFat.fat*100)<=32){
                                   this.fatLevelTitle= '标准';
                               }else if(parseInt(this.bodyFat.fat*100)>=33&&parseInt(this.bodyFat.fat*100)<=35){
                                   this.fatLevelTitle= '偏胖';
                               }else if(parseInt(this.bodyFat.fat*100)>35){
                                   this.fatLevelTitle= '肥胖';
                               }
   
                           }
 
                       }


                       //内脏脂肪
                       if(parseInt(this.bodyFat.visceralFat)>=1&&parseInt(this.bodyFat.visceralFat)<=4){
                          this.fatWeightTitle = '健康型';
                       }else if(parseInt(this.bodyFat.visceralFat)>=5&&parseInt(this.bodyFat.visceralFat)<=9){
                          this.fatWeightTitle = '警示型';
                       }else if(parseInt(this.bodyFat.visceralFat)>=10&&parseInt(this.bodyFat.visceralFat)<=14){
                          this.fatWeightTitle = '危险型';
                       }else if(parseInt(this.bodyFat.visceralFat)>14){
                         this.fatWeightTitle = '极度危险';
                       }


                       //蛋白质
                       if(this.bodyFat.protein<=16){
                           this.proteinTitle = '偏低';
                       }else if(this.bodyFat.protein>16&&this.bodyFat.protein<=19){
                           this.proteinTitle = '正常';
                       }else if(this.bodyFat.protein>19){
                        this.proteinTitle = '偏高';
                       }
                     
                      if(sex==1){
                         //水份
                       if(age<=30){

                        if((this.bodyFat.water*100).toFixed(1)<37.8){
                            this.waterTitle = '胖';
                        }else if((this.bodyFat.water*100).toFixed(1)>=37.8&&(this.bodyFat.water*100).toFixed(1)<=50.1) {
                            this.waterTitle = '胖';
                        }else if((this.bodyFat.water*100).toFixed(1)>=50.2&&(this.bodyFat.water*100).toFixed(1)<=53.5){
                            this.waterTitle = '偏胖';
                        }else if((this.bodyFat.water*100).toFixed(1)>=53.6&&(this.bodyFat.water*100).toFixed(1)<=57.0){
                            this.waterTitle = '标准';
                        }else if((this.bodyFat.water*100).toFixed(1)>=57.1&&(this.bodyFat.water*100).toFixed(1)<=60.4){
                            this.waterTitle = '偏瘦';
                        }else if((this.bodyFat.water*100).toFixed(1)>=60.5&&(this.bodyFat.water*100).toFixed(1)<=66.0){
                            this.waterTitle = '瘦';
                        }else if((this.bodyFat.water*100).toFixed(1)>66.0){
                            this.waterTitle = '瘦';
                        }

                       }else if(age>30){

                        if((this.bodyFat.water*100).toFixed(1)<37.8){
                            this.waterTitle = '胖';
                        }else if((this.bodyFat.water*100).toFixed(1)>=37.8&&(this.bodyFat.water*100).toFixed(1)<=48.7) {
                            this.waterTitle = '胖';
                        }else if((this.bodyFat.water*100).toFixed(1)>=48.8&&(this.bodyFat.water*100).toFixed(1)<=52.5){
                            this.waterTitle = '偏胖';
                        }else if((this.bodyFat.water*100).toFixed(1)>=52.3&&(this.bodyFat.water*100).toFixed(1)<=55.6){
                            this.waterTitle = '标准';
                        }else if((this.bodyFat.water*100).toFixed(1)>=55.7&&(this.bodyFat.water*100).toFixed(1)<=59.0){
                            this.waterTitle = '偏瘦';
                        }else if((this.bodyFat.water*100).toFixed(1)>=59.1&&(this.bodyFat.water*100).toFixed(1)<=66.0){
                            this.waterTitle = '瘦';
                        }else if((this.bodyFat.water*100).toFixed(1)>66.0){
                            this.waterTitle = '瘦';
                        }
                             
                       }


                          //骨量
                          if(age<=55){
                            if(this.bodyFat.bon<=2.16){
                                this.bonTitle= '偏低';
                            }else if(this.bodyFat.bon>2.16&&this.bodyFat.bon<=2.64){
                                this.bonTitle= '标准';
                            }else if(this.bodyFat.bon>2.64){
                                this.bonTitle= '偏高';
                            }  
                        }else if(age>55&&age<=75){
                            if(this.bodyFat.bon<=2.52){
                                this.bonTitle= '偏低';
                            }else if(this.bodyFat.bon>2.52&&this.bodyFat.bon<=3.08){
                                this.bonTitle= '标准';
                            }else if(this.bodyFat.bon>3.08){
                                this.bonTitle= '偏高';
                            }
                        }else if(age>75){
                            if(this.bodyFat.bon<=2.79){
                                this.bonTitle= '偏低';
                            }else if(this.bodyFat.bon>2.79&&this.bodyFat.bon<=3.41){
                                this.bonTitle= '标准';
                            }else if(this.bodyFat.bon>3.41){
                                this.bonTitle= '偏高';
                            }
                        }

                          //肌肉率
                        if(this.bodyFat.muscle<=30){
                            this.muscleTitle = '低';
                        }else if(this.bodyFat.muscle>=31&&this.bodyFat.muscle<=34){
                           this.muscleTitle = '标准';
                        }else if(this.bodyFat.muscle>=35&&this.bodyFat.muscle<=38){
                           this.muscleTitle = '偏高';
                        }else if(this.bodyFat.muscle>=39){
                           this.muscleTitle = '高';
                        }


                      }else if(sex==2){
                      
                         //水份
                       if(age<=30){
                        
                        if((this.bodyFat.water*100).toFixed(1)<37.8){
                            this.waterTitle = '胖';
                        }else if((this.bodyFat.water*100).toFixed(1)>=37.8&&(this.bodyFat.water*100).toFixed(1)<=46.0) {
                            this.waterTitle = '胖';
                        }else if((this.bodyFat.water*100).toFixed(1)>=46.1&&(this.bodyFat.water*100).toFixed(1)<=49.4){
                            this.waterTitle = '偏胖';
                        }else if((this.bodyFat.water*100).toFixed(1)>=49.5&&(this.bodyFat.water*100).toFixed(1)<=52.9){
                            this.waterTitle = '标准';
                        }else if((this.bodyFat.water*100).toFixed(1)>=53.0&&(this.bodyFat.water*100).toFixed(1)<=56.3){
                            this.waterTitle = '偏瘦';
                        }else if((this.bodyFat.water*100).toFixed(1)>=56.4&&(this.bodyFat.water*100).toFixed(1)<=66.0){
                            this.waterTitle = '瘦';
                        }else if((this.bodyFat.water*100).toFixed(1)>66.0){
                            this.waterTitle = '瘦';
                        }

                        }else if(age>30){
                        if((this.bodyFat.water*100).toFixed(1)<37.8){
                            this.waterTitle = '胖';
                        }else if((this.bodyFat.water*100).toFixed(1)>=37.8&&(this.bodyFat.water*100).toFixed(1)<=44.6) {
                            this.waterTitle = '胖';
                        }else if((this.bodyFat.water*100).toFixed(1)>=44.7&&(this.bodyFat.water*100).toFixed(1)<=48.0){
                            this.waterTitle = '偏胖';
                        }else if((this.bodyFat.water*100).toFixed(1)>=48.1&&(this.bodyFat.water*100).toFixed(1)<=51.5){
                            this.waterTitle = '标准';
                        }else if((this.bodyFat.water*100).toFixed(1)>=51.6&&(this.bodyFat.water*100).toFixed(1)<=54.9){
                            this.waterTitle = '偏瘦';
                        }else if((this.bodyFat.water*100).toFixed(1)>=55.0&&(this.bodyFat.water*100).toFixed(1)<=66.0){
                            this.waterTitle = '瘦';
                        }else if((this.bodyFat.water*100).toFixed(1)>66.0){
                            this.waterTitle = '瘦';
                        }
                                
                        }



                       //骨量
                       if(age<=40){
                        if(this.bodyFat.bon<=1.53){
                            this.bonTitle= '偏低';
                        }else if(this.bodyFat.bon>1.53&&this.bodyFat.bon<=1.87){
                            this.bonTitle= '标准';
                        }else if(this.bodyFat.bon>1.87){
                            this.bonTitle= '偏高';
                        }  
                    }else if(age>40&&age<=60){
                        if(this.bodyFat.bon<=1.89){
                            this.bonTitle= '偏低';
                        }else if(this.bodyFat.bon>1.89&&this.bodyFat.bon<=2.31){
                            this.bonTitle= '标准';
                        }else if(this.bodyFat.bon>2.31){
                            this.bonTitle= '偏高';
                        }
                    }else if(age>60){
                        if(this.bodyFat.bon<=2.16){
                            this.bonTitle= '偏低';
                        }else if(this.bodyFat.bon>2.16&&this.bodyFat.bon<=2.64){
                            this.bonTitle= '标准';
                        }else if(this.bodyFat.bon>2.64){
                            this.bonTitle= '偏高';
                        }
                    }

                      //肌肉率
                    if(this.bodyFat.muscle<=25){
                        this.muscleTitle = '低';
                    }else if(this.bodyFat.muscle>25&&this.bodyFat.muscle<=27){
                        this.muscleTitle = '标准';
                    }else if(this.bodyFat.muscle>=28&&this.bodyFat.muscle<=29){
                        this.muscleTitle = '偏高';
                    }else if(this.bodyFat.muscle>=30){
                        this.muscleTitle = '高';
                    }

    
                      }
                      
                        

                         
                    //脂肪率
                     if(age<=30){
                         if(sex==1){
                           if((this.bodyFat.fat*100)<5.0){
                                this.fatRateTitle = '瘦';
                           }else if((this.bodyFat.fat*100)>=5.0&&(this.bodyFat.fat*100)<=12.0){
                                this.fatRateTitle = '瘦';
                           }else if((this.bodyFat.fat*100)>=12.1&&(this.bodyFat.fat*100)<=17.0){
                                this.fatRateTitle = '偏瘦';
                           }else if((this.bodyFat.fat*100)>=17.1&&(this.bodyFat.fat*100)<=22.0){
                                this.fatRateTitle = '标准';
                           }else if((this.bodyFat.fat*100)>=22.1&&(this.bodyFat.fat*100)<=27.0){
                                this.fatRateTitle = '偏胖';
                           }else if((this.bodyFat.fat*100)>27.0){
                                this.fatRateTitle = '偏胖';
                           }
                         }else if(sex==2){
                            if((this.bodyFat.fat*100)<5){
                                this.fatRateTitle = '瘦';
                            }else if((this.bodyFat.fat*100)>=5.0&&(this.bodyFat.fat*100)<=18.0){
                                this.fatRateTitle = '瘦';
                           }else if((this.bodyFat.fat*100)>=18.1&&(this.bodyFat.fat*100)<=23.0){
                                this.fatRateTitle = '偏瘦';
                           }else if((this.bodyFat.fat*100)>=13.1&& (this.bodyFat.fat*100)<=28.0){
                                this.fatRateTitle = '标准';
                           }else if((this.bodyFat.fat*100)>=28.1&&(this.bodyFat.fat*100)<=33.0){
                                this.fatRateTitle = '偏胖';
                           }else if((this.bodyFat.fat*100)>=33.1&&(this.bodyFat.fat*100)<=45.0){
                               this.fatRateTitle = '胖';
                           }else if((this.bodyFat.fat*100)>45.0){
                            this.fatRateTitle = '胖';
                           }
                         }
                       
                     }else if(age>30){
                        
                        if(sex==1){
                            if((this.bodyFat.fat*100)<5.0){
                                this.fatRateTitle = '瘦';
                            }else if((this.bodyFat.fat*100)>=5.0&&(this.bodyFat.fat*100)<=14.0){
                                 this.fatRateTitle = '瘦';
                            }else if((this.bodyFat.fat*100)>=14.1&&(this.bodyFat.fat*100)<=19.0){
                                 this.fatRateTitle = '偏瘦';
                            }else if((this.bodyFat.fat*100)>=19.1&&(this.bodyFat.fat*100)<=24.0){
                                 this.fatRateTitle = '标准';
                            }else if((this.bodyFat.fat*100)>=24.1&&(this.bodyFat.fat*100)<=29.0){
                                 this.fatRateTitle = '偏胖';
                            }else if((this.bodyFat.fat*100)>=29.1&&(this.bodyFat.fat*100)<=45.0){
                                this.fatRateTitle = '胖';
                            }else if((this.bodyFat.fat*100)>45.0){
                                this.fatRateTitle = '胖';
                            }
                          }else if(sex==2){
                             if((this.bodyFat.fat*100)<5.0){
                                this.fatRateTitle = '瘦';
                             }else if((this.bodyFat.fat*100)>=5.0&&(this.bodyFat.fat*100)<=20.0){
                                 this.fatRateTitle = '瘦';
                            }else if((this.bodyFat.fat*100)>=20.1&&(this.bodyFat.fat*100)<=25.0){
                                 this.fatRateTitle = '偏瘦';
                            }else if((this.bodyFat.fat*100)>= 25.1&&(this.bodyFat.fat*100)<=30.0){
                                 this.fatRateTitle = '标准';
                            }else if((this.bodyFat.fat*100)>=30.1&&(this.bodyFat.fat*100)<=35.0){
                                 this.fatRateTitle = '偏胖';
                            }else if((this.bodyFat.fat*100)>=35.1&&(this.bodyFat.fat*100)<=45.0){
                                this.fatRateTitle = '胖';
                            }else if((this.bodyFat.fat*100)>45.0){
                                this.fatRateTitle = '胖';
                            }
                          }
                        
                     }

                     //体型分数
                     var  fatN,muscleN,visceralFatN,bodyYearN,bmrN,bmiN;

                     //体脂
                     if( this.fatRateTitle =='偏瘦'||this.fatRateTitle =='偏胖'){
                        fatN = (-2);
                     }else if(this.fatRateTitle =='瘦'||this.fatRateTitle =='胖'){
                        fatN = (-4);
                     }else{
                        fatN = 0;
                     }
                     
                      //肌肉率
                     if(this.muscleTitle=='低'){
                        muscleN= (-4);
                     }else if(this.muscleTitle=='标准'){
                        muscleN= 2;
                     }else if(this.muscleTitle=='偏高'){
                        muscleN= 4;
                     }else if(this.muscleTitle=='高'){
                        muscleN= 6;
                     }
                    //内脏脂肪

                    if(this.fatWeightTitle == '警示型'){
                        visceralFatN= (-2);
                    }else if(this.fatWeightTitle == '危险型'){
                        visceralFatN= (-4);
                    }else if(this.fatWeightTitle == '极度危险'){
                        visceralFatN= (-6);
                    }

                    //身体年龄
                    if(this.bodyFat.bodyAge>age){
                        bodyYearN= (-2);
                    }else{
                        bodyYearN= 2;
                    }
                  
                    //基础代谢率
                    if(sex==1){
                        if(age>=1&&age<=2){
                            if(this.bmr<700){
                                bmrN= (-2);
                            }else{
                                bmrN= 0;
                            }
                        }else if(age>=3&&age<=5){
                            if(this.bmr<900){
                                bmrN= (-2);
                            }else{
                                bmrN= 0;
                            }
                        }else if(age>=6&&age<=8){
                            if(this.bmr<1090){
                                bmrN= (-2);
                            }else{
                                bmrN= 0;
                            }
                        }else if(age>=9&&age<=11){
                            if(this.bmr<1290){
                                bmrN= (-2);
                            }else{
                                bmrN = 0;
                            }
                        }else if(age>=12&&age<=14){
                            if(this.bmr<1480){
                                bmrN= (-2);
                            }else{
                                bmrN= 0;
                            }
                        }else if(age>=15&&age<=17){
                            if(this.bmr<1610){
                                bmrN= (-2);
                            }else{
                                bmrN= 0;
                            }
                        }else if(age>=18&&age<=29){
                            if(this.bmr<1550){
                                bmrN= (-2);
                            }else{
                                bmrN= 0;
                            }
                        }else if(age>=30&&age<=49){
                            if(this.bmr<1500){
                                bmrN= (-2);
                            }else{
                                bmrN= 0;
                            }
                        }else if(age>=50&&age<=69){
                            if(this.bmr<1350){
                                bmrN= (-2);
                            }else{
                                bmrN= 0;
                            }
                        }else if(age>70){
                            if(this.bmr<1220){
                                bmrN= (-2);
                            }else{
                                bmrN= 0;
                            }
                        }
                    }else if(sex==2){

                        if(age>=1&&age<=2){
                            if(this.bmr<700){
                                bmrN= (-2);
                            }else{
                                bmrN= 0;
                            }
                        }else if(age>=3&&age<=5){
                            if(this.bmr<860){
                                bmrN= (-2);
                            }else{
                                bmrN= 0;
                            }
                        }else if(age>=6&&age<=8){
                            if(this.bmr<1000){
                                bmrN= (-2);
                            }else{
                                bmrN= 0;
                            }
                        }else if(age>=9&&age<=11){
                            if(this.bmr<1180){
                                bmrN= (-2);
                            }else{
                                bmrN= 0;
                            }
                        }else if(age>=12&&age<=14){
                            if(this.bmr<1340){
                                bmrN= (-2);
                            }else{
                                bmrN= 0;
                            }
                        }else if(age>=15&&age<=17){
                            if(this.bmr<1300){
                                bmrN= (-2);
                            }else{
                                bmrN= 0;
                            }
                        }else if(age>=18&&age<=29){
                            if(this.bmr<1210){
                                bmrN= (-2);
                            }else{
                                bmrN= 0;
                            }
                        }else if(age>=30&&age<=49){
                            if(this.bmr<1170){
                                bmrN= (-2);
                            }else{
                                bmrN= 0;
                            }
                        }else if(age>=50&&age<=69){
                            if(this.bmr<1110){
                                bmrN= (-2);
                            }else{
                                bmrN= 0;
                            }
                        }else if(age>70){
                            if(this.bmr<1010){
                                bmrN= (-2);
                            }else{
                                bmrN= 0;
                            }
                        }

                    }
                      
                    //BMI值
                    if(this.BMI.bmi<18.5){
                        bmiN= (-2);
                    }else if(this.BMI.bmi>=18.5&&this.BMI.bmi<=23.9){
                        bmiN= 0;
                    }else if(this.BMI.bmi>=24&&this.BMI.bmi<26){
                        bmiN= (-2);
                    }else if(this.BMI.bmi>=26&&this.BMI.bmi<28){
                        bmiN= (-4);
                    }else if(this.BMI.bmi>=28){
                        bmiN= (-6);
                    }

                    
                     this.bodyTypeNum = 82+fatN+muscleN+visceralFatN+bodyYearN+bmrN+bmiN;

                     if(this.bodyTypeNum<=60){

                        this.bodyTypeTitle= '危险性';

                     }else if(this.bodyTypeNum>60&&this.bodyTypeNum<70){

                        this.bodyTypeTitle= '肥胖型';

                     }else if(this.bodyTypeNum>=70&&this.bodyTypeNum<=78){

                        if(sex==1){

                        var standardWeight =  (Height-105);
  

                        if(parseFloat(currentWeight)>standardWeight){
                            this.bodyTypeTitle= '微胖';
                        }else if(parseFloat(currentWeight)<=standardWeight){
                            this.bodyTypeTitle= '偏瘦';
                        }

                        }else if(sex==2){

                            var standardWeight =  (Height-110);

                            if(parseFloat(currentWeight)>standardWeight){
                                this.bodyTypeTitle= '微胖';
                            }else if(parseFloat(currentWeight)<=standardWeight){
                                this.bodyTypeTitle= '偏瘦';
                            }   
                        }
                     }else if(this.bodyTypeNum>78&&this.bodyTypeNum<=90){
                        this.bodyTypeTitle= '健康型';
                     }else if(this.bodyTypeNum>=90){
                        this.bodyTypeTitle= '强壮型';
                     }

                   },
                  //bmr推荐
                  suggestBmr: function(){
                      var _this  =this;
                      if(_this.bmr<=1100){
                        _this.bmrWorld = '.....';
                     }else if(_this.bmr>1100 && _this.bmr<=1200){
                          _this.bmrWorld = '3碗米饭+3只鸡蛋+3盘炒青菜+1个大苹果';
                      }else if(_this.bmr >1200 && _this.bmr<=1300){
                         _this.bmrWorld = '3碗米饭+3只鸡蛋+3盘炒青菜+1个大苹果+1杯牛奶';
                      }else if(_this.bmr >1300 && _this.bmr<=1400){
                        _this.bmrWorld = '3碗米饭+1只鸡蛋+1份煎牛扒+3盘炒青菜+1个大苹果+1杯牛奶';
                      }else if(_this.bmr >1400 && _this.bmr<=1500){
                        _this.bmrWorld = '3碗米饭+1只鸡蛋+2份煎牛扒+3盘炒青菜+1杯牛奶';
                      }else if(_this.bmr >1500 && _this.bmr<=1600){
                        _this.bmrWorld = '3碗米饭+2只鸡蛋+2份煎牛扒+3盘炒青菜+1杯牛奶';
                      }else if(_this.bmr >1600 && _this.bmr<=1700){
                        _this.bmrWorld = '3碗米饭+3只鸡蛋+2份煎牛扒+3盘炒青菜+1个大苹果 ';
                      }else if(_this.bmr >1700 && _this.bmr<=1800){
                        _this.bmrWorld = '3碗米饭+3份煎牛扒+3盘炒青菜+1个大苹果';
                      }else if(_this.bmr >1800 && _this.bmr<=1900){
                        _this.bmrWorld = '3碗米饭+3份煎牛扒+3盘炒青菜+1杯牛奶 +1个大苹果';
                      }else if(_this.bmr >1900 && _this.bmr<=2000){
                        _this.bmrWorld = '3碗米饭+2只鸡蛋+3份煎牛扒+3盘炒青菜+1杯牛奶 +1个大苹果';
                      }else if(_this.bmr >2000 && _this.bmr<=2100){
                        _this.bmrWorld = '3碗米饭+3只鸡蛋+3份煎牛扒+3盘炒青菜+1杯牛奶 +1个大苹果';
                      }else if(_this.bmr >2100 && _this.bmr<=2200){
                        _this.bmrWorld = '3碗米饭+3只鸡蛋+3份煎牛扒+4盘炒青菜+1杯牛奶 +1个大苹果';
                      }else if(_this.bmr >2200 && _this.bmr<=2300){
                        _this.bmrWorld = '3碗米饭+3只鸡蛋+3份煎牛扒+4盘炒青菜+2杯牛奶 +1个大苹果';
                      }else if(_this.bmr >2300 && _this.bmr<=2400){
                        _this.bmrWorld = '3碗米饭+4只鸡蛋+3份煎牛扒+4盘炒青菜+2杯牛奶 +1个大苹果';
                      }else if(_this.bmr >2400 && _this.bmr<=2500){
                        _this.bmrWorld = '3碗米饭+3只鸡蛋+3份煎牛扒+4盘炒青菜+2杯牛奶 +2个大苹果';
                      }else{
                        _this.bmrWorld = '.....';
                      }
                  },
                  //跳转到个人中心页面
                  linkToMy:function(){
                    common.linkTo2("../my/my.html");
                  },
                  //人物跑动
                  indicator: function(bmi,bmiValue){
                        //指针位置
                        var _this = this;
                        var leftValue = 0;
                        if( bmi <= bmiValue.thin ){//偏瘦
                            if(_this.sexR==1){
                                $("#peoplAnimat").addClass('men1');
                            }else{
                                $("#peoplAnimat").addClass('women1');
                            }
                            leftValue = (bmi/bmiValue.thin)*20;
                            if(bmi<=10){leftValue=4;};
                            
                        }else if( bmi >= bmiValue.standard && bmi < bmiValue.fat_lv1 ){//正常
                            if(_this.sexR==1){
                                $("#peoplAnimat").addClass('men2');
                            }else{
                                $("#peoplAnimat").addClass('women2');
                            }
                            leftValue = ((bmi-bmiValue.standard)/(bmiValue.fat_lv1-bmiValue.standard))*20+25;
                             
                        }else if( bmi >= bmiValue.fat_lv1 && bmi <= bmiValue.super_fat ){//偏胖
                            if(_this.sexR==1){
                                $("#peoplAnimat").addClass('men3');
                            }else{
                                $("#peoplAnimat").addClass('women3');
                            }
                            leftValue = ((bmi-bmiValue.fat_lv1)/(bmiValue.super_fat-bmiValue.fat_lv1))*20+50;

                        }else if(bmi>=bmiValue.super_fat){//肥胖
                            if(_this.sexR==1){
                                $("#peoplAnimat").addClass('men4');
                            }else{
                                $("#peoplAnimat").addClass('women4');
                            }
                            leftValue = (bmi/bmiValue.super_fat)*20+60;
                            if(bmi>=42){leftValue=96;};
                        }
                           
                        $(" #peoplAnimat,.animationName").stop().animate({"left":(leftValue-5)+"%"},2000,"swing");
                        $(".progressIner").stop().animate({"left":leftValue+"%"},2000,"swing");
                     
                  }
              }
          })
       },500)

    })
})
