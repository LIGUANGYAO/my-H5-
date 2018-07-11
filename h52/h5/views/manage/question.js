
require(['jquery', 'Vue', 'FooterBar', 'common', 'api','PageLoad'], function($, Vue, FooterBar, common, api,PageLoad) {
    $(function() {

        var FooterBar_vue = FooterBar.init();

        var PageLoad_vue = PageLoad.init();

        // settimeout 防止页面假死
        setTimeout(function() {
            new Vue({
                el: '#app',
                data: {
                    adImge: [
                    {
                        adLink: ''
                    }],
                    showDialog: false,
                    weightNumber:null,
                    homeData:{},
                    stageArry:[],
                    targetType:1,
                    BMI:null,
                    unionidStorage:null,
                    bntsSate:false,
                    stateNumber:0,
                    ManagementVo:{},
                    stageTitle:'减脂',
                    bntsSate2:false,
                    stageN:null,
                    pageLoad:false
                },
                components: {
                    'footer-bar': FooterBar_vue,
                    'page-load': PageLoad_vue
                },
                watch: {
                    weightNumber:function(v){
                        this.weightNumber = (this.weightNumber-0).toFixed(1);
                        var Weight = (this.homeData.currentWeight*2).toFixed(1);
                        if(this.targetType==3){
                            if (v < Weight){
                                  $(".dialog").fadeIn(function(){
                                        $(this).find(".textTip").show().text("目标体重不能小于当前体重！");
                                   });
                                   this.weightNumber = Weight;
                            }
                         this.getstage();
                        }else if(this.targetType==1){
                            if (v > Weight){
                                $(".dialog").fadeIn(function(){
                                      $(this).find(".textTip").show().text("目标体重不能大于当前体重！");
                                 });
                                 this.weightNumber =  Weight;
                           }
                           this.getstage();
                        }
                        
                        
                    }
                },
                created: function() {
                    var _this = this;

                    var a = this.getWeight();

                    $.when(a).then(function(a){

                        _this.pageLoad =true;

                    if(sessionStorage.storageType){
                        _this.targetType = sessionStorage.storageType;//更改过来的targetType
                    }else{
                        _this.targetType = 1;//默认
                    }

                        if(_this.targetType==1){
                            _this.stageTitle ='减脂1~4';
                            $("#type2").hide();
                            $("#type1,.checkUl2").show();
                        }else if(_this.targetType==2){

                            $("#type2").show();
                            $("#type1,.checkUl2").hide();

                        }else if(_this.targetType==3){
                            _this.stageTitle ='健身增肌1~2';

                            $("#type2").hide();
                            $("#type1,.checkUl2").show();
                        }
                   
                    if(sessionStorage.stageArry){
                        _this.stageArry = [];
                        _this.stageArry = sessionStorage.stageArry;//更改过来的阶段数组

                        if(_this.targetType==2){
                            _this.stageArry = [1,2];
                        }else{
                            _this.stageArry = eval('('+_this.stageArry.split()+')');
                        }

                        _this.stateNumber = _this.stageArry;//共多少阶段

                        console.log(_this.stageArry);
                    }

                    if(sessionStorage.stageTargetWeight){
                        _this.weightNumber = Number(sessionStorage.stageTargetWeight).toFixed(1);//目标体重
                    }

                    if(sessionStorage.stageN){
                        _this.stageN = sessionStorage.stageN//处于第几阶段
                    }
                     

                    _this.BMI = sessionStorage.BMIStorage;//首页储存过来的数据BMI
                    
                    //this.BMI = 18.0;
                    _this.unionidStorage = sessionStorage.unionidStorage;//首页缓存过来的unionid

                })


                },
                mounted: function() {

                   this.init();
                },
                methods: {
                    init:function(){

                     var _this = this;

                    $(".checkUl li").on('click',function(){

                         _this.targetType = $(this).data("target");

                         var  targetTypeName;
                         if(_this.targetType==1){
                            targetTypeName='减脂';
                            _this.stageTitle='减脂1~4';
                            $(".checkUl2,#type1").fadeIn();
                            $('#type2').hide();

                             _this.stageArry = [];

                             _this.stateNumber = 0;

                             _this.calculate(_this.targetType);

                         }else if(_this.targetType==2){
                            targetTypeName='塑型';
                            _this.stageArry = [1,2];
                            $(".checkUl2,#type1").hide();
                            $("#type2").fadeIn();
                         }else if(_this.targetType==3){
                            targetTypeName='健身增肌';
                            _this.stageTitle='健身增肌1~2';
                            $(".checkUl2,#type1").fadeIn();
                            $('#type2').hide();

                             _this.stageArry = [];
                             _this.stateNumber = 0;

                             _this.calculate(_this.targetType);
                         }

                         _hmt.push(['_trackEvent','体重管理','体重管理','目标体型'+targetTypeName]);
                        
                         _this.stageN = null;
                         
                         console.log("选择的type" + _this.targetType)

                        _this.weightNumber = Number(_this.homeData.currentWeight*2).toFixed(1);


                     })

                        _this.calculate(_this.targetType);
                    },
                    //阶段生成
                    getstage:function(){

                        var  stateData=0;

                        var currntWeight = Number(this.homeData.currentWeight*2).toFixed(1);//当前体重

                        if(this.targetType==1){
                            stateData = Math.abs(this.weightNumber-currntWeight)/4;
                            stateData = Math.ceil(stateData);
                            console.log("减体重阶段"+stateData);
                            this.stageArry = stateData;
                            this.stateNumber = stateData;
                        }else if(this.targetType==3){
                            stateData = Math.abs(this.weightNumber-currntWeight)/2;
                            stateData = Math.ceil(stateData);
                            console.log("增体重阶段"+stateData);
                            this.stageArry = stateData;
                            this.stateNumber = stateData;
                        }

                    },
                    //添加体重管理套餐信息
                    getManageWeight:function(targetType){
                      var _this = this;

                      var currntWeight = this.homeData.currentWeight;
                      $.ajax({
                         type: 'post',
                          url:api.adupWeightManagement,
                          data:{
                            targetType:targetType,
                            currentWeight:currntWeight,
                            targetWeight: parseFloat(_this.weightNumber/2),
                            unionid: _this.unionidStorage
                          },
                          async: true,
                          dataType:'json',
                          success:function(res){
                             if(res==true){
                                common.linkTo2("./manage.html");
                             }else{
                                alert("体重管理不成功！")
                             }
                          }
                      })

                    },
                    //目标体型操作
                    calculate:function(targetType){

                        var _this =this;

                        var currntWeight = Number(_this.homeData.currentWeight*2).toFixed(1);

                        //减脂
                        if(targetType==1){
                            console.log("减脂")
                           $("#add").unbind('click').bind('click',function(){
                              _this.stageN = null;
                             
                                if(_this.weightNumber>=currntWeight){
                                    $(".dialog").fadeIn(function(){
                                         $(this).find(".textTip").show().text("目标体重不能大于当前体重！");
                                    });
                                }else{
                                    _this.weightNumber++;
                                }

                                _this.getstage();
                           })


                           $("#reduce").unbind('click').bind('click',function(){
                            _this.stageN = null;
                            if(_this.weightNumber<=1){
                                _this.weightNumber =1;
                                }else{
                                    _this.weightNumber--;
                                }  
                                
                                _this.getstage();
                           })
                        }

                        //健身增肌肉
                        if(targetType==3){

                            console.log("增肌")

                            $("#reduce").unbind('click').bind('click',function(){
                                _this.stageN = null;
                                 if(_this.weightNumber<=currntWeight){
                                    $(".dialog").fadeIn(function(){
                                        $(this).find(".textTip").show().text("目标体重不能小于当前体重！");
                                   });
                                 }else{
                                    if(_this.weightNumber<=1){
                                        _this.weightNumber=1;
                                        }else{
                                            _this.weightNumber--;
                                    }  
                                 }
                                 _this.getstage();
                            });


                            $("#add").unbind('click').bind('click',function(){
                                _this.stageN = null;
                                _this.weightNumber++;

                                _this.getstage();
                            })

                        }
                   
                    },
                    //点击体重管理按钮
                    btnManage:function(){
                        var _this = this;

                 
                        _hmt.push(['_trackEvent','体重管理','体重管理','开始我的体重管理']);

                        console.log("点击的type"+this.targetType);

                        var currentWeight= Number(this.homeData.currentWeight*2).toFixed(1);


                        function manageT(targetType){
                            if(_this.BMI<18.5&&targetType==1){
                                _this.bntsSate=true;

                            $(".dialog").fadeIn(function(){
                                    $(this).find(".btns-1").text("确定要减脂");
                                    $(this).find(".text").show().text("根据您的健康分析，你的BMI〈18.5，属于偏瘦，过度减脂有可能会影响健康，确定要减脂？");
                            })
    
                        }else if(this.BMI>40.0&&targetType==3){
                            _this.bntsSate=true;

                            $(".dialog").fadeIn(function(){
                                $(this).find(".btns-1").text("确定要增肌");
                                $(this).find(".text").show().text("根据您的健康分析，您的BMI>40，属于超重，过度增肌有可能会影响健康，确定要增肌?");
                            })
    
                        }else{
                            _this.getManageWeight(targetType);
                        }
                            
                        }


                        if(this.targetType==1){

                            if(currentWeight== this.weightNumber){
                                _this.bntsSate2=true;
                                $(".dialog").fadeIn(function(){
                                    $(this).find(".textTip").show().text("想减脂但体重不变，建议选择塑型哦！");
                               });
                            }else{
                                manageT(this.targetType)
                            }
                        }else if(this.targetType==3){
                            if(currentWeight== this.weightNumber){
                                _this.bntsSate2=true;
                                $(".dialog").fadeIn(function(){
                                    $(this).find(".textTip").show().text("想增肌但体重不变，建议选择塑型哦！");
                               });
                            }else{
                                manageT(this.targetType)
                            }
                        }else{
                            manageT(this.targetType)
                        }


                    
                    },
                    //确定减脂按钮
                    determine:function(){
                        this.getManageWeight(this.targetType);
                    },
                    //推荐方案
                    recommend:function(){
 
                         if(this.targetType==1){
                            this.getManageWeight(2);
                         }else if(this.targetType==3){
                            this.getManageWeight(1);
                         }else if(this.targetType==2){
                            this.getManageWeight(2);
                         }

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

                                _this.weightNumber = Number(_this.homeData.currentWeight*2).toFixed(1);
                            }
                        })
                    },
                    closeDlg: function() {
                        $(".dialog,.textTip,.text").hide();
                        this.bntsSate2=false;
                        this.bntsSate=false;
                    },
                    confirm:function(){
                        $(".dialog,.textTip,.text").hide();

                        this.stageArry = [1,2];

                        this.stageN = null;

                        this.bntsSate2=false;
                        this.bntsSate=false;

                        this.targetType = 2;
          
                        if(this.targetType==2){
                            $(".checkUl2,#type1").hide();
                            $("#type2").fadeIn();

                             this.stageArry.length = 2;
                        }else{
                            $(".checkUl2,#type1").fadeIn();
                            $('#type2').hide();

                             this.stageArry = []
                        }
                    }
                }
            })
        }, 500)
    })

})