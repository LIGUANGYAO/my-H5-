

require(['jquery','Vue','common','api','bmi','PageLoad'],function($,Vue,common,api,bmi,PageLoad){
    
        $(function(){

            var PageLoad_vue = PageLoad.init();
    
            // settimeout 防止页面假死
            setTimeout(function(){
                new Vue({
                    el: '#app',
                    data: {
                        homeData:{},
                        registeredData:null,
                        bodyTypeChinese:null,
                        BMI:null,
                        sexR:null,
                        text1:null,
                        text2:null,
                        text3:null,
                        bmr:null,
                        pageLoad:false//页面加载
                    },
                    components: {
                        'page-load': PageLoad_vue
                    },
                    created: function(){

                       var a = this.getProfile();
                       var b= this.getWeight();

                       $.when(a,b).then(function(){

                        this.BMI = bmi.toMathBmi(this.homeData.currentWeight,this.registeredData.height);//计算BMI值
                        this.bodyTypeChinese = bmi.getBodyTypeChinese(this.BMI.bmi);//
                        this.bmr = bmi.toMathBMR(this.sexR,this.homeData.currentWeight,this.registeredData.height,this.registeredData.age);
                        this.foodSuggest();

                        this.pageLoad =true;

                       }.bind(this));

 
                    },
                    mounted: function(){
                        

                     },
                     methods: {
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
                                console.log(_this.homeData.currentWeight);
                            }
                            })
                        },
                        //获取注册信息接口
                        getProfile:function(){
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
                                    _this.registered = res.result.data[0].height;
                                    _this.sexR = res.result.data[0].gender;//注册后的性别
                                    _this.registeredData = res.result.data[0];
                             }
                            })
                        },
                        //饮食建议推荐
                        foodSuggest: function(){
                            var _this= this;
                            if(this.bodyTypeChinese=='偏瘦'){
                                 _this.text1 = '建议适当增加力量训练，比如短跑、哑铃、仰卧起坐、动感单车等，增加力量训练可以增加我们的肌肉量，适当增加体重。';
                                 _this.text2 = '每周增加2-3次的运动时间，一般在15：00-20：00之间，可以考虑作为主要锻炼时间，一般在晚上餐前比较合适。';
                            }else if(this.bodyTypeChinese=='正常'){
                                _this.text1 = '建议可以保持每周3次左右的有氧运动，比如游泳、慢跑、踩单车等，对身材要求比较高的可以适当加入力量训练，以便能塑造更完美的体型。';
                                _this.text2 = '有氧运动建议在三餐餐前进行比较合适，并且时间需连续持续30分钟以上；确定每天运动的时间，逐渐养成运动的习惯；';
                            }else if(this.bodyTypeChinese=='偏胖'||this.bodyTypeChinese=='肥胖'){
                                _this.text1 = '建议适当增加有氧运动，比如慢跑、快走、游泳、踩单车等，增加有氧运动可以有效的燃烧我们体内的脂肪，适当减轻体重';
                                _this.text2 = '有氧运动一般建议在三餐餐前进行比较合适，空腹的有氧运动能更有效的促进脂肪燃烧，并且时间需连续持续30分钟以上；';
                               
                            }
                        }
                     }
                })
        },50)
    
        })
     
    
    })