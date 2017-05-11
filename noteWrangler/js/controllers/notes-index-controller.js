angular.module('NoteWrangler')
.controller('NotesIndexController', ['$routeParams', '$http', function($routeParams, $http) {

	var controller = this;
	$http({method: 'GET', url: '/notes', data: 'note'}).success(function(data) {
		controller.note = data;
	});

}]);