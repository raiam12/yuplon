/**
 * Main function for index.html
 */
$(
  function(){
    /**
     * Adds two numbers
     * @param {JQuery} $ 
     * @param {Document} dom
     */
    (function($,dom){
      /**
       * Variable for api_key
       */
      var api_key ="f8e0edbe19bda77100b82011b9507f0c";

      /**
       * Variables for accessing DOM
       */
      var mainHeight = $(dom).height()
        app = $(".app"),
        container = $(".containerIndex"),
        redimir = $(".Redimir")[0],
        user = $(".User"),
        pass = $(".Password"),
        loading = $(".loading");

      /**
       * Bind DOM events
       */   

      bindEvents = (function(){
        var self = this;
        var hammertime = Hammer(redimir,{swipe_max_touches:5});

        /**
         * Event listener for internet connection
         */
        //document.addEventListener("offline", function(){alert("sin conexion");}, false);
        //document.addEventListener("online", function(){alert("con conexion");}, false);
        document.addEventListener("backbutton",function(){navigator.app.exitApp();},false);
        app.css({'height':mainHeight});
        hammertime.on("tap",function(){
          if(user.val() === "" || pass.val() === ""){
            /*navigator.notification.alert(
                    'Ingrese todos los datos',  // message
                    'Error',            // title
                    'Aceptar'                  // buttonName
                );*/
            alert("Debes ingresar todos los datos!");
          } else {
            self.makeAjaxCall();
          }         
        });
      })();


      /**
       * Ajax call for getting login credentials
       */
      makeAjaxCall = function(){
        var self = this;
        $.ajax({
            url: 'http://www.gn-digital.info/wcfyuplon/',
            type: 'GET',
            data:'method=login&api_key='+api_key+'&user='+user.val()+'&pass='+pass.val(),
            crossDomain: true,
            dataType: 'jsonp',
            jsonpCallback:'callback',
            beforeSend:function(){loading.show();},
            complete:function(){loading.hide();},
            success: function(e) { self.validateLogin(e)},
            error: function(jqXHR, textStatus, errorThrown ) { console.debug(jqXHR);console.debug(errorThrown); }
        });
      }

      /**
       * validate login credentials
       * @param {data} Call back response
       */
      validateLogin = function(data){
        var json = JSON.stringify(data[0]);
        var status = JSON.parse(json);
        if(status.id === undefined){
          /*navigator.notification.alert(
                  'Los datos no son correctos!',  // message
                  'Error',            // title
                  'Aceptar'                  // buttonName
              );*/
        navigator.notification.alert(
            'Los datos no son correctos',  // message
            null,         // callback
            'Error',            // title
            'Aceptar'                  // buttonName
        );
        } else {
          window.location.href="app.html"
        }
      };
      
    })(jQuery, document);

});