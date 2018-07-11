package com.mzj.eagle.wechat.portal.vo;

import java.io.UnsupportedEncodingException;
import java.util.Calendar;
import java.util.Date;

import org.apache.commons.lang3.StringUtils;

/**
 * ==================================
 * 
 * @Description 注册用户信息
 * @author huangrijia 
 * @date on 2017/11/12
 * ==================================
 */
public class UserInfoVo {

    private String unionid;
    private String name;
    private Integer gender;
    private Integer height;
    private String birthdate;
    private Date createTime;
    private Date lastUpdateTime;
    
    private Integer age;
    private String genderStr;
    private String openId;

    public String getUnionid() {
        return unionid;
    }

    public void setUnionid(String unionid) {
        this.unionid = unionid;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getGender() {
        return gender;
    }

    public void setGender(Integer gender) {
        this.gender = gender;
    }

    public Integer getHeight() {
        return height;
    }

    public void setHeight(Integer height) {
        this.height = height;
    }

    public String getBirthdate() {
        return birthdate;
    }

    public void setBirthdate(String birthdate) {
        this.birthdate = birthdate;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public Date getLastUpdateTime() {
        return lastUpdateTime;
    }

    public void setLastUpdateTime(Date lastUpdateTime) {
        this.lastUpdateTime = lastUpdateTime;
    }

	public Integer getAge() {
		if(!StringUtils.isEmpty(birthdate)) {
			Calendar date = Calendar.getInstance();
	        int year = date.get(Calendar.YEAR);
			age = year - Integer.valueOf(birthdate);
			return age;
		}
		return null;
	}

	public void setAge(Integer age) {
		this.age = age;
	}
	
	public String getGenderStr() {
		if(gender!=null) {
			if(gender==1)
				return "男";
			else if(gender==2)
				return "女";
		}
		return "";
	}

	public String getOpenId() {
		return openId;
	}

	public void setOpenId(String openId) {
		this.openId = openId;
	}
    
}
