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

SonataApp.controller('LoginController',['$rootScope','$http','$scope',function($rootScope,$http,$scope){

          $rootScope.user_email = '';
          $rootScope.password = '';
          $scope.failedMessageVisibility = 0;
          
          $scope.checkLoaded = function(){
            if($('#login-page'))
              return true;
            else
              return false;
          }

          $scope.submitlogin = function(){
                $scope.failedMessageVisibility = 0;
              	var url = 'https://api.github.com';
				        $scope.httpGet(url,{Accept: "application/json", "Authorization": "Basic " + 
					                              btoa($scope.user_email+':'+$scope.password)}); 
            
          }

          $scope.httpGet = function(url,headers){
	
              $.ajax({
                  type: 'GET',
                  headers: headers,
                  url: url,
                  async: false
              })
              .done(function(data, textStatus, jqXHR) {
                  $rootScope.gitResp = data;
                  $rootScope.resp = 1;
                  location.hash = '/home';

              })
              .fail(function(jqXHR, textStatus, errorThrown) {
                  $scope.failedMessageVisibility = 1;
                  $rootScope.resp = 0;
              });
          }
           
}]);