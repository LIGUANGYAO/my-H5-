package com.mzj.eagle.wechat.portal.map.vo;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;


public class ScaleMachineVo {
	

    private String id;
    private String serialNumber;
    private String name;
    private Long devopsId;
    private Long bdId;
    private Integer placeStatus;
    private Timestamp placeTime;
    private Long creatorId;
    private Timestamp createTime;
    private Long orgId;
    private String remark;

    private Long shopId;
    private String province;
    private String city;
    private String direct;
    private String address;

    private Long officialAccountsId;
    private String officialAccountsName;
    private Integer officialAccountsStatus;
    private Long officialAccountsAuditorId;
    private String officialAccountsAppid;

    private Double latitude;
    private Double longitude;

    private List<ScaleTagsVo> scaleTags = new ArrayList<>();

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getSerialNumber() {
        return serialNumber;
    }

    public void setSerialNumber(String serialNumber) {
        this.serialNumber = serialNumber;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getDevopsId() {
        return devopsId;
    }

    public void setDevopsId(Long devopsId) {
        this.devopsId = devopsId;
    }

    public Long getBdId() {
        return bdId;
    }

    public void setBdId(Long bdId) {
        this.bdId = bdId;
    }

    public Integer getPlaceStatus() {
        return placeStatus;
    }

    public void setPlaceStatus(Integer placeStatus) {
        this.placeStatus = placeStatus;
    }

    public Timestamp getPlaceTime() {
        return placeTime;
    }

    public void setPlaceTime(Timestamp placeTime) {
        this.placeTime = placeTime;
    }

    public Long getCreatorId() {
        return creatorId;
    }

    public void setCreatorId(Long creatorId) {
        this.creatorId = creatorId;
    }

    public Timestamp getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Timestamp createTime) {
        this.createTime = createTime;
    }

    public Long getOrgId() {
        return orgId;
    }

    public Double getLatitude() {
        return latitude;
    }
    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }

    public Double getLongitude() {
        return longitude;
    }
    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }

    public void setOrgId(Long orgId) {
        this.orgId = orgId;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public Long getShopId() {
        return shopId;
    }

    public void setShopId(Long shopId) {
        this.shopId = shopId;
    }

    public String getProvince() {
        return province;
    }

    public void setProvince(String province) {
        this.province = province;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getDirect() {
        return direct;
    }

    public void setDirect(String direct) {
        this.direct = direct;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Long getOfficialAccountsId() {
        return officialAccountsId;
    }

    public void setOfficialAccountsId(Long officialAccountsId) {
        this.officialAccountsId = officialAccountsId;
    }

    public String getOfficialAccountsName() {
        return officialAccountsName;
    }

    public void setOfficialAccountsName(String officialAccountsName) {
        this.officialAccountsName = officialAccountsName;
    }

    public Integer getOfficialAccountsStatus() {
        return officialAccountsStatus;
    }

    public void setOfficialAccountsStatus(Integer officialAccountsStatus) {
        this.officialAccountsStatus = officialAccountsStatus;
    }

    public List<ScaleTagsVo> getScaleTags() {
        return scaleTags;
    }

    public void setScaleTags(List<ScaleTagsVo> scaleTags) {
        this.scaleTags = scaleTags;
    }

    public Long getOfficialAccountsAuditorId() {
        return officialAccountsAuditorId;
    }

    public void setOfficialAccountsAuditorId(Long officialAccountsAuditorId) {
        this.officialAccountsAuditorId = officialAccountsAuditorId;
    }

    public String getOfficialAccountsAppid() {
        return officialAccountsAppid;
    }

    public void setOfficialAccountsAppid(String officialAccountsAppid) {
        this.officialAccountsAppid = officialAccountsAppid;
    }

}
