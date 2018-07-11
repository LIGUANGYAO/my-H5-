var host = document.getElementById("host").value;

require.config({
	baseUrl: host,
    urlArgs: 'v=' + Date.parse(new Date()),
	paths: {
		//共用
		jquery: host+'/plugins/lib/jquery.min',
		Vue: host+'/plugins/lib/vue.min',
		async: host+'/plugins/lib/async',

		//components
		echarts: host+'/plugins/lib/echarts.min',
		Swiper:host+'/plugins/lib/swiper-3.4.2.jquery.min',
		count:host+'/plugins/funs/count',
        FooterBar:host+'/component/FooterBar/footerBar',//页脚导航
		MyCharts:host+'/component/MyCharts/myCharts',//图表
        Loading:host+'/component/Loading/loading',

		//funs 公用方法
		common: host+'/plugins/funs/common',
		api: 'plugins/funs/api',
		bmi: 'plugins/funs/bmi',
		bmr: 'plugins/funs/bmr',
		sbw: 'plugins/funs/sbw',
		bhr: 'plugins/funs/bhr',

		//jssdk
		wx: 'http://res.wx.qq.com/open/plugins/jweixin-1.0.0',
		wechat: 'plugins/funs/wechat',
		
		//select
		IScroll:host+'/plugins/lib/iscroll',
		iosSelect:host+ '/plugins/lib/iosSelect',
		
		//地图
		BMap: 'http://api.map.baidu.com/api?v=2.0&ak=PNMl6SHGWGydToe0PROw60oD',
		amap: 'http://webapi.amap.com/maps?v=1.4.0&key=28e05256770be44cfc93bee06833b5d9&plugin=AMap.Driving',

		//生成图片
		html2canvas: host+'/plugins/lib/html2canvas',
		
        //统计
        // cnzz: 'https://s13.cnzz.com/z_stat.php?id=1265179904&web_id=1265179904',

		//解决点击事件延迟
        fastclick: host+ '/plugins/fastclick'

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
		html2canvas: {
			deps:['jquery']
		}

	},
    waitSeconds: 30
});