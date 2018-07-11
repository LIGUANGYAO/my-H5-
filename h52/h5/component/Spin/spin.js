define(['Vue', 'jquery'],

    function(Vue, $) {

        var exports = {};

        exports.init = function() {
            var loading = Vue.extend({
                data: function() {
                    return {
                        flag: false,
                        isShow: false,
                        istall: false
                    }
                },
                template: '<div class="spinner-box"><div :class="{hidden: hidden}" class="spinner" v-if="isloading && isShow "> <div class="spinner-container container1"> <div class="circle1"></div> <div class="circle2"></div> <div class="circle3"></div> <div class="circle4"></div> </div> <div class="spinner-container container2"> <div class="circle1"></div> <div class="circle2"></div> <div class="circle3"></div> <div class="circle4"></div> </div> <div class="spinner-container container3"> <div class="circle1"></div> <div class="circle2"></div> <div class="circle3"></div> <div class="circle4"></div> </div></div><div class="over" v-show="prevent && !horizontal && istall">我们是有底线的</div></div>',
                props: {
                    isloading: {
                        type: Boolean
                    },
                    istall: {
                        type: Boolean
                    },
                    horizontal: {
                        type: Boolean
                    },
                    hidden: {
                        type: Boolean
                    },
                    targetdom: {
                        type: String
                    },
                    onscroll: {
                        type: String
                    },
                    prevent: {
                        type: Boolean,
                        default: false
                    },
                    delay: {
                        type: Number,
                        default: 200
                    }
                },
                mounted: function() {
                    if (this.onscroll) {
                        var _this = this;

                        var el = window;
                        var el2 = document.body;

                        if (this.targetdom) {
                            el = $(this.targetdom)[0];
                            el2 = el
                        }
                        $(el).on('scroll', function() {
                            var body = this;

                            var exec = false;

                            if (_this.horizontal) {

                                if (body.scrollLeft + body.clientWidth >= (el2.scrollWidth - 160)) {

                                    exec = true;
                                }
                            } else {

                                if (_this.targetdom) {
                                    if (body.scrollTop + body.clientHeight >= (el2.scrollHeight - 160)) {

                                        exec = true;
                                    }
                                } else {
                                    if (body.innerHeight >= (body.scrollY + body.innerHeight)) {
                                        return;
                                    }

                                    if (body.scrollY + body.innerHeight >= (el2.scrollHeight - 160)) {

                                        exec = true;
                                    }
                                }
                            }

                            if (exec) {
                                if (!_this.prevent) {

                                    if (_this.flag) {
                                        _this.flag = false;
                                        return;
                                    }

                                    if (!_this.isloading)
                                        return;

                                    _this.isShow = true;
                                    clearTimeout(_this.handle)
                                    _this.handle = setTimeout((function() {
                                        _this.onscroll && _this.onscroll();

                                        setTimeout(function() {

                                            _this.isShow = false;
                                        }, 500)
                                        _this.flag = true;
                                    }).bind(_this), _this.delay)
                                } else {
                                    _this.isShow = false;
                                }
                            }
                        });
                    } else {
                        this.isShow = true;
                    }
                }
            });

            return loading;

        }

        return exports;

    });