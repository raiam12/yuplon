$(function(){
		(function($,dom){
			var mainHeight =$(dom).height()
				app = $(".app"),
				container = $(".containerIndex"),
				redimir = $(".Redimir")[0],
                backButton = $(".back")[0],
                maskElem = $(".mask");
				
			bindEvents =(function(){
				app.css({'height':mainHeight});
				$('.mask').mask('ZZ-ZZZZZ-ZZZ-ZZ',{placeholder:"XX-XXXXX-XXX-XX",translation:{'Z':{pattern:/^[a-zA-Z0-9]+$/,optional:false}}});
				var red = Hammer(redimir,{swipe_max_touches:5}),
                         back = Hammer(backButton,{swipe_max_touches:5});
				red.on("tap",function(){
                       validateComp(maskElem.val(),container);
                });
                back.on("tap",function(){
                        setTimeout(function(){
                            container.css("-webkit-transform","translate3d(0,0,0)");
                        },100);
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
         
			
		})(jQuery, document);
});

