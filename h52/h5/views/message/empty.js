require(['jquery', 'Vue',  'common', 'api'], function($, Vue, common, api) { 
    
        $(function(){
            // settimeout 防止页面假死
            setTimeout(function() {
    
                new Vue({
                    el: '#app',
                    data:{
                       
                    },
                    created:function(){
    
                    },
                    mounted:function(){
    
                       $(".goTo").on('click',function(){
                          common.linkTo2("../../index.html");
                       })
     
                    },
                    methods:{
                 
                    }
                })
    
            },500)
        })
    
     })