define(['wx','jquery','api','common'], function(wx,$,api,common) {
    
    var exportObj = {};

    /**
     * 签名
     */
    exportObj.sign = function(jsApiList_arr){
        var _wx = wx;
        $.ajax({
        url : api.jsSdkAuth,
        data : {
            "url": window.location.href.split('#')[0],
            "_p": common.getRequest()._p
        },
        type : "post",
        async : false, //异步
        cache : false,
        success : function(data) {
            // console.log("sign",data);
            if(data.retcode==1){
            var appId = data.reports.appid;
            var timestamp = data.reports.timeStamp;
            var nonceStr = data.reports.nonceStr;
            var signature = data.reports.signature;
            // console.log(appId,timestamp,nonceStr,signature);
            _wx.config({
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: appId, // 必填，公众号的唯一标识
                timestamp: timestamp, // 必填，生成签名的时间戳
                nonceStr: nonceStr, // 必填，生成签名的随机串
                signature: signature,// 必填，签名，见附录1
                jsApiList: jsApiList_arr // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            }); 
            }
        }
    });
    
        // _wx.ready(function(){
        //     alert('微信JSSDK签名成功');
        // });
        // _wx.error(function(res){
        //     alert('微信JSSDK签名失败');
        // });
        window.wx = _wx;
        return _wx;
    }
    
    return exportObj;
    
});