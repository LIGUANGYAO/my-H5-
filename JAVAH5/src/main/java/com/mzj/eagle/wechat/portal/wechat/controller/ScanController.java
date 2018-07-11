package com.mzj.eagle.wechat.portal.wechat.controller;

import java.io.IOException;
import java.net.URLEncoder;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

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
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.client.RestTemplate;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.mzj.eagle.wechat.portal.common.AESUtil;
import com.mzj.eagle.wechat.portal.common.ConstantsUtils;
import com.mzj.eagle.wechat.portal.common.SSLNetProvider;
import com.mzj.eagle.wechat.portal.wechat.vo.BusinessNews;
import com.mzj.eagle.wechat.portal.wechat.vo.NewsItem;
import com.mzj.eagle.wechat.portal.wechat.vo.UserWeight;
import com.mzj.eagle.wechat.portal.wechat.vo.WechatOfficialAccounts;
import com.mzj.eagle.wechat.portal.wechat.vo.WechatOfficialAccountsRef;
import com.mzj.eagle.wechat.portal.wechat.vo.WechatUser;
import com.mzj.eagle.wechat.portal.wechat.vo.WeightRecordVo;

@Controller
@RequestMapping("/")
public class ScanController {

	@Autowired
	@Qualifier("redisTemplate0")
	private StringRedisTemplate redisTemplate0;

	@Autowired
	@Qualifier("redisTemplate2")
	private StringRedisTemplate redisTemplate2;

	@Autowired
	@Qualifier("redisTemplate4")
	private StringRedisTemplate redisTemplate4;

	@Autowired
	@Qualifier("redisTemplate8")
	private StringRedisTemplate redisTemplate8;

	@Value("${apigw.host}")
	private String apigwHost;

	@Autowired
	private RestTemplate restTemplate;
	
	@Value("${webchat_authorize_userinfourl}")
	private String AUTHORIZE_USERINFOURL;
	
	@Value("${webchat_authorizeurl}")
	private String AUTHORIZEURL;
	
	@Value("${webchat_access_tokenurl}")
	private String ACCESS_TOKENURL;

	private static final Logger LOG = LoggerFactory.getLogger(ScanController.class);
	
	/**
	 * 二维码扫码进来的地址
	 * 
	 * @param request
	 * @param response
	 * @throws IOException
	 * @throws WeixinException
	 * @throws ServletException
	 */
	@RequestMapping("/scan")
	public void scan(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
		//跳转到微信
		getCode(request,response);
//		return "qrCodePage/wechatRefuse";
	}
	
	
	
	
	
	/**
	 * 二维码扫码进来的地址
	 * 
	 * @param request
	 * @param response
	 * @throws IOException
	 * @throws WeixinException
	 * @throws ServletException
	 */
	@RequestMapping("/getCode")
	public void getCode(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
		String REDIRECT_URI = request.getRequestURL().toString();
		REDIRECT_URI = REDIRECT_URI.substring(0, REDIRECT_URI.length() - 7);
		REDIRECT_URI = REDIRECT_URI + "WX/wechatCallBack.do";
		REDIRECT_URI += "?machineId=" + request.getParameter("machineId");

		REDIRECT_URI += "&weight=" + request.getParameter("weight");
		String appId = request.getParameter("appId");
		REDIRECT_URI += "&appId=" + appId;
		String reqTime = request.getParameter("reqTime");

		Date date = new Date(new Long(reqTime));
		SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");
		reqTime = sdf.format(date);
		REDIRECT_URI += "&reqTime=" + reqTime;
		
		String authorUrl = (String) request.getParameter("authorUrl");
		if(StringUtils.isEmpty(authorUrl)){
			authorUrl = AUTHORIZEURL;
		}else{
			authorUrl = AUTHORIZE_USERINFOURL;
			REDIRECT_URI += "&authorUrl=1";
		}
		
		REDIRECT_URI = URLEncoder.encode(REDIRECT_URI, "UTF-8");
		String url = String.format(authorUrl, appId, REDIRECT_URI);
		//跳转到微信
		response.sendRedirect(url);
	}

	/**
	 * 微信回调
	 * 
	 * @param request
	 * @param response
	 */
	@RequestMapping("/WX/wechatCallBack")
	public String wechatCallBack(HttpServletRequest request, HttpServletResponse response) {

		String result = "";
		try {

			//1.准备数据
			// 服务号appid
			String appId = request.getParameter("appId");
			String machineId = request.getParameter("machineId");
			String reqTime = request.getParameter("reqTime");
			
			// 下面为了获取用户的openid
			WechatOfficialAccounts account = JSON.parseObject((String) redisTemplate0.opsForHash()
					.get(ConstantsUtils.REDIS_WECHAT_KEY, appId + ConstantsUtils.AUTHORIZER_INFO_KEY),
					WechatOfficialAccounts.class);
			String appSecret = account.getAppsecret();
			SSLNetProvider provider = new SSLNetProvider();

			String url = String.format(ACCESS_TOKENURL, appId, appSecret, request.getParameter("code"));
			String rObj = provider.doPost(url, "");
			JSONObject json = JSONObject.parseObject(rObj);
			String openId = json.getString("openid");
			if (openId == null) {
				return null;
			}

			// 服务号和订阅号关系
			boolean relationFlag = redisTemplate8.opsForHash().hasKey(ConstantsUtils.Wechat_Official_Accounts_Ref,
					appId);

			WechatOfficialAccountsRef ffhDyhRelation = null;
			List<WechatOfficialAccountsRef> ffhDyhRelationList = null;
			//在redis找不到服务号和订阅号关系，直接返回
			if (!relationFlag) {
				return null;
			}

			String ffhDyhRelationString = (String) redisTemplate8.opsForHash()
					.get(ConstantsUtils.Wechat_Official_Accounts_Ref, appId);
			ffhDyhRelationList = JSON.parseArray(ffhDyhRelationString, WechatOfficialAccountsRef.class);
			for (int i = 0; i < ffhDyhRelationList.size(); i++) {
				ffhDyhRelation = ffhDyhRelationList.get(i);
				String available = ffhDyhRelation.getActive();
				if (available != null && "1".equals(available)) {
					break;
				}
			}

			// 订阅号的appid
			String dyhAppId = "";
			if (ffhDyhRelation != null) {
				dyhAppId = ffhDyhRelation.getSubscribId();
			}

			JSONObject authInfo = JSON.parseObject((String) redisTemplate0.opsForHash()
					.get(ConstantsUtils.REDIS_WECHAT_KEY, dyhAppId + ConstantsUtils.AUTHORIZER_INFO_KEY));

			// 用户的unionId
			String unionId = null;
			String authorUrl = request.getParameter("authorUrl");
			if (StringUtils.isEmpty(authorUrl)) {
				//不用info授权
				unionId = getUnionid(appId, openId, authInfo);
			} else {
				//用info授权
				String accessToken = json.getString("access_token");
				unionId = getUserByAuthor(accessToken,openId,authInfo,appId);
			}
			
			/**
			 * 如果用户的unionid为空，那么去微信授权拿去unionid
			 */
			if(StringUtils.isBlank(unionId)){
				request.setAttribute("authorUrl", "1");
				return "qrCodePage/wechatRefuse";
			}

			// 体重
			String weight = request.getParameter("weight");

			request.setAttribute("weight", weight);
			boolean appIdUnionIdFlag = redisTemplate4.opsForHash().hasKey(getUserWeightDyh(dyhAppId + "_" + unionId),
					dyhAppId + "_" + unionId);
			String subscribe = "";
			Map<String, String> userMap = null;
			if (appIdUnionIdFlag) {
				String tempString = (String) redisTemplate4.opsForHash().get(getUserWeightDyh(dyhAppId + "_" + unionId),
						dyhAppId + "_" + unionId);
				userMap = JSON.parseObject(tempString, Map.class);
				subscribe = userMap.get("subscribe");
			}

			// 2.已经关注过,直接跳转到h5首页
			if (appIdUnionIdFlag && "1".equals(subscribe)) {
				gotoH5Page(userMap.get("openid"), dyhAppId, weight, machineId, reqTime, result, response);
				return null;
			}

			// 3.没有关注过,会跳转到二维码页面

			// 是否需要首次关注
			String focus = ffhDyhRelation.getFirstFollow();
			boolean focusFlag = false;
			if (focus != null && "0".equals(focus)) {
				for (int i = 0; i < ffhDyhRelationList.size(); i++) {
					WechatOfficialAccountsRef tempRelation = ffhDyhRelationList.get(i);
					String tempDyhAppId = tempRelation.getSubscribId();
					boolean tempFlag = redisTemplate4.opsForHash().hasKey(getUserWeightDyh(dyhAppId + "_" + unionId),
							tempDyhAppId + "_" + unionId);
					if (tempFlag) {
						String tempString = (String) redisTemplate4.opsForHash()
								.get(getUserWeightDyh(dyhAppId + "_" + unionId), tempDyhAppId + "_" + unionId);
						Map<String, String> tempMap = JSON.parseObject(tempString, Map.class);
						String tempSubscribe = tempMap.get("subscribe");
						if (tempSubscribe != null && "1".equals(tempSubscribe)) {
							focusFlag = true;
							break;
						}
					}
				}
				//不需要首次关注，但是该用户已经关注过其中一个订阅号，所以直接跳转到h5首页
				if (focusFlag) {
					gotoH5Page(userMap.get("openid"), dyhAppId, weight, machineId, reqTime, result, response);
					return null;
				} else {
					//不需要首次关注，但是该用户一个订阅号都没关注过，所以跳转到二维码页面
					result = rqCodePage(weight,machineId,dyhAppId,unionId,authInfo,request);
				}
			} else {
				// 没有关注过,跳转到二维码页面
				result = rqCodePage(weight,machineId,dyhAppId,unionId,authInfo,request);
			}

			// 4.体重数据发到mq
			WeightRecordVo weightRecordVo = new WeightRecordVo();
			weightRecordVo.setOfficialAccountsAppid(dyhAppId);
			weightRecordVo.setWeight(new Double(weight));
			weightRecordVo.setChannel("3");
			weightRecordVo.setDelay(0);
			String openid = json.getString("openid");
			weightRecordVo.setOpenid(openid);
			weightRecordVo.setMachineId(machineId);
			weightRecordVo.setOfficialAccountsServiceAppid(appId);
			weightRecordVo.setUnionid(unionId);
			SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");
			weightRecordVo.setReqTime(String.valueOf((sdf.parse(reqTime).getTime())));

			restTemplate.postForObject(apigwHost + "health/weightRecord", weightRecordVo, WeightRecordVo.class);

		} catch (Exception e) {
			LOG.error(e.getMessage(), e);
		}
		return result;
	}

	/**
	 * 返回h5首页
	 * 
	 * @param openId
	 * @param dyhAppId
	 * @param weight
	 * @param machineId
	 * @param reqTime
	 * @param result
	 * @param response
	 */
	public void gotoH5Page(String openId, String dyhAppId, String weight, String machineId, String reqTime,
			String result, HttpServletResponse response) {

		// 添加图文
		String type = "WEIGHTRETURNNEWSFIRST";// 获取类型
		 BusinessNews businessNews = JSON.parseObject((String) redisTemplate0.opsForHash().get("BussinessNewsList", type),
				BusinessNews.class);
									
		if (businessNews != null) {

			List<NewsItem> articles = null;
			if (redisTemplate0.opsForHash().hasKey("wxbNewsItemList", businessNews.getNewsId())) {
				articles = JSON.parseObject(
						(String) redisTemplate0.opsForHash().get("wxbNewsItemList", businessNews.getNewsId()),
						List.class);
			}

			if (!articles.isEmpty()) {
				NewsItem newsItem = JSON.parseObject(JSON.toJSONString(articles.get(0)), NewsItem.class);
				String indexUrl = newsItem.getUrl();
				UserWeight userWeight = new UserWeight();
				userWeight.setChannel("3");
				userWeight.setAccountId(dyhAppId);
				userWeight.setWeight(new Double(weight));
				userWeight.setOpenId(openId);
				userWeight.setMachineId(machineId);
				SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");
				try {
					userWeight.setReqTime(sdf.parse(reqTime));
					userWeight.setReceiverTime(new Date());
					restTemplate.postForObject(apigwHost + "wxapi/sUserWeight", userWeight, UserWeight.class);
					result = setUrlParam(indexUrl, openId, null, openId, weight, "0", dyhAppId);
					response.sendRedirect(result);
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		}
	}

	/**
	 * 跳转到二维码页面
	 * @param weight
	 * @param machineId
	 * @param dyhAppId
	 * @param unionId
	 * @param authInfo
	 * @param request
	 * @return
	 */
	private String rqCodePage(String weight,String machineId,String dyhAppId,String unionId,JSONObject authInfo,HttpServletRequest request){
		Map<String, String> userNewMap = new HashMap<>();
		userNewMap.put("weight", weight);
		userNewMap.put("machineId", machineId);
		redisTemplate4.opsForHash().put(getUserWeightDyh(dyhAppId + "_" + unionId),
				dyhAppId + "_" + unionId, JSON.toJSONString(userNewMap));
		request.setAttribute("imgeUrl", authInfo.getString("qrcodePath"));
		String result = "qrCodePage/wechat";
		return result;
	}
	
	/**
	 * 用户体重订阅号键
	 * @param userWeightDyhKey
	 * @return
	 */
	private static String getUserWeightDyh(String userWeightDyhKey) {
		int hashKey = userWeightDyhKey.hashCode();
		return ConstantsUtils.USER_WEIGHT_DYH + Math.abs(hashKey) % ConstantsUtils.USER_KEY_NUM;
	}

	/**
	 * 用户服务号openid键
	 * @param userServiceOpenIdKey
	 * @return
	 */
	private static String getUserServiceOpenId(String userServiceOpenIdKey) {
		int hashKey = userServiceOpenIdKey.hashCode();
		return ConstantsUtils.USER_SERVICE_OPENID + Math.abs(hashKey) % ConstantsUtils.USER_KEY_NUM;
	}


	/**
	 * 设置返回地址
	 * 
	 * @param newsItem
	 * @param openId
	 * @param accountId
	 * @param id
	 * @param weight
	 * @param weightChange
	 */
	private String setUrlParam(String url, String openId, String accountId, String id, String weight,
			String weightChange, String appId) {

		String param = "accountId=" + accountId + "&openId=" + openId + "&recordId=" + id + "&weight=" + weight
				+ "&weightChange=" + weightChange + "&appId=" + appId;
		String _p = "_p=" + AESUtil.encrypt(param);
		String result = url +"?"+ _p;;
		return result;
	}

	/**
	 * 
	 * @param appId
	 *            服务号appid
	 * @param openId
	 *            服务号openid
	 * @return
	 */
	private String getUnionidByWxapi(String appId, String openId) {
		String unionId = null;
		String url = apigwHost + "wxapi/wxUser";
		url = url + "?appId=" + appId + "&openId=" + openId;
		ResponseEntity<WechatUser> uisResponseEntity = restTemplate.exchange(url, HttpMethod.GET, null,
				new ParameterizedTypeReference<WechatUser>() {
				});
		WechatUser wx = uisResponseEntity.getBody();
		LOG.info("wx:{},appId:{},openId:{}",JSON.toJSONString(wx),appId,openId);
		if (wx != null) {
			unionId = wx.getUnionid();
		}
		return unionId;
	}
	
	/**
	 * 网页授权获取用户信息
	 */
	private String getUserByAuthor(String accessToken, String openid,JSONObject authInfo,String appId) {
		String unionId = "";
		String url = apigwHost + "wxapi/userByAuthor";
		url = url + "?accessToken=" + accessToken + "&openid=" + openid;
		ResponseEntity<String> uisResponseEntity = restTemplate.exchange(url, HttpMethod.GET, null,
				new ParameterizedTypeReference<String>() {
				});
		String result = uisResponseEntity.getBody();
		LOG.info("userinfo result:{}", result);
		if (StringUtils.isEmpty(result) || result.contains("\"error\"")) {
			LOG.info("微信用户数据获取失败：{}", result);
		}else{
			unionId = JSON.parseObject(result).getString("unionid");
			unionId = authInfo.getString("plant") + "_" + unionId;
		}
		redisTemplate4.opsForHash().put(getUserServiceOpenId(appId + "_" + openid), appId + "_" + openid, unionId);
		return unionId;
	}
	

	/**
	 * 获取服务号的unionid
	 * 
	 * @param appId
	 * @param openId
	 * @param authInfo
	 * @return
	 */
	public String getUnionid(String appId, String openId, JSONObject authInfo) {
		String unionId = null;
		boolean serviceOpenIdFlag = redisTemplate4.opsForHash().hasKey(getUserServiceOpenId(appId + "_" + openId),
				appId + "_" + openId);
		LOG.info("1appIdopenId:{}", appId + "_" + openId);
		if (serviceOpenIdFlag == false) {
			unionId = getUnionidByWxapi(appId, openId);
			LOG.info("21appIdopenId unionid:{}", appId + "_" + openId+"_"+unionId);
			if(unionId==null)return unionId;
			unionId = authInfo.getString("plant") + "_" + unionId;
			redisTemplate4.opsForHash().put(getUserServiceOpenId(appId + "_" + openId), appId + "_" + openId, unionId);
			LOG.info("2appIdopenId:{}", appId + "_" + openId);
		} else {
			unionId = (String) redisTemplate4.opsForHash().get(getUserServiceOpenId(appId + "_" + openId),
					appId + "_" + openId);
			
			LOG.info("3appIdopenId unionid:{}", appId + "_" + openId+"_"+unionId);
		}
		return unionId;
	}
}