angular.module('myapp').controller('PromotoraController',['$scope', '$http', '$window', '$rootScope', 'appFactory',
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

        $scope.usuario = {
            curp: '',
            contrasena:''           
        }; 
        
        
        $scope.objModelo = {
            id_organizacion: '',
            id_empleado_direction: '',
            id_tercero: '',
            id_fsbpartner: '',
            name: '',
            firstName:'',
            secondName: '',
            phone: '',
            rfc: '',
            bloodType: '',
            nameEmergency: '',
            tELEmergency: '',

            region$_identifier: '',
            town$_identifier: '',
            postal: '',
            colony: '',
            street: '',
            externalNumber: '',
            internalNumber: '',
        }; 

        $scope.status = false;
        $scope.dataUpdate = false;
        $scope.tempT = '';
        $scope.tempQ = '';	

        $scope.empleado = [];
        $scope.empleado_direction = [];
        $scope.tercero = [];
        $scope.fsbpartner = [];

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
            $('#inputView').hide();
            if($scope.objModelo.conocenegocio == 'Si'){
                $('#inputView').show();
            }
        }       

        $scope.envioCorreo = function () {
            $scope.status = true;   
            $scope.objModelo.colonia = ($scope.objModelo.colonia) ? $scope.objModelo.colonia : $scope.valueColoniaTemp;        

            if(!$scope.objModelo.colonia){                
                $rootScope.mensajeDanger('Debes seleccionar la colonia');             
                return false;               
            }

            if($scope.objModelo.calle == '' || $scope.objModelo.calle == null || $scope.objModelo.calle == undefined){            
                $rootScope.mensajeDanger('Debes ingresar la calle');               
                return false;               
            }

            if($scope.objModelo.numero == '' || $scope.objModelo.numero == null || $scope.objModelo.numero == undefined){            
                $rootScope.mensajeDanger('Debes ingresar el numero');               
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
            if($scope.objModelo.entero == '' || $scope.objModelo.entero == null || $scope.objModelo.entero == undefined){                        
                $rootScope.mensajeDanger('Debes seleccionar como se enteró de CREDICER');
                return false;               
            }
            if($scope.objModelo.conocenegocio == '' || $scope.objModelo.conocenegocio == null || $scope.objModelo.conocenegocio == undefined){                        
                $rootScope.mensajeDanger('Debes seleccionar si conoce el modelo de negocio');
                return false;               
            }else{
                if($scope.objModelo.conocenegocio == 'Si'){
                    if($scope.objModelo.trabaja == '' || $scope.objModelo.trabaja == null || $scope.objModelo.trabaja == undefined){                        
                        $rootScope.mensajeDanger('Debes ingresar con que empresa');
                        return false;               
                    } 
                }
            }
            if($scope.objModelo.empresa == '' || $scope.objModelo.empresa == null || $scope.objModelo.empresa == undefined){                        
                $rootScope.mensajeDanger('Debes seleccionar si actualmente trabaja en alguna empresa');
                return false;               
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
            $scope.valueColoniaTemp = '';

            console.log($scope.objModelo);

            
            (self.servicioObj = appFactory.peticion('correosavepromotora', 'POST', obj)).then(
                function (dataResponse) {
                    if (dataResponse.status == 200) {                       
                        sessionStorage.clear()
                        $rootScope.mensajeSuccess('Gracias por comunicarte por este medio, uno de nuestros asesores se comunicará con uds.');                    
                        window.location.href = '/#/GraciasPorComfiar/UneteNuestroEquipo/';
                                             
                    }else {
                        $rootScope.mensajeDanger('Error al comunicarse con el servidor.');
                    }
                    self.servicioObj.detenerTiempo();                    
                }, function (error) {
                    self.servicioObj.detenerTiempo();                    
                }
            );

            $('#inputView').hide();
            $scope.tempT = '';
            $scope.tempQ = '';
            $scope.objModelo = { 
                estado:'',
                ciudad: '',
                colonia: '',
                nombre: '',
                apellidopaterno: '',
                apellidomaterno: '',
                celular: '',
                email: '',
                entero: '',
                conocenegocio: '',
                empresa: '',
                trabaja: '',            
                acepto: '',
                calle: '',
                numero: ''
            };         
        }     

        $scope.getEmpleado = function () {

            if(!$scope.usuario.curp){               
                $rootScope.mensajeDanger('Debes ingresar tu CURP');                
                return false;
            }

            (self.servicioObj = appFactory.peticion('empleado/getcurp?curp='+$scope.usuario.curp, 'GET')).then(
                function (dataResponse) {
                    if (dataResponse.status == 200) {
                        console.log(dataResponse.data)
                        if(dataResponse.data.tb.response.data.length > 0){                            
                            //console.log(dataResponse.data.tb.response.data[0]); 
                            
                            $scope.empleado = dataResponse.data.tb.response.data[0]; 
                            $scope.empleado_direction = dataResponse.data.tbD.response.data[0]; 
                             
                            console.log('empleado',$scope.empleado);

                            $scope.objModelo.id_organizacion = $scope.empleado.organization;
                            $scope.objModelo.id_empleado = $scope.empleado.id;
                            $scope.objModelo.id_empleado_direction = $scope.empleado_direction.id;
                            $scope.objModelo.name = $scope.empleado.name;
                            $scope.objModelo.firstName = $scope.empleado.firstName;
                            $scope.objModelo.secondName = $scope.empleado.secondName;
                            
                            $scope.objModelo.rfc = $scope.empleado.rfc;
                            $scope.objModelo.bloodType = $scope.empleado.bloodType;
                            $scope.objModelo.nameEmergency = $scope.empleado.nameEmergency;
                            $scope.objModelo.tELEmergency = $scope.empleado.tELEmergency;

           
                            (self.servicioObj = appFactory.peticion('empleado/tercero/getcurp?curp='+$scope.usuario.curp, 'GET')).then(
                                function (dataResponse2) {
                                    if (dataResponse2.status == 200) {
                                        //console.log(dataResponse2.data)
                                        if(dataResponse2.data.tb.response.data.length > 0){
                                            //console.log(dataResponse2.data.tb.response.data[0]);                                              
                                            $scope.tercero = dataResponse2.data.tb.response.data[0];
                                            console.log('tercero',$scope.tercero);

                                            $scope.objModelo.id_tercero = $scope.tercero.id;

                                            (self.servicioObj = appFactory.peticion('empleado/fsbpartner/getcurp?curp='+$scope.usuario.curp, 'GET')).then(
                                                function (dataResponse3) {
                                                    if (dataResponse3.status == 200) {
                                                        console.log(dataResponse3.data)
                                                        if(dataResponse3.data.tb.response.data.length > 0){                                                            
                                                            $scope.fsbpartner = dataResponse3.data.tb.response.data[0];
                                                            console.log('fsbpartner',$scope.fsbpartner);

                                                            $scope.objModelo.id_fsbpartner = $scope.fsbpartner.id;
                                                            $scope.objModelo.phone = parseInt($scope.fsbpartner.phone);
                                                            $scope.objModelo.region$_identifier = $scope.fsbpartner.region$_identifier;
                                                            $scope.objModelo.town$_identifier = $scope.fsbpartner.town$_identifier;
                                                            $scope.objModelo.postal = parseInt($scope.fsbpartner.postalCode);
                                                            $scope.objModelo.colony = $scope.fsbpartner.colony;
                                                            $scope.objModelo.street = $scope.fsbpartner.street;
                                                            $scope.objModelo.externalNumber = parseInt($scope.fsbpartner.externalNumber);
                                                            $scope.objModelo.internalNumber = (($scope.fsbpartner.internalNumber == null) ? '' : $scope.fsbpartner.internalNumber);

                                                            console.log('Object total: ',$scope.objModelo);
                                                                                        
                                                            if(dataResponse3.data.tb.response.data[0].phone != '' && dataResponse3.data.tb.response.data[0].phone != null){                                                                
                                                                $rootScope.mensajeSuccess('Se envia mensaje por sms.');

                                                                let t = Math.random().toString(36).substring(8);

                                                                let ojbT = {
                                                                    curp: $scope.usuario.curp,
                                                                    cel: dataResponse3.data.tb.response.data[0].phone,
                                                                    folio: t
                                                                }
                                                                var obj = $.param(ojbT);
                                                                (self.servicioObj = appFactory.peticion('celbycurp', 'POST', obj)).then(
                                                                    function (dataResponse4) {
                                                                        if (dataResponse4.status == 200) { 
                                                                            
                                                                            let msj = 'CREDICER - Tu folio generado para la actualización de tus datos es '+t;
                                                                            /* ************************************************************************************* */
                                                                            (self.servicioObj = appFactory.peticion('appcridiapp/msj?tel='+ojbT.cel+'&&msj='+msj, 'GET')).then(
                                                                                function (dataResponse) {
                                                                                    if (dataResponse.status == 200) {                        
                                                                                                                                                                    
                                                                                        console.log(dataResponse.data);

                                                                                    } else {
                                                                                        $rootScope.mensajeDanger('No se ha podido enviar al celular guardado');
                                                                                    }
                                                                                    self.servicioObj.detenerTiempo();                    
                                                                                }, function (error) {
                                                                                self.servicioObj.detenerTiempo();                    
                                                                            })
                                                                            /* ************************************************************************************* */
                                                                            $("#div3").fadeIn(500);
                                                                            $("#btn1").hide();
                                                                            $("#btn2").show();
                                                                            $scope.sec = 0;
                                                                            $scope.counter = 90;
                                                                            function pad (val) { return val > 9 ? val : "0" + val; } 

                                                                            $scope.setTimmer = setInterval(() => {
                                                                                //console.log($scope.counter);            
                                                                                $scope.counter--;
                                                                                
                                                                                document.getElementById("seconds").innerHTML=pad(++$scope.sec%60); 
                                                                    
                                                                                document.getElementById("minutes").innerHTML=pad(parseInt($scope.sec/60,10));
                                                                                if($scope.counter < 0 ){    
                                                                                    if(!$scope.dataUpdate){
                                                                                        clearInterval($scope.setTimmer);
                                                                                        $("#div3").fadeOut();
                                                                                        
                                                                                        $("#btn1").show();
                                                                                        $("#btn2").hide();
                                                                                        $scope.usuario.contrasena= '';
                                                                                    }                                                                                               
                                                                                };
                                                                            }, 1000);
                                                    
                                                                            $rootScope.mensajeSuccess('Se generado tu folio el cual sera enviado a tu celuar');
                                                                                                
                                                                        }else {
                                                                            $rootScope.mensajeDanger('Error al comunicarse con el servidor.');
                                                                        }
                                                                        self.servicioObj.detenerTiempo();                    
                                                                    }, function (error) {
                                                                        self.servicioObj.detenerTiempo();                    
                                                                    }
                                                                );
                                                            }else{
                                                                $rootScope.mensajeDanger('No se ha encontrado un celular relacionado con la clienta, contacte a su promotoras para capturar el celular o comuniquese con nuestros operadores.');
                                                            }

                                                         
                                                        }else{
                                                            $rootScope.mensajeDanger('No se han encontrado clientes con este CURP.');
                                                        }
                                                        } else {
                                                        $scope.getData = [];
                                                    }
                                                    self.servicioObj.detenerTiempo();                    
                                                }, function (error) {
                                                self.servicioObj.detenerTiempo();                    
                                            });
                                            
                                        }else{
                                            $rootScope.mensajeDanger('No se han encontrado clientes con este CURP.');
                                        }
                                        } else {
                                        $scope.getData = [];
                                    }
                                    self.servicioObj.detenerTiempo();                    
                                }, function (error) {
                                self.servicioObj.detenerTiempo();                    
                            });
                        }else{
                            $rootScope.mensajeDanger('No se han encontrado clientes con este CURP.');
                        }
                     } else {
                        $scope.getData = [];
                    }
                    self.servicioObj.detenerTiempo();                    
                }, function (error) {
                self.servicioObj.detenerTiempo();                    
            });

            //$rootScope.mensajeDanger('Usuario incorrecto !!! verifica tu contraseña.');                
            //return false;                          
        }

        $scope.getDatosEmpleados = function () {

            if(!$scope.usuario.contrasena){                
                $rootScope.mensajeDanger('Debes Ingresar tu folio antes');                
                return false;               
            }

            (self.servicioObj = appFactory.peticion('estadocuenta/valid?curp='+$scope.usuario.curp+'&&folio='+$scope.usuario.contrasena, 'GET')).then(
                function (dataResponse) {
                    if (dataResponse.status == 200) {
                        console.log(dataResponse.data);

                        $("#div3").fadeOut("slow");
                        $("#div4").fadeIn(500);                        
                        $("#btn2").hide();
                        $("#btn3").show();
                        $scope.dataUpdate = true;

                        $("#curp").prop('disabled', true);
                        $("#rfc").prop('disabled', true);

                        $("#estado").prop('disabled', true);
                        $("#municipio").prop('disabled', true);
                        
                    } else {
                        $rootScope.mensajeDanger('No coicide el folio capturado, verifica tus datos.');
                    }
                    self.servicioObj.detenerTiempo();                    
                }, function (error) {
                self.servicioObj.detenerTiempo();                    
            });

        }

        $scope.saveData = function () {
            if($scope.objModelo.name == '' || $scope.objModelo.name == null || $scope.objModelo.name == undefined){
                $rootScope.mensajeDanger('Debes capturar antes el nombre');
                return false;
            }if($scope.objModelo.firstName == '' || $scope.objModelo.firstName == null || $scope.objModelo.firstName == undefined){
                $rootScope.mensajeDanger('Debes capturar antes el apellido paterno');
                return false;
            }/*if($scope.objModelo.secondName == '' || $scope.objModelo.secondName == null || $scope.objModelo.secondName == undefined){
                $rootScope.mensajeWarning('Debes capturar antes el apellido materno');
                return false;
            }*/
            if($scope.objModelo.phone == '' || $scope.objModelo.phone == null || $scope.objModelo.phone == undefined){
                $rootScope.mensajeDanger('Debes capturar antes el celular');
                return false;
            }if($scope.objModelo.bloodType == '' || $scope.objModelo.bloodType == null || $scope.objModelo.bloodType == undefined){
                $rootScope.mensajeDanger('Debes seleccionar antes el tipo de sangre');
                return false;
            }if($scope.objModelo.nameEmergency == '' || $scope.objModelo.nameEmergency == null || $scope.objModelo.nameEmergency == undefined){
                $rootScope.mensajeDanger('Debes capturar antes el nombre del contacto de emergencia');
                return false;
            }if($scope.objModelo.tELEmergency == '' || $scope.objModelo.tELEmergency == null || $scope.objModelo.tELEmergency == undefined){
                $rootScope.mensajeDanger('Debes capturar antes el celular del contacto de emergencia');
                return false;
            }if($scope.objModelo.postal == '' || $scope.objModelo.postal == null || $scope.objModelo.postal == undefined){
                $rootScope.mensajeDanger('Debes capturar antes el Codigo postal');
                return false;
            }if($scope.objModelo.colony == '' || $scope.objModelo.colony == null || $scope.objModelo.colony == undefined){
                $rootScope.mensajeDanger('Debes capturar antes la colonia');
                return false;
            }if($scope.objModelo.street == '' || $scope.objModelo.street == null || $scope.objModelo.street == undefined){
                $rootScope.mensajeDanger('Debes capturar antes la calle');
                return false;
            }if($scope.objModelo.externalNumber == '' || $scope.objModelo.externalNumber == null || $scope.objModelo.externalNumber == undefined){
                $rootScope.mensajeDanger('Debes capturar antes el numero exterior');
                return false;
            }

            if($scope.objModelo.bloodType == 'A-'){
                $scope.objModelo.bloodType = '1';
            }if($scope.objModelo.bloodType == 'A+'){
                $scope.objModelo.bloodType = '2';
            }if($scope.objModelo.bloodType == 'AB+'){
                $scope.objModelo.bloodType = '3';
            }if($scope.objModelo.bloodType == 'B-'){
                $scope.objModelo.bloodType = '4';
            }if($scope.objModelo.bloodType == 'B+'){
                $scope.objModelo.bloodType = '5';
            }if($scope.objModelo.bloodType == 'O+'){
                $scope.objModelo.bloodType = '6';
            }if($scope.objModelo.bloodType == 'O-'){
                $scope.objModelo.bloodType = '7';
            }if($scope.objModelo.bloodType == 'NR'){
                $scope.objModelo.bloodType = '8';
            }

            $scope.objModelo.phone = $scope.objModelo.phone.toString();
            $scope.objModelo.postal = $scope.objModelo.postal.toString();
            $scope.objModelo.externalNumber = $scope.objModelo.externalNumber.toString();
            //console.log($scope.objModelo);
            
            (self.servicioObj = appFactory.peticion('empleado/update?id='+$scope.objModelo.id_empleado+'&org='+$scope.objModelo.id_organizacion+'&id_fsbpartner='+$scope.objModelo.id_fsbpartner+'&id_empleado_direction='+$scope.objModelo.id_empleado_direction+'&nombre='+$scope.objModelo.name+'&ap1='+$scope.objModelo.firstName+'&ap2='+$scope.objModelo.secondName+'&cel='+$scope.objModelo.phone+'&sangre='+$scope.objModelo.bloodType+'&nameEmergency='+$scope.objModelo.nameEmergency+'&tELEmergency='+$scope.objModelo.tELEmergency+'&colony='+$scope.objModelo.colony+'&street='+$scope.objModelo.street+'&externalNumber='+$scope.objModelo.externalNumber+'&internalNumber='+$scope.objModelo.internalNumber+'&postal='+$scope.objModelo.postal, 'GET')).then(
                function (dataResponse3) {
                    if (dataResponse3.status == 200) {
                        
                        $scope.usuario = {
                            curp: '',
                            contrasena:''           
                        }; 
                        
                        $scope.objModelo = {
                            id_organizacion: '',
                            id_empleado_direction: '',
                            id_tercero: '',
                            id_fsbpartner: '',
                            name: '',
                            firstName:'',
                            secondName: '',
                            phone: '',
                            rfc: '',
                            bloodType: '',
                            nameEmergency: '',
                            tELEmergency: '',

                            region$_identifier: '',
                            town$_identifier: '',
                            postal: '',
                            colony: '',
                            street: '',
                            externalNumber: '',
                            internalNumber: '',
                        }; 

                        $rootScope.mensajeSuccess('Datos actualizados correctamente.');
                        $("#div3").fadeOut();
                        $("#div4").fadeOut();

                        $("#btn2").hide();
                        $("#btn3").hide();
                        $("#btn1").show();

                        $("#curp").prop('disabled', false);
                        $("#rfc").prop('disabled', false);

                        $("#estado").prop('disabled', false);
                        $("#municipio").prop('disabled', false);

                    } else {
                        $scope.getData = [];
                    }
                    self.servicioObj.detenerTiempo();                    
                }, function (error) {
                self.servicioObj.detenerTiempo();                    
            });
        }
        
    }
]);