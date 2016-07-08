(function() {

	var index = angular.module('dm', []);

	index.controller('DisplayController', function() {
		this.activePage = 1;

		this.setActive = function(number) {
			this.activePage = number;
		};

		this.isActive = function(number) {
			return number === this.activePage;
		};
	});
})();