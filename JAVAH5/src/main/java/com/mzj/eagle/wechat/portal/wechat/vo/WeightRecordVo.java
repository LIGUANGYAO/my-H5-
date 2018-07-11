package com.mzj.eagle.wechat.portal.wechat.vo;

import java.util.Date;

/**
 * 
* @Description: 体重数据接收实体类
* @author JYQ   
* @date 2017年10月17日 下午6:01:45 
* @version V1.0
 */
public class WeightRecordVo {
	
	private String id;
	private String machineId;
	private Double weight;
	private String code;
	private String processId;
	private String reqTime;
	private String type;// i/u
	private String receiverTime;//接收时间
	private Integer delay;//0正常  1延迟
	private String channel;//1验证码，2站上来，3扫码还没关注
	private String officialAccountsAppid;//订阅号appid
	private String unionid;
	private String officialAccountsServiceAppid;//服务号appid
	private String openid;//服务号openid
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getMachineId() {
		return machineId;
	}
	public void setMachineId(String machineId) {
		this.machineId = machineId;
	}
	public Double getWeight() {
		return weight;
	}
	public void setWeight(Double weight) {
		this.weight = weight;
	}
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	public String getProcessId() {
		return processId;
	}
	public void setProcessId(String processId) {
		this.processId = processId;
	}
	public String getReqTime() {
		return reqTime;
	}
	public void setReqTime(String reqTime) {
		this.reqTime = reqTime;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getReceiverTime() {
		return receiverTime;
	}
	public void setReceiverTime(String receiverTime) {
		this.receiverTime = receiverTime;
	}
	public Integer getDelay() {
		return delay;
	}
	public void setDelay(Integer delay) {
		this.delay = delay;
	}
	public String getChannel() {
		return channel;
	}
	public void setChannel(String channel) {
		this.channel = channel;
	}
	public String getOfficialAccountsAppid() {
		return officialAccountsAppid;
	}
	public void setOfficialAccountsAppid(String officialAccountsAppid) {
		this.officialAccountsAppid = officialAccountsAppid;
	}
	public String getUnionid() {
		return unionid;
	}
	public void setUnionid(String unionid) {
		this.unionid = unionid;
	}
	public String getOfficialAccountsServiceAppid() {
		return officialAccountsServiceAppid;
	}
	public void setOfficialAccountsServiceAppid(String officialAccountsServiceAppid) {
		this.officialAccountsServiceAppid = officialAccountsServiceAppid;
	}
	public String getOpenid() {
		return openid;
	}
	public void setOpenid(String openid) {
		this.openid = openid;
	}
	

}
