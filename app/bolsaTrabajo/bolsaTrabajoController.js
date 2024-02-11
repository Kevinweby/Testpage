angular.module('myapp').controller('bolsaTrabajoController',['$scope', '$http', '$window', '$rootScope', 'appFactory',
    function ($scope, $http, $window, $rootScope, appFactory, DTOptionsBuilder) {
    	var us = localStorage.getItem("us");
        $scope.getData = [];

        $scope.valueEstado = '';
        $scope.valueEstado1 = '';
        $scope.valueEstadoTemp = '';

        $scope.valueCiudad = [];
        $scope.valueCiudadTemp = '';
        $scope.valueCiudadTemp1 = '';   
         
        $scope.valueColonia = [];
        $scope.valueColoniaTemp = '';

        $scope.objModelo = {
            estado:'',
            ciudad: '',
            colonia: '',
            nombre: '',
            apellidopaterno: '',
            apellidomaterno: '',
            celular: '',
            email: '',
            dep: '',
            puesto: '',
        };        

        $scope.status = true;
        $scope.tempT = '';
        $scope.tempQ = '';
        //Peticion Get para obtener los datos iniciales
        $scope.datosIniciales = function () {
                      
            (self.servicioObj = appFactory.peticion('estado', 'GET')).then(
                function (dataResponse) {
                    if (dataResponse.status == 200) {                        
                        $scope.getData = dataResponse.data.estado;    
                                        
                    } else {

                    }
                    self.servicioObj.detenerTiempo();                    
                }, function (error) {
                self.servicioObj.detenerTiempo();                    
            })
        }
        $scope.datosIniciales(); 

        $scope.loadCiudades = function () {

            $scope.valueCiudad = [];
            $scope.valueColonia = [];  
            $('#inputCiudadDetail').val(''); 
            $('#coloniaD').val(''); 
            //$('#selectCI').empty();
            $('#selectCI').val('');
           
         
           if($scope.tempT){
             $scope.valueEstadoTemp = alasql('SELECT * FROM ? where Nombre = "'+$scope.tempT+'" ORDER BY Nombre ASC', [$scope.getData]);  
             $scope.valueEstado = ($scope.valueEstadoTemp[0].Nombre) ? $scope.valueEstadoTemp[0].Nombre : '';

                if($scope.valueEstadoTemp.length > 0){
                    (self.servicioObj = appFactory.peticion('municipio/'+$scope.valueEstadoTemp[0].EstadoId, 'GET')).then(
                        function (dataResponse) {
                            if (dataResponse.status == 200) {                        
                                $scope.valueCiudad = dataResponse.data.municipio;          
                            } else {

                            }
                            self.servicioObj.detenerTiempo();                    
                        }, function (error) {
                        self.servicioObj.detenerTiempo();                    
                    })
                }
           }

           if($scope.valueEstado1){
                $scope.valueEstadoTemp = alasql('SELECT * FROM ? where Nombre = "'+$scope.valueEstado1+'" ORDER BY Nombre ASC', [$scope.getData]);  
                $scope.valueEstado = ($scope.valueEstadoTemp[0].Nombre) ? $scope.valueEstadoTemp[0].Nombre : '';
        
                if($scope.valueEstadoTemp.length > 0){
                    (self.servicioObj = appFactory.peticion('municipio/'+$scope.valueEstadoTemp[0].EstadoId, 'GET')).then(
                        function (dataResponse) {
                            if (dataResponse.status == 200) {                        
                                $scope.valueCiudad = dataResponse.data.municipio;      
                            } else {

                            }
                            self.servicioObj.detenerTiempo();                    
                        }, function (error) {
                        self.servicioObj.detenerTiempo();                    
                    })
                }
           }
        }

        $scope.loadColonia = function () {
            $scope.valueColonia = [];
            $('#coloniaD').val('');

           if($scope.tempQ){
                $scope.valueCiudadSearch = alasql('SELECT * FROM ? where Nombre LIKE "%'+$scope.tempQ+'%" ORDER BY Nombre ASC', [$scope.valueCiudad]);
                $scope.valueCiudadTemp = ($scope.valueCiudadSearch[0].Nombre) ? $scope.valueCiudadSearch[0].Nombre : '';

                if($scope.valueCiudadSearch.length > 0){
                    (self.servicioObj = appFactory.peticion('colonia/'+$scope.valueEstadoTemp[0].EstadoId+'/'+$scope.valueCiudadSearch[0].MunicipioId, 'GET')).then(
                        function (dataResponse) {
                            if (dataResponse.status == 200) {                        
                                $scope.valueColonia = dataResponse.data.colonia;                            
                                $scope.valueColonia = alasql('SELECT * FROM ? ORDER BY Nombre ASC', [$scope.valueColonia]);

                            } else {

                            }
                            self.servicioObj.detenerTiempo();                    
                        }, function (error) {
                        self.servicioObj.detenerTiempo();                    
                    })
                }
           }
        
           if($scope.valueCiudadTemp1){
                $scope.valueCiudadSearch = alasql('SELECT * FROM ? where Nombre = "'+$scope.valueCiudadTemp1+'" ORDER BY Nombre ASC', [$scope.valueCiudad]);
                $scope.valueCiudadTemp = ($scope.valueCiudadSearch[0].Nombre) ? $scope.valueCiudadSearch[0].Nombre : '';

                if($scope.valueCiudadSearch.length > 0){
                    (self.servicioObj = appFactory.peticion('colonia/'+$scope.valueEstadoTemp[0].EstadoId+'/'+$scope.valueCiudadSearch[0].MunicipioId, 'GET')).then(
                        function (dataResponse) {
                            if (dataResponse.status == 200) {                        
                                $scope.valueColonia = dataResponse.data.colonia;                            
                                $scope.valueColonia = alasql('SELECT * FROM ? ORDER BY Nombre ASC', [$scope.valueColonia]);
                                //console.log(dataResponse.data);
                            } else {

                            }
                            self.servicioObj.detenerTiempo();                    
                        }, function (error) {
                        self.servicioObj.detenerTiempo();                    
                    })
                }
           }
        }       

        $scope.viewInput = function () {
            console.log($scope.objModelo.dep);
            //$('#inputView').hide();
            if($scope.objModelo.dep == 'Operativo'){
                $('#divPuesto').show();
            }else{
                $('#divPuesto').hide();
            }
        }       

        $scope.envioCorreo = function () {
            $scope.status = true;   
            $scope.objModelo.colonia = ($scope.objModelo.colonia) ? $scope.objModelo.colonia : $scope.valueColoniaTemp;        

            $scope.objModelo.estado = ($scope.objModelo.colonia) ? $scope.objModelo.colonia : $scope.valueColoniaTemp;        
            $scope.objModelo.ciudad = ($scope.objModelo.colonia) ? $scope.objModelo.colonia : $scope.valueColoniaTemp;        

            if(!$scope.objModelo.colonia){                
                $rootScope.mensajeDanger('Debes seleccionar la colonia');             
                return false;               
            }
            if($scope.objModelo.nombre == '' || $scope.objModelo.nombre == null || $scope.objModelo.nombre == undefined){            
                $rootScope.mensajeDanger('Debes ingresar el nombre');               
                return false;               
            }
            if($scope.objModelo.apellidopaterno == '' || $scope.objModelo.apellidopaterno == null || $scope.objModelo.apellidopaterno == undefined){            
                $rootScope.mensajeDanger('Debes ingresar el apellido paterno');
                return false;               
            }
            if($scope.objModelo.apellidomaterno == '' || $scope.objModelo.apellidomaterno == null || $scope.objModelo.apellidomaterno == undefined){            
                $rootScope.mensajeDanger('Debes ingresar el apellido materno');
                return false;               
            }
            if($scope.objModelo.celular == '' || $scope.objModelo.celular == null || $scope.objModelo.celular == undefined){            
                $rootScope.mensajeDanger('Debes ingresar un teléfono celular');
                return false;               
            }
            /*
            if($scope.objModelo.fecha == '' || $scope.objModelo.fecha == null || $scope.objModelo.fecha == undefined){            
                $rootScope.mensajeDanger('Debes ingresar la fecha de nacimiento');
                return false;               
            }*/
            
            /*if($scope.objModelo.email == '' || $scope.objModelo.email == null || $scope.objModelo.email == undefined){            
                $rootScope.mensajeDanger('Debes ingresar un correo electrónico');
                return false;               
            }*/
            if($scope.objModelo.dep == '' || $scope.objModelo.dep == null || $scope.objModelo.dep == undefined){                        
                $rootScope.mensajeDanger('Debes seleccionar el departamento');
                return false;               
            }else{
                if($scope.objModelo.dep == 'Operativo'){
                    if($scope.objModelo.puesto == '' || $scope.objModelo.puesto == null || $scope.objModelo.puesto == undefined){                        
                        $rootScope.mensajeDanger('Debes ingresar con que empresa');
                        return false;               
                    } 
                }
            }
            
            if(!$scope.objModelo.acepto){                                
                $rootScope.mensajeDanger('Debes aceptar terminos y condiciones');            
                return false;
            }

            $scope.objModelo.estado = $scope.valueEstado;
            $scope.objModelo.ciudad = $scope.valueCiudadTemp;
           
            
            var obj = $.param($scope.objModelo);

            $scope.valueEstado = '';
            $scope.valueCiudadTemp = '';
            $scope.valueEstado1 = '';
            $scope.valueCiudadTemp1 = '';
            $scope.tempT = '';
            $scope.tempQ = '';

            $('#estadoDetail').val('');
            $('#ciudadDetail').val('');

            $scope.valueColoniaTemp = '';
            console.log($scope.objModelo);
            
            (self.servicioObj = appFactory.peticion('bolsatrabajo', 'POST', obj)).then(
                function (dataResponse) {
                    if (dataResponse.status == 200) {   

                        $rootScope.mensajeSuccess('Gracias por comunicarte por este medio, se ha registrado su solicitud.');

                        setTimeout(function(){ 
                            window.location.href = '/';
                            $(window).scrollTop(0);
                        }, 2500);
                        
                                             
                    }else {
                        $rootScope.mensajeDanger('Error al comunicarse con el servidor.');
                    }
                    self.servicioObj.detenerTiempo();                    
                }, function (error) {
                    self.servicioObj.detenerTiempo();                    
                }
            );

            $('#divPuesto').hide();
            $scope.objModelo = { 
                estado:'',
                ciudad: '',
                colonia: '',
                nombre: '',
                apellidopaterno: '',
                apellidomaterno: '',
                celular: '',
                email: '',
                dep: '',
                puesto: '',
            };      
        }     
        
    }
]);