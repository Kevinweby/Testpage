angular.module('myapp').controller('estadocuentaController',['$scope', '$http', '$window', '$rootScope', 'appFactory',
    function ($scope, $http, $window, $rootScope, appFactory, DTOptionsBuilder) {
    	var us = localStorage.getItem("us");
        $scope.getData = [];
        $scope.fecha = new Date().toLocaleString("en-US", {timeZone: "America/Mexico_City"});
        $scope.fechaT = $scope.fecha.split(",")
        $scope.fechaLm = $scope.fechaT[0].split("/")
        
        var clT = localStorage.getItem("dataCl");
        $scope.cl = JSON.parse(clT);
        var crT = localStorage.getItem("data");
        $scope.cr = JSON.parse(crT);

        $scope.lastCredito;        
        $scope.lastCreditoNext;
        $scope.lastCreditoALLBack;
        $scope.lastCreditoALL;

        //Peticion Get para obtener los datos iniciales
        $scope.datosIniciales = function () {
            let mes = ((parseInt($scope.fechaLm[0]) > 9) ? parseInt($scope.fechaLm[0]) : '0'+parseInt($scope.fechaLm[0]))
            let dia = ((parseInt($scope.fechaLm[1]) > 9) ? parseInt($scope.fechaLm[1]) : '0'+parseInt($scope.fechaLm[1]))
            
            $scope.lastCredito = alasql('SELECT * FROM ? where collectiondate<"'+$scope.fechaLm[2]+'-'+mes+'-'+dia+'" order by collectiondate DESC', [$scope.cr]);
            
            $scope.lastCreditoNext = alasql('SELECT * FROM ? where collectiondate>"'+$scope.fechaLm[2]+'-'+mes+'-'+dia+'" order by collectiondate ASC', [$scope.cr]);

            $scope.lastCreditoALL = alasql('SELECT * FROM ? order by collectiondate DESC', [$scope.cr]);

            $scope.lastCreditoALLBack = alasql('SELECT * FROM ? order by collectiondate DESC', [$scope.cr]);

            $scope.lastCreditoALL = alasql('SELECT * FROM ? order by collectiondate ASC', [$scope.cr]);

            let data = $scope.cr;
            $scope.cr = [];
            $scope.cr = alasql('SELECT * FROM ? order by collectiondate ASC', [data]);

            let cnt = 0;
            for (var i in $scope.cr) {
                cnt += $scope.cr[i].totalPaid;
                $scope.cr[i].recordTime = cnt;
            }

            console.log($scope.cr);
            
        }
        $scope.datosIniciales();  

        $scope.convertPDF = function (){
            $("#btn1").hide();
            $("#btn2").hide();

            console.log('Entra bien');
            
            
            var doc = new jsPDF('p', 'pt'); 
            var w = doc.getStringUnitWidth('Text') * 12; // Where 12 is the chosen font size console.log(w); // 21.480000000000004 
            doc.addHTML(document.body,function() {
                doc.save('html.pdf');
            });

            setTimeout(function(){
                $("#btn1").show();
                $("#btn2").show();
            }, 1030);
        }

        $scope.Test = function (){
            window.location = 'https://www.credicer.mx/#/';
        }

        $scope.GetContrato = function (){            
            //let nDoc = cl.documentNo
            //let cl_name = cl.names + ' ' + cl.surnamep + ' ' + cl.surnamem;

            let nDoc = $scope.cl.documentNo;
            let cl_name = $scope.cl.names + " " + $scope.cl.surnamep + " " + $scope.cl.surnamem;
            window.open('https://credicer.mx/api/getcrt/arch?cl='+cl_name+'&ndoc='+nDoc);
            setTimeout(function(){ 
                
                //window.open('https://credicer.mx/api/viewcrt/arch?cl='+cl_name+'&ndoc='+nDoc, '_blank');
                
            }, 3000);                        
            
        
        }

    }
]);