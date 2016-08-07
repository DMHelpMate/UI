angular.module('dm')
.factory('UserHash', ['$http', function($http) {
	
	// TODO: check db for if hash has already been used for another user 
	function hashIsAvailable(hash) {
		return true;
	}

	// create randomized hash as mock guid
	function createHash() {
		function s4() {
			return Math.floor((1 + Math.random()) * 0x10000)
				.toString(16)
				.substring(1);
		}
		return s4() + s4() 
			+ '-' + s4() 
			+ '-' + s4() 
			+ '-' + s4() 
			+ '-' + s4() + s4() + s4();
	}

	// create hash for user if needed
	return {
		createUserHash: function() {
			if (!localStorage.getItem('user-hash')) {
				do {
					localStorage.setItem('user-hash') = createHash;
				} while (!hashIsAvailable(localStorage.getItem('user-hash')));
			}
		}
	}
}]);