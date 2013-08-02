var typeApp = angular.module("typeApp", ['ngCookies']);

typeApp.controller("ScoreCtrl", function($scope, $cookieStore) {
	$scope.events = io.getEvents();

	$scope.selectedEvent = $cookieStore.get("selectedEvent") || $scope.events[0];

	$scope.update = function() {
		$cookieStore.put("selectedEvent", $scope.selectedEvent);
	};
});

typeApp.controller("AdminCtrl", function($scope) {
	$scope.events = io.getEvents();

	$scope.addEvent = function() {
		io.saveEvent({
    	school: $scope.school, 
    	name: $scope.name,
    	date: new Date()
    });

    $scope.school = "";
    $scope.name = "";
  };
});