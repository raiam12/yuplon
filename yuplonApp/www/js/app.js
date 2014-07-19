$(function(){
		(function($,dom){
			var mainHeight =$(dom).height()
				app = $(".app"),
				container = $(".containerIndex"),
				redimir = $(".Redimir")[0];
				
			bindEvents =(function(){
				app.css({'height':mainHeight});
				$('.mask').mask('ZZ-ZZZZZ-ZZZ-ZZ',{placeholder:"XX-XXXXX-XXX-XX",translation:{'Z':{pattern:/^[a-zA-Z0-9]+$/,optional:false}}});
				//var hammertime = Hammer(redimir,{swipe_max_touches:5});
				//hammertime.on("tap",function(){window.location.href="app.html"});
				
			})();
			
			
		})(jQuery, document);
});