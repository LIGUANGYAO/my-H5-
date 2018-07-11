package com.mzj.eagle.wechat.portal.map.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;


@Configuration
@Controller
public class MapController {
	

	//地图秤数量
	@RequestMapping(value= "map.html",method=RequestMethod.GET)
	public String map(HttpServletRequest request,HttpServletResponse response,ModelMap map) {
		return "map/map";
	}
	
	//附近商家
	@RequestMapping(value= "shop.html",method=RequestMethod.GET)
	public String shop(HttpServletRequest request,HttpServletResponse response,ModelMap map) {
		return "map/shop";
	}

}
