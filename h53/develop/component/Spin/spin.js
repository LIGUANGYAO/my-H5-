define(['Vue','jquery'],

function(Vue,$){

    var exports = {};

    exports.init = function(){
        var loading = Vue.extend({
            data: function(){
                return {
                    flag: false,
                    isShow: false
                }
            },
            template: '<div class="spinner" v-if="isloading && isShow"> <div class="spinner-container container1"> <div class="circle1"></div> <div class="circle2"></div> <div class="circle3"></div> <div class="circle4"></div> </div> <div class="spinner-container container2"> <div class="circle1"></div> <div class="circle2"></div> <div class="circle3"></div> <div class="circle4"></div> </div> <div class="spinner-container container3"> <div class="circle1"></div> <div class="circle2"></div> <div class="circle3"></div> <div class="circle4"></div> </div></div>',
            props: {
                isloading: {
                    type: Boolean
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
                    $(window).on('scroll', function() {
                      var body = window;

                      if (window.innerHeight >= (body.scrollY + body.innerHeight)) {
                        return;
                      }

                      if (body.scrollY + body.innerHeight >= (document.body.scrollHeight - 80)) {
                          if (!_this.prevent) {

                                if (_this.flag) {
                                  _this.flag = false;
                                  return;
                                }

                                if (! _this.isloading) 
                                  return;

                              _this.isShow = true;
                              clearTimeout(_this.handle)
                              _this.handle = setTimeout((function() {
                                  _this.onscroll && _this.onscroll();
                                  _this.isShow = false;
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