var app = angular.module("Demo", ["ui.router"])
				 .config(function($stateProvider, $urlMatcherFactoryProvider, $urlRouterProvider, $locationProvider) {
				 	$urlRouterProvider.otherwise("/home");
				 	$urlMatcherFactoryProvider.caseInsensitive(true);
				 	$stateProvider
				 		.state("home", {
				 			url: "/home",
				 			templateUrl: "exercises/angular.3.UiRouter/templates/home.html",
				 			controller: "homeController",
				 			data: {
				 				customData1: "Home State Custom Data 1",
				 				customData2: "Home State Custom Data 2"
				 			}
				 		})
				 		.state("courses", {
				 			url: "/courses",
				 			templateUrl: "exercises/angular.3.UiRouter/templates/courses.html",
				 			controller: "coursesController",
				 			data: {
				 				customData1: "Courses State Custom Data 1",
				 				customData2: "Courses State Custom Data 2"
				 			}
				 		})
				 		.state("studentParent", {
				 			url: "/students",
				 			templateUrl: "exercises/angular.3.UiRouter/templates/studentParent.html",
				 			controller: "studentParentController",
				 			resolve: {
				 				studentTotals: function($http) {
				 					return $http.get("http://localhost/exercises/angular.3.UiRouter/api.php?func=getStud")
				 							.then(function(response) {
				 								return response.data;
				 							})
				 				}
				 			},
				 			abstract: true
				 		})
				 		.state("studentParent.students", {
				 			url: "/",
				 			views: {
				 				"studentData": {
						 			templateUrl: "exercises/angular.3.UiRouter/templates/students.html",
						 			controller: "studentsController",
						 			resolve: {
						 				studentsList: function($http) {
						 					return $http.get("http://localhost/exercises/angular.3.UiRouter/api.php?func=getStud")
						 							.then(function(response) {
						 								return response.data;
						 							})
						 				}
						 			}
						 		},
						 		"totalData": {
						 			templateUrl: "exercises/angular.3.UiRouter/templates/studentsTotal.html",
						 			controller: "studentsTotalController"
						 		}

				 			}
				 		})
				 		.state("studentParent.studentDetails", {
				 			url: "/:ID",
				 			views: {
				 				studentData: {
						 			templateUrl: "exercises/angular.3.UiRouter/templates/studentDetails.html",
						 			controller: "studentDetailsController"
				 				}
				 			},
				 		})
				 		.state("studentsSearch", {
				 			// we don't need the question mark to make it optional anymore
				 			url: "studentsSearch/:name",
				 			templateUrl: "exercises/angular.3.UiRouter/templates/studentsSearch.html",
				 			controller: "studentsSearchController"
				 		})
				 		.state("login", {
				 			url: "/login",
				 			templateUrl: "exercises/angular.3.UiRouter/templates/login.html",
				 			controller: "loginController"
				 		})
				 		.state("profile", {
				 			url: "/profile",
				 			templateUrl: "exercises/angular.3.UiRouter/templates/profile.html",
				 			resolve: {
				 				'check': function($location, user) {
				 					if(!user.isUserLoggedIn()) {
				 						$location.path('home');
				 					}
				 				}
				 			}
				 		})
				 		.state("test", {
				 			url: "/test",
				 			template: "<h1>Inline template in action</h1>",
				 			controller: "homeController"
				 		})

			 		// $locationProvider.html5Mode(true);
				 })
				.service('user', function() {
					var username;
					var loggedin = false;
					var id;

					this.setName = function(name) {
						username = name;
					};
					this.getName = function() {
						return username;
					};
					this.setID = function(userID) {
						id = userID;
					};
					this.getID = function() {
						return id;
					};
					this.userLoggedIn = function() {
						loggedin = true;
					};
					this.isUserLoggedIn = function() {
						return loggedin;
					};
				})
				.controller("studentsTotalController", function ($scope, studentTotals) {
				 	$scope.students = studentTotals;

					$scope.total = $scope.students.length;
				})
				.controller("studentParentController", function ($scope, studentTotals) {
				 	$scope.students = studentTotals;

					$scope.total = $scope.students.length;
					$scope.totalMale = 0;
					$scope.totalFemale = 0;

					for(var i=0; i<$scope.students.length; i++) {
						if($scope.students[i].gender == "Male") {
							$scope.totalMale += 1;
						} else {
							$scope.totalFemale += 1;
						}
					}
				})
				 .controller("homeController", function($scope, $state) {
				 	$scope.message = "Home Page";

				 	$scope.homeCustomData1 = $state.current.data.customData1;
				 	$scope.homeCustomData2 = $state.current.data.customData2;

				 	$scope.coursesCustomData1 = $state.get("courses").data.customData1;
				 	$scope.coursesCustomData2 = $state.get("courses").data.customData2;
				 })
				 .controller("coursesController", function($scope) {
				 	$scope.courses = ["C#", "VB.NET", "SQL Server", "ASP.NET"];
				 })
				 .controller("studentsController", function(studentsList, $scope, $http, $state, $stateParams, $location, studentTotals) {

				 	$scope.searchStudent = function() {
				 		$state.go("studentsSearch", { name: $scope.name });
				 	}

				 	$scope.reloadData = function() {
				 		$state.reload();
				 	}

				 	$scope.students = studentsList;
				 	$scope.total = studentTotals.length;

				 	// $scope.searchStudent = function(name) {
				 	// 	if($scope.name) {
				 	// 		$location.url("/studentsSearch/" + $scope.name);
				 	// 	} else {
				 	// 		$location.url("/studentsSearch");
				 	// 	}
				 	// 	$http.get("http://localhost/exercises/angular.3.UiRouter/lesson40.php?name="+$stateParams.name)
				 	// 	 .then(function(response) {
						// 	$scope.students = response.data;
				 	// 	 })
				 	// }
				 })
				.controller("studentDetailsController", function ($scope, $http, $stateParams) {
					$http.get("http://localhost/exercises/angular.3.UiRouter/api.php?func=id&ID="+$stateParams.ID)
				 		 .then(function(response) {
							$scope.student = response.data[0];
				 		 })
				})
				.controller("studentsSearchController", function ($scope, $http, $stateParams) {
				    if ($stateParams.name) {

						// $http.get("http://localhost/exercises/angular.3.UiRouter/api.php?func=letters&name="+$stateParams.name)
						// 		 .then(function(response) {
						// 		 $scope.students = response.data;
						// 		 })

						$http({
						    url: "http://localhost/exercises/angular.3.UiRouter/api.php",
						    method: "get",
						    params: { 
						    	func: 'letters',
						    	name: $stateParams.name
						    }
						}).then(function (response) {
						    $scope.students = response.data;
							console.log($scope.students);
						})

				    } else {
				    	$http({
				            url: "http://localhost/exercises/angular.3.UiRouter/api.php",
				            method: "get",
				            params: { func: 'getStud' }
				        }).then(function (response) {
				            $scope.students = response.data;
				        })
				    }
				})
				.controller("loginController", function($scope, $http, $location, user) {
					$scope.login = function() {

						var username = $scope.username;
						var password = $scope.password;

						$http({
							url: 'http://localhost/exercises/angular.1.RoutingAPI/api.php',
							method: 'POST',
							headers: {
								'Content-Type' : 'application/x-www-form-urlencoded'
							},
							data: 'username='+username+'&password='+password+'&func=login'
						}).then(function(response) {
							console.log(response.data);
							if(response.data.status == 'loggedin') {
								user.userLoggedIn();
								user.setName(response.data.user);
								$location.path('/profile');
							} else {
								alert('Error! Invalid login.')
							}
						})
					}
				})
				.controller("profileController", function($scope, user) {
					$scope.user = user.getName();
				})
