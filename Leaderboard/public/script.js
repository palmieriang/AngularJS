var myApp = angular.module("myModule", []);

myApp.controller("myController", function($scope, $http) {

	$http.get("https://fcctop100.herokuapp.com/api/fccusers/top/recent")
		.then(function (response) {
			$scope.campers = response.data;
	})

});
