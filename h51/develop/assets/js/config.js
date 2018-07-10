require.config({
	baseUrl: '../',
	urlArgs: 'v=' + Date.parse(new Date()),
	paths: {
		//共用
		jquery: '../assets/js/lib/jquery.min',
		Vue: '../assets/js/lib/vue.min',
		async: '../assets/js/lib/async',

		//components
		echarts: '../assets/js/lib/echarts.min',
		Swiper:'../assets/js/lib/swiper-3.4.2.jquery.min',
		count:'../assets/js/funs/count',
		FooterBar:'../component/FooterBar/footerBar',//页脚导航
		MyCharts:'../component/MyCharts/myCharts',//图表
		Loading:'../component/Loading/loading',//loading

		//funs 公用方法
		common: '../assets/js/funs/common',
		api: '../assets/js/funs/api',
		bmi: '../assets/js/funs/bmi',
		bmr: '../assets/js/funs/bmr',
		sbw: '../assets/js/funs/sbw',
		bhr: '../assets/js/funs/bhr',

		//jssdk
		wx: 'http://res.wx.qq.com/open/js/jweixin-1.0.0',
		wechat: '../assets/js/funs/wechat',
		
		//select
		IScroll: '../assets/js/lib/iscroll',
		iosSelect: '../assets/js/lib/iosSelect',
		
		//地图
		BMap: 'http://api.map.baidu.com/api?v=2.0&ak=PNMl6SHGWGydToe0PROw60oD',
		amap: 'http://webapi.amap.com/maps?v=1.4.0&key=28e05256770be44cfc93bee06833b5d9&plugin=AMap.Driving',

		//生成图片
		html2canvas: '../assets/js/lib/html2canvas',

        //统计
        cnzz: 'https://s13.cnzz.com/z_stat.php?id=1265179904&web_id=1265179904'
	},
	shim : {
		Swiper: {
			deps:['jquery']
		},
		IScroll: {
			exports: 'IScroll'
		},
		iosSelect: {
			deps:['IScroll'],
			exports: 'IScroll'
		},
		BMap: {
			deps:['jquery'],
			exports: 'BMap'			
		},
		amap: {
			deps:['jquery'],
			exports: 'AMap'			
		},	
		html2canvas: {
			deps:['jquery']
		}
	},
    waitSeconds: 30
});