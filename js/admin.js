$(function() {
	$(".last").hide();

	admin.showEvents();
	bindKeys()
});

function bindKeys() {
	$("#add").on("click", admin.showLast);

	$(".last").keypress(function(event) {
    var enterKeyCode = 13;
    
    if (event.which === enterKeyCode) {
      var school = $("#school").val();
      var name = $("#name").val();

      if (school && name) {
        io.createNewEvent(school, name, function(data) {
          admin.hideLast();
          admin.clearFields();
          admin.showEvents();
        }, function(data) {
        		console.log(data);
        });
      } else {
      	console.log("Skriv inn all informasjon");
      }
    }
  });
}

var admin = (function() {

	function showLast() {
		$(".last").show();
		$("#school").focus();
	}

	function hideLast() {
		$(".last").hide();
	}

	function clearFields() {
		$("input[type=text]").val("");
	}

	function showEvents() {
		io.getEvents(function(events) {
			$("table tbody tr:not(:last)").remove();
			for (var i = 0; i < events.length; i++) {
					$(".last").before("<tr><td>" + events[i].school + "</td><td>" + events[i].name + "</td><td>DATO</td></tr>");
			}
		});
	}


	return {
		showLast: showLast,
		hideLast: hideLast,
		clearFields: clearFields,
		showEvents: showEvents
	}
})();