$(
    function(){
		(function($,dom){
            /*
             *Pattern for input mask
             *
             */
            var patron = "/^[a-zA-Z0-9]+$/";


            /*
             *Values to use for getting DOM
             *
             */
			var mainHeight =$(dom).height()
				app = $(".app"),
				container = $(".containerIndex"),
				redimir = $(".Redimir")[0],
                backButton = $(".back")[0],
<<<<<<< HEAD
                maskElem = $(".mask")
                scan = $("#startScan")[0];
				
			bindEvents =(function(){
=======
                maskElem = $(".mask"),
                scan = $(".scan")[0];
			/*
             *Binding event when starting
             *
             */
			bindEvents = (function(){
>>>>>>> 17a99c0e94b18d5cecb36fdc7a644b019178643d
				app.css({'height':mainHeight});
				maskElem.mask('ZZ-ZZZZZ-ZZZ-ZZ',{placeholder:"XX-XXXXX-XXX-XX",translation:{'Z':{pattern:patron,optional:false}}});
				var red = Hammer(redimir,{swipe_max_touches:5}),
<<<<<<< HEAD
                    back = Hammer(backButton,{swipe_max_touches:5}),
                 	sc 	= Hammer(scan,{swipe_max_touches:5});
=======
                    back = Hammer(backButton,{swipe_max_touches:5});
                    readCode = Hammer(scan,{swipe_max_touches:5});
>>>>>>> 17a99c0e94b18d5cecb36fdc7a644b019178643d
				red.on("tap",function(){
                       validateComp(maskElem.val(),container);
                });
                back.on("tap",function(){
                        setTimeout(function(){
                            container.css("-webkit-transform","translate3d(0,0,0)");
                        },100);
                });
<<<<<<< HEAD
                
                sc.on('tap',function(){
                	cordova.plugins.barcodeScanner.scan(
						function (result) {
							var s = "Result: " + result.text + "<br/>" +
							"Format: " + result.format + "<br/>" +
							"Cancelled: " + result.cancelled;
							resultDiv.innerHTML = s;
						}, 
						function (error) {
							alert("Scanning failed: " + error);
						}
					);
                });
=======
>>>>>>> 17a99c0e94b18d5cecb36fdc7a644b019178643d
                
                readCode.on("tap",function(){
                        function success(resultArray) {
                            maskElem.val(resultArray[0]);
                            maskElem.mask('ZZ-ZZZZZ-ZZZ-ZZ',{placeholder:"XX-XXXXX-XXX-XX",translation:{'Z':{pattern:patron,optional:false}}});
                            }

                            function failure(error) {
                                alert("Ha ocurrido un error ");
                            }
                        cordova.exec(success, failure, "ScanditSDK", "scan",
                             ["NrV5UBIlEeSLLlKDJsmqqI8sxmSMRtO7uZC72Zv/gsY",
                              {"beep": true,
                              "1DScanning" : true,
                              "2DScanning" : true}]);
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

