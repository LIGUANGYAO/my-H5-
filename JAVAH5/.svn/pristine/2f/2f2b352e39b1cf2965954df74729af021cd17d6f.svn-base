package com.mzj.eagle.wechat.portal.probe.controller;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Configuration
@Controller
public class ProbeController {
	@Value("${apigw.host}")
	private String msg;

	@RequestMapping("probe")
	public String index1(ModelMap map){
		map.put("msg",msg);
		return "probe/probe";
	}
}
