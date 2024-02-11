var myapp = angular.module('myapp', ['ui.router', 'angular-loading-bar', 'oc.lazyLoad'])
myapp.config(function($stateProvider, $urlRouterProvider){      

    $urlRouterProvider.otherwise("/");
    $stateProvider
    .state('Home', {
        url: "/",
        views: {
            "viewA": {
                templateUrl: "app/home/home.html"
            }
        },
        resolve: {
        loadPlugin: function ($ocLazyLoad) {
                return $ocLazyLoad.load([{
                        name: 'controlador',
                        files: ['app/home/homeController.js']
                    }])
            }
        },

    });
});


myapp.run(function ($rootScope, $window) {   
   
    /* funcion para encriptar */
    $rootScope.validacionPeticio = function () {
        var KEY = '4D4M1ND10240441';
        var cadena = hex_md5(KEY);                
        var cadenaTemp = cadena.toUpperCase();
        var getPassword = "";
        for (var i = 0; i < cadenaTemp.length; i++) {
            var caracter = cadenaTemp.charAt(i);            
            if ((i + 1) % 2 == 0) {
                if (i == 31) {
                    getPassword += caracter;
                } else {
                    getPassword += caracter + "-";
                }
            }
            else {
                getPassword += caracter;
            }
        }        
        var str = getPassword.split('').reverse().join('');        
        return str;
    };
    /* Funcion para validar campos */
    $rootScope.inputValidateDanger = function (id, text) {
        $("#" + id + "Label").addClass("labelIvalidate");
        $("#" + id).addClass("inputGeneralIvalid");
        $("#" + id).addClass("comboGeneralIvalid");
        $("#" + id + "messageIvalid").text(text);
        $("#" + id + "messageIvalid").show();
    };
    /* Funcion para validar campos */
    $rootScope.inputValidateSuccess = function (id) {
        $("#" + id + "Label").removeClass("labelIvalidate");
        $("#" + id).removeClass("inputGeneralIvalid");
        $("#" + id).removeClass("comboGeneralIvalid");
        $("#" + id + "messageIvalid").text('');
        $("#" + id + "messageIvalid").hide();
    };
    /* funcion para visualizar los mensajes generales (Success) */
    $rootScope.mensajeSuccess = function (text) {
        // console.debug("entra funcion");
        $("#success-alert").alert();
        $("#text-messageSucess").text(text);
        $("#success-alert").fadeIn();
        setTimeout(function () {
            $("#success-alert").fadeOut();
        }, 3400);
    };
    /* funcion para visualizar los mensajes generales (Error) */
    $rootScope.mensajeDanger = function (text) {
        // console.debug("entra funcion");
        $("#danger-alert").alert();
        $("#text-messageDanger").text(text);
        $("#danger-alert").fadeIn();
        setTimeout(function () {
            $("#danger-alert").fadeOut();
        }, 3400);
    };
    /* funcion para visualizar los mensajes generales (Error) */
    $rootScope.closeMessage = function () {
        $("#danger-alert").fadeOut();
        $("#success-alert").fadeOut();
    };
    /* Limpiar Select */
    $rootScope.cleanSelect = function (event) {
        var component = $(event.target).parents('div');
        $('#'+component[0].id).dropdown('clear');
    };
    //Item active
    $rootScope.activeItem = function (event) {
        var component = $(event.target).parents('li');        
        component.closest('ul').find('.active').removeClass('active');    
        $(component).addClass("active");
    }    
});