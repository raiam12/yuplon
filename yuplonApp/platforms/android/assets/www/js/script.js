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
        redimir = $(".Redimir"),
        user = $(".User"),
        pass = $(".Password"),
        loading = $(".loading"),
        blocker = $(".blocker");

      var data = null;

      if(window.localStorage.getItem("LoginData") !== null){
        data = JSON.parse(window.localStorage.getItem("LoginData"));
        user.val(data.user);
        pass.val(data.pass);
      }

      /**
       * Bind DOM events
       */   

      bindEvents = (function(){
        var self = this;
        /**
         * Event listener for internet connection
         */
        document.addEventListener("backbutton",function(){navigator.app.exitApp();},false);
        app.css({'height':mainHeight});
        redimir.on("touchstart",function(){
          if(user.val() === "" || pass.val() === ""){
            navigator.notification.alert(
              'Debes de ingresar todos los datos!',  // message
              null,         // callback
              'Error',            // title
              'Aceptar'                  // buttonName
          );
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
            timeout:7000,
            dataType: 'jsonp',
            jsonpCallback:'callback',
            beforeSend:function(){loading.show();blocker.show();},
            complete:function(){
               loading.hide();
               blocker.hide();
            },
            success: function(e) { self.validateLogin(e)},
            error: function(jqXHR, textStatus, errorThrown ) {
              show("Revisa la conexión a Internet","Error");
                loading.hide();
                blocker.hide();
            }
        });
      }

      /**
       * validate login credentials
       * @param {data} Call back response
       */
      function show(msg, title){
           navigator.notification.alert(
              msg,  // message
              null,         // callback
              title,            // title
              'Aceptar'                  // buttonName
          );
      }
      /**
       * validate login credentials
       * @param {data} Call back response
       */
      validateLogin = function(data){
        var json = JSON.stringify(data[0]);
        var status = JSON.parse(json);
        if(status.id === undefined){
          navigator.notification.alert(
              'Los datos no son correctos',  // message
              null,         // callback
              'Error',            // title
              'Aceptar'                  // buttonName
          );
        } else {
          var obj = {"user":user.val(),"pass":pass.val()};
          window.localStorage.setItem("LoginData",JSON.stringify(obj));
          window.location.href="app.html"
        }
      };
      
    })(jQuery, document);

});