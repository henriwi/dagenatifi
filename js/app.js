var typeApp = angular.module("typeApp", ['ngCookies']);
typeApp.config(function($locationProvider, $routeProvider) {
  // $locationProvider.html5Mode(true);
  $routeProvider.
    when('/admin', {
      templateUrl: 'templates/admin.html',
      controller: 'AdminCtrl'
    }).
    when('/score/', {
      templateUrl: 'templates/score.html', 
      controller: 'ScoreTotalCtrl'}).
    when('/score/:eventId', {
      templateUrl: 'templates/score.html', 
      controller: 'ScoreCtrl'}).
    when('/participant/:participantId', {
      templateUrl: 'templates/participant.html', 
      controller: 'ParticipantCtrl'}).
    when('/', {
      templateUrl: 'templates/game.html',
      controller: 'GameCtrl'
    }).
    otherwise({redirectTo: '/404'});
});

typeApp.controller("ScoreTotalCtrl", function($scope, $http) {
	io.getParticipants($scope, $http);
});

typeApp.controller("ScoreCtrl", function($scope, $http, $routeParams) {
  var eventId = $routeParams.eventId;
  $scope.participants = io.getParticipantsForEvent(eventId, $scope, $http);
  console.log($scope.participants);
});

typeApp.controller("AdminCtrl", function($scope, $http, $cookieStore) {
  //Setter io.events
  var activeEvent = $cookieStore.get("activeEvent");
	io.getEvents($scope, $http, activeEvent);

	$scope.addEvent = function() {
		io.saveEvent($scope.school, $scope.name, $scope.date, function() {
      io.getEvents($scope, $http);
    });

    $scope.school = "";
    $scope.name = "";
    $scope.date = "";
  };

  $scope.updateEvent = function(index) {
  	var eventToUpdate = $scope.events[index];
    console.log(eventToUpdate);
  	io.updateEvent(eventToUpdate.id, eventToUpdate.school, eventToUpdate.name, eventToUpdate.date);
  	eventToUpdate.editing = false;
  }

  $scope.deleteEvent = function(index) {
  	var eventToDelete = $scope.events[index];
  	io.deleteEvent(eventToDelete.id, function() {
      io.getEvents($scope, $http);
    });
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
  console.log($scope.selectedEvent);
});

typeApp.controller("ParticipantCtrl", function($scope, $http, $routeParams) {
  var participantId = $routeParams.participantId;
  $scope.participant = io.getParticipant(participantId, $scope, $http);
});

typeApp.directive('datepicker', function() {
    return {
        restrict: 'A',
        require : 'ngModel',
        link : function (scope, element, attrs, ngModelCtrl) {
            $(function(){
                element.datepicker({
                    dateFormat: 'yy-mm-dd',
                    onSelect: function (date) {
                        ngModelCtrl.$setViewValue(date);
                        scope.$apply();
                    }
                });
            });
        }
    }
});