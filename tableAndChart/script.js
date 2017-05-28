var graphApp = angular.module('graphApp', ['gridshore.c3js.chart']);

graphApp.controller('GraphCtrl', function ($scope) {

	$scope.chartType = 1;

	$scope.handleFiles = function(files) {
		if (files.length) {
			for (let i = 0; i < files.length; i++) {
				if (files[i].type.indexOf('text') == 0) {
					const reader = new FileReader()
					reader.onload = e => {
						const text = e.target.result;

						const {data} = Papa.parse(text);

						$scope.columnValues = data;

						$scope.$digest()					
					}
				reader.readAsText(files[i])
				}
			}
		}
	}

	$scope.changeChart = function(number) {
		$scope.chartType = number;
	}

});