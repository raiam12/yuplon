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
                goToSupport = $(".menu-list .last")[0],
                backMenuSec = $(".backSupport")[0],
                html = $("html");

            backAndroid = function(){
                if(html.hasClass("menu-opened")){
                    container.css("-webkit-transform","translate3d(0,0,0)");
                    html.removeClass();
                }else if(html.hasClass("support-opened") || html.hasClass("user-opened")){
                    container.css("-webkit-transform","translate3d(-33.3333%,0,0)");
                    html.removeClass().addClass("menu-opened");
                } 
            };
            document.addEventListener("backbutton",backAndroid,false);

            bindEvents =(function(){
                app.css({'height':mainHeight});
                $('.mask').mask('ZZ-ZZZZZ-ZZZ-ZZ',{placeholder:"XX-XXXXX-XXX-XX",translation:{'Z':{pattern:/^[a-zA-Z0-9]+$/,optional:false}}});
                var red = Hammer(redimir,{swipe_max_touches:5}),
                    back = Hammer(backButton,{swipe_max_touches:5}),
                    goMenu = Hammer(goToMenu,{swipe_max_touches:5}),
                    scan = Hammer(scanButton,{swipe_max_touches:5}),
                    close = Hammer(goToIndex,{swipe_max_touches:5}),
                    men = Hammer(backMen,{swipe_max_touches:5}),
                    menSec = Hammer(backMenuSec,{swipe_max_touches:5}),
                    user = Hammer(gotoUser,{swipe_max_touches:5}),
                    support = Hammer(goToSupport,{swipe_max_touches:5});

                red.on("tap",function(){
                       validateComp(maskElem.val());
                });
                back.on("tap",function(){
                        container.css("-webkit-transform","translate3d(0,0,0)");
                });
                goMenu.on("tap",function(){
                        container.css("-webkit-transform","translate3d(-33.3333%,0,0)");
                        html.removeClass().addClass("menu-opened");
                });
                men.on("tap",function(){
                        container.css("-webkit-transform","translate3d(-33.3333%,0,0)");
                });
                menSec.on("tap",function(){
                        container.css("-webkit-transform","translate3d(-33.3333%,0,0)");
                });
                user.on("tap",function(){
                        var data = JSON.parse(window.localStorage.getItem("LoginData"));
                        $(".user").text(data.user);
                        $(".user-window").show();
                        container.css("-webkit-transform","translate3d(-66.6666%,0,0)");
                        html.removeClass().addClass("user-opened");

                });
                support.on("tap",function(){
                        $(".user-window").hide();
                        container.css("-webkit-transform","translate3d(-66.6666%,0,0)");
                        html.removeClass().addClass("support-opened");

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
         
            function validateComp(input) {
                var data = JSON.parse(window.localStorage.getItem("LoginData"));
                makeAjax("method=coupons&api_key=f8e0edbe19bda77100b82011b9507f0c&user="+data.user+"&pass="+data.pass+"&params[code]="+input,getAjaxResponse);
            }

            function getAjaxResponse(e){
                var data = JSON.parse(window.localStorage.getItem("LoginData"));
                if(e[0].status === "new"){
                    makeAjax("method=redeem&api_key=f8e0edbe19bda77100b82011b9507f0c&user="+data.user+"&pass="+data.pass+"&coupon="+maskElem.val(),handleRedeemResponse);
                }else {
                    show("Este cupón ya ha sido redimido","Error");
                }
            }

            function handleRedeemResponse(e){
                console.debug(e);
                if(e.code == 4){
                    show("Los parametros son invalidos","Error");
                }else{
                    show("El cupon ha sido redimido","Enhorabuena");
                    maskElem.val("");
                }

            }

            function makeAjax (data, callbackF){
                $.ajax({
                    url: 'http://www.gn-digital.info/wcfyuplon/',
                    type: 'GET',
                    data:data,
                    crossDomain: true,
                    dataType: 'jsonp',
                    jsonpCallback:'callback',
                    success: function(e) { if(callbackF){callbackF(e);} },
                    error: function(jqXHR, textStatus, errorThrown ) { console.debug(jqXHR);console.debug(errorThrown); }
                });
            }
         
            function moveScreen(val){
                container.css("-webkit-transform","translate3d('" +val+ "'%,0,0)");
            }

            function show(msg,title){
                alert(msg);
                navigator.notification.alert(
                      msg,  // message
                      null,         // callback
                      title,            // title
                      'Aceptar'                  // buttonName
                );
            }
         
            
        })(jQuery, document);
});

