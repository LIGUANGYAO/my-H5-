require(['jquery','Vue'], function($,Vue){

  $(function(){

    // common.globalAjax();//开始全局ajax监听
    // common.hideOptionMenu();//禁用分享等按钮
    // settimeout 防止页面假死
    setTimeout(function(){

      new Vue({
        el: '#app',
        data: {

        }
      });

    }, 50);

  });

});