define(['jquery','common','api'], function($,common,api) {
	
	 var exportObj = {};
	 
	 exportObj.clickCount=function(adId, adName, adType){
		  $.ajax({
				type: "POST",
				url: api.getClickADCount,
				data: {
					_p: common.getRequest()._p,
					adId: adId,
					name: adName,
					type: adType
				},
				success: function(response) {
					if(response.retcode == 1) {

					} else {
						console.log(response);
					}
					
					setTimeout(function() {
						location.href = adUrl;
					}, 1000);
				}
			});
	 }
})