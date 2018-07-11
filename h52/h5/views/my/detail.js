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
                    data: {},
                    upperId: '',
                    parentId: '',
                    problemMap: {},
                    reply: [],
                    profile: {},
                    isSend: false,
                    loaded: false
                },
                components: {
                    'footer-bar': FooterBar_vue
                },
                created: function() {

                },
                mounted: function() {
                    var _this = this;
                    this.getHistory()
                    this.getProfile()

                    // setTimeout(function() {

                    //     _this.getProblem();
                    // }, 1000)
                },
                methods: {
                    preview: function(url) {
                        wx.previewImage({
                            current: url,
                            urls: [url]
                        });
                    },
                    send: function() {
                        $('.input input').focus();
                        this.isSend = true;

                        var _this = this;

                        var data = {
                            proposal: this.$refs.reply.value,
                            parentId: this.parentId,
                            upperId: this.upperId,
                            type: this.data.type,
                            _p: common.getRequest()._p
                        }
                        $.ajax({
                            type: 'POST',
                            // data: JSON.stringify(data),
                            url: api.saveFeedback + '?' + $.param(data),
                            dataType: 'json',
                            success: function(res) {
                                if (res && res.result && res.result.status == 0) {
                                    common.showToastr('回复成功')
                                    $('.input').css('display', 'none');

                                    _this.getHistory(true)
                                }
                            }
                        })
                    },
                    onBlur: function() {
                        var _this = this;
                        setTimeout(function() {

                            if (!_this.isSend)
                                $('.input').css('display', 'none');

                            _this.isSend = false;
                        })

                    },
                    showInput: function(id, parentId) {
                        this.upperId = id;
                        this.parentId = parentId;
                        $('.input').css('display', 'flex');
                        $('.input input').focus();
                    },
                    getProfile: function(cb) {
                        var data = {
                            _p: common.getRequest()._p
                        }

                        var _this = this;
                        $.ajax({
                            type: 'POST',
                            url: api.profile + '?' + $.param(data),
                            dataType: 'json',
                            success: function(res) {

                                _this.profile = res.result.data[0];

                                _this.loaded = true
                            },
                            error: function() {}
                        })
                    },
                    getProblem: function() {
                        var _this = this;
                        $.ajax({
                            type: 'GET',
                            url: api.problems,
                            dataType: 'json',
                            success: function(res) {
                                if (res && res.result && res.result.data && res.result.data.length) {

                                    var problems = res.result.data;

                                    for (var i = 0; i < problems.length; i++) {
                                        var p = problems[i]
                                        _this.problemMap[p.problemId] = p.problem;
                                    }

                                    // _this.problemMap = $.extend({}, _this.problemMap)
                                }
                            }
                        })
                    },
                    getHistory: function(isNew) {
                        var _this = this;
                        var data = {
                            _p: common.getRequest()._p
                        }
                        $.ajax({
                            type: 'GET',
                            url: api.history + '/' + common.getRequest().id,
                            data: data,
                            dataType: 'json',
                            success: function(res) {
                                if (res && res.result && res.result.data && res.result.data.length) {


                                    var item = res.result.data[0]
                                    _this.data = item;
                                    _this.reply = item.childMessage

                                    setTimeout(function() {
                                        if (isNew)
                                            $('.reply .item:last')[0].scrollIntoView()
                                    })
                                }
                            }
                        })
                    }
                },
                filters: {
                    formatDate: function(input, type) {
                        if (!input) {
                            return ''
                        }


                        var d = new Date(input);
                        var year = d.getFullYear();
                        var month = (d.getMonth() + 1) < 10 ? '0' + (d.getMonth() + 1) : '' + (d.getMonth() + 1);
                        var day = d.getDate() < 10 ? '0' + d.getDate() : '' + d.getDate();
                        var hour = d.getHours();

                        if (hour < 10) {
                            hour = '0' + hour;
                        }
                        if (minutes < 10) {
                            minutes = '0' + minutes;
                        }
                        var minutes = d.getMinutes();
                        var seconds = d.getSeconds();
                        return year + '-' + month + '-' + day + ' ' + hour + ':' + minutes;
                    }
                }
            })
        }, 500)
    })

})