var io = (function() {

	var events = [
		{
			school: "NTNU",
			name: "Bedpress",
			date: new Date("2013, 7, 31")
		},
		{
			school: "UiO",
			name: "Dagen at IFI",
			date: new Date("2013, 7, 27")
		},
		{
			school: "HiOA",
			name: "Næringslivsdagen",
			date: new Date("2013, 4, 27")
		}
	];

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

	function saveEvent(event, onSuccess, onError) {
		events.push(event);
	}

	function getEvents(onSuccess) {
		return events;
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
		saveEvent: saveEvent,
		getEvents: getEvents,
		getHighScoreList: getHighScoreList
	}
}());