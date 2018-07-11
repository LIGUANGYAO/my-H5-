define(['Vue','common','api'],

function(Vue,common,api){

    var exports = {};

    exports.init = function(){
        var FooterBar = Vue.extend({
            data: function(){
                return {
                    active: 'bar-active',
                    noActive: ' ',
                    link:{
                        home: '/index.html',
                        map: '/views/map/map.html',
                        health: '/views/health/health.html',
                        mall: 'https://j.youzan.com/ZxHlOY',
                        my: '/views/my/my.html'
                    },
                    footerNav:{
          
                    }
                }
            },
            template: 
                '<footer class="bar">'+
                    '<a @click="linkTo(link.home);" class="barIndex" :class="[index == 1 ? active : noActive]"></a>'+
                    '<a @click="linkToH(link.health)" class="barHealth" :class="[index == 2 ? active : noActive]"></a>'+
                    '<a href="https://j.youzan.com/ZxHlOY"  class="barMall" :class="[index == 3 ? active : noActive]"></a>'+
                    '<a @click="linkTo(link.my)" class="barMy" :class="[index == 5 ? active : noActive]"></a>'+
                '</footer>',
            props: {
                index: {
                    type: Number
                }
            },
            created: function(){

            },
            mounted: function(){
               
            },
            methods: {
                linkTo: function(url){
                	var thisUrl = window.location.href;
                    var tempUrl = url.substring(2,url.length);
                	if(thisUrl .indexOf(tempUrl ) < 0){
                          common.linkTo(url);
                    }
                },
                linkToH: function(url){
                    var _this = this;
                    var thisUrl = window.location.href;
                	var tempUrl = url.substring(2,url.length);
                	if(thisUrl .indexOf(tempUrl ) < 0){
                        if(sessionStorage.Age== "null" || sessionStorage.Height== "null"|| sessionStorage.Gender== "null"){
                            $(".registration-model-content").show();
                             sessionStorage.footerLink="health";
                        }else{
                            common.linkTo(url);
                        }
                          
                    }
                }
            }
        });

        return FooterBar;

    }

    return exports;

});