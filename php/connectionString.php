<?php
	class ConnectionString {
		// Enter database information
   		private $host = 'localhost';
   		private $username = 'root';
   		private $password = 'root';
   		private $database = 'dagen';

    	public function getHost() {
			if ($this->isOnLocalhost()) {
				return 'localhost';
			} else {
				return $this->host;
			}
    	}

    	public function getUsername() {
			if ($this->isOnLocalhost()) {
				return 'root';
			} else {
				return $this->username;
			}
    	}

    	public function getPassword() {
			if ($this->isOnLocalhost()) {
        		return 'root';
			} else {
				return $this->password;
			}
    	}

		public function getDatabase() {
      if ($this->isOnLocalhost()) {
        		return 'dagen';
			} else {
				return $this->database;	
			}
    }
    	
    private function isOnLocalhost() {
    		return ($_SERVER['SERVER_NAME'] === 'localhost');
    }
	}
?>