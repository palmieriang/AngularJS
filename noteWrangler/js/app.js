angular.module('NoteWrangler', ['ngRoute'])
	.config(['$routeProvider', function($routeProvider) {
		$routeProvider
			.when('/notes', {
				templateUrl: 'templates/pages/notes/index.html',
				controller: 'NotesIndexController',
				controllerAs: 'indexController'
			})
			.when('/users', {
				templateUrl: 'templates/pages/users/index.html'
			})
	}]);