/*
Copyright (c) 2015 SONATA-NFV [, ANY ADDITIONAL AFFILIATION]
ALL RIGHTS RESERVED.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

Neither the name of the SONATA-NFV [, ANY ADDITIONAL AFFILIATION]
nor the names of its contributors may be used to endorse or promote 
products derived from this software without specific prior written 
permission.

This work has been performed in the framework of the SONATA project,
funded by the European Commission under Grant number 671517 through 
the Horizon 2020 and 5G-PPP programmes. The authors would like to 
acknowledge the contributions of their colleagues of the SONATA 
partner consortium (www.sonata-nfv.eu).
*/

SonataApp.controller('MainController',['$rootScope','$scope','$routeParams', '$location', '$http',function($rootScope,$scope, $routeParams, $location, $http) {
		console.log('MainController');
		
		
		
		/*$scope.apis.monitoring = 'http://sp.int2.sonata-nfv.eu:8000/api/v1/prometheus/metrics/data';*/
		
		$scope.todos = new Array();


		 $scope.getServices = function(){

            console.info('Get Enviroment variables call started.');
             $http({
                method  : 'GET',
                url     : 'variables.php',
                headers : { 'Content-Type': 'application/json' }
               })
                .success(function(data) {
                  
                  console.info('Enviroment variables received');
                  //console.log(data);

                  $scope.configuration = {
                  	'logs_range':'86400' //time range (minutes before)
                  }

                  $scope.apis = {
						'monitoring':'http://'+data.MON_URL+'/api/v1/prometheus/metrics/data',
						'logs':'http://'+data.LOGS_URL+'/search/universal/relative?',
						'vims':'http://'+data.VIMS_URL+'/vims',
						'gatekeeper':{
							'services':'http://'+data.GK_URL+'/services',
							'packages':'http://'+data.GK_URL+'/packages',
							'functions':'http://'+data.GK_URL+'/functions',
							'requests':'http://'+data.GK_URL+'/requests',

						}
					}
				


					$rootScope.apis = $scope.apis;

                })
                .error(function(data){
                    console.error('Get Enviroment variables Failed.');
                })
           }


     if(typeof $rootScope.apis )
        $scope.getServices();

		
    var debug=false;
   	if(debug==false && $rootScope.resp!=1){
			location.hash='/login';
		}else {
			$rootScope.is_user_logged_in = true;
		}


         
            


    $scope.changeHash = function(newHash){
    	location.hash = newHash;
    }

	$rootScope.checkIfFilesAreThere = function(){

		return 1;	
	}         
    

    }]);


