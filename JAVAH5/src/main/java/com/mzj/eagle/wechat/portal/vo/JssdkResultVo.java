package com.mzj.eagle.wechat.portal.vo;

import java.util.ArrayList;
import java.util.List;

/**
 * js签名返回对象
 * @author 
 * @date 2017年12月11日
 */
public class JssdkResultVo {

	private String appId;	//公众号
	private String timestamp;	//生成签名的时间戳
	private String nonceStr;	//生成签名的随机串
	private String signature;	//签名
	private List<String> jsApiList;		//需要使用的js接口列表,所有js接口列表见官方文档(微信公众号平台)附录2
	public String getAppId() {
		return appId;
	}
	public void setAppId(String appId) {
		this.appId = appId;
	}
	public String getTimestamp() {
		return timestamp;
	}
	public void setTimestamp(String timestamp) {
		this.timestamp = timestamp;
	}
	public String getNonceStr() {
		return nonceStr;
	}
	public void setNonceStr(String nonceStr) {
		this.nonceStr = nonceStr;
	}
	public String getSignature() {
		return signature;
	}
	public void setSignature(String signature) {
		this.signature = signature;
	}
	public List<String> getJsApiList() {
		return initJsApiList();
	}
	public void setJsApiList(List<String> jsApiList) {
		this.jsApiList = jsApiList;
	}
	
	/**
	 * jsapi接口
	 * @return
	 */
	private List<String> initJsApiList(){
		List<String> list = new ArrayList<>();
		list.add("onMenuShareTimeline");
		list.add("onMenuShareAppMessage");
		list.add("onMenuShareQQ");
		list.add("onMenuShareWeibo");
		list.add("onMenuShareQZone");
		list.add("startRecord");
		list.add("stopRecord");
		list.add("onVoiceRecordEnd");
		list.add("playVoice");
		list.add("pauseVoice");
		list.add("stopVoice");
		list.add("onVoicePlayEnd");
		list.add("uploadVoice");
		list.add("downloadVoice");
		list.add("chooseImage");
		list.add("previewImage");
		list.add("uploadImage");
		list.add("downloadImage");
		list.add("translateVoice");
		list.add("getNetworkType");
		list.add("openLocation");
		list.add("getLocation");
		list.add("hideOptionMenu");
		list.add("showOptionMenu");
		list.add("hideMenuItems");
		list.add("showMenuItems");
		list.add("hideAllNonBaseMenuItem");
		list.add("showAllNonBaseMenuItem");
		list.add("closeWindow");
		list.add("scanQRCode");
		list.add("chooseWXPay");
		list.add("openProductSpecificView");
		list.add("addCard");
		list.add("chooseCard");
		list.add("openCard");
		return list;
	}
	
}
