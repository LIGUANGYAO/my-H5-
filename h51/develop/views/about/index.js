require(['jquery', 'common'], function ($, common) {
    $(function () {
        //wx.hideOptionMenu();
        common.globalAjax();//开始全局ajax监听
        common.hideOptionMenu();//禁用分享等按钮
    });
});