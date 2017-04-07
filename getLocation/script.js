var myApp = angular.module("myModule", []);

myApp.controller("myController", function($scope) {

	lat2 = 0;
	lon2 = 0;
	
	// nearme();
	// function nearme() {
	//     if (navigator.geolocation) {
	//         navigator.geolocation.getCurrentPosition(function (position) {

	//                 var latitude = position.coords.latitude; 
	//                 var longitude = position.coords.longitude;
	//                 console.log(latitude);
	//                 console.log(longitude);
	// 				$scope.distance = getDistanceFromLatLonIn(latitude,longitude,lat2,lon2);
	// 				$scope.$apply();
	//         });
	        
	//     }
	// }

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

	function getDistanceFromLatLonIn(lat1,lon1,lat2,lon2) {
		var R = 3959; // Radius of the earth in mi
		var dLat = deg2rad(lat2-lat1);  // deg2rad below
		var dLon = deg2rad(lon2-lon1); 
		var a = 
			Math.sin(dLat/2) * Math.sin(dLat/2) +
			Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
			Math.sin(dLon/2) * Math.sin(dLon/2)
			; 
		var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
		var distance = R * c; // Distance in mi
		// console.log(distance);
		return distance;
	}

	function deg2rad(deg) {
		return deg * (Math.PI/180);
	}
  
});
