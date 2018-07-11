define([], function() {
    'use strict';
    var exportsObj = {};

	  var baseUrl = 'https://h5.mzjmedia.net';//正式

	  // exportsObj.baseUrl = appconfig.apiUrl;

	  exportsObj.baseUrl = baseUrl;

	/*-------------------------------------------------------------------------------
	 | 首页API
	 |-------------------------------------------------------------------------------
	 */
	//获取初始化体重数据
	exportsObj.getHomeTopDate = baseUrl + '/home/v11/weight';

	//高并发数据接口
	exportsObj.highconcurrency = baseUrl +  '/highconcurrency/doms';

	//图表数据 //周、月、年称重记录
    exportsObj.getWeightList = baseUrl + '/home/weUserWeightList';

	//广告图片
	exportsObj.getAdvertising = baseUrl + '/getRedisAdvertising';

	//热门图片列表(主页)
	exportsObj.getIndexImg = baseUrl + '/bask/v11/queryIndexImg'

	//获取体脂信息
	exportsObj.bodyFat = baseUrl + '/weUserBodyFat';

	//广告点击次数
	exportsObj.getAdCount = baseUrl + '/adClickRate';

	//获取code接口
	exportsObj.getusercode = baseUrl + '/getusercode';

	//设置目标及周期
	exportsObj.addWeightManagement = baseUrl+ '/weightmanagement/v11/addWeightManagement';

	exportsObj.getsign = baseUrl+ '/weightmanagement/v11/getsign';

	exportsObj.addsign = baseUrl + '/weightmanagement/v11/addsign';

	//获取目标及周期
	exportsObj.getManagementid = baseUrl+'/weightmanagement/v11/managementid';

	//设置目标体重
	exportsObj.adupWeightManagement = baseUrl + '/weightmanagement/v11/addWeightManagement';
	exportsObj.lastThree = baseUrl + '/weightmanagement/v11/userweight/today/lastfive';

	//添加食材
	exportsObj.addMykallMana = baseUrl +'/weightmanagement/v11/addMykallMana';
	//获取默认食材和运动
	exportsObj.getdefaultkallmana = baseUrl+'/weightmanagement/v11/getdefaultkallmana';
	//注册后换一换饮食
	exportsObj.updateMykallMana = baseUrl+ '/weightmanagement/v11/updateMykallMana'
	//注册之后获取食材和运动
	exportsObj.getMykallMana = baseUrl+'/weightmanagement/v11/getMykallMana';
	exportsObj.targetHealRepoArtis = baseUrl+'/article/v11/targetHealRepoArtis';


	//没注册 进入主题页
	exportsObj.teachEatThemes = baseUrl+'/article/v11/teachEatThemes';

    //进入主题页 文章列表
	exportsObj.teachEatThemeArtis = baseUrl+'/article/v11/teachEatArtis';
    //文章详情
	exportsObj.ThemeArtiDetail = baseUrl+'/article/v11/teachEatThemeArtiDetail';

	//主页健康小贴士
	exportsObj.indexHealRepoArtis = baseUrl+'/article/v11/indexHealRepoArtis';

	//小贴士文章列表
	exportsObj.TypeArtiDetail = baseUrl+'/article/v11/healRepoTypeArtiDetail';

	//目标文章列表
	exportsObj.healRepoTypeArtis = baseUrl+'/article/v11/healRepoTypeArtis';
	/*-------------------------------------------------------------------------------
	 | 推荐页API
	 |-------------------------------------------------------------------------------
	 */
	/*-------------------------------------------------------------------------------
	 | 晒一晒 API
	 |-------------------------------------------------------------------------------
	 */
    //查询我的美图(滑动)
    exportsObj.queryImg = baseUrl + '/queryImg';

    // 查询我的美图(查询所有)
    exportsObj.queryAllImg = baseUrl + '/bask/v11/queryMyImg';

   	// 查询热门-男神-女神图片
    exportsObj.queryTypeImg = baseUrl + '/bask/v11/getTypeImgs';

   	// 上传图片
    exportsObj.additionImg = baseUrl + '/bask/v11/additionImg';

   	// 图片详情
    exportsObj.imgDetail = baseUrl + '/bask/v11/imgDetail';
    exportsObj.imgOwner = baseUrl + '/bask/v11/imgOwner';
    exportsObj.likeImgList = baseUrl + '/bask/v11/imgThumbList';

    exportsObj.commentariesImgList = baseUrl + '/bask/v11/imgCommList';

   	// 删除
    exportsObj.removeImg = baseUrl + '/bask/v11/removeImg';

    exportsObj.imgCommentaries = baseUrl + '/bask/v11/addComm';

    exportsObj.likeImg = baseUrl + '/bask/v11/addThumb';
    exportsObj.imgBrowse = baseUrl + '/imgBrowse';
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
	// 报表
	exportsObj.reportList = baseUrl + '/reportList'
	exportsObj.report = baseUrl + '/report'
	exportsObj.queryWeightUser = baseUrl + '/queryWeightUser'
	exportsObj.generateReport = baseUrl + '/generateReport'

	/*-------------------------------------------------------------------------------
	 | 体重管理
	 |-------------------------------------------------------------------------------
	 */


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
