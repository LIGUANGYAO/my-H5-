require.config({
	baseUrl: '../',
	urlArgs: 'v=9.0',
	paths: {
		//共用
		jquery: '../assets/js/lib/jquery.min',
		jqueryLazyload: '../assets/js/lib/jquery.lazyload',
		Vue: '../assets/js/lib/vue.min',
		async: '../assets/js/lib/async',

		//components
		echarts: '../assets/js/lib/echarts.min',
		Swiper:'../assets/js/lib/swiper-3.4.2.jquery.min',

		count:'../assets/js/funs/count',
		FooterBar:'../component/FooterBar/footerBar',//页脚导航
		PageLoad:'../component/pageLoad/pageLoad',//加载
		Loading:'../component/Loading/loading',//loading
		Spin:'../component/Spin/spin',//loading

		//funs 公用方法
		common: '../assets/js/funs/common',
		api: '../assets/js/funs/api',
		bmi: '../assets/js/funs/bmi',
		//jssdk
		wx: 'http://res.wx.qq.com/open/js/jweixin-1.0.0',

		//select
		IScroll: '../assets/js/lib/iscroll',
		iosSelect: '../assets/js/lib/iosselect',
		
		//地图
		amap: 'https://webapi.amap.com/maps?v=1.4.0&key=28e05256770be44cfc93bee06833b5d9&plugin=AMap.Driving',

		//解决点击事件延迟
		fastclick: '../assets/js/lib/fastclick',

		//下拉加载
		dropLoad: '../assets/js/lib/dropload.min',

		//压缩图片
		lrz:'../assets/js/lib/lrz.all.bundle'
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
		amap: {
			deps:['jquery'],
			exports: 'AMap'			
		},	
		html2canvas: {
			deps:['jquery']
		},
		jqueryLazyload:{
			deps: ['jquery'],
            exports: '$'
		},
		dropLoad:{
			deps: ['jquery'],
            exports: '$'
		},
		lrz:{
			deps: ['jquery']
		}
	},
    waitSeconds: 30
});