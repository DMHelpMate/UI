angular.module('dm')
.factory('UserHash', ['$http', function($http) {

	const HASH_SIZE = 20;
	
	// TODO: check db for if hash has already been used for another user 
	function hashIsAvailable(hash) {
		return true;
	}

	// create randomized hash as mock guid
	function createHash() {
		function s4() {
			var hex = '';
			var char;
			for (var i = 0; i < HASH_SIZE; i++) {
				switch (hex) {
					case 15:
						hex += 'f';
						break;
					case 14:
						hex += 'e';
						break;
					case 13:
						hex += 'd';
						break;
					case 12:
						hex += 'c';
						break;
					case 11:
						hex += 'b';
						break;
					case 10:
						hex += 'a';
						break;
					default:
						hex += hex + '';
						break;
				}
				return hex;
			}
		}
		return s4();
	}

	// create hash for user if needed
	return {
		createUserHash: function() {
			if (!localStorage.getItem('user-hash')) {
				do {
					localStorage.setItem('user-hash', createHash());
				} while (!hashIsAvailable(localStorage.getItem('user-hash')));
			}
		}
	}
}]);
