package com.mzj.eagle.wechat.portal.profile.service;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.client.RestTemplate;

import com.mzj.eagle.wechat.portal.common.URLBuilder;
import com.mzj.eagle.wechat.portal.vo.UserFeedbackVo;
import com.mzj.eagle.wechat.portal.vo.UserInfoVo;
import com.mzj.eagle.wechat.portal.vo.WeChatUserVo;

/**
 * ==================================
 * 
 * 个人信息
 * @author  huangrijia on 2017/11/10.
 *  
 * ==================================
 */
@Service
public class UserInfoService {
	private static final Logger LOG = LoggerFactory.getLogger(UserInfoService.class);
	@Autowired
	@Qualifier("redisTemplate")
	private StringRedisTemplate redisTemplate;

	// redis保存用户输入的个人信息key
	private static final String REDIS_WECHATUSER_INFO_KEY = "WECHAT_USERINFO_";

	@Value("${apigw.host}")
	private String apigwHost;
	@Autowired
	private RestTemplate restTemplate;

	private final String userUrl = "wxuserInfo/wxUserInfo/user";
	private final String weChatUserUrl = "wxuser/wxUser/wechatUser";
	private final String feedbackUrl="wxmanager/feedback/saveFeedback";

	/**
	 * 获取个人信息
	 * @param unionid
	 * @return
	 */
	public UserInfoVo getById(String unionid) {
		UserInfoVo userInfo = null;
		if(!StringUtils.isEmpty(unionid)) {
			List<String> unionids = new ArrayList<>();
			unionids.add(unionid);
			URLBuilder api = new URLBuilder(apigwHost + userUrl);
			api.param("unionid", unionid);
			ResponseEntity<UserInfoVo> responseEntity = restTemplate.exchange(
					api.toString(),
					HttpMethod.GET,
					null,
					new ParameterizedTypeReference<UserInfoVo>() {
					});
			userInfo = responseEntity.getBody();
		}
		return userInfo;
	}
	

	/**
	 * 修改注册用户信息
	 * @param userInfo
	 * @param openId
	 * @return
	 */
	public Integer update(UserInfoVo userInfo,String openId) {
	
		URLBuilder api = new URLBuilder(apigwHost + "wxuserInfo/wxUserInfo/userInfo");
		api.param("unionid", userInfo.getUnionid());
		api.param("name", userInfo.getName());
		api.param("gender", userInfo.getGender());
		api.param("height", userInfo.getHeight());
		api.param("birthdate", userInfo.getBirthdate());
		api.param("openId", openId);
		ResponseEntity<Integer> ace = restTemplate
				.exchange(api.toString(),
						HttpMethod.PUT,
						null,
						new ParameterizedTypeReference<Integer>() {	});
		Integer result = ace.getBody();
		return result;
	}
	
	/**
	 * 查询公众号关注用户
	 * @param openId
	 * @param appId
	 * @return
	 */
	public WeChatUserVo getOpenId(String openId,String appId) {
		if(StringUtils.isEmpty(openId)) {
			return null;
		}
		
		try {
			URLBuilder api = new URLBuilder(apigwHost + weChatUserUrl);
			api.param("openId", openId);
			if(StringUtils.isEmpty(appId)) {
				String openIdSub = openId.substring(0, 6);
				appId = (String) redisTemplate.opsForHash().get("OPENID_APPID",openIdSub);
			}
			api.param("appId", appId);
			ResponseEntity<WeChatUserVo> responseEntity = restTemplate.exchange(api.toString(), 
					HttpMethod.GET,
					null,
					new ParameterizedTypeReference<WeChatUserVo>(){});
			WeChatUserVo weChatUserVo = responseEntity.getBody();
			if(weChatUserVo!=null) {
				return weChatUserVo;
			}
		}catch(Exception e) {
			LOG.error(e.getMessage(), e);
		}
			
		return null;
	}
	
	/**
	 * 保存用户反馈意见
	 * @param userFeedbackVo
	 */
	public void saveFeedback(@RequestBody UserFeedbackVo userFeedbackVo) {
		try {
			if(userFeedbackVo!=null) {
				String url=apigwHost+feedbackUrl;
				restTemplate.postForObject(url, userFeedbackVo, String.class);
			}
		} catch (Exception e) {
			LOG.error(e.getMessage(), e);
			throw e;
		}
		
	}
	
}
