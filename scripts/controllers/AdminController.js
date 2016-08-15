
angular.module('dm')
.controller('AdminController', ['$http', '$scope', function($http, $scope) {

<<<<<<< Updated upstream
  $scope.onSubmit = function(){
    console.log("onSubmit start");
    console.log(this.mon_id_box);
    console.log(this.enc_id_box);
    if(this.mon_id_box && this.enc_id_box){
      $http({
    		method: 'GET',
    		url: 'http://api.unicornrampage.com/monsters_encounters?mon_id='+this.mond_id_box+'&enc_id='+this.enc_id_box

    	}).then(function success(res) {
          $scope.m_e_json = angular.toJson(res.data);
          console.log($scope.m_e_json);

      }, function error(err) {
          console.log(err);
      });
    }
    else{
      console.log("onSubmit else");
    }
    console.log("onSubmit end");
  }
=======
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

>>>>>>> Stashed changes
}]);
