package com.mzj.eagle.wechat.portal.ad.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.mzj.eagle.wechat.portal.ad.service.AdWechatService;
import com.mzj.eagle.wechat.portal.ad.vo.AdWechatVo;
import com.mzj.eagle.wechat.portal.common.GlobalMethodUtil;

@Configuration
@Controller
public class AdWechatController {

	@Autowired
	AdWechatService adWechatService;
	
	/**
	 * 查询广告
	 * @param spaceIds 广告位ID
	 * @return
	 */
	@RequestMapping(value = "/getAdvertising", method=RequestMethod.POST)
	@ResponseBody
	public List<AdWechatVo> getAdvertising(@RequestParam(name = "_p") String p,@RequestBody List<String> spaceIds) {
		GlobalMethodUtil util = new GlobalMethodUtil();
		String str = util.decrypt(p);
		Map<String,String> map = util.getParams(str);
		if(map == null) {
			return null;
		}
		return adWechatService.getAdWechat(spaceIds);
	}
	
}
