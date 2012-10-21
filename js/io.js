var io = (function() {
	function postScore(name, phone, mail, points) {
		$.ajax({
			type: "POST",
			url: "php/io.php",
			cache: false,
			data:  {fn: "postScore", name: name, phone: phone, mail: mail, points: points},
			success: function(data) {
				// success code
			}
		});
	}

	function getHighScoreList() {
		$.ajax({
			type: "POST",
			url: "php/io.php",
			cache: false,
			data:  {fn: "getHighScoreList"},
			success: function(data) {
				return data.participants;
			}
		});
	}

	return {
		postScore: postScore,
		getHighScoreList: getHighScoreList
	}
}());