$(function(){

    (function($,dom){
    
        document.addEventListener("touchstart",function(){},false);
            var mainHeight =$(dom).height()
                app = $(".app"),
                container = $(".containerIndex"),
                redimir = $(".Redimir"),
                backButton = $(".back"),
                scanButton = $(".scan");
                maskElem = $(".mask"),
                goToMenu = $(".menu-button"),
                goToIndex = $(".Cerrar"),
                backMen = $(".backMenu"),
                gotoUser = $(".menu-list .first"),
                goToSupport = $(".menu-list .last"),
                backMenuSec = $(".backSupport"),
                html = $("html"),
                loading= $(".loading"),
                blocker = $(".blocker");

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
               
                redimir.on("touchstart",function(){

                    if(maskElem.val()==""){
                        show("Ingresé un código!","Error");
                    } else {
                       validateComp(maskElem.val());
                    }
                   });
                backButton.on("touchstart",function(){
                        container.css("-webkit-transform","translate3d(0,0,0)");
                });
                goToMenu.on("touchstart",function(){
                        container.css("-webkit-transform","translate3d(-33.3333%,0,0)");
                        html.removeClass().addClass("menu-opened");
                });
                backMen.on("touchstart",function(){
                        container.css("-webkit-transform","translate3d(-33.3333%,0,0)");
                });
                backMenuSec.on("touchstart",function(){
                        container.css("-webkit-transform","translate3d(-33.3333%,0,0)");
                });
                gotoUser.on("touchstart",function(){
                        var data = JSON.parse(window.localStorage.getItem("LoginData"));
                        $(".user").text(data.user);
                        $(".user-window").show();
                        container.css("-webkit-transform","translate3d(-66.6666%,0,0)");
                        html.removeClass().addClass("user-opened");

                });
                goToSupport.on("touchstart",function(){
                        $(".user-window").hide();
                        container.css("-webkit-transform","translate3d(-66.6666%,0,0)");
                        html.removeClass().addClass("support-opened");

                });
                scanButton.on("touchstart",function(){
                        cordova.plugins.barcodeScanner.scan(
                          function (result) {
                            var maskE ='ZZ-ZZZZZ-ZZZ-ZZ';
                            var text = result.text.split('.');
                            var string ='';
                            for(var x = 0;x<text.length;x++){
                                string+= text[x];
                            }

                            if(string.length <= 11){
                                maskE = 'Z-ZZZZZ-ZZZ-ZZ';
                            } else if(string.length ==12){
                                maskE = 'ZZ-ZZZZZ-ZZZ-ZZ';
                            } else {
                                maskE = 'ZZZ-ZZZZZ-ZZZ-ZZ'
                            }
                            $('.mask').mask(maskE,{placeholder:"XX-XXXXX-XXX-XX",translation:{'Z':{pattern:/^[a-zA-Z0-9]+$/,optional:false}}});
                            $('.mask').val(string);
                            $('.mask').mask(maskE,{placeholder:"XX-XXXXX-XXX-XX",translation:{'Z':{pattern:/^[a-zA-Z0-9]+$/,optional:false}}});
                            
                             /* alert("We got a barcode\n" +
                                    "Result: " + result.text + "\n" +
                                    "Format: " + result.format + "\n" +
                                    "Cancelled: " + result.cancelled);*/
                          }, 
                          function (error) {
                              show("Hubo un problema al escanear","Error");
                          }
                       );

                });
                goToIndex.on("touchstart",function(e){
                    var els = $(e.target.parentElement).find("loading"),
                        els2 = $(e.target.parentElement).find("blocker");

                        els.show();
                        els2.show();
                    setTimeout(function(){
                        els.hide();
                        els2.hide();
                        window.location.href="index.html";
                    },1500);
                    loading.show();blocker.show();
                        console.debug(e.target.parentElement);
                        //
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
            function getAjaxResponse(e){
                var data = JSON.parse(window.localStorage.getItem("LoginData"));
                var e = JSON.parse(JSON.stringify(e));
                if(e[0] == undefined ){
                    if(e.code == 5){
                        show("El código es inválido","Error");
                    }
                } else {
                    if(e[0].status === "new"){
                        makeAjax("method=redeem&api_key=f8e0edbe19bda77100b82011b9507f0c&user="+data.user+"&pass="+data.pass+"&coupon="+maskElem.val(),handleRedeemResponse);
                    }else {
                        show("Este cupón ya ha sido redimido","Error");
                    }
                }
            }

            function handleRedeemResponse(e){
                console.debug(e);
                if(e.code == 4){
                    show("Los parametros son invalidos","Error");
                }else{
                    show("Comprobante Ingresado Correctamente","Enhorabuena");
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
                    timeout:10000,
                    beforeSend:function(){loading.show();blocker.show();},
                    complete:function(){loading.hide();blocker.hide();},
                    success: function(e) { if(callbackF){callbackF(e);} },
                    error: function(jqXHR, textStatus, errorThrown ) { loading.hide();blocker.hide();show("Revisa la conexión a Internet","Error"); }
                });
            }
         
            function moveScreen(val){
                container.css("-webkit-transform","translate3d('" +val+ "'%,0,0)");
            }

            function show(msg,title){
                //alert(msg);
                navigator.notification.alert(
                      msg,  // message
                      null,         // callback
                      title,            // title
                      'Aceptar'                  // buttonName
                );
            }
         
            
        })(jQuery, document);
});

