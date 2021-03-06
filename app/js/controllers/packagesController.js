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

SonataApp.controller('PackagesController',['$rootScope','$http','$scope',function($rootScope,$http,$scope){

           $scope.getPackages = function(){
            console.info('Get Packages call started. Url:'+$scope.apis.gatekeeper.packages);
             $http({
                method  : 'GET',
                url     : $scope.apis.gatekeeper.packages,
                headers : {"Content-Type":"application/zip"}
               })
                .success(function(data) {
                  console.info('Get Packages From Url: '+$scope.apis.gatekeeper.packages);
                  var blob=new Blob([data], {
                              type: 'application/zip'
                          });
                  $scope.pack = {};
                  $scope.pack.href = window.URL.createObjectURL(blob);
                  $scope.pack.filename = "packages.zip";
                  $scope.pack.show = true;
                  var zip = new JSZip();
                  zip.file("Hello.txt", "Hello World\n");
                  var img = zip.folder("images");
                  zip.file(data, {base64: true});
                  zip.generateAsync({type:"blob"})
                  .then(function(content) {                      
                      saveAs(content, "example.zip");
                    });
                })
                .error(function(data){
                  console.error('Get Packages Failed. Get Url: '+$scope.apis.gatekeeper.packages);
                  console.error(data);
                })
           }




           
}]);