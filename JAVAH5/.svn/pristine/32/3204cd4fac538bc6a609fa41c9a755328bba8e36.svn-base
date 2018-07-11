package com.mzj.eagle.wechat.portal.ad.service;

import java.util.Collections;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.mzj.eagle.wechat.portal.ad.vo.AdWechatVo;

@Service
public class AdWechatService {

	private static final Logger LOG = LoggerFactory.getLogger(AdWechatService.class);
	
	@Value("${apigw.host}")
	private String apigwHost;
	@Autowired
	private RestTemplate restTemplate;
	private final String adWechatUrl = "ad/wechat/getAdWechat";
	
	/**
	 * 根据广告位查询广告信息
	 * @param spaceId
	 * @return
	 */
	public List<AdWechatVo> getAdWechat(List<String> spaceIds) {
		if(spaceIds !=null && spaceIds.size()>0) {
			ResponseEntity<List<AdWechatVo>> responseEntity = restTemplate.exchange(apigwHost+adWechatUrl, HttpMethod.POST,
					new HttpEntity<>(spaceIds), 
					new ParameterizedTypeReference<List<AdWechatVo>>() {});
			List<AdWechatVo> list = responseEntity.getBody();
			return list;
		}
		return null;
	}
	
}
