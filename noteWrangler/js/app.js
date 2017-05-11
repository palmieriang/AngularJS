angular.module('NoteWrangler', ['ngRoute'])
	.config(['$routeProvider', function($routeProvider) {
		$routeProvider
			.when('/', {
				redirectTo: '/users'
			})
		    // Note Resources
			.when('/notes', {
				templateUrl: 'templates/pages/notes/index.html',
				controller: 'NotesIndexController',
				controllerAs: 'notesCtrl'
			})
			.when('/notes/new', {
				templateUrl: 'templates/pages/notes/edit.html',
				controller: 'NotesCreateController',
				controllerAs: 'newNotesCtrl'
			})
			.when('/notes/:id', {
				templateUrl: 'templates/pages/notes/show.html',
				controller: 'NotesShowController',
				controllerAs: 'showNotesCtrl'
			})
			.when('/notes/:id/edit', {
				templateUrl: 'templates/pages/notes/edit.html',
				controller: 'NotesEditController',
				controllerAs: 'editNotesCtrl'
			})

		    // User Resources
			.when('/users', {
				templateUrl: 'templates/pages/users/index.html'
			})
			.when('/users/:id', {
				templateUrl: 'templates/pages/users/show.html'
			})
			.otherwise({
				redirectTo: '/notes'
			});
	}]);