$(function(){
		(function($,dom){
			var mainHeight =$(dom).height()
				app = $(".app"),
				container = $(".containerIndex");
				
			bindEvents =(function(){
				setTimeout(function(){
					container.addClass("move");
				},4000);
				app.css({'height':mainHeight});
			})();
			
			
		})(jQuery, document);
});