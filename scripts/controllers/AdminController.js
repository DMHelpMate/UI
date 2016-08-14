
angular.module('dm')
.controller('AdminController', ['$http', '$scope', function($http, $scope) {

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
}]);
