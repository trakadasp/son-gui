SonataApp.controller('AllServicesController',['$rootScope','$http','$scope',function($rootScope,$http,$scope){

           $scope.userServices = new Array();
           $scope.selected_services = new Array();
           $scope.remove_class_btn='disabled';
           
           $scope.getServices = function(){
              console.info('Get Services call started. Url:'+$scope.apis.gatekeeper.services);
             $http({
                method  : 'GET',
                url     : $scope.apis.gatekeeper.services,
                headers : { 'Content-Type': 'application/json' }
               })
                .success(function(data) {
                  
                  console.info('Get Services From Url: '+$scope.apis.gatekeeper.services);
                  $scope.services = data;

                })
                .error(function(data){
                    console.error('Get Services Failed. Get Url: '+$scope.apis.gatekeeper.services);
                })
           }


           $scope.openServiceInfo = function(service){
             $('#modal1').openModal();
             $scope.modal = {};
             $scope.modal.content = {};
             $scope.modal.content.title=service.name;

             $scope.modal.content.service = service;
           }

          $scope.openServiceGraphs = function(service){
             $('#modal1').openModal();
             $scope.modal = {};
             $scope.modal.content = {};
             $scope.modal.content.title=service.name;
             $scope.modal.content.service = service;
             
          }
          $scope.closeModal = function(){
             $('#modal1').closeModal(); 
          }
        

          $scope.remakeChecked = function(service){

            $scope.selected_services = new Array();
            $scope.userServices.forEach( function(service, index) {
              if(service.checked){
                $scope.selected_services.push(service);
              }
            });
              if($scope.selected_services.length>0)
                $scope.remove_class_btn = 'enabled';
              else
                $scope.remove_class_btn = 'disabled';
          }


           
}]);