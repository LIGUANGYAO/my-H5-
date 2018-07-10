
var exportsObj = {};

//var baseUrl = 'http://192.168.1.16:4012';

var baseUrl = 'https://h5.mzjmedia.com'

exportsObj.baseUrl = baseUrl;

exportsObj._p = ''
/*-------------------------------------------------------------------------------
 | 首页API
 |-------------------------------------------------------------------------------
 */
//获取初始化体重数据
exportsObj.getHomeTopDate = baseUrl + '/home/smallProgramWeight';

//图表数据
exportsObj.getWeightList = baseUrl + '/home/weUserWeightList';

//广告图片
exportsObj.getAdvertising = baseUrl + '/getAdvertising';

//热门推荐
exportsObj.hotRecommended = baseUrl + '/hotRecommended';

//获取appcode
exportsObj.getAppcode = baseUrl + '/accredit/login?';

//获取p值
exportsObj.getNumberp = baseUrl + '/encryption/p?';

//体脂计算接口
exportsObj.bodyFat = baseUrl + '/weUserBodyFat';


//没有关注的用户拿取unionid
exportsObj.decryuserinfo = baseUrl +'/accredit/decryuserinfo?';


/*-------------------------------------------------------------------------------
 | PK榜页API
 |-------------------------------------------------------------------------------
 */
//pk榜基本信息
exportsObj.showScore = baseUrl + '/pk/score';
//pk榜PK列表
exportsObj.showPklist = baseUrl + '/pk/pkList';

//pk点赞
exportsObj.showGood = baseUrl + '/pk/fabulous';

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
exportsObj.saveFeedback = baseUrl + '/saveFeedback';
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


module.exports = exportsObj;