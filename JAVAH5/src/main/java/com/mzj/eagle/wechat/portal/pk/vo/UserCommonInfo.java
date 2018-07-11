package com.mzj.eagle.wechat.portal.pk.vo;

import java.io.Serializable;
import java.util.List;

public class UserCommonInfo implements Serializable {
	private static final long serialVersionUID = 6498961494230103659L;
	
	private String openId;//操作ID
	private String unionid;//用户unionid
	private String nickName;//昵称
	private String imageUrl;//头像
	private Integer sex;//性别
	private Integer issubscribe;/*关注标识*/
	private String accountid;/*服务号应用ID*/
	private String city;/*城市*/
	private Double lastWeight;//最新体重
	private List<String> likeOpenId;//点赞openId
	
	
	public String getNickName() {
		return nickName;
	}
	public void setNickName(String nickName) {
		this.nickName = nickName;
	}
	public String getImageUrl() {
		return imageUrl;
	}
	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}
	public String getOpenId() {
		return openId;
	}
	public void setOpenId(String openId) {
		this.openId = openId;
	}
	public int getSex() {
		return sex;
	}
	public void setSex(int sex) {
		this.sex = sex;
	}
	public List<String> getLikeOpenId() {
		return likeOpenId;
	}
	public void setLikeOpenId(List<String> likeOpenId) {
		this.likeOpenId = likeOpenId;
	}
	public String getUnionid() {
		return unionid;
	}
	public void setUnionid(String unionid) {
		this.unionid = unionid;
	}
	public Integer getIssubscribe() {
		return issubscribe;
	}
	public void setIssubscribe(Integer issubscribe) {
		this.issubscribe = issubscribe;
	}
	public String getAccountid() {
		return accountid;
	}
	public void setAccountid(String accountid) {
		this.accountid = accountid;
	}
	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
	}
	public Double getLastWeight() {
		return lastWeight;
	}
	public void setLastWeight(Double lastWeight) {
		this.lastWeight = lastWeight;
	}
  
	
}
