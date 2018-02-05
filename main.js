// https://api.spacexdata.com/v2/launches
// https://api.spacexdata.com/v2/launches/upcoming

// Countdown til launch
// Set the date we're counting down to
function launchCountdown(launchTime){
  var countDownDate = new Date(1517941800 * 1000);

  // Update the count down every 1 second
  var x = setInterval(function() {

    // Get todays date and time
    var now = new Date().getTime();

    // Find the distance between now an the count down date
    var distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Output the result in an element with id="demo"
    document.getElementById("launchCountdown").innerHTML = days + "d " + hours + "h "
      + minutes + "m " + seconds + "s ";

    // If the count down is over, write some text
    if (distance < 0) {
      clearInterval(x);
      document.getElementById("launchCountdown").innerHTML = "";
    }
    $('#launchCountdown').css('opacity','1')
  }, 1000);
}
// End Countdown Function


// Generate next launch
function nextLaunchGen(json) {
  var html = "";
  var val = json[0];
  var num = 'Next';
  var launchDate = new Date(val.launch_date_unix * 1000);
  html += "<div data-launch='" + num + "' class='launch card'>";
  html += "<div class='card-header toggle-header'>";
  html += "<p><strong>Flight #:</strong> " + val.flight_number + "</p>";
  html += "</div>";
  html += "<div class='card-block'>";
  html +=
    "<p class='date'><strong>Launch Date:</strong> " +
    launchDate.toLocaleDateString() +
    "</p>";
  html +=
    "<p><strong>Rocket Name:</strong> " + val.rocket.rocket_name + "</p>";
  html +=
    "<p><strong>Rocket Type:</strong> " + val.rocket.rocket_type + "</p>";
  var reuse = val.reuse;
  $.each(reuse, function(key, value) {
    if (value === true) {
      key = toTitleCase(key)
      html += '<p class="text-info"><strong>Reused ' + key + "</strong></p>";
    }
  });

  /* Accordion for Details and Payload */
  html +=
    '<div class="accordion" id="accordion' +
    num +
    '" role="tablist" aria-multiselectable="true">';
  if (val.details !== null) {
    html +=
      '<div class="card border-left-0 border-right-0  border-left-0 border-bottom-0"><div class="card-header" role="tab" id="headingOne' +
      num +
      '"><h5 class="mb-0"><a data-toggle="collapse" data-parent="#accordion' +
      num +
      '" href="#collapseOne' +
      num +
      '" aria-expanded="true" aria-controls="collapseOne' +
      num +
      '">Details</a></h5></div><div id="collapseOne' +
      num +
      '" class="collapse " role="tabpanel" aria-labelledby="headingOne' +
      num +
      '"><div class="card-block">' +
      val.details +
      "</div>";
  }

  html +=
    '</div></div><div class="card  border-left-0 border-right-0 border-bottom-0"><div class="card-header" role="tab" id="headingThree' +
    num +
    '"><h5 class="mb-0"><a class="collapsed" data-toggle="collapse" data-parent="#accordion' +
    num +
    '" href="#collapseThree' +
    num +
    '" aria-expanded="false" aria-controls="collapseThree' +
    num +
    '">Payload</a></h5></div><div id="collapseThree' +
    num +
    '" class="collapse" role="tabpanel" aria-labelledby="headingThree' +
    num +
    '"><div class="card-block">';
  // For each payload do
  var payload = val.rocket.second_stage.payloads;
  for (i = 0; i < payload.length; i++) {
    html += "<p><strong>ID:</strong> " + payload[i].payload_id + "</p>";
    html += "<p><strong>Type:</strong> " + payload[i].payload_type + "</p>";

    html += "<p><strong>Customers:</strong> ";
    // Get the customers
    for (j = 0; j < payload[i].customers.length; j++) {
      html += "<br/>" + payload[i].customers[j];
    }
    html += "<hr/>";
  }

  html += "</div></div></div>";
  html += "</div>";

  html += "</div>";
  html += "</div>";
  html += '<p class="col-12">Stream of launch usually available at <a href="http://www.spacex.com/webcast" target="_blank">http://www.spacex.com/webcast</a></p>'
  return html;

};

// Function to generate launches from JSON input
function launchGen(json) {
  var html = "";
  json.forEach(function(val) {
    var num = val.flight_number;
    var patchSrc = val.links.mission_patch;
    // Use a mirror for Imgur since they block some GET requests from codepen
    if (patchSrc !== null && patchSrc.indexOf("imgur") > -1) {
      patchSrc = patchSrc.replace("i.imgur.com/", "kageurufu.net/imgur/?");
    }
    var launchDate = new Date(val.launch_date_unix * 1000);

    html += "<div data-launch='" + num + "' class='launch card'>";
    html += "<div class='card-header'>";
    html += "<p><strong>Flight #:</strong> " + val.flight_number + "</p>";
    if (patchSrc !== null) {
      html += "<img class='launch-patch img-fluid' src='" + patchSrc + "' />";
    }
    html += "</div>";
    html += "<div class='card-block'>";
    html +=
      "<p class='date'><strong>Launch Date:</strong> " +
      launchDate.toLocaleDateString() +
      "</p>";
    html +=
      "<p><strong>Rocket Name:</strong> " + val.rocket.rocket_name + "</p>";
    html +=
      "<p><strong>Rocket Type:</strong> " + val.rocket.rocket_type + "</p>";
    if (val.launch_success === true) {
      html +=
        "<p class='launch-success'><strong>Launch Successful</strong></p>";
    } else if (val.launch_success !== null) {
      html += "<p class='launch-failure'><strong>Launch Failure</strong></p>";
    }
    if (val.rocket.first_stage.cores[0].land_success === true) {
      html += '<p class="text-info"><strong>Landing Successful</strong></p>';
    }
    var reuse = val.reuse;
    $.each(reuse, function(key, value) {
      if (value === true) {
        key = toTitleCase(key)
        html += '<p class="text-info"><strong>Reused ' + key + "</strong></p>";
      }
    });
    if (val.telemetry.flight_club !== null) {
      html +=
        '<p><a href="' +
        val.telemetry.flight_club +
        '" target="_blank">Telemetry</a></p>';
    }

    /* Accordion for Details and Payload */
    html +=
      '<div class="accordion" id="accordion' +
      num +
      '" role="tablist" aria-multiselectable="true">';
    if (val.details !== null) {
      html +=
        '<div class="card border-left-0 border-right-0  border-left-0 border-bottom-0"><div class="card-header" role="tab" id="headingOne' +
        num +
        '"><h5 class="mb-0"><a data-toggle="collapse" data-parent="#accordion' +
        num +
        '" href="#collapseOne' +
        num +
        '" aria-expanded="true" aria-controls="collapseOne' +
        num +
        '">Details</a></h5></div><div id="collapseOne' +
        num +
        '" class="collapse " role="tabpanel" aria-labelledby="headingOne' +
        num +
        '"><div class="card-block">' +
        val.details +
        "</div>";
    }

    html +=
      '</div></div><div class="card  border-left-0 border-right-0 border-bottom-0"><div class="card-header" role="tab" id="headingThree' +
      num +
      '"><h5 class="mb-0"><a class="collapsed" data-toggle="collapse" data-parent="#accordion' +
      num +
      '" href="#collapseThree' +
      num +
      '" aria-expanded="false" aria-controls="collapseThree' +
      num +
      '">Payload</a></h5></div><div id="collapseThree' +
      num +
      '" class="collapse" role="tabpanel" aria-labelledby="headingThree' +
      num +
      '"><div class="card-block">';
    // For each payload do
    var payload = val.rocket.second_stage.payloads;
    for (i = 0; i < payload.length; i++) {
      html += "<p><strong>ID:</strong> " + payload[i].payload_id + "</p>";
      html += "<p><strong>Type:</strong> " + payload[i].payload_type + "</p>";

      html += "<p><strong>Customers:</strong> ";
      // Get the customers
      for (j = 0; j < payload[i].customers.length; j++) {
        html += "<br/>" + payload[i].customers[j];
      }
      html += "<hr/>";
    }

    html += "</div></div></div>";
    html += "</div>";

    html += "</div>";
    html += "</div>";
  });
  return html;
}
// End Launch Gen Function

// Previous Launches
$.getJSON("https://api.spacexdata.com/v2/launches", function(json) {
  var html = "";

  // Create the html for each flight
  html = launchGen(json);

  // Add the html to the page
  $("#main").append(html);
  removeLoad("previousLoad");

  /* Create an array of the years since the first launch
  **  to track how many launches there were each year */
  var years = [];
  var dteNow = new Date().getFullYear();
  for (i = 2006; i <= dteNow; i++) {
    years.push([i, 0]);
  }

  // Go through the json and add one to the year each launch matches.
  // Could be a more time efficient algorithm.
  json.forEach(function(val) {
    for (i = 0; i < years.length; i++) {
      if (val.launch_year == years[i][0]) {
        years[i][1] += 1;
      }
    }
  });

  years.unshift(["year", "launches"]);

  $("#years").append(years);

  //
  // Draw the chart for number of launches per year
  //
  google.charts.load("current", { packages: ["bar"] });
  google.charts.setOnLoadCallback(drawChart);

  function drawChart() {
    var data = google.visualization.arrayToDataTable(years);

    var options = {
      chart: {
        title: "SpaceX Launches by Year",
        subtitle: "2006 to the present"
      },
      bars: "vertical",
      hAxis: { format: "", showTextEvery: 1 },
      height: 400,
      colors: ["#1b9e77", "#d95f02", "#7570b3"],
      legend: { position: "none" }
    };

    var chart = new google.charts.Bar(document.getElementById("chart_div"));

    chart.draw(data, google.charts.Bar.convertOptions(options));
  }


  removeLoad("chartLoad");

  $(window).resize(function() {
    drawChart();
  });
  //
  // End launches by year chart
  //
});

// Upcoming Launches
$.getJSON("https://api.spacexdata.com/v2/launches/upcoming", function(json) {
  var html = "";

  // Create the html for each flight
  html = launchGen(json);

  // Add the html to the page
  $("#upcoming").append(html);
  removeLoad("upcomingLoad");
});
// End Upcoming Launches

// Next Launch
$.getJSON("https://api.spacexdata.com/v2/launches/upcoming", function(json) {
  var html = "";
  // Create the html for each flight
  html = nextLaunchGen(json);

  // Add the html to the page
  $("#nextLaunch").append(html);
  removeLoad("nextLoad");

  // Add countdown until launch
  launchCountdown(json[0].launch_date_unix);

  // Hide section if there are no listed upcoming launches
  if (json[0] == undefined) {
    $('#nextLaunch').hide();
  }
});
// End Next Launch

// Sorting Previous Launches
$("#sortLaunchFirst").on("click", sortLaunchNumFirst);
$("#sortLaunchLast").on("click", sortLaunchNumLast);

function sortLaunchNumFirst() {
  var divList = $("#main .launch");
  divList.sort(function(a, b) {
    return $(b).data("launch") - $(a).data("launch");
  });
  $("#main").html(divList);
  $("#sortLaunchFirst").hide();
  $("#sortLaunchLast").show();
}

function sortLaunchNumLast() {
  var divList = $("#main .launch");
  divList.sort(function(a, b) {
    return $(a).data("launch") - $(b).data("launch");
  });
  $("#main").html(divList);
  $("#sortLaunchLast").hide();
  $("#sortLaunchFirst").show();
}
// End Sorting Previous Launches

// Show additional next launch info
$("#nextLaunch").on("click", ".toggle-header", function(){
  $("#nextLaunch" ).toggleClass( "hide-details" );
  $( "#nextLaunch" ).toggleClass( "show-details" );
});
// End show additional next launch info

// Make reused parts readable
// Remove underscore and make title case
function toTitleCase(str) {
  str = str.replace("_", " ");
    return str.replace(/(?:^|\s)\w/g, function(match) {
        return match.toUpperCase();
    });
}
// End reused parts readable

// Remove loading icon
function removeLoad(loadId){
  loadId = "#" + loadId;
  $(loadId).remove();
}

// Scroll to top
$(document).ready(function(){

	//Check to see if the window is top if not then display button
	$(window).scroll(function(){
		if ($(this).scrollTop() > 100) {
			$('.scrollToTop').fadeIn();
		} else {
			$('.scrollToTop').fadeOut();
		}
	});

	//Click event to scroll to top
	$('.scrollToTop').click(function(){
		$('html, body').animate({scrollTop : 0},800);
		return false;
	});
});
// end scroll to top
