<?php
	include 'connectionString.php';
	
	main();

	function getDatabaseConnection() {
		$connectionString = new ConnectionString();

		$connection = mysqli_connect($connectionString->getHost(), $connectionString->getUsername(), $connectionString->getPassword()); 
		$success = mysqli_select_db($connection, $connectionString->getDatabase()); 

		if (!$connection || !$success) {
			throw new Exception("Error when connecting to database");
		}

		return $connection;
	}

	function postScore($name, $phone, $mail, $points, $eventId) {
		$connection = getDatabaseConnection();

		$name = mysqli_real_escape_string($connection, $name);
		$phone = mysqli_real_escape_string($connection, $phone);
		$mail = mysqli_real_escape_string($connection, $mail);
		$points = mysqli_real_escape_string($connection, $points);
		$eventId = mysqli_real_escape_string($connection, $eventId);

		$query = "INSERT INTO participant (name, phone, mail, points, event_id) VALUES ('$name', '$phone', '$mail', '$points', '$eventId')";

		$result = mysqli_query($connection, $query);

		if (!$result) {
			throw new Exception("Error when doing SQL query");
		}
	}

	function saveEvent($school, $name, $date) {
		$connection = getDatabaseConnection();

		$school = mysqli_real_escape_string($connection, $school);
		$name = mysqli_real_escape_string($connection, $name);
		$date = mysqli_real_escape_string($connection, $date);

		$query = "INSERT INTO event (school, name, date) VALUES ('$school', '$name', '$date')";

		$result = mysqli_query($connection, $query);

		if (!$result) {
			throw new Exception("Error when doing SQL query");
		}
	}


	function updateEvent($eventId, $school, $name, $date) {
		$connection = getDatabaseConnection();

		$eventId = mysqli_real_escape_string($connection, $eventId);
		$school = mysqli_real_escape_string($connection, $school);
		$name = mysqli_real_escape_string($connection, $name);
		$date = mysqli_real_escape_string($connection, $date);

		$query = "UPDATE event set school='$school', name='$name', date='$date' WHERE id='$eventId'";

		$result = mysqli_query($connection, $query);

		if (!$result) {
			mysql_error();
			throw new Exception("Error when doing SQL query".mysql_error());
		}
	}

	function deleteEvent($eventId) {
		$connection = getDatabaseConnection();

		$eventId = mysqli_real_escape_string($connection, $eventId);

		$query = "DELETE FROM event WHERE id=$eventId";

		$result = mysqli_query($connection, $query);

		if (!$result) {
			throw new Exception("Error when doing SQL query");
		}
	}

	function getHighScoreList() {
		$connection = getDatabaseConnection();

		$query = "SELECT name, phone, mail, points FROM participant ORDER BY points DESC LIMIT 0, 10";

		$result = mysqli_query($connection, $query);
		
		if (!$result) {
			throw new Exception("Error when doing SQL query");
		}

		$rows = array();

		while ($row = mysqli_fetch_assoc($result)) {
			$rows['participants'][] = $row;
		}

		header("Content-type: application/json");
		print json_encode($rows);
	}


	function getHighScoreListForEvent($eventId) {
		$connection = getDatabaseConnection();

		$eventId = mysqli_real_escape_string($connection, $eventId);

		$query = "SELECT name, phone, mail, points FROM participant WHERE event_id=$eventId ORDER BY points DESC LIMIT 0, 10";

		$result = mysqli_query($connection, $query);
		
		if (!$result) {
			throw new Exception("Error when doing SQL query");
		}

		$rows = array();

		while ($row = mysqli_fetch_assoc($result)) {
			$rows['participants'][] = $row;
		}

		header("Content-type: application/json");
		print json_encode($rows);
	}

	function getEvents() {
		$connection = getDatabaseConnection();

		$query = "SELECT id, school, name, date FROM event ORDER BY date DESC";

		$result = mysqli_query($connection, $query);
		
		if (!$result) {
			throw new Exception("Error when doing SQL query");
		}

		$rows = array();

		while ($row = mysqli_fetch_assoc($result)) {
			$rows['events'][] = $row;
		}

		header("Content-type: application/json");
		print json_encode($rows);
	}

	function main() {
		if ($_POST['fn'] == "postScore") {
			postScore($_POST['name'], $_POST['phone'], $_POST['mail'], $_POST['points'], $_POST['eventId']);
		} else if ($_POST['fn'] == "saveEvent") {
			saveEvent($_POST['school'], $_POST['name'], $_POST['date']);
		} else if ($_POST['fn'] == "updateEvent") {
			updateEvent($_POST['eventId'], $_POST['school'], $_POST['name'], $_POST['date']);
		} else if ($_POST['fn'] == "deleteEvent") {
			deleteEvent($_POST['eventId']);
		} else if ($_GET['fn'] == "getHighScoreListForEvent") {
			getHighScoreListForEvent($_GET['eventId']);
		} else if ($_GET['fn'] == "getHighScoreList") {
			getHighScoreList();
		} else if ($_GET['fn'] == "getEvents") {
			getEvents();
		}
	}
?>