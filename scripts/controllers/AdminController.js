
angular.module('dm')
.controller('AdminController', ['$http', '$scope', function($http, $scope) {
    $scope.onSubmit = function(){

      const URL = 'http://api.unicornrampage.com/monsters_encounters';

      if(this.mon_id_box && this.enc_id_box){
          $scope.url = URL + '?mon_id='+this.mon_id_box+'&enc_id='+this.enc_id_box;
          $scope.type = 'mon_enc';
      }
      else if(this.mon_id_box){
          $scope.url = URL + '?mon_id='+this.mon_id_box;
          $scope.type = 'mon';
      }
      else if(this.enc_id_box){
          $scope.url = URL + '?enc_id='+this.enc_id_box;
          $scope.type = 'enc';
      }
      else{
          $scope.url = URL;
          $scope.type = 'none';
      }
      $http({
          method: 'GET',
          url: $scope.url

      }).then(function success(res) {
          $scope.json_obj = angular.toJson(res.data);
          console.log($scope.json_obj);
      }, function error(err) {
        console.log(err);
      });
    }
}]);
