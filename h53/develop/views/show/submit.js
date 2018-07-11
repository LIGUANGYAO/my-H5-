
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
                    pic: ''
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

                },
                mounted: function() {
                    
                    $('.ck *').on('click', function() {
                        $(this).addClass('active').siblings().removeClass('active');

                        $('.submit').addClass('active')
                    })
                },
                methods: {
                    // 取消
                    cancel: function() {
                        common.linkTo('./show.html');
                    },
                    publish: function() {
                        var data = {
                            _p: common.getRequest()._p
                        }

                        var form = new FormData

                        if (!this.file) {
                          return common.showToastr('请上传图片');
                        } 

                        if (!this.content) {
                          return common.showToastr('请输入文字');
                        }
                        
                        if (this.content.length > 50) {
                          return common.showToastr('文字不能超过50字');
                        }


                        form.append('content', this.content);
                        form.append('file', this.file);
                        form.append('picType', $('.ck span.active').attr('code'));


                        common.showToastr('正在发布', 60*1000);
                        var _this = this;
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
                                    location.replace('./audit.html' + location.search)
                                } else {
                                  closeLoading();
                                  common.showToastr('发布失败');
                                }
                            }
                        })
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
                        }
                        reader.readAsDataURL(file);
                    },
                    removePhoto: function(index) {
                        this.items.splice(index, 1);
                    }
                   
                }
            })
        }, 500)
    })

})