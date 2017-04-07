var myApp = angular.module("myModule", []);

myApp.controller("myController", function($scope) {

	lat2 = 0;
	lon2 = 0;

	getLocation();

	function getLocation()
	{
		$scope.loaderText = "Getting your location";
		$scope.loading = true;
		if(navigator.geolocation)
		{
			setTimeout(function()
			{
				if($scope.clientPosition.latitude == 0)
				{
					console.log('Location ignored');
				}
			}, 11000);
			navigator.geolocation.getCurrentPosition(geolocationSuccess);
		}
		else
		{
			console.log("Location Unavailable");
		}
	}

	function geolocationSuccess(pos)
	{
		$scope.loaderText = " ";
		$scope.geolocated = true;
		$scope.clientPosition = pos.coords;
		$scope.sortResultsSelect = 'distance';
		search();
	};

	function search()
	{
		// alert("caller is " + arguments.callee.caller.toString());
		$scope.loading = true;
		var latitude = ($scope.clientPosition ? $scope.clientPosition.latitude || 0 : 0);
		var longitude = ($scope.clientPosition ? $scope.clientPosition.longitude || 0 : 0);
		// console.log(latitude);
		// console.log(longitude);
		$scope.distance = getDistanceFromLatLonIn(latitude,longitude,lat2,lon2);
		$scope.$apply();
	}

	function undToStr(str)
	{
		if(angular.isUndefined(str))
		{
			str = '';
		}

		return str;
	}
  
});
