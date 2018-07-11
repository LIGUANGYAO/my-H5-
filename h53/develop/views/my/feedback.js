


require(['jquery', 'Vue', 'FooterBar', 'common', 'api'], function($, Vue, FooterBar, common, api) {

    $(function() {

        var FooterBar_vue = FooterBar.init();

        // settimeout 防止页面假死
        setTimeout(function() {
            new Vue({
                el: '#app',
                data: {
                    tab: 'jianyi',
                    problems: [],
                    problemId: 0,
                    img: '',
                    img2: '',
                    history: [],
                    problemMap: {},
                    loaded: false
                },
                components: {
                    'footer-bar': FooterBar_vue
                },
                created: function() {

                },
                mounted: function() {
                    this.getProblem()
                    this.getHistory()
                },
                methods: {
                    getProblem: function() {
                        var _this = this;
                        $.ajax({
                            type: 'GET',
                            url: api.problems,
                            dataType: 'json',
                            success: function(res) {
                                if (res && res.result && res.result.data && res.result.data.length) {

                                    _this.problems = res.result.data;

                                    for(var i = 0; i < _this.problems.length; i++) {
                                        var p = _this.problems[i]
                                        _this.problemMap[p.problemId] = p.problem;
                                    }
                                }
                            }
                        })
                    },
                    toDetail: function(id) {
                        common.linkTo2('./detail.html',null, 'id=' + id);
                    },
                    getHistory: function() {
                        var _this = this;
                        var data = {
                            _p: common.getRequest()._p
                        }
                        $.ajax({
                            type: 'GET',
                            url: api.history,
                            data: data,
                            dataType: 'json',
                            success: function(res) {
                                if (res && res.result && res.result.data && res.result.data.length) {

                                    _this.history =  res.result.data;

                                    for(var i = 0; i < _this.history.length; i++) {
                                        var item = _this.history[i];

                                        for (var j = 0; j < item.childMessage.length; j++) {
                                            var k = item.childMessage[j];

                                            if (k.readState == 0) {
                                                item.readState = 0;
                                            }
                                        }
                                    }
                                    _this.loaded = true;
                                }
                            }
                        })
                    },
                    onUpload: function(e) {
                        var _this = this;
                        if (e.target.files.length) {
                            this.readPhoto(e.target.files[0]);
                            this.file = e.target.files[0];
                        }
                    },
                    onUpload2: function(e) {
                        var _this = this;
                        if (e.target.files.length) {
                            this.readPhoto2(e.target.files[0]);
                            this.file2 = e.target.files[0];
                        } 
                    },
                    readPhoto: function(file) {
                        var reader = new FileReader();
                        var _this = this;
                        reader.onload = function(e) {
                            _this.img = e.target.result;
                        }
                        reader.readAsDataURL(file);
                    },
                    readPhoto2: function(file) {
                        var reader = new FileReader();
                        var _this = this;
                        reader.onload = function(e) {
                            _this.img2 = e.target.result;
                        }
                        reader.readAsDataURL(file);
                    },
                    saveJianyi: function() {
                        var form = new FormData()
                        form.append('_p', common.getRequest()._p)
                        form.append('type', 1)
                        form.append('proposal', this.$refs.jianyi_text.value)
                        form.append('mail', this.$refs.jianyi_email.value)
                        form.append('picFile', this.file)
                        if (!this.$refs.jianyi_text.value) {
                            return common.showToastr('亲爱哒,你还没有填写内容喔');
                        }
                        if (this.$refs.jianyi_text.value.length < 10) {
                            return common.showToastr('亲爱哒,提议至少需要10个字喔');
                        }
                        var _this = this;

                        $.ajax({
                            type: 'POST',
                            url: api.saveFeedback,
                            dataType: 'json',
                            data: form,
                            enctype: 'multipart/form-data',
                            processData: false,
                            contentType: false,
                            success: function(res) {
                                if (res.result.status === 0) {
                                    common.showToastr('提交成功');
                                    _this.getHistory();
                                    _this.$refs.jianyi_text.value = '';
                                    _this.$refs.jianyi_email.value = '';
                                    _this.img = null;
                                    _this.file = null
                                }
                            }
                        })
                    },
                    saveTucao: function() {
                        var form = new FormData()
                        form.append('_p', common.getRequest()._p)
                        form.append('type', 2)
                        form.append('proposal', this.$refs.tucao_text.value)

                        if (!this.problemId) {
                            return common.showToastr('亲爱哒,你还未选择问题类型喔');
                        }
                        form.append('problemId', this.problemId)
                        form.append('picFile', this.file2)
                        // if (!this.$refs.tucao_text.value) {
                        //     return common.showToastr('请输入内容');
                        // }
                        var _this = this;

                        $.ajax({
                            type: 'POST',
                            url: api.saveFeedback,
                            dataType: 'json',
                            data: form,
                            enctype: 'multipart/form-data',
                            processData: false,
                            contentType: false,
                            success: function(res) {
                                if (res.result.status === 0) {
                                    common.showToastr('成功');
                                    _this.getHistory();

                                    _this.$refs.tucao_text.value = '';
                                    _this.img2 = null;
                                    _this.file2 = null
                                    _this.problemId = null
                                }
                            }
                        })
                    },
                    submit: function() {
                        var data = {
                            _p: common.getRequest()._p,
                            feedback: this.$refs.feedback.value
                        }

                        if (!data.feedback) {
                            return common.showToastr('请输入内容');
                        }
                        var _this = this;
                        $.ajax({
                            type: 'POST',
                            url: api.saveFeedback + '?' + $.param(data),
                            dataType: 'json',
                            success: function(res) {
                                if (res.result.status === 0) {
                                    common.showToastr('成功');
                                    setTimeout(function() {
                                        history.back()
                                    }, 1000)
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