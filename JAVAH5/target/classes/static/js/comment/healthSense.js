
require(['jquery','common'],function($,common){
    $(function(){

     $(".senseFood").click(function(){
         common.linkTo2('knowFood.html');
         _hmt.push(['_trackEvent','健康小常识广告','饮食','饮食跳转']);
     });

     $(".senseHot").click(function(){
         common.linkTo2('knowHot.html');
         _hmt.push(['_trackEvent','健康小常识','热门','热门跳转']);
     });

        $(".senseChoice").click(function(){
            common.linkTo2('knowChoice.html');
            _hmt.push(['_trackEvent','健康小常识','精选','精选跳转']);
        });


        $(".senseSport").click(function(){
            common.linkTo2('knowSport.html');
            _hmt.push(['_trackEvent','健康小常识','运动','运动跳转']);
        });

    })
})