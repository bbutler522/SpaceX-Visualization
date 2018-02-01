// https://api.spacexdata.com/v2/launches
// https://api.spacexdata.com/v2/launches/upcoming

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
    html += "<div class = 'launch card'>";
    var launchDate = new Date(val.launch_date_unix * 1000);

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

// Previous Launches
$.getJSON("https://api.spacexdata.com/v2/launches", function(json) {
  var html = "";

  // Create the html for each flight
  html = launchGen(json);

  // Add the html to the page
  $("#main").append(html);

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
});

$("#sortLaunchFirst").on("click", sortLaunchNumFirst);
$("#sortLaunchLast").on("click", sortLaunchNumLast);
