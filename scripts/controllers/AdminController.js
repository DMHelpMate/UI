
angular.module('dm')
.controller('AdminController', ['$http', '$scope', function($http, $scope) {
    $scope.type = 'temp';
    $scope.json_obj = {};
    var obj = null;

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
          obj = JSON.parse($scope.json_obj);
          console.log($scope.json_obj);
          console.log(obj);


          if($scope.type == 'mon'){
            $scope.onMonster();
          }
          else if($scope.type == 'enc'){
            $scope.onEncounter();
          }
          else if($scope.type == 'mon_enc'){
            $scope.onMonster(); //implement
          }
          else{
            $scope.onNone(); //implement
          }

      }, function error(err) {
        console.log(err);
      });
    }

  $scope.onMonster = function(){
    $scope.encterName = [obj.length];
    $scope.quant = [obj.length];

    for(i = 0; i < obj.length; i++){
      $scope.quant[i] = -1;
    }


    for(i = 0; i < obj.length; i++){
      $scope.encterName[i]= obj[i].general.name;
      for(j = 0; j < obj[i].monsters.length; j++){

        if(this.mon_id_box === obj[i].monsters[j].mon_id){
          $scope.quant[i] = obj[i].monsters[j].quantity;
        }
      }
      this.enc_obj = $scope.encterName.map(function(value, index) {
        return {
            name: value,
            quantity: $scope.quant[index]
          }
      });
      console.log("quantity ="+$scope.quant[i]);
      console.log("encounter name="+$scope.encterName[i]);
    }
  }

  $scope.onEncounter = function(){
    $scope.monstrName = [obj.length];
    for(i = 0; i < obj.length; i++){
      $scope.monstrName[i]= obj[i].mname;
    }
    for(i = 0; i < obj.length; i++){ //for testing multiple monsters
      console.log($scope.monstrName[i]);
    }
  }

  $scope.onMonEnct= function(){
    //implement
  }

  $scope.onNone = function(){
    //implement
  }
}]);
