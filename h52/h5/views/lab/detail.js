//@see 有背景的loading框
function openLoading(msg) {
    var loadingBox = document.createElement('div');
    loadingBox.id = 'loadingBox';
    loadingBox.style.cssText = "width:100%;height:100%;background-color: white;position:fixed;top:0;left:0;z-index:9999";
    var loading = document.createElement('div');
    loading.id = 'loading';
    loading.style.cssText = "display:-webkit-box;-webkit-box-align:center; -webkit-box-pack: center;-webkit-box-orient: vertical; width:8em;height:7em;color:#ffffff;text-shadow: none; background:#000; opacity:0.4; border-radius:5px; position:fixed; top:50%; left:50%; margin-top:-3.5em;margin-left:-4em;z-index:9999";
    var loadingImg = document.createElement('div');
    loadingImg.id = 'loadingImg';
    loadingImg.style.cssText = "width:5em;;height:4.5em;background-image:url('../../assets/images/logo.gif');background-size:65%;background-position:center;background-repeat:no-repeat;";
    var loadingText = document.createElement('div');
    loadingText.id = 'loadingText';
    loadingText.innerHTML = msg
    loadingText.style.cssText = "-webkit-box-flex:1;font-family:Microsoft Yahei;font-size:1.1em;color: rgb(153,207,22);"
    loading.appendChild(loadingImg);
    loading.appendChild(loadingText);
    loadingBox.appendChild(loading);
    document.getElementsByTagName('body')[0].appendChild(loadingBox);
}
//@see 关闭有背景的loading框
function closeLoading() {
    $("div#loadingBox").remove();
}

//openLoading("加载中......");//在require加载模块js之前显示loading



require(['jquery', 'Vue', 'FooterBar', 'common', 'api'], function($, Vue, FooterBar, common, api) {

    $(function() {

        var FooterBar_vue = FooterBar.init();

        // settimeout 防止页面假死
        setTimeout(function() {
            new Vue({
                el: '#app',
                data: {
                  data: null
                },
                components: {
                    'footer-bar': FooterBar_vue
                },
                created: function() {

                },
                mounted: function() {
                    this.getExperimentalDetail();
                },
                methods: {
                    // 实验室明细
                    getExperimentalDetail: function() {

                        var data = {
                            _p: common.getRequest()._p,
                            evaid: common.getRequest().evaid
                        }

                        var _this = this;
                        $.ajax({
                            type: 'GET',
                            url: api.experimentalId + '?' + $.param(data),
                            dataType: 'json',
                            success: function(res) {
                                _this.data = res.result.data[0];
                            },
                            error: function() {}
                        })
                    }
                }
            })
        }, 500)
    })

})