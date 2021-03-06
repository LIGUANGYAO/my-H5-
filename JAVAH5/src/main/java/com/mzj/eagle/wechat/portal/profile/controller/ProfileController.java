package com.mzj.eagle.wechat.portal.profile.controller;

import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.sql.SQLException;
import java.text.DecimalFormat;
import java.util.Calendar;
import java.util.HashMap;
import java.util.Map;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.KeyGenerator;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import javax.xml.ws.RespectBinding;

import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.mzj.eagle.wechat.portal.common.GlobalMethodUtil;
import com.mzj.eagle.wechat.portal.common.ValidatingFormException;
import com.mzj.eagle.wechat.portal.profile.service.UserInfoService;
import com.mzj.eagle.wechat.portal.vo.UserFeedbackVo;
import com.mzj.eagle.wechat.portal.vo.UserInfoVo;
import com.mzj.eagle.wechat.portal.vo.WeChatUserVo;
/**
 * ==================================
 *  用户信息
 *  
 * @author  huangrijia
 * 
 * =================================
 */
@Configuration
@Controller
@RequestMapping
public class ProfileController {
	private static final Logger LOG = LoggerFactory.getLogger(ProfileController.class);
	@Autowired
	private UserInfoService userInfoService;
	
	private static final String DEFAULT_SECRET_KEY = "db5c7ed2-af94-46fe-a05d-40efdb4a77c9";// 默认密钥

	//个人中心
	@RequestMapping(value= "profile.html",method=RequestMethod.GET)
	public String profile(@RequestParam(name = "_p") String p,ModelMap map) {
		//查询头像信息。头像信息没有,则不返回用户信息
		GlobalMethodUtil util = new GlobalMethodUtil();
		String decry = util.decrypt(p);
		Map<String, String> paraMap = util.getParams(decry);
		String openId = paraMap.get("openId");
		String appId = paraMap.get("appId");
		WeChatUserVo weChatVo = userInfoService.getOpenId(openId,appId);
		UserInfoVo userInfo = null;
		if(weChatVo!=null && !StringUtils.isEmpty(weChatVo.getUnionid())){
			userInfo = userInfoService.getById(weChatVo.getUnionid());
		} else {
			weChatVo = new WeChatUserVo();
		}
		if(userInfo == null) {
			userInfo = new UserInfoVo();
		}
		if(weChatVo.getGender() == null || (weChatVo.getGender()!=1 && weChatVo.getGender()!=2)){
			weChatVo.setGender(1);
		}
		map.put("weChatVo",weChatVo);
		map.put("userInfo", userInfo);
		map.put("openId", openId);
		return "profile/profile";
	}
	
	/**
	 * 修改注册用户信息
	 * @param p
	 * @param unionid
	 * @param name
	 * @param gender
	 * @param height
	 * @param birthdate
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value= "/updateUserInfo",method=RequestMethod.POST)
	public Integer profile(@RequestParam(name = "_p") String p,String unionid,String name,Integer gender,Integer height,String birthdate) {
		UserInfoVo userInfo = new UserInfoVo();
		userInfo.setUnionid(unionid);
		userInfo.setName(name);
		userInfo.setGender(gender);
		userInfo.setHeight(height);
		userInfo.setBirthdate(birthdate);
		GlobalMethodUtil util = new GlobalMethodUtil();
		String decry = util.decrypt(p);
		Map<String, String> paraMap = util.getParams(decry);
		String openId = paraMap.get("openId");
		Integer reuser = userInfoService.update(userInfo,openId);
        return reuser;

	}
	
	/**
	 * 添加反馈意见
	 * @param p
	 * @param userFeedbackVo
	 * @return
	 */
	@RequestMapping(value = "/saveFeedback", method = RequestMethod.POST,
			consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE,
			produces = {MediaType.APPLICATION_ATOM_XML_VALUE, MediaType.APPLICATION_JSON_VALUE})
	@ResponseBody
	public String saveFeedback(@RequestParam(value = "_p") String p, UserFeedbackVo userFeedbackVo) {
		GlobalMethodUtil util = new GlobalMethodUtil();
		String str = util.decrypt(p);
		Map<String,String> map = util.getParams(str);
		JSONObject obj = new JSONObject();
		obj.put("result", "反馈成功!");
		if(map == null) {
			obj.put("result", "反馈失败!");
			return obj.toJSONString();
		}
		userInfoService.saveFeedback(userFeedbackVo);
		return obj.toJSONString();
	}
}
