var io = (function() {

	var events = [
		{
			school: "NTNU",
			name: "Bedpress",
			date: new Date("2013, 7, 31"),
			participants: [
				{
					name: "Henrik",
					phone: "45243706",
					email: "henrikwingerei@gmail.com",
					points: 167
				},
				{
					name: "Ole",
					phone: "99887766",
					email: "ole.hansen@hioa.no",
					points: 153
				}
			]
		},
		{
			school: "UiO",
			name: "Dagen at IFI",
			date: new Date("2013, 7, 27"),
			participants: [
				{
					name: "Petter",
					phone: "12345678",
					email: "petter@gmail.com",
					points: 100
				}
			]
		},
		{
			school: "HiOA",
			name: "Næringslivsdagen",
			date: new Date("2013, 4, 27"),
			participants: [
				{
					name: "Hans",
					phone: "22225555",
					email: "hans@uio.no",
					points: 58
				}
			]
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

	function saveEvent(event) {
		events.push(event);
	}

	function getEvents() {
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