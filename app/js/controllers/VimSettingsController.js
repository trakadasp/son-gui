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

SonataApp.controller('VimSettingsController',['$rootScope','$scope','$routeParams','$location','$http',function($rootScope,$scope, $routeParams, $location, $http){
	

	$scope.new_vim = {};




	$scope.post_a_vim = function(){
		
		$http({
          method  : 'POST',
          url     : $scope.apis.vims,
          headers : { 'Content-Type': 'application/json','Accept':'application/json' },
          data    : $scope.new_vim
         })
          .success(function(data) {
	        
	        console.log(data);
	        $('#new_vim_installed').openModal();  
	        $('#new_vim_installed h6').html("New Vim uuid: "+data.request_uuid);
        });
	}


	$scope.addAVim = function(){
			
	}

	$scope.getVims = function(){

      	$http({
          method  : 'GET',
          url     : $scope.apis.vims,
          headers : { 'Content-Type': 'application/json','Accept':'application/json' }
         })
          .success(function(data) {
            $scope.vims = new Array();
            $scope.vims.push(data);
            console.log($scope.vims);
            $scope.vims.forEach(function(vim,index){
					$scope.setVimStatus(vim);
	            })



          });


	}

	$scope.setVimStatus = function(vim){
		vim.status = '-';
	}


    $scope.init = function(){
    	$scope.getVims();
    }

     
    
}]);