require(['jquery', 'Vue','common','api'],function($, Vue,common,api){
    $(function(){

        // settimeout 防止页面假死
        setTimeout(function () {
            new Vue({
                el:'#app',
                data:{

                },
                mounted:function(){

                },
                methods:{
                    /*
                    * 统计广告点击次数
                    * @author Sea
                    * @param {string} adId   广告唯一标识
                    * @param {string} adName 广告名字
                    * @param {int} adType  广告类型  1,首页；2，PK榜页；3,附近的秤；4，推荐页；5，我的中心页
                    * @param {string} adUrl 广告连接
                    * @date 2017-09-30
                    * @return void
                    */
                    addAdCount: function(adId, adName, adType) {
                        $.ajax({
                            type: "POST",
                            url: api.getClickADCount,
                            data: {
                                _p: common.getRequest()._p,
                                adId: adId,
                                name: adName,
                                type: adType
                            },
                            success: function(response) {
                                debugger;
                                if(response.retcode == 1) {

                                } else {
                                    console.log(response);
                                }
                            }
                        });
                    }
                }
            })


        },500)

    })
})