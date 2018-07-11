package com.mzj.eagle.wechat.portal.map.service;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.mzj.eagle.wechat.portal.common.GlobalMethodUtil;
import com.mzj.eagle.wechat.portal.common.URLBuilder;
import com.mzj.eagle.wechat.portal.map.vo.ScaleShopInfoVo;
import com.mzj.eagle.wechat.portal.map.vo.ScaleShopVo;

@Service
public class BusinessDetailsService {
	
	private static final Logger LOG = LoggerFactory.getLogger(BusinessDetailsService.class);
	
	@Value("${apigw.host}")
	private String apigwHost;
	
	@Autowired
	private RestTemplate restTemplate;
	
	public ScaleShopInfoVo get(Long id ,String _p) {
		 GlobalMethodUtil globalMethodUtil =new GlobalMethodUtil();
			String decry=globalMethodUtil.decrypt(_p);
			Map<String,String> map =globalMethodUtil.getParams(decry);
		if(map!=null) {
			if(id!=null) {
				ScaleShopInfoVo scaleShopInfoVo =restTemplate.getForObject(apigwHost+"scale/bd/shopinfo/{id}", ScaleShopInfoVo.class, id);
				
				return scaleShopInfoVo;
			}
			return null;
    	}
		return null;
	}
	
	/**
	 * 
	 * @param aname 商家名称
	 * @param _p
	 * @param latitude  纬度
	 * @param longitude  经度
	 * @return
	 */
	public List<ScaleShopVo> getScaleMachine(String aname, String _p, Double latitude, Double longitude) {
		List<ScaleShopVo> list = null;
		URLBuilder url = new URLBuilder(apigwHost + "scale/machine/business");
		GlobalMethodUtil globalMethodUtil = new GlobalMethodUtil();
		String decry = globalMethodUtil.decrypt(_p);
		Map<String, String> map = globalMethodUtil.getParams(decry);
		if (map == null) {
			return list;
		}
		url.param("aname", aname);
		url.param("latitude", latitude);
		url.param("longitude", longitude);
		try {
			ResponseEntity<List<ScaleShopVo>> responseEntity = restTemplate.exchange(url.toString(), HttpMethod.GET, null,
					new ParameterizedTypeReference<List<ScaleShopVo>>() {
					});
			list = responseEntity.getBody();
			return list;
		}catch(Exception e) {
			LOG.error(e.getMessage(), e);
		}

		return null;
	}
	

}
