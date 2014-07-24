$(function(){
		(function($,dom){
			var mainHeight =$(dom).height()
				app = $(".app"),
				container = $(".containerIndex"),
				redimir = $(".Redimir")[0],
                backButton = $(".back")[0],
                maskElem = $(".mask"),
                goToMenu = $(".RedimirNuevo")[0];
				
			bindEvents =(function(){
				app.css({'height':mainHeight});
				$('.mask').mask('ZZ-ZZZZZ-ZZZ-ZZ',{placeholder:"XX-XXXXX-XXX-XX",translation:{'Z':{pattern:/^[a-zA-Z0-9]+$/,optional:false}}});
				var red = Hammer(redimir,{swipe_max_touches:5}),
                         back = Hammer(backButton,{swipe_max_touches:5}),
                         goMenu = Hammer(goToMenu,{swipe_max_touches:5});
				red.on("tap",function(){
                       validateComp(maskElem.val(),container);
                });
                back.on("tap",function(){
                        container.css("-webkit-transform","translate3d(0,0,0)");
                });
                goMenu.on("tap",function(){
                        container.css("-webkit-transform","translate3d(-66.6666%,0,0)");
                });
                         
                
				
			})();
         
            function validateComp(val,elem) {
         
                var isValid = true,
                    resultElem = $(".comprobantes ul li");
                if (isValid) {
                    resultElem.html(val);
                    elem.css("-webkit-transform","translate3d(-33.3333%,0,0)");
                    setTimeout(function(){
                               alert("Comprobante ingresado correctamente");
                    },1000);
                }
         
            }
         
            function moveScreen(val){
                container.css("-webkit-transform","translate3d('" +val+ "'%,0,0)");
            }
         
			
		})(jQuery, document);
});

