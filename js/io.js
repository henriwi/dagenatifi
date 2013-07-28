var io = (function() {
	var events = JSON.parse("{\"events\": [ {\"school\": \"NTNU\", \"name\": \"Bedpress\"}, {\"school\": \"UiO\", \"name\": \"Dagen at IFI\"}, {\"school\": \"HiOA\", \"name\": \"Næringslivsdagen\"} ]}");

	function postScore(name, phone, mail, points, successCallback, errorCallback) {
		$.ajax({
			type: "POST",
			url: "php/io.php",
			cache: false,
			data:  {fn: "postScore", name: name, phone: phone, mail: mail, points: points},
			success: function(data) {
				successCallback(data);
			},
			error: function(data) {
				errorCallback(data);
			}
		});
	}

	function createNewEvent(school, name, onSuccess, onError) {
		var event = {
			school: school,
			name: name
		};

		events.events.push(event);
		onSuccess();
	}

	function getEvents(onSuccess) {
		onSuccess(events.events);
	}

	function getHighScoreList(callback) {
		$.ajax({
			type: "POST",
			url: "php/io.php",
			cache: false,
			data:  {fn: "getHighScoreList"},
			success: function(data) {
				callback(data.participants);
			}
		});
	}

	return {
		postScore: postScore,
		createNewEvent: createNewEvent,
		getEvents: getEvents,
		getHighScoreList: getHighScoreList
	}
}());