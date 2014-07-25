$(function(){
        (function($,dom){
      document.addEventListener("touchstart",function(){},false);
            var mainHeight =$(dom).height()
                        app = $(".app"),
                        container = $(".containerIndex"),
                        redimir = $(".Redimir")[0],
                backButton = $(".back")[0],
                scanButton = $(".scan")[0];
                maskElem = $(".mask"),
                goToMenu = $(".menu-button")[0],
                goToIndex = $(".Cerrar")[0],
                backMen = $(".backMenu")[0],
                gotoUser = $(".menu-list .first")[0],
                goToSupport = $(".menu-list .last")[0];
                
            bindEvents =(function(){
                app.css({'height':mainHeight});
                $('.mask').mask('ZZ-ZZZZZ-ZZZ-ZZ',{placeholder:"XX-XXXXX-XXX-XX",translation:{'Z':{pattern:/^[a-zA-Z0-9]+$/,optional:false}}});
                var red = Hammer(redimir,{swipe_max_touches:5}),
                    back = Hammer(backButton,{swipe_max_touches:5}),
                    goMenu = Hammer(goToMenu,{swipe_max_touches:5}),
                    scan = Hammer(scanButton,{swipe_max_touches:5}),
                    close = Hammer(goToIndex,{swipe_max_touches:5}),
                    men = Hammer(backMen,{swipe_max_touches:5}),
                    user = Hammer(gotoUser,{swipe_max_touches:5}),
                    support = Hammer(goToSupport,{swipe_max_touches:5});

                red.on("tap",function(){
                       //validateComp(maskElem.val(),container);
                });
                back.on("tap",function(){
                        container.css("-webkit-transform","translate3d(0,0,0)");
                });
                goMenu.on("tap",function(){
                        container.css("-webkit-transform","translate3d(-33.3333%,0,0)");
                });
                men.on("tap",function(){
                        container.css("-webkit-transform","translate3d(-33.3333%,0,0)");
                });
                user.on("tap",function(){
                        var data = JSON.parse(window.localStorage.getItem("LoginData"));
                        $(".user").text(data.user);
                        container.css("-webkit-transform","translate3d(-66.6666%,0,0)");
                });
                support.on("tap",function(){
                        container.css("-webkit-transform","translate3d(-99.9999%,0,0)");
                });
                scan.on("tap",function(){
                        cordova.plugins.barcodeScanner.scan(
                          function (result) {
                            $('.mask').val(result.text);
                            $('.mask').mask('ZZ-ZZZZZ-ZZZ-ZZ',{placeholder:"XX-XXXXX-XXX-XX",translation:{'Z':{pattern:/^[a-zA-Z0-9]+$/,optional:false}}});
                            
                             /* alert("We got a barcode\n" +
                                    "Result: " + result.text + "\n" +
                                    "Format: " + result.format + "\n" +
                                    "Cancelled: " + result.cancelled);*/
                          }, 
                          function (error) {
                              alert("Hubo un problema al escanear");
                          }
                       );

                });
                close.on("tap",function(){
                        window.location.href="index.html"
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

