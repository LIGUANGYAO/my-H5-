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
    loadingImg.style.cssText = "width:5em;;height:4.5em;background-image:url('images/logo.gif');background-size:65%;background-position:center;background-repeat:no-repeat;";
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


require(['jquery', 'Vue', 'common',  'IScroll', 'iosSelect'], function ($, Vue, common, IScroll, iosSelect) {
    $(function () {

        common.globalAjax();//开始全局ajax监听
        common.hideOptionMenu();//禁用分享等按钮
        /*var Loading_vue = Loading.init();*/


        //settimeout 防止页面假死
        setTimeout(function () {
            new Vue({
                el: '#app',
                data: {
                    sexSelect: [],//性别数组
                    statureArr: [], //身高数组
                    isLoading: false,
                    yearArr: [],
                    modify:{
                        sex:null,
                        height:null,
                        year:null
                    },
                    weChatHeight:null,
                    age:null,
                    openId:null,
                    unionid:null
                },
                components: {

                },
                created: function () {

                },
                mounted: function () {

                    //点击浏览器返回 刷新页面
                    if (window.history && window.history.pushState) {
                        $(window).on('popstate', function() {
                            window.history.back();
                            window.location.reload();
                        })
                    }

                    var _this = this;
                    this.init();

                    _this.openId = $("#openId").val();
                    _this.unionid = $("#unionid").val();


                    $(".individual-name").click(function(){
                        $("#nicknameInput").show();
                        $(".individual-name-span").hide();
                        $(".add-btn").fadeIn();
                        $("#nicknameInput").focus();
                    });


                    $(".li-feedback").unbind().click(function(){
                        $(".retroaction-model,#mask").fadeIn();
                        $(".textarea").val("");
                    });


                    //console.log(_this.userInfo);

                    $(".btn-box .cancel-btn").click(function(){
                        $(".retroaction-model,#mask").hide();
                    });

                    $(".save-btn").click(function(){
                        _this.feedBack();
                    });

                    $(".cancel-btn").click(function(){
                        $(".retroaction-model,#mask").hide();
                    });
                },
                methods: {
                    //初始化
                    init: function () {
                        var _this = this;
                        this.statureSelect();
                        this.yearSelect();
                        this.sexSelectFn();

                        this.IsRegister();

                        $(".add-btn").click(function(){
                            _this.toRegister();
                        });
                    },
                    //性别获取数据
                    getSexData: function () {
                        var data = [{
                            id: "1",
                            value: "男"
                        },{
                            id: "2",
                            value: "女"
                        }]
                        this.sexSelect = data;
                        return this.sexSelect;
                    },
                    //获取身高数据
                    getStatureData: function () {
                        for (var i = 1; i <= 200; i++) {
                            var data = {
                                id: i,
                                value: i
                            }
                            this.statureArr.push(data);
                        }
                        return this.statureArr;
                    },
                    //获取年龄数据
                    getYearData: function () {
                        for (var i = 1; i <= 100; i++) {
                            var data = {
                                id: i,
                                value: i
                            }
                            this.yearArr.push(data);
                        }
                        return this.yearArr;
                    },
                    //性别下拉选择弹框事件
                    sexSelectFn: function () {
                        var that = this;
                        $("#JS-sex").click(function () {
                            $(".add-btn").fadeIn();
                            var dom = $(this);
                            var bankId = dom.find('input').attr('data-id');
                            var bankSelect = new iosSelect(1, [that.getSexData()], {
                                itemHeight: 50,
                                itemShowCount: 5,
                                oneLevelId: bankId,
                                callback: function (obj) {
                                    that.modify.sex = obj.id;
                                    dom.find('input').val(obj.value);
                                    dom.find('input').attr('data-id', obj.id);
                                }
                            });
                        })
                    },
                    //身高下拉选择弹窗事件
                    statureSelect: function () {
                        var that = this;
                        $('#JS-height').click(function () {
                            $(".add-btn").fadeIn();
                            var dom = $(this);
                            var bankId = dom.find('input').attr('data-id');
                            var bankSelect = new iosSelect(1, [that.getStatureData()], {
                                itemHeight: 50,
                                itemShowCount: 5,
                                oneLevelId: bankId,
                                callback: function (obj) {
                                    that.modify.height = obj.value;
                                    dom.find('input').val(obj.value + 'CM');
                                    dom.find('input').attr('data-id', obj.id);
                                }
                            });
                        });
                    },
                    //年份下拉选择弹窗事件
                    yearSelect: function () {
                        var that = this;
                        $('#JS-year').click(function () {
                            $(".add-btn").fadeIn();
                            var dom = $(this);
                            var bankId = dom.find('input').attr('data-id');
                            var bankSelect = new iosSelect(1, [that.getYearData()], {
                                itemHeight: 50,
                                itemShowCount: 5,
                                oneLevelId: bankId,
                                callback: function (obj) {
                                    that.modify.year = that.getAge(obj.value);
                                    dom.find('input').val(obj.value+'岁');
                                    dom.find('input').attr('data-id', obj.id);
                                }
                            });
                        });
                    },
                    //年龄计算
                    getAge: function (param) {
                        var myDate = new Date();
                        var year = myDate.getFullYear(); //获取当前年份
                        return year - param;
                    },
                    //获取用户信息
                    IsRegister: function(){

                        var _this = this;

                        var userInfoHeight = $("#userInfoHeight").val();

                        if(userInfoHeight==null || userInfoHeight==""){
                            _this.modify.sex = $("#sex").val();

                            var whatsex = $("#sex").val();

                            // if(whatsex==1){
                            //     $("#JS-sex input").val('男');
                            // }else{
                            //     $("#JS-sex input").val('女');
                            // }

                            $("#JS-sex input").attr("data-id",$("#sex").val());
                            _this.modify.nickname = $("#nickname").val();

                            _this.modify.height = 150;
                            _this.modify.year = _this.getAge(20);


                            $("#nicknameInput").val($("#nickname").val());
                            $(".individual-name-span").text($("#nickname").val());
                            console.log("未注册");
                        }else{

                            _this.modify.height = $("#userInfoHeight").val();
                            _this.modify.year = _this.getAge($("#userInfoAge").val());
                            _this.modify.nickname = $("#userInfoName").val();
                            _this.modify.sex = $("#userInfoGender").val();

                            // $("#nicknameInput").val($("#userInfoName").val());
                            // $(".individual-name-span").text($("#userInfoName").val());

                            var year = $("#userInfoAge").val();
                            // if(year){
                            //   $("#JS-year input").val(_this.getAge(year)+'岁');
                            // }

                            // var sex= $("#userInfoGender").val()==1?"男":"女";
                            //
                            // $("#JS-sex input").val(sex);

                            $("#JS-sex input").attr("data-id",$("#userInfoGender").val());
                            $("#JS-year input").attr("data-id",$("#userInfoAge").val());
                            $("#JS-height input").attr("data-id",$("#userInfoHeight").val());

                            console.log("注册");

                        }

                    },
                    //修改用户信息
                    toRegister: function(){
                        var _this = this;

                        var valName = $("#nicknameInput");

                        if(valName.val() == ""){
                            alert("请输入昵称");
                            valName.focus();
                            return false;
                        }else{
                            _this.modify.nickname = valName.val();
                        }

                        if(!_this.isLoading){
                            $.ajax({
                                type: "post",
                                url: "/updateUserInfo",
                                data: {
                                    _p:common.getRequest()._p,
                                    unionid: _this.unionid,
                                    name: _this.modify.nickname,
                                    gender: _this.modify.sex,
                                    height: _this.modify.height,
                                    birthdate: _this.modify.year
                                },
                                beforeSend: function(){
                                    _this.isLoading = true;
                                    $(".add-btn").text("请稍后...");
                                },
                                success: function(response){
                                     if(response==1){
                                         $(".individual-name-span").show();
                                         $("#nicknameInput").hide();
                                         $(".add-btn").hide();
                                         window.location.reload();
                                     }else{
                                         alert("修改信息不成功！")
                                     }
                                },
                                complete: function(){
                                    _this.isLoading = false;
                                    $(".add-btn").text("确认修改");
                                }
                            })
                        }
                    },
                    //反馈
                    feedBack: function(){

                        var _this = this;
                        var textareaDom=$(".textarea");
                        if(textareaDom.val()==""){
                            alert("请输入反馈内容！");
                            textareaDom.focus();
                        }else{
                            var feedback = $(".textarea").val();

                            $.ajax({
                                type: "POST",
                                url: "/saveFeedback",
                                dataType: "json",
                                data: {
                                    _p: common.getRequest()._p,
                                    openId: _this.openId,
                                    feedback:feedback
                                },
                                success: function(){
                                    $(".tips-infor").show();

                                    setTimeout(function(){
                                        $(".tips-infor").fadeOut();
                                    },300);

                                    $(".retroaction-model,#mask").hide();
                                }


                            })
                        }



                    }

                }
            })
        }, 50)
    });
});