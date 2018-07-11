define(['Vue','common'], function(Vue, common) {
    
    var exports = {};

    exports.init = function(){
        var PageLoad = Vue.extend({
            data: function (){
                return {

                }
            },
            template:
            '<div  v-if="loadstage" id="loadingBox">'+
            '<div id="loading">'+
            '<div id="loadingImg"></div>'+
            '<div id="kat"></div>'+
            '</div></div>',
            props:{
                loadstage:{
                    type: Boolean
                }
            },
            created:function(){

            },
            methods:{
                
            }

            
        })
        return PageLoad;
    }

    return exports;
    
});