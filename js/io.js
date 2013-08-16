var io = (function() {

	function postScore(name, phone, mail, points, eventId, successCallback, errorCallback) {
		$.ajax({
			type: "POST",
			url: "php/io.php",
			cache: false,
			data:  {fn: "postScore", name: name, phone: phone, mail: mail, points: points, eventId: eventId },
			success: function(data) {
				successCallback(data);
			},
			error: function(data) {
				errorCallback(data);
			}
		});
	}

	function saveEvent(school, name, date, callback) {
		$.ajax({
			type: "POST",
			url: "php/io.php",
			cache: false,
			data:  {fn: "saveEvent", school: school, name: name, date: date },
			success: function() {
				callback();
				console.log("Event saved");
			},
			error: function() {
				 console.log("ERROR");
			}
		});
	}

	function updateEvent(eventId, school, name, date) {
		$.ajax({
			type: "POST",
			url: "php/io.php",
			cache: false,
			data:  {fn: "updateEvent", eventId: eventId, school: school, name: name, date: date },
			success: function() {
				console.log("Event updated");
			},
			error: function() {
				 console.log("ERROR");
			}
		});
	}

	function deleteEvent(eventId, callback) {
		$.ajax({
			type: "POST",
			url: "php/io.php",
			cache: false,
			data:  {fn: "deleteEvent", eventId: eventId},
			success: function() {
				callback();
				console.log("Event deleted");
			},
			error: function() {
				 console.log("ERROR");
			}
		});
	}

	function getEvents($scope, $http, activeEvent) {
	  $http.get("php/io.php?fn=getEvents")
	    .success(function(data, status, headers, config) {
	      $scope.events = data.events;

	      // Checks if an active event exists
			  for (i = 0; i < $scope.events.length; i++) {
			    if (!(typeof activeEvent === 'undefined') && activeEvent.id === $scope.events[i].id) {
			      $scope.events[i].active = true;
			    }
			  }
	  }).error(function(data, status, headers, config) {
	      console.log("ERROR");
	      console.log(data);
	  });
	}

	function getParticipants($scope, $http) {
	  $http.get("php/io.php?fn=getHighScoreList")
	    .success(function(data, status, headers, config) {
	      $scope.participants = data.participants;
	  }).error(function(data, status, headers, config) {
	      console.log("ERROR");
	      console.log(data);
	  });
	}


	function getParticipant(participantId, $scope, $http) {
	  $http.get("php/io.php?fn=getParticipant&participantId=" + participantId)
	    .success(function(data, status, headers, config) {
	      $scope.participant = data.participant;
	  }).error(function(data, status, headers, config) {
	      console.log("ERROR");
	      console.log(data);
	  });
	}

	function getParticipantsForEvent(eventId, $scope, $http) {
	  $http.get("php/io.php?fn=getHighScoreListForEvent&eventId=" + eventId)
	    .success(function(data, status, headers, config) {
	      $scope.participants = data.participants;
	  }).error(function(data, status, headers, config) {
	      console.log("ERROR");
	      console.log(data);
	  });
	}

	return {
		postScore: postScore,
		saveEvent: saveEvent,
		getEvents: getEvents,
		deleteEvent: deleteEvent,
		updateEvent: updateEvent,
		getParticipant: getParticipant,
		getParticipants: getParticipants,
		getParticipantsForEvent: getParticipantsForEvent
	}
}());