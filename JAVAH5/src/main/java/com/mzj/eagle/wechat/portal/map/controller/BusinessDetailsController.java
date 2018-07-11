package com.mzj.eagle.wechat.portal.map.controller;



import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.mzj.eagle.wechat.portal.map.service.BusinessDetailsService;
import com.mzj.eagle.wechat.portal.map.vo.ScaleShopInfoVo;
import com.mzj.eagle.wechat.portal.map.vo.ScaleShopVo;


@Configuration
@Controller
public class BusinessDetailsController {
	
	/**
	 * 商家详情
	 */
	 @Autowired
	 private BusinessDetailsService businessDetailsService;
		
	 @RequestMapping(value = "/businessDetails")
	 @ResponseBody
	 public ScaleShopInfoVo getShopInfo(@RequestParam Long id ,
			 							@RequestParam String _p){
		 ScaleShopInfoVo scaleShopInfoVo =businessDetailsService.get(id,_p);
		return scaleShopInfoVo;
		 
	 }
	 
	 
	 /**
	  * 商家模糊查询
	  * @param aname 商家的名称
	  * @param _p
	  * @param latitude 纬度
	  * @param  longitude 经度
	  * @return
	  * 
	  * 
	  */
	 @RequestMapping(value = "/merchantQuery")
	 @ResponseBody
	 public List<ScaleShopVo> getScaleMachine (@RequestParam String aname,
			 									  @RequestParam String _p,
			 									 @RequestParam Double latitude,
			 									@RequestParam Double longitude){
		 List<ScaleShopVo> scaleShopVo =businessDetailsService.getScaleMachine(aname,_p,latitude,longitude);
		 return scaleShopVo;
	 }
	 
	 
}
