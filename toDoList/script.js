angular.module('myModule', [])
.controller('myController', function($scope) {

	$scope.tasks = [];

	var taskData = localStorage['tasksList'];

	if(taskData != undefined) {
		$scope.tasks = JSON.parse(taskData);
	}

	$scope.searchEnter = function() {
		if(event.which == 13 && $scope.task != '') {
			$scope.addTask();
		};
	};

	$scope.addTask = function() {
		$scope.tasks.push({'taskMessage': $scope.task, 'status': false});
		console.log($scope.tasks);
		$scope.task = ' ';
		saveLocal($scope.tasks);
	};

	$scope.editTask = function(msg) {

		for(i=0; i<$scope.tasks.length; i++) {
			if($scope.tasks[i].taskMessage == msg) {
				$scope.tasks[i].taskMessage = event.target.innerText;
			}
		}

		saveLocal($scope.tasks);

		event.target.contentEditable = event.target.contentEditable == "false" ? "true" : "false";
	};

	$scope.taskDone = function(status) {
		if($scope.tasks.status != status) {
			saveLocal($scope.tasks);
		}
	}

	$scope.enterAgain = function(msg) {
		if(event.which == 13 && msg != '') {
			$scope.editTask(msg);
		};
	};

	$scope.removeTask = function(index) {
		$scope.tasks.splice(index,1);
		saveLocal($scope.tasks);
	};

	$scope.clearCompleted = function() {
		$scope.tasks = $scope.tasks.filter(function(item) {
			return !item.status;
		})
		saveLocal($scope.tasks);
	}

	function saveLocal(tasks) {
		localStorage['tasksList'] = JSON.stringify(tasks);
		console.log(localStorage);
	}

});
