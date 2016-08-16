
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
  }, function(err) {
    console.log(err);
  });

  // retrieve all monsters and assign it to scope
  $http({
    method: 'GET',
    url: MON_URL
  }).then(function(res) {
    $scope.monsters = res.data;
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
    var docUrl = 'http://api.unicornrampage.com/monsters_encounters';
    if ($scope.isEncounters()) {
      docUrl += '?enc_id=' + doc.enc_id;
    } else if ($scope.isMonsters()) {
      docUrl += '?mon_id=' + doc.mon_id;
    }
    $http({
      method: 'GET',
      url: docUrl
    }).then(function(res) {
      console.log(res.data);
    }, function(err) {
      console.log(err);
    });
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


}]);
