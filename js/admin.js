function AdminCtrl($scope) {
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
}