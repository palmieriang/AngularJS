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
	});
