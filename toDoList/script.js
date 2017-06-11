angular.module('myModule', [])
.controller('myController', function($scope) {

	$scope.tasks = [];

	$scope.searchEnter = function() {
		if(event.which == 13 && $scope.task != '') {
			$scope.addTask();
		};
	};

	$scope.addTask = function() {
		$scope.tasks.push({'taskMessage': $scope.task, 'status': false});
		console.log($scope.tasks);
		$scope.task = ' ';
	};

	$scope.editTask = function() {
		event.target.contentEditable = event.target.contentEditable == "false" ? "true" : "false";
	};

	$scope.enterAgain = function(task) {
		if(event.which == 13 && task != '') {
			$scope.editTask();
		};
	};
});
