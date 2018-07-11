package com.mzj.eagle.wechat.portal.map.service;

import java.util.ArrayList;
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
import com.mzj.eagle.wechat.portal.map.vo.ScaleMachineVo;




@Service
public class MallVicinityService {
	private static final Logger LOG = LoggerFactory.getLogger(GlobalMethodUtil.class);
	
	@Value("${apigw.host}")
	private String apigwHost;
	
	@Autowired
	private RestTemplate restTemplate;
	/**
	 * 附近的秤
	 * @param 纬度
	 * @param 经度
	 * @param _p
	 * @return
	 */
	public List<ScaleMachineVo> get(Double latitude, Double longitude,String _p) {
		
	 GlobalMethodUtil globalMethodUtil =new GlobalMethodUtil();
		String decry=globalMethodUtil.decrypt(_p);
		Map<String,String> map =globalMethodUtil.getParams(decry);
		
		if(map!=null) {
			
			URLBuilder url = new URLBuilder(apigwHost + "scale/machine/users/scales" );
			url
				.param("latitude", latitude)
				.param("longitude", longitude);
				ResponseEntity<List<ScaleMachineVo>> responseEntity= restTemplate.exchange(url.toString(), HttpMethod.GET, 
						null, new ParameterizedTypeReference<List<ScaleMachineVo>>(){});
				List<ScaleMachineVo> list = responseEntity.getBody();
				return list;
			
			};
			List<ScaleMachineVo> scaleMachineVo=new ArrayList<>();
			return scaleMachineVo;		
	}

}
