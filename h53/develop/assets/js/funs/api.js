define([], function() {
    'use strict';
    var exportsObj = {};

     //var baseUrl = 'http://192.168.6.29:4012';//本地
	   //var baseUrl = location.protocol + '//h5.mzjmedia.com';//正式

	  //var  baseUrl = 'http://h5.mzjmedia.net';

	   var  baseUrl = 'https://h5.mzjmedia.com';


       exportsObj.baseUrl = baseUrl;

	/*-------------------------------------------------------------------------------
	 | 首页API
	 |-------------------------------------------------------------------------------
	 */
	//获取初始化体重数据
	exportsObj.getHomeTopDate = baseUrl + '/home/weight';
	
	//图表数据 //周、月、年称重记录
    exportsObj.getWeightList = baseUrl + '/home/weUserWeightList';
	
	//广告图片
	exportsObj.getAdvertising = baseUrl + '/getRedisAdvertising';

	//热门推荐
	exportsObj.hotRecommended = baseUrl + '/hotRecommended';

	//获取体脂信息
	exportsObj.bodyFat = baseUrl + '/weUserBodyFat';

	//广告点击次数
	exportsObj.getAdCount = baseUrl + '/adClickRate';

	//获取code接口
	exportsObj.getusercode = baseUrl + '/getusercode';  
	
	/*-------------------------------------------------------------------------------
	 | PK榜页API
	 |-------------------------------------------------------------------------------
	 */
    //pk榜基本信息
	exportsObj.showScore = baseUrl + '/pk/score';
    //pk榜PK列表
	exportsObj.showPklist = baseUrl + '/pk/pkList';

	//pk点赞
	exportsObj.showGood = baseUrl +'/pk/fabulous';
	
	/*-------------------------------------------------------------------------------
	 | 附近网点页API
	 |-------------------------------------------------------------------------------
	 */
    //附近网点
    exportsObj.getNearWeightScale = baseUrl + '/NearbyScale';

    //获取设备地址
	exportsObj.getWeightScaleAddress = baseUrl + '/balance/merchantQuery';
	//
	exportsObj.getBusinessDetails = baseUrl + '/balance/businessDetails';
    
	/*-------------------------------------------------------------------------------
	 | 推荐页API
	 |-------------------------------------------------------------------------------
	 */
    //获取报表
    exportsObj.getWeightReport = baseUrl + '/weight/scale/getWeightReport.do';

    //获取报表列表
    exportsObj.getReportList = baseUrl + '/weight/scale/getReportList.do';
	/*-------------------------------------------------------------------------------
	 | 晒一晒 API
	 |-------------------------------------------------------------------------------
	 */
    //查询我的美图(滑动)
    exportsObj.queryImg = baseUrl + '/queryImg';

    // 查询我的美图(查询所有)
    exportsObj.queryAllImg = baseUrl + '/queryAllImg';
   	
   	// 查询热门-男神-女神图片
    exportsObj.queryTypeImg = baseUrl + '/queryTypeImg';
   
   	// 上传图片
    exportsObj.additionImg = baseUrl + '/additionImg';
   	
   	// 图片详情
    exportsObj.imgDetail = baseUrl + '/imgDetail';
    exportsObj.likeImgList = baseUrl + '/likeImgList';
    exportsObj.commentariesImgList = baseUrl + '/commentariesImgList';
   	
   	// 删除
    exportsObj.removeImg = baseUrl + '/removeImg';
    
    exportsObj.imgCommentaries = baseUrl + '/imgCommentaries';

    exportsObj.likeImg = baseUrl + '/likeImg';
    exportsObj.imgBrowse = baseUrl + '/imgBrowse';
    
	/*-------------------------------------------------------------------------------
	 | 健康知识库
	 |-------------------------------------------------------------------------------
	 */
    exportsObj.healthknowledgeList = baseUrl + '/healthknowledge/List';
    exportsObj.healthknowledgeId = baseUrl + '/healthknowledge/id';
    exportsObj.healthknowledgeParam = baseUrl + '/healthknowledge/param';
    
	/*-------------------------------------------------------------------------------
	 | 实验室
	 |-------------------------------------------------------------------------------
	 */
    exportsObj.experimentalList = baseUrl + '/experimental/List';
    exportsObj.experimentalId = baseUrl + '/experimental/id';
	
	/*-------------------------------------------------------------------------------
	 | 个人中心
	 |-------------------------------------------------------------------------------
	 */
    exportsObj.profile = baseUrl + '/profile';
    exportsObj.updateUserInfo = baseUrl + '/updateUserInfo';
    exportsObj.saveFeedback = baseUrl + '/proposal/save';
    exportsObj.problems = baseUrl + '/proposal/problems';
    exportsObj.history = baseUrl + '/proposal/history';
    exportsObj.weUserWeightAll = baseUrl + '/home/weUserWeightAll';
    
	/*-------------------------------------------------------------------------------
	 | 推荐页面
	 |-------------------------------------------------------------------------------
	 */
    //热门推荐主题
	exportsObj.queryHotMain = baseUrl + '/queryHotMain';
    //热门推荐内容
	exportsObj.queryHot = baseUrl + '/queryHot';
    //热门推荐内容详情
	exportsObj.queryHotDetail = baseUrl + '/queryHotDetail';

	// 报表
	exportsObj.reportList = baseUrl + '/reportList'
	exportsObj.report = baseUrl + '/report'
	exportsObj.queryWeightUser = baseUrl + '/queryWeightUser'
	exportsObj.generateReport = baseUrl + '/generateReport'

	/*-------------------------------------------------------------------------------
	 | 体重管理
	 |-------------------------------------------------------------------------------
	 */
	//获取体重管理
	exportsObj.getManagementid = baseUrl + '/weightmanagement/managementid';

	//添加体重管理套餐信息
	exportsObj.adupWeightManagement = baseUrl + '/weightmanagement/addWeightManagement';

	//添加食材、运动信息
	exportsObj.addMykallMana = baseUrl + '/weightmanagement/addMykallMana';
	
	//换一种食材、运动
	exportsObj.updateMykallMana = baseUrl + '/weightmanagement/updateMykallMana';

	//获取食材、运动信息
	exportsObj.getMykallMana = baseUrl + '/weightmanagement/getMykallMana';

	//获取第n天打卡信息
	exportsObj.getsign = baseUrl + '/weightmanagement/getsign';
	//打卡
	exportsObj.addsign = baseUrl + '/weightmanagement/addsign';

    exportsObj.sensitiveword = baseUrl + '/sensitiveword/filter';
	//长按识别二维码统计
	exportsObj.longpress =baseUrl+ '/statistics/longpressrecognition?';


    /*-------------------------------------------------------------------------------
	 | 消息中心
	 |-------------------------------------------------------------------------------
	 */
     //消息中心列表
	 exportsObj.getMmessageList=baseUrl+ '/messageList';

	 //系统消息列表
	 exportsObj.getsSysMessList= baseUrl+ '/sysMessList';
     //查询系统公告
	 exportsObj.getNoticeInfo=baseUrl + '/queryNoticeInfo';
	 //查询谁评论
	 exportsObj.getPicdomInfo=baseUrl+'/queryPicdomInfo';
	 //查询谁点赞我
	 exportsObj.getPigupsInfo=baseUrl+'/queryPigupsInfo';
	//获取历史记录（系统消息为主）
	 exportsObj.getSysreply=baseUrl+'/proposal/sys-reply';

	 //公告、活动详细信息查询
	 exportsObj.getDetailInfo=baseUrl+'/queryDetailInfo';

	 //查询系统活动
	 exportsObj.getActivityInfo=baseUrl+'/queryActivityInfo';

    return exportsObj;

});