



history.pushState('a', null, location.search)
require(['jquery', 'Vue', 'FooterBar', 'common', 'api'], function($, Vue, FooterBar, common, api) {

    $(function() {

        var FooterBar_vue = FooterBar.init();

        // settimeout 防止页面假死
        setTimeout(function() {
            new Vue({
                el: '#app',
                data: {
                    items: [],
                    content: '',
                    file: '',
                    pic: '',
                    showCloseDlg: false,
                    picId: null,
                    oldPic: null,
                    loaded: false,
                    data: {},
                    profile: {}
                },
                components: {
                    'footer-bar': FooterBar_vue,

                    'item': {
                        template: '#item',
                        props: ['img', 'index'],
                        methods: {
                            remove: function() {
                                this.$emit('remove', this.index);
                            }
                        }
                    }
                },
                created: function() {
                    var  _this = this;
                    window.addEventListener("popstate", function(e) {
                        if (window.isConfirm) {
                            history.back();
                        } else {

                            history.pushState('cur', null, location.search)

                            _this.showCloseDlg = true;
                        }
                    }, false);

                },
                mounted: function() {

                    $('.ck *').on('click', function() {
                        $(this).addClass('active').siblings().removeClass('active');

                        $('.submit').addClass('active')
                    })



                     if (sessionStorage.lastModifyPicId) {
                        this.picId = sessionStorage.lastModifyPicId;
                        sessionStorage.lastModifyPicId = '';

                        this.getDetail(this.picId)
                     } else {

                        var code = sessionStorage.code;

                        if (!code || code == 0) {
                            code = 2;
                        }

                        $('.ck [code=' + code + ']').trigger('click')

                         sessionStorage.code = ''

                        this.loaded = true
                     }

                     this.getProfile()
                },
                methods: {
                    // 取消
                    cancel: function() {
                        common.linkTo('./show.html');
                    },
                    // 获取详情
                    getDetail: function(imgId, callback) {
                        // openLoading('加载中');
                        var data = {
                            _p: common.getRequest()._p,
                            picid: imgId
                        }

                        var _this = this;
                        $.ajax({
                            type: 'GET',
                            url: api.imgDetail + '?' + $.param(data),
                            dataType: 'json',
                            data: {

                            }, 
                            success: function(res) {
                                _this.data = res.result.data[0];

                                _this.content = _this.data.picName;

                                _this.oldPic =  _this.data.picUrl
                                _this.items = [{
                                    img: _this.data.picUrl
                                }]
                                
                                $('.ck [code=' +  _this.data.newType + ']').trigger('click')
                                // _this.data.state = 1;
                                _this.loaded = true
                                
                            }
                        })
                    },
                    // 获取个人信息
                    getProfile: function(callback) {
                        var data = {
                            _p: common.getRequest()._p
                        }

                        var _this = this;
                        $.ajax({
                            type: 'POST',
                            url: api.profile + '?' + $.param(data),
                            dataType: 'json',
                            async: false,
                            success: function(res) {
                                _this.profile = res.result.data && res.result.data[0]
                            }
                        })
                    },
                    publish: function() {
                        var data = {
                            _p: common.getRequest()._p
                        }

                        var form = new FormData

                        if (!this.file && (!this.picId || !this.oldPic)) {
                          return common.showToastr('请上传图片');
                        }

                        if (this.oldPic) {
                            form.append('picUrl', this.oldPic);
                        }
                        if (this.file.size > (10 * 1024 * 1024)) {
                          return common.showToastr('图片不能大于10M');
                        }

                        if (!this.content) {
                          return common.showToastr('请输入文字');
                        }

                        if (this.content.length > 50) {
                          return common.showToastr('文字不能超过50字');
                        }

                        form.append('content', this.content);
                        form.append('unionid', this.profile.unionid);
                        var _this = this;

                        UploadFile(this.file, function(base64, blob) {

                            if (base64) {
                                form.append("file", blob, "file_"+Date.parse(new Date())+".jpg"); // 文件对象
                            }
                            else {
                                form.append('file', _this.file)
                            }
                            // _this.$refs.test.src = base64;

                            // form.append('file', this.file);
                            form.append('picType', $('.ck span.active').attr('code'));

                            if (_this.picId) {
                                form.append('picid', _this.picId);
                            }
                            common.showToastr('正在发布', 60*1000);
                            $.ajax({
                                type: 'POST',
                                url: api.additionImg + '?' + $.param(data),
                                dataType: 'json',
                                data: form,
                                enctype: 'multipart/form-data',
                                processData: false,
                                contentType: false,
                                success: function(res) {
                                    if (res.result.status === 0) {
                                        //common.linkTo('./audit.html');
                                        sessionStorage.photoType = $('.ck span.active').attr('code')
                                        location.replace('./audit.html' + location.search )

                                    } else {
                                      // closeLoading();
                                      common.showToastr('发布失败');
                                    }
                                }
                            })
                        })

                        return;

                    },
                    onUpload: function(e) {
                        var _this = this;
                        if (e.target.files.length) {
                            this.readPhoto(e.target.files[0]);
                            this.file = e.target.files[0];


                            // lrz(e.target.files[0],{width: 480}).then(function(rst){
                            //     _this.file = rst.base64;
                            // }).always(function(){
                            //    // e.target.value = null;
                            // })
                        }
                    },
                    readPhoto: function(file) {
                        var reader = new FileReader();
                        var _this = this;
                        reader.onload = function(e) {
                            _this.pic = e.target.result;
                                _this.items = [{
                                    img: _this.pic
                                }]

                            _this.oldPic = null
                        }
                        reader.readAsDataURL(file);
                    },
                    removePhoto: function(index) {
                        this.items.splice(index, 1);
                        this.file = null;
                        this.oldPic = null;
                    },
                    // 取消对话框
                    cancelDlg: function() {

                         var x = ['_trackEvent','晒一晒','发布', '再看看'];
                         console.log(x)
                        _hmt.push(x);

                        this.showCloseDlg = false;
                    },
                    // 确认删除
                    confirm: function() {

                         var x = ['_trackEvent','晒一晒','发布', '不发了'];
                         console.log(x)
                        _hmt.push(x);
                        window.isConfirm = true;

                        history.back();

                        if(typeof(Storage) !== "undefined"){
                            sessionStorage.setItem("backStause",true);
                        }

                    }

                }
            })
        }, 500)
    })

})
