

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
                        headTitle1:null,
                        headTitle2:null,
                        headTitle3:null,
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

                       var a= this.getProfile();
                       var b=this.getWeight();

                       $.when(a,b).then(function(){

                        this.BMI = bmi.toMathBmi(this.homeData.currentWeight,this.registeredData.height);//计算BMI值
                        this.bodyTypeChinese = bmi.getBodyTypeChinese(this.BMI.bmi);//
                        this.bmr = bmi.toMathBMR(this.sexR,this.homeData.currentWeight,this.registeredData.height,this.registeredData.age);
                        this.foodSuggest();

                        this.pageLoad =true;

                       }.bind(this)) 
                    },
                    mounted: function(){
                        console.log(this.bodyTypeChinese);

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
                                 _this.headTitle1 = '适当增加摄入量';
                                 _this.headTitle2 = '注意规律三餐';
                                 _this.headTitle3 = '养成良好的饮食习惯';
                                 _this.text1 = '人的身体需要摄入热量，也需要代谢热量，宏观来说，当你摄入的热量大于你代谢的热量时，你的体重就会增加，反之则减少。比如高蛋白类和热量高的物质，比如：西式糕点、牛奶、鸡蛋、沙琪玛等；';
                                 _this.text2 = '按时进餐、不挑吃，不偏吃，以确保营养的均衡，很多人BMI偏轻都会有存在挑吃的不良习惯，导致身体缺乏很多营养素，所以最好就是应该什么都要吃一点，改掉挑食的毛病。';
                                 _this.text3 = '少吃多餐，增加进餐频次，在有条件下可以多吃几餐，除了早餐、午饭、晚饭之外，可以加上下午的点心，和睡前一小时的夜宵。';
                            }else if(this.bodyTypeChinese=='正常'){
                                _this.headTitle1 = '均衡饮食';
                                _this.headTitle2 = '合理选择食物';
                                _this.headTitle3 = '注意餐次及定时定量';

                                _this.text1 = '维持适宜的体重应该饮食不过量，食物种类多样丰富，粗细搭配，建议可以多搭配粗粮食用，维持血糖的平稳。';
                                _this.text2 = '多选低脂肪，低糖份的食物，多吃蔬菜及每天吃水果，餐前可先喝汤或半杯水可增加饱腹感，维持体重时，应该要注意食物的选择。';
                                _this.text3 = '切记不可跳餐，以免下餐饥不择食，在不自觉间进食太多食物，两顿正餐应相隔5-6小时，中间（3-4小时）可加小食，小食应以低脂食物为主，例如饼干、水果、脱脂奶等;';
                            }else if(this.bodyTypeChinese=='偏胖'||this.bodyTypeChinese=='肥胖'){
                                _this.headTitle1 = '注意减少摄入量';
                                _this.headTitle2 = '增加蛋白质的摄入量';
                                _this.headTitle3 = '清淡饮食，减少油脂的摄入';

                                _this.text1 = '人的身体需要摄入热量，也需要代谢热量，宏观来说，当你摄入的热量小于你代谢的热量时，你的体重就会减少，反之则增加。';
                                _this.text2 = '建议可以多吃富含蛋白质高的食物，蛋白质可以有效提高人体的代谢率，尤其是高蛋白质物质，比如牛奶、鸡胸肉、鸡蛋等；';
                                _this.text3 = '如果每人每天多吃1汤匙（15克）油，一个月后体重就会增加700-800克，一年就会增加体重近10公斤。一般成年人每天以2汤匙（25-30克），肥胖或高血脂人群以1汤匙为度。';
                            }
                        }
                     }
                })
        },50)
    
        })
     
    
    })