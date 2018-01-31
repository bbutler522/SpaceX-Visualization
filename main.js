// https://api.spacexdata.com/v2/launches
// https://api.spacexdata.com/v2/launches/upcoming

$.getJSON("https://api.spacexdata.com/v2/launches", function(json) {
  var html = "";

  // Create the html for each flight
  json.forEach(function(val) {
    var num = val.flight_number;
    var patchSrc = val.links.mission_patch;
    // Use a mirror for Imgur since they block some GET requests from codepen
    if (patchSrc.indexOf("imgur") > -1) {
      patchSrc = patchSrc.replace("i.imgur.com/", "kageurufu.net/imgur/?");
    }
    html += "<div class = 'launch card'>";
    html += "<div class='card-header'>";
    html += "<p><strong>Flight #:</strong> " + val.flight_number + "</p>";
    html += "<img class='launch-patch img-fluid' src='" + patchSrc + "' />";
    html += "</div>";
    html += "<div class='card-block'>";
    html += "<p><strong>Launch Year:</strong> " + val.launch_year + "</p>";
    html +=
      "<p><strong>Rocket Name:</strong> " + val.rocket.rocket_name + "</p>";
    html +=
      "<p><strong>Rocket Type:</strong> " + val.rocket.rocket_type + "</p>";
    if (val.launch_success === true) {
      html +=
        "<p class='launch-success'><strong>Launch Successful</strong></p>";
    } else {
      html += "<p class='launch-failure'><strong>Launch Failure</strong></p>";
    }
    if (val.rocket.first_stage.cores[0].land_success === true) {
      html += '<p class="text-info"><strong>Landing Successful</strong></p>';
    }
    var reuse = val.reuse;
    $.each(reuse, function(key, value) {
      if (value === true) {
        html += '<p class="text-info"><strong>Reused ' + key + '</strong></p>';
      }
    });
    if (val.details !== null) {
      html +=
        '<p><button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#details' +
        num +
        '" aria-expanded="false" aria-controls="details' +
        num +
        '">Details</button></p><div class="collapse" id="details' +
        num +
        '"><div class="card card-block">' +
        val.details +
        "</div></div>";
    }
    html += "</div>";
    html += "</div><br>";
  });
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
      legend: { position: "none" },
    };

    var chart = new google.charts.Bar(document.getElementById("chart_div"));

    chart.draw(data, google.charts.Bar.convertOptions(options));
  }
  
  $(window).resize(function(){
    drawChart();
  });
  //
  // End launches by year chart
  //
});