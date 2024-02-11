myapp.factory('appFactory', ['$http', '$q', '$rootScope', function ($http, $q, $rootScope) {
    var self = this;   
    self.Urlbase = 'https://www.credicer.mx/api/';
    self.tiempoEspera = 120000;
    self.appFactory = {};

    self.appFactory.peticion = function (url = null, tipo = null, data = null) {
        var tiempo = $q.defer();
        var url = url;

        var peticion = $http({
            method: tipo,
            url: 'https://www.credicer.mx/api/'+url,
            data: data,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            cache: false,
            timeout: tiempo.promise
        });
                
        var contador = setTimeout(function () {
            tiempo.resolve();
        }, self.tiempoEspera);

        var promesa = peticion.then(function (respuesta) {
            return respuesta;
        }, function (error) {
            return error;

        });
        
        promesa.abortar = function () {
            tiempo.resolve();
            clearTimeout(contador);
        };

        promesa.detenerTiempo = function () {
            clearTimeout(contador);
        };

        promesa.finally(function () {
            promesa.abortar = angular.noop;
            clearTimeout(contador);
            peticion = null;
            promesa = null;
            tiempo = null;
        });

      
        return promesa;
    };    
   
    return self.appFactory;
}]);
