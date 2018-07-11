require(['jquery', 'Vue',  'common', 'api'], function($, Vue, common, api) { 

    var  title= decodeURI(common.getRequest().titleName);
    
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

                        
                        console.log(title);
                        $("title").text(title);
    
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