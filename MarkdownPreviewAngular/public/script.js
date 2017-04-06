var myApp = angular.module('myModule', ['ngSanitize', 'markdown']);

	myApp.controller("myController1", function($scope) {
		$scope.snippet = "# test";
	});

	myApp.controller("myController2", ['$scope', function($scope) {
		$scope.snippet = "## test";
	}]);