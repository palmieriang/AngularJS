var myApp = angular.module("myModule", [])
	.config(function($sceProvider) {
	// Completely disable SCE.  For demonstration purposes only!
	// Do not use in new projects or libraries.
	$sceProvider.enabled(false);
});

myApp.controller("booksCtrl", function($scope, $http, $sce) {
	$scope.trustAsHtml = $sce.trustAsHtml;

	$scope.ellipsis = true;

	$scope.data = {
		hemingway: {
			tabLabel: 'Ernest Hemingway'
		},
		dickens: {
			tabLabel: 'Charles Dickens'
		},
		shakespeare: {
			tabLabel: 'William Shakespeare'
		}
	};

	$scope.selectedTab = 'hemingway';

	$scope.selectTab = tabNumber => $scope.selectedTab = tabNumber;

	Object.keys($scope.data).forEach(author => {
		callApi(author)
			.then(
				response => $scope.data[author].results = response.data.results,
				error => console.log('Error!', error)
			);
	});

	function callApi (author) {
		return $http({
			method: 'JSONP',
			url: `https://itunes.apple.com/search?country=gb&term=${author}&media=ebook&limit=10`
		});
	}
});
