define(['Vue','common'],

function(Vue,common){

    var exports = {};

    exports.init = function(){
        var FooterBar = Vue.extend({
            data: function(){
                return {
                    active: 'bar-active',
                    noActive: ' ',
                    link:{
                        home: 'index.html',
                        dot: 'map.html',
                        healthAnalysis: 'health.html',
                        mall: 'mall.html'
                    },
                    footerNav:{
                        home:'首页',
                        healthAnalysis:'健康分析',
                        dot:'附近秤',
                        mall:'商城'
                    }
                }
            },
            template: 
                '<footer class="bar">'+
                    '<a @click="linkTo(link.home,footerNav.home);" class="bar__index" :class="[index == 0 ? active : noActive]"></a>'+
                    '<a @click="linkTo(link.healthAnalysis,footerNav.healthAnalysis)" class="bar__health" :class="[index == 1 ? active : noActive]"></a>'+
                    '<a @click="linkTo(link.dot,footerNav.dot)" class="bar__dot" :class="[index == 4 ? active : noActive]"></a>'+
                    '<a @click="linkTo(link.mall,footerNav.mall)" class="bar__mall" :class="[index == 2 ? active : noActive]"></a>'+
                '</footer>',
            props: {
                index: {
                    type: Number
                }
            },
            methods: {
                linkTo: function(url,name){
                	var thisUrl = window.location.href;
                	var tempUrl = url.substring(2,url.length);
                	if(thisUrl .indexOf(tempUrl ) < 0){
                          common.linkTo(url);
                          _hmt.push(['_trackEvent','底部导航',name,name+'跳转']);
                    }
                }
            }
        });

        return FooterBar;

    }

    return exports;

});