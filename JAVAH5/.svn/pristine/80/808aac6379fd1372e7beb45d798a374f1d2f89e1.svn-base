package com.mzj.eagle.wechat.portal.pk.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.mzj.eagle.wechat.portal.vo.UserWeightVo;
import com.mzj.eagle.wechat.portal.vo.WeChatUserVo;

@Configuration
@Controller
public class PKController {
	

    /*img.host=http://img10.mzjmedia.net/
*//*	@Value("${img.host}")
	private String imgHost; */
	
	//pk榜分数段列表
	@RequestMapping(value= "pk.html",method=RequestMethod.GET)
	public String pk(ModelMap map,UserWeightVo vo,WeChatUserVo weCharUser) {
		/*map.addAttribute("imgHost", imgHost);*/
		
		vo.setWeight(65);
		vo.setBmi(43.3);
		vo.setBmr(2178);
		vo.setStandardWeight(45);
		vo.setDateType(2);//称重次数
		vo.setWeightScore(95.4);//分数
		
		weCharUser.setNickname("张珊");
		weCharUser.setHeadimgurl("images/2/pk_icon_Female.png");
		weCharUser.setGender(2);
		
		
		map.put("nickname", "张珊");//姓名
		map.put("sex", 1);//性别  //1是男 ，2是女
		map.put("imageUrl", "images/2/pk_icon_Female.png");//性别  //1是男 ，2是女
		map.put("rank", 32715);//排名
		map.put("weightScore", 95.4);//分数
        map.put("personpercentage", 55.4);//个人百分比
		
//        List pklist=new ArrayList<PkOrderList>();
//        pklist.add(new PkOrderList(45.3,100d,91d,98));
//        pklist.add(new PkOrderList(45.2,90d,81d,23));
//        map.put("pklist", pklist);
        
        map.put("Count", 2333);
        
	    map.put("userWeightVo", vo);
        map.put("weCharUser",weCharUser);
		
		return "pk/pk";
	}
	
	//pk榜详细列表
	@RequestMapping(value= "score.html",method=RequestMethod.GET)
	public String PkDetail(HttpServletRequest request,HttpServletResponse response,ModelMap map) {
//		List scorelist=new ArrayList<ScoreOrderList>();
//		scorelist.add(new ScoreOrderList("1","images/2/pk_icon_Female.png","张珊",2,340,89d));
//		scorelist.add(new ScoreOrderList("2","images/2/pk_icon_Female.png","李斯",1,350,85d));
//	    map.put("scorelist", scorelist);
		return "pk/score";
	}

}
