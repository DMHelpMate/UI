
angular.module('dm')
.controller('AdminController', ['$http', '$scope', function($http, $scope) {


//------------------------ Initial setup ------------------------------------------
  // urls for requests
  const MON_URL = 'http://api.unicornrampage.com/monsters';
  const ENC_URL = 'http://api.unicornrampage.com/encounters';

  // model vars for input bar
  $scope.collection = 'Encounters';
  $scope.search = '';

  // retrieve all encounters and assign it to scope
  $http({
    method: 'GET',
    url: ENC_URL
  }).then(function(res) {
    $scope.encounters = res.data;

    //sorts data alphabetically
    var enc_json = $scope.encounters;
    sortJsonArrayByProperty(enc_json,'general.name');
    $scope.encounters = enc_json;

  }, function(err) {
    console.log(err);
  });

  // retrieve all monsters and assign it to scope
  $http({
    method: 'GET',
    url: MON_URL
  }).then(function(res) {
    $scope.monsters = res.data;

    //sorts json data alphabetically
    var mon_json = $scope.monsters;
    sortJsonArrayByProperty(mon_json,'mname');
    $scope.monsters = mon_json;

  }, function(err) {
    console.log(err);
  });
//------------------------ End of initial setup -----------------------------------


  /**
   * getAssociatedDocs() retrieves all of the documents associated with the passed
   * in document
   *
   * @param {object} doc The document to retrieve associated docs
   */
  $scope.getAssociatedDocs = function(doc) {
    console.log(doc);
    var docUrl = 'http://api.unicornrampage.com/monsters_encounters';
    var collectionBuffer = $scope.collection;
    if ($scope.isEncounters()) {
      docUrl += '?enc_id=' + doc.enc_id;
      collectionBuffer = 'EncounterResults';
    } else if ($scope.isMonsters()) {
      docUrl += '?mon_id=' + doc.mon_id;
      collectionBuffer = 'MonsterResults';
    }
    $http({
      method: 'GET',
      url: docUrl
    }).then(function(res) {
      $scope.collection = collectionBuffer;
      $scope.result = res.data;
      $scope.selectedDoc = doc;
      console.log(res.data);
    }, function(err) {
      console.log(err);
    });
  }


  /**
   * isEncounterResults() determines if results has been set
   *
   * @return {boolean}
   */
  $scope.isEncounterResults = function() {
    return $scope.collection === 'EncounterResults';
  }


  /**
   * isEncounters() determines if encounters is selected
   *
   * @return {boolean}
   */
  $scope.isEncounters = function() {
    return $scope.collection === 'Encounters';
  }


  /**
   * isInSearch() determines if a documents contains the value of input search bar.
   * If the value is blank, all documents are true.
   *
   * @param {object} doc The document to check
   * @return {boolean}
   */
  $scope.isInSearch = function(doc) {
    if ($scope.isEncounters()) {
      return doc.general.name.indexOf($scope.search) >= 0;
    } else if ($scope.isMonsters()) {
      return doc.mname.indexOf($scope.search) >= 0;
    } else {
      // unimplemented type
      return false;
    }
  }


  /**
   * isMonsterResults() determines if results has been set
   *
   * @return {boolean}
   */
  $scope.isMonsterResults = function() {
    return $scope.collection === 'MonsterResults';
  }


  /**
   * isMonsters() determines if monsters is selected
   *
   * @return {boolean}
   */
  $scope.isMonsters = function() {
    return $scope.collection === 'Monsters';
  }


  /**
   * validate() ensures that all required fields have been inputted
   *
   * @param {object} doc The document to validate
   * @return {boolean}
   */
  $scope.validate = function(doc) {
    if ($scope.isEncounters()) {
      return doc.location && doc.location.name && doc.location.description
        && doc.general && doc.general.name && doc.general.setup
        && doc.general.readaloud;
    } else if ($scope.isMonsters()) {
      return doc.mname && doc.mhitpoints && doc.mattack && doc.mdefense;
    } else {
      // unimplemented type
      return false;
    }
  }

  /**
   * sortJsonArrayByProperty() restructures json array based upon property
   *
   * @param {object Array, order property, direction assending/desending}
   */
  function sortJsonArrayByProperty(objArray, prop, direction){
    if (arguments.length<2) throw new Error("sortJsonArrayByProp requires 2 arguments");
    var direct = arguments.length>2 ? arguments[2] : 1; //Default to ascending

    if (objArray && objArray.constructor===Array){
        var propPath = (prop.constructor===Array) ? prop : prop.split(".");
        objArray.sort(function( a,b){
            for (var p in propPath){
                if (a[propPath[p]] && b[propPath[p]]){
                    a = a[propPath[p]];
                    b = b[propPath[p]];
                }
            }
            // convert numeric strings to integers
            a = String(a).match(/^\d+$/) ? +a : a;
            b = String(b).match(/^\d+$/) ? +b : b;
            return ( (a < b) ? -1*direct : ((a > b) ? 1*direct : 0) );
        });
    }
  }

}]);
