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



require(['jquery', 'Vue', 'FooterBar', 'common', 'api', 'iosSelect'], function($, Vue, FooterBar, common, api, iosSelect) {

    $(function() {

        var FooterBar_vue = FooterBar.init();

        // settimeout 防止页面假死
        setTimeout(function() {
            new Vue({
                el: '#app',
                data: {
                    type: '',
                    sexSelect: [], //性别数组
                    statureArr: [], //身高数组
                    isLoading: false,
                    yearArr: [],
                    modify: {
                        sex: null,
                        height: null,
                        year: null
                    },
                    weChatHeight: null,
                    age: null,
                    openId: null,
                    unionid: null,

                    value: '',
                    isFull: 'no',
                    id: '',
                    loaded: false
                },
                components: {
                    'footer-bar': FooterBar_vue
                },
                created: function() {

                },
                mounted: function() {
                    var _this = this;
                    this.type = common.getRequest().type;
                    this.getProfile(function() {
                        if (_this.type == 'birth') {
                            _this.value = _this.value.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3');
                        }
                        if (this.type == 'nickname') {
                            var regexp = /[+\/\-*]/g;
                            _this.value = _this.value.replace(regexp, " ");
                        }

                        _this.unionid = (_this.profile.unionid || _this.profile.weChatUser.unionid)

                        _this.loaded = true;
                    })
                    // this.value = decodeURIComponent(common.getRequest().value);
                    // this.isFull = common.getRequest().isFull;

                    // this.id = decodeURIComponent(common.getRequest().id);
                },
                methods: {
                    //性别获取数据
                    getSexData: function() {
                        var data = [{
                            id: "1",
                            value: "男"
                        }, {
                            id: "2",
                            value: "女"
                        }]
                        this.sexSelect = data;
                        return this.sexSelect;
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

                                _this.profile.gender = _this.profile.gender || _this.profile.weChatUser.gender;
                                if (_this.profile.gender == 1) {
                                    _this.profile.genderStr = '男'
                                } else {
                                    _this.profile.genderStr = '女'
                                }

                                var isFull = 'no';

                                if (_this.type == 'height') {
                                    _this.value = _this.profile.height
                                    _this.id = _this.profile.height
                                    if (_this.profile.age && _this.profile.gender) {
                                        isFull = 'yes'
                                    }
                                }
                                if (_this.type == 'birth') {
                                    _this.value = _this.profile.birthdate
                                    _this.id = _this.profile.birthdate
                                    if (_this.profile.height && _this.profile.gender) {
                                        isFull = 'yes'
                                    }
                                }
                                if (_this.type == 'sex') {
                                    _this.value = _this.profile.genderStr
                                    _this.id = _this.profile.gender
                                    if (_this.profile.height && _this.profile.age) {
                                        isFull = 'yes'
                                    }
                                } 


                                if (_this.type == 'nickname') {
                                    _this.value = _this.profile.name;
                                }

                                _this.isFull = isFull;

                                cb()

                            },
                            error: function() {}
                        })
                    },

                    //获取身高数据
                    getStatureData: function() {
                        for (var i = 70; i <= 220; i++) {
                            var data = {
                                id: i,
                                value: i
                            }
                            this.statureArr.push(data);
                        }
                        return this.statureArr;
                    },
                    //获取年龄数据
                    getYearData: function() {
                        var cur = new Date().getFullYear();
                        for (var i = 1900; i <= cur; i++) {
                            var data = {
                                id: i,
                                value: i
                            }
                            this.yearArr.push(data);
                        }
                        return this.yearArr;
                    },
                    showSex: function() {
                        var that = this;
                        new iosSelect(1, [this.getSexData()], {
                            itemHeight: 50,
                            itemShowCount: 5,
                            oneLevelId: that.id,
                            callback: function(obj) {
                                that.$refs.sex.value = obj.value;
                            }
                        });
                    },
                    showHeight: function() {
                        var that = this;
                        new iosSelect(1, [this.getStatureData()], {
                            itemHeight: 50,
                            itemShowCount: 5,
                            oneLevelId: that.id || 150,
                            callback: function(obj) {
                                that.$refs.height.value = obj.value;
                            }
                        });
                    },
                    showAge: function() {
                        var data = this.$refs.birth.value.match(/(\d{4})-(\d{2})-(\d{2})/);
                        var now = new Date()

                        function formatYear() {
                            var arr = [];
                            for (var i = 1900; i <= now.getFullYear(); i++) {
                                arr.push({
                                    id: i + '',
                                    value: i + '年'
                                });
                            }
                            return arr;
                        }

                        function formatMonth() {
                            var arr = [];
                            var month = 12;

                            for (var i = 1; i <= 12; i++) {
                                arr.push({
                                    id: i + '',
                                    value: i + '月'
                                });
                            }
                            return arr;
                        }

                        function formatDate(count) {
                            var arr = [];
                            for (var i = 1; i <= count; i++) {
                                i
                                arr.push({
                                    id: i + '',
                                    value: i + '日'
                                });
                            }
                            return arr;
                        }

                        var yearData = function(callback) {
                            callback(formatYear())
                        }
                        var monthData = function(year, callback) {
                            callback(formatMonth());
                        };

                        var dateData = function(year, month, callback) {
                            if (/^(1|3|5|7|8|10|12)$/.test(month)) {
                                callback(formatDate(31));
                            } else if (/^(4|6|9|11)$/.test(month)) {
                                callback(formatDate(30));
                            } else if (/^2$/.test(month)) {
                                if (year % 4 === 0 && year % 100 !== 0 || year % 400 === 0) {
                                    callback(formatDate(29));
                                } else {
                                    callback(formatDate(28));
                                }
                            } else {
                                throw new Error('month is illegal');
                            }
                        };


                        var that = this;

                        var oneLevelId = data && data[1] || now.getFullYear();
                        var twoLevelId = data && data[2].replace(/^0/, '') || now.getMonth() + 1;
                        var threeLevelId = data && data[3].replace(/^0/, '') || now.getDate();


                        new iosSelect(3, [yearData, monthData, dateData], {
                            itemHeight: 50,
                            itemShowCount: 5,
                            oneLevelId: oneLevelId,
                            twoLevelId: twoLevelId,
                            threeLevelId: threeLevelId,
                            callback: function(year, month, day) {

                                if (month.id < 10) {
                                    month.id = '0' + month.id;
                                }
                                if (day.id < 10) {
                                    day.id = '0' + day.id;
                                }

                                that.$refs.birth.value = year.id + '-' + month.id + '-' + day.id;

                            }
                        });
                    },
                    generateReport: function(callback) {
                        $.ajax({
                            type: 'POST',
                            url: api.generateReport,
                            data: {
                                _p: common.getRequest()._p
                            },
                            async: true,
                            success: function(res) {
                                callback && callback();
                            }
                        })
                    },

                    updateProfile: function() {
                        var data = {
                            _p: common.getRequest()._p,
                            unionid: this.unionid,
                        }

                        if (this.type == 'nickname') {
                            data.name = this.$refs.nickname.value;

                            if (!data.name) {
                                return common.showToastr('请输入昵称');
                            }

                            if (data.name.length > 20) {
                                return common.showToastr('昵称不能超过20字');
                            }

                        } else if (this.type == 'sex') {
                            data.gender = (this.$refs.sex.value == '男') ? 1 : 2;
                        } else if (this.type == 'height') {
                            data.height = this.$refs.height.value;
                        } else if (this.type == 'birth') {
                            data.birthdate = this.$refs.birth.value.replace(/-/g, '');
                        }
                        var _this = this;

                        var nowDate = common.getDate2().replace(/-/g, '');
                        console.log(nowDate);

                        if (data.birthdate >= nowDate) {
                            alert("你选择的日期有误，请重新选择!");
                        } else {
                            $.ajax({
                                type: 'POST',
                                url: api.updateUserInfo + '?' + $.param(data),
                                dataType: 'json',
                                success: function(res) {
                                    if (res.result.status === 0) {

                                        if (_this.isFull == 'yes') {
                                            _this.generateReport(function() {
                                                common.linkTo('./my.html')
                                            })
                                        } else {
                                            common.linkTo('./my.html')
                                        }

                                    }
                                },
                                error: function() {}
                            })

                        }
                    }
                }
            })
        }, 500)
    })

})