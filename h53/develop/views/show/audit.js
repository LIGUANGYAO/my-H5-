

require(['jquery','Vue','FooterBar', 'common'],function($,Vue,FooterBar, common){

 $(function(){

    var FooterBar_vue = FooterBar.init();
    
    // settimeout 防止页面假死
    setTimeout(function(){
      new Vue({
          el: '#app',
          data: {
              
          },
          components: {
            'footer-bar': FooterBar_vue
          },
          created: function(){

          },
          mounted: function(){

        },
        methods: {
          back: function() {
            common.linkTo('./show.html')
          }
        }
      })
    },500)
 })

})