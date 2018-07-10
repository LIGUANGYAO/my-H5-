define([], function() {
    'use strict';
    var exportsObj = {};
    var baseUrl = 'http://guangdian.mzjmedia.com/grg-web-scale';

    exportsObj.baseUrl = baseUrl;

	/*-------------------------------------------------------------------------------
	 | 首页API
	 |-------------------------------------------------------------------------------
	 */
	//获取初始化体重数据
	exportsObj.getHomeTopDate = baseUrl + '/weight/scale/getHometWeight.do';
	
	//分享图片
	exportsObj.getSharedPic = baseUrl + '/weight/scale/sharePic.do';
	
	//图表数据
	exportsObj.getPresentWeightRecord = baseUrl + '/weight/scale/getPresentWeightRecord.do';
	
	//广告
	exportsObj.getClickADCount = baseUrl + '/weight/scale/clickADCount.do';

	/*-------------------------------------------------------------------------------
	 | 注册页及修改页个人信息API
	 |-------------------------------------------------------------------------------
	 */	
    //更新或保存个人信息
    exportsObj.updateOrSavePersoInfo = baseUrl + '/weight/scale/updateOrSavePersoInfo.do';

	/*-------------------------------------------------------------------------------
	 | PK榜页API
	 |-------------------------------------------------------------------------------
	 */
    //显示排行页面
	exportsObj.showRankData = baseUrl + '/weight/scale/showRankData.do';
	//得分列表页       
	 exportsObj.showRankDataList =  baseUrl + '/weight/scale/showRankDataList.do';

    //点赞或取消点赞
    exportsObj.goodItOrCance = baseUrl + '/weight/scale/goodItOrCance.do';    

	/*-------------------------------------------------------------------------------
	 | 附近网点页API
	 |-------------------------------------------------------------------------------
	 */
    //附近网点
    exportsObj.getNearWeightScale = baseUrl + '/weight/scale/getNearWeightScale.do';

    //获取设备地址
    exportsObj.getWeightScaleAddress = baseUrl + '/weight/scale/getShowAddress.do';
    
	/*-------------------------------------------------------------------------------
	 | 推荐页API
	 |-------------------------------------------------------------------------------
	 */
    //获取报表
    exportsObj.getWeightReport = baseUrl + '/weight/scale/getWeightReport.do';

    //获取报表列表
    exportsObj.getReportList = baseUrl + '/weight/scale/getReportList.do';

	/*-------------------------------------------------------------------------------
	 | 我的中心页API
	 |-------------------------------------------------------------------------------
	 */
	//会员数据（此接口和首页图表数据同一接口）
	exportsObj.getPresentWeightRecord = baseUrl + '/weight/scale/getPresentWeightRecord.do';
	
    //更新个人信息
    exportsObj.updateOrSavePersoInfo = baseUrl + '/weight/scale/updateOrSavePersoInfo.do';
    
	/*-------------------------------------------------------------------------------
	 | 微信分享SDKAPI
	 |-------------------------------------------------------------------------------
	 */
    //jssdk签名
	exportsObj.jsSdkAuth = baseUrl + '/weight/scale/jsSdkAuth.do';
	
	//首页点击广告接口
	exportsObj.getClickADCount = baseUrl + '/weight/scale/clickADCount.do';
    
    return exportsObj;

});