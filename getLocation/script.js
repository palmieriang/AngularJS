var myApp = angular.module("myModule", []);

myApp.controller("myController", function($scope) {

	lat2 = 0;
	lon2 = 0;
	
	getLocation();
	function getLocation() {
		$scope.loaderText = "Getting your location";
		$scope.loading = true;		
	    if (navigator.geolocation) {
	        navigator.geolocation.getCurrentPosition(function (position) {
					$scope.loaderText = " ";
					$scope.geolocated = true;
	                var latitude = position.coords.latitude; 
	                var longitude = position.coords.longitude;
	                // console.log(latitude);
	                // console.log(longitude);
					$scope.distance = getDistanceFromLatLonIn(latitude,longitude,lat2,lon2);
					$scope.$apply();
	        });
	        
	    } else {
			$scope.loaderText = "Location Unavailable";
	    }
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
