var app = angular.module("Demo", ["ngRoute"])
				 .config(function($routeProvider, $locationProvider) {
				 	$routeProvider.caseInsensitiveMatch = true;
				 	$routeProvider
				 		.when("/home", {
				 			templateUrl: "templates/home.html",
				 			controller: "homeController"
				 		})
				 		.when("/courses", {
				 			templateUrl: "templates/courses.html",
				 			controller: "coursesController"
				 		})
				 		.when("/students", {
				 			templateUrl: "templates/students.html",
				 			controller: "studentsController",
				 			resolve: {
				 				studentsList: function($http) {
								 	return $http.get("http://localhost/exercises/angular.1.Routing/lesson25.php")
								 			.then(function(response) {
												return response.data;
							 				})				 					
				 				}
				 			}
				 		})
				 		.when("/students/:ID", {
				 			templateUrl: "templates/studentDetails.html",
				 			controller: "studentDetailsController"
				 		})
				 		.when("/studentsSearch/:name?", {
				 			templateUrl: "templates/studentsSearch.html",
				 			controller: "studentsSearchController"
				 		})
				 		.when("/test", {
				 			template: "<h1>Inline template in action</h1>",
				 			controller: "homeController"
				 		})
				 		.otherwise({
				 			redirectTo: "/home"
				 		})
			 		$locationProvider.html5Mode(true);
				 })
				 .controller("homeController", function($scope) {
				 	$scope.message = "Home Page";
				 })
				 .controller("coursesController", function($scope) {
				 	$scope.courses = ["C#", "VB.NET", "SQL Server", "ASP.NET"];
				 })
				 .controller("studentsController", function(studentsList, $scope, $http, $route, $rootScope, $log, $routeParams, $location) {
				 	// Using $routeChangeStart
				 	// $scope.$on("$routeChangeStart", function(event, next, current) {
				 	// 	if(!confirm("Are you sure you want to navigate away from this page to " + next.$$route.originalPath)) {
				 	// 		event.preventDefault();
				 	// 	};
				 	// });
				 	// Using $locationChangeStart
				 	// $scope.$on("$locationChangeStart", function(event, next, current) {
				 	// 	if(!confirm("Are you sure you want to navigate away from this page to " + next)) {
				 	// 		event.preventDefault();
				 	// 	};
				 	// });
					// $scope.$on("$locationChangeStart", function (event, next, current) {
					// 	$log.debug("$locationChangeStart fired");
					// 	$log.debug(event);
					// 	$log.debug(next);
					// 	$log.debug(current);
					// });

					// $scope.$on("$routeChangeStart", function (event, next, current) {
					// 	$log.debug("$routeChangeStart fired");
					// 	$log.debug(event);
					// 	$log.debug(next);
					// 	$log.debug(current);
					// });

				 	// var vm = this;

					$rootScope.$on("$locationChangeStart", function () {
				        $log.debug("$locationChangeStart fired");
				    });

				    $rootScope.$on("$routeChangeStart", function () {
				        $log.debug("$routeChangeStart fired");
				    });

				    $rootScope.$on("$locationChangeSuccess", function () {
				        $log.debug("$locationChangeSuccess fired");
				    });

				    $rootScope.$on("$routeChangeSuccess", function () {
				        $log.debug("$routeChangeSuccess fired");
				    });

				 	$scope.reloadData = function() {
				 		$route.reload();
				 	}

				 	// adding the query in the routeProvider, we don't need it anymore here but we have to inject the property name (studentsList) in this controller end we can remove $http
				 	// $http.get("http://localhost/exercises/angular.1.Routing/lesson25.php")
				 	// 	 .then(function(response) {
						// 	$scope.students = response.data;
				 	// 	 })

				 	$scope.students = studentsList;

				 	$scope.searchStudent = function(name) {
				 		if($scope.name) {
				 			$location.url("/studentsSearch/" + $scope.name);
				 		} else {
				 			$location.url("/studentsSearch");
				 		}
				 		$http.get("http://localhost/exercises/angular.1.Routing/lesson40.php?name="+$routeParams.name)
				 		 .then(function(response) {
							$scope.students = response.data;
				 		 })
				 	}
				 })
	            .controller("studentDetailsController", function ($scope, $http, $routeParams) {
	            	console.log($routeParams.ID);
	            	$http.get("http://localhost/exercises/angular.1.Routing/lesson30.php?ID="+$routeParams.ID)
				 		 .then(function(response) {
	                	console.log(response);
							$scope.student = response.data[0];
				 		 })
	            })
				.controller("studentsSearchController", function ($scope, $http, $routeParams) {
				    if ($routeParams.name) {
				        $http({
				            url: "http://localhost/exercises/angular.1.Routing/lesson40.php",
				            method: "get",
				            params: { name: $routeParams.name }
				        }).then(function (response) {
				        	console.log(response.data);
				            $scope.students = response.data;
				        })
				    } else {
				        $http.get("http://localhost/exercises/angular.1.Routing/lesson25.php")
								.then(function (response) {
								    $scope.students = response.data;
						        	console.log($scope.students);
								})
				    }
				})