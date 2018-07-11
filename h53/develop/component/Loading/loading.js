define(['Vue','jquery'],

function(Vue,$){

    var exports = {};

    exports.init = function(){
        var loading = Vue.extend({
            data: function(){
                return {
                    
                }
            },
            template: 
                '<div v-if="isloading" style="position: fixed;top: 0;bottom:0;left:0;right:0;z-index: 99;background-color: rgba(0,0,0,.7)">'
                    +'<img src="../../assets/images/default.svg" width="64" height="64" style="position: absolute;left: 50%;top: 50%;margin-left: -32px;margin-top: -32px;"/>'+
                '</div>',
            props: {
                isloading: {
                    type: Boolean
                }
            },
        });

        return loading;

    }

    return exports;

});