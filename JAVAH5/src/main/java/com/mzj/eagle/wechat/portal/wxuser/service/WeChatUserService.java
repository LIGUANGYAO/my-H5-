package com.mzj.eagle.wechat.portal.wxuser.service;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.mzj.eagle.wechat.portal.vo.WeChatUserVo;

@Service
public class WeChatUserService {
	private static final Logger LOG = LoggerFactory.getLogger(WeChatUserService.class);
	@Qualifier("redisTemplate")
	private StringRedisTemplate redisTemplate;
	@Value("${apigw.host}")
	private String apigwHost;
	@Autowired
	private RestTemplate restTemplate;
	private final String wxuserInfoUrl = "wxuserInfo/wxUserInfo";
	// redis保存微信用户信息key
	private static final String REDIS_WECHATUSER_KEY = "WECHAT_USER_";

	public WeChatUserVo weChatUser(WeChatUserVo vo) throws Exception {

		List<WeChatUserVo> listVo = (List<WeChatUserVo>) redisTemplate.opsForHash()
				.get(REDIS_WECHATUSER_KEY + Math.abs(vo.getOpenid().hashCode()) % 800, vo.getOpenid());
		if (listVo != null) {
			return listVo.get(0);
		} else {
			WeChatUserVo serviceVo = weChatservice(vo);
			return serviceVo;
		}

	}
	/**
	 * 微服务获取微信用户信息
	 * @param vo
	 * @return
	 */
	public WeChatUserVo weChatservice(WeChatUserVo vo) { 
		return restTemplate.postForObject(apigwHost + wxuserInfoUrl+"/unionid", vo, WeChatUserVo.class);
	}

}
