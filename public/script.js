var myApp = angular.module('myModule', []);

myApp.controller('myController', function($scope, $http) {
	function getUser (list) {
		return $http({
			method: 'GET',
			url: `https://fcctop100.herokuapp.com/api/fccusers/top/${list}`
		})
			.then(
				response => {
					console.log(response)
					$scope.campers = response.data
				},
				error => console.error(error)
			)
	}

	$scope.options = [
		{
			label: 'Recent',
			value: 'recent'
		},
		{
			label: 'All Time',
			value: 'alltime'
		}
	]

	$scope.select = $scope.options[0].value

	$scope.onChange = () => getUser($scope.select)

	getUser($scope.select)
});
