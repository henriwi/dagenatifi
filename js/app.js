var typeApp = angular.module("typeApp", ['ngCookies']);
typeApp.config(function($locationProvider, $routeProvider) {
  // $locationProvider.html5Mode(true);
  $routeProvider.
    when('/admin', {
      templateUrl: 'admin.html',
      controller: 'AdminCtrl'
    }).
    when('/score', {
      templateUrl: 'score.html', 
      controller: 'ScoreCtrl'}).
    when('/', {
      templateUrl: 'game.html'
    }).
    otherwise({redirectTo: '/404'});
});

typeApp.controller("ScoreCtrl", function($scope, $cookieStore, $routeParams) {
	$scope.participants = io.getParticipants();
});

typeApp.controller("AdminCtrl", function($scope, $cookieStore) {
	$scope.events = io.getEvents();

	$scope.addEvent = function() {
		io.saveEvent({
    	school: $scope.school, 
    	name: $scope.name,
    	date: $scope.date,
    });

    $scope.school = "";
    $scope.name = "";
    $scope.date = "";
  };

  $scope.updateEvent = function(index) {
  	var eventToUpdate = $scope.events[index];
  	//io.updateEvent({});
  	eventToUpdate.editing = false;
  }

  $scope.deleteEvent = function(index) {
  	var eventToDelete = $scope.events[index];
  	//io.deleteEvent(eventToDelete.id);
  	$scope.events.splice(index, 1);
  }

  $scope.setActiveEvent = function(index) {
    // Set's all the events do non-active
    for (i = 0; i < $scope.events.length; i++) {
      $scope.events[i].active = false;
    }

  	var activeEvent = $scope.events[index];
    activeEvent.active = true;
  	$cookieStore.put("activeEvent", activeEvent)
  }
});

typeApp.controller("GameCtrl", function($scope, $cookieStore) {
	$scope.selectedEvent = $cookieStore.get("activeEvent");
});

typeApp.directive('datepicker', function() {
    return {
        restrict: 'A',
        require : 'ngModel',
        link : function (scope, element, attrs, ngModelCtrl) {
            $(function(){
                element.datepicker({
                    dateFormat: 'dd.mm.yy',
                    onSelect: function (date) {
                        ngModelCtrl.$setViewValue(date);
                        scope.$apply();
                    }
                });
            });
        }
    }
});