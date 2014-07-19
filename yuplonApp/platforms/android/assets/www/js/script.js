$(function(){
		(function($,dom){
			var mainHeight =$(dom).height()
				app = $(".app"),
				container = $(".containerIndex"),
				redimir = $(".Redimir")[0];
				
			bindEvents =(function(){
				setTimeout(function(){
					container.addClass("move");
				},4000);
				app.css({'height':mainHeight});
				var hammertime = Hammer(redimir,{swipe_max_touches:5});
				hammertime.on("tap",function(){alert("");window.location.href="app.html"});
				
			})();
			
			
		})(jQuery, document);
});