package com.mzj.eagle.wechat.portal.common;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.mzj.eagle.wechat.portal.map.service.MallVicinityService;
import com.mzj.eagle.wechat.portal.map.vo.ScaleMachineVo;




@Configuration
@Controller
public class CommonController {
	@Autowired
	private MallVicinityService mallVicinityService;
	
	private static final Logger LOG = LoggerFactory.getLogger(GlobalMethodUtil.class);
	
	/*@Autowired
	private MallVicinityService mallVicinityiy;*/
	//健康小常识-饮食
	@RequestMapping(value= "knowFood.html",method=RequestMethod.GET)
	public String knowFood(HttpServletRequest request,HttpServletResponse response,ModelMap map) {
		return "comment/knowFood";
	}
	
	//健康小常识-热门
	@RequestMapping(value= "knowHot.html",method=RequestMethod.GET)
	public String knowHot(HttpServletRequest request,HttpServletResponse response,ModelMap map) {
		return "comment/knowHot";
	}
	
	//健康小常识-精选
	@RequestMapping(value= "knowChoice.html",method=RequestMethod.GET)
	public String knowChoice(HttpServletRequest request,HttpServletResponse response,ModelMap map) {
		return "comment/knowChoice";
	}
	
	//健康小常识-运动
	@RequestMapping(value= "knowSport.html",method=RequestMethod.GET)
	public String knowSport(HttpServletRequest request,HttpServletResponse response,ModelMap map) {
		return "comment/knowSport";
	}
	
	//商城
	@RequestMapping(value= "mall.html",method=RequestMethod.GET)
	public String mall(HttpServletRequest request,HttpServletResponse response,ModelMap map) {
		return "mall/mall";
	}
	
	//健康分析
	@RequestMapping(value= "mallHealth.html",method=RequestMethod.GET)
	public String mallHealth(HttpServletRequest request,HttpServletResponse response,ModelMap map) {
		return "mall/mallHealth";
	}
	
	//附近的秤
	@RequestMapping(value= "mallVicinity.html",method=RequestMethod.GET)
	public String mallVicinity(HttpServletRequest request,HttpServletResponse response,ModelMap map) {
	
       return "mall/mallVicinity";
	
	}
	
	//附近的秤  接口
	@RequestMapping(value="/NearbyScale")
	@ResponseBody
	public List<ScaleMachineVo> aNearbyScale(@RequestParam Double latitude,
			@RequestParam Double longitude,
			@RequestParam String _p){
		List<ScaleMachineVo> scaleMachineVo =new ArrayList<>();
		try {
			List<ScaleMachineVo> list = mallVicinityService.get(latitude,longitude,_p);
			return list;
		} catch (Exception e) {
			LOG.error(e.getMessage(),e);
		}
			return scaleMachineVo;
	}



	
	//健康常识
	@RequestMapping(value= "healthSense.html",method=RequestMethod.GET)
	public String healthSense(HttpServletRequest request,HttpServletResponse response,ModelMap map) {
		return "comment/healthSense";
	}
	
	//关于我们
	@RequestMapping(value= "about.html",method=RequestMethod.GET)
	public String about(HttpServletRequest request,HttpServletResponse response,ModelMap map) {
		return "comment/about";
	}

}
