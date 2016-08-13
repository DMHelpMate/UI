angular.module('dm')
.factory('UserHash', ['$http', function($http) {

	const HASH_SIZE = 20;
	
	// TODO: check db for if hash has already been used for another user 
	function hashIsAvailable(hash) {
		return true;
	}

	// create randomized hash as mock guid
	function createHash(loopAmount, callback) {
		var hex = '';
		var char;
		for (var i = 0; i < loopAmount;) {
			char = Math.round(Math.random() * 16);
			switch (char) {
				case 15:
					hex += 'f';
					i++;
					break;
				case 14:
					hex += 'e';
					i++;
					break;
				case 13:
					hex += 'd';
					i++;
					break;
				case 12:
					hex += 'c';
					i++;
					break;
				case 11:
					hex += 'b';
					i++;
					break;
				case 10:
					hex += 'a';
					i++;
					break;
				default:
					hex += char + '';
					i++;
					break;
			}
		}
		hex = hex.substr(0, loopAmount);
		callback(hex);
	}

	// create hash for user if needed
	return {
		createUserHash: function() {
			if (!localStorage.getItem('user-hash')) {
				do {
					createHash(HASH_SIZE, function(hex) {
						localStorage.setItem('user-hash', hex);
					});
				} while (!hashIsAvailable(localStorage.getItem('user-hash')))
			}
		},

		createObjHash: function(callback) {
			createHash(4, function(hex) {
				callback(hex);
			});
		}
	}
}]);
