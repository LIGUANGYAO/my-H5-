
require(['jquery', 'Vue',  'common', 'api'], function($, Vue, common, api) {
    
        $(function() {
            // settimeout 防止页面假死
            setTimeout(function() {
                new Vue({
                    el: '#app',
                    data: {

                        handle:null,
                        d:0,
                        homeData:{},
                        currentWeight:null
    
                    },
                    components: {
    
                    },
                    created: function() {

                        
                    },
                    mounted: function() {
                       

                        this.drawImage2();
                        this.drawImage();

                        this.getWeight();
    
                    },
                    methods:{

                        linkTo:function(){
                            common.linkTo2("../../index.html");
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
                            img.src="../../assets/images/home/ctx.png";
                            
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
                        getWeight: function() {
                            var _this = this;


                           if(common.getRequest()._p){
                             console.log("有_p");

                             $("#btn").show();
                             $(".authorizeBtn").on('click',function(){
                                 _this.linkTo();
                             })
                             
                             $.ajax({
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

                                    _this.currentWeight = (_this.homeData.currentWeight*2).toFixed(1)
    
                                     _this.drawImage2();
                                     _this.drawImage((_this.homeData.currentWeight*2)-30);
    
                            
                                  }
                                }else{
    
                                }
                            },
                            error:function(){
                           
                            }
                            })

                           

                            }else{

                                console.log("没有_p");
                                $("#btn").hide();
                                var weight = Number(common.getRequest().weight);
                                console.log(weight)

                                _this.currentWeight = (weight*2).toFixed(1);
                              
                                _this.drawImage2();
                                _this.drawImage((weight*2)-30);
                            

                            }


                        },
    
                    }
                })
            }, 200)
        })
    
    })