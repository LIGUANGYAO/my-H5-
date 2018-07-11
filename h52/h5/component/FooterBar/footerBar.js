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
                        my: '/views/my/my.html',
                        show: '/views/show/show.html'
                    },
                    footerNav:{
          
                    }
                }
            },
            template: 
                '<footer class="bar">'+
                    '<a @click="linkTo(link.home);" class="barIndex" :class="[index == 1 ? active : noActive]"></a>'+
                    '<a @click="linkTo(link.show)" class="barHealth" :class="[index == 2 ? active : noActive]"></a>'+
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
                linkToGol:function(url){
                    var _this = this;
                    var thisUrl = window.location.href;
                    var tempUrl = url.substring(2,url.length);

                    if(thisUrl .indexOf(tempUrl ) < 0){
                        if(sessionStorage.registerStage== "true"){ 
                            $(".registration-model-content").show();
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