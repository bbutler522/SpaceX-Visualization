import React from 'react';
import ReactDOM from 'react-dom/client';
import Main from "./Main";

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);

// Chart JSON
$.getJSON("https://api.spacexdata.com/v2/launches", function(json) {

  /* Create an array of the years since the first launch
  **  to track how many launches there were each year */
  var years = [];
  var dteNow = new Date().getFullYear();
  for (var i = 2006; i <= dteNow; i++) {
    years.push([i, 0]);
  }

  // Go through the json and add one to the year each launch matches.
  // Could be a more time efficient algorithm.
  json.forEach(function(val) {
    for (var i = 0; i < years.length; i++) {
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
// End Previous launches

// Next Launch
$.getJSON("https://api.spacexdata.com/v2/launches/upcoming", function(json) {

  // Add countdown until launch
  launchCountdown(json[0].launch_date_unix);
  // Hide section if there are no listed upcoming launches
  if (json[0] == undefined) {
    $("#nextLaunch").hide();
  }
});
// End Next Launch

// Countdown til launch
// Set the date we're counting down to
function launchCountdown(launchTime) {
  var countDownDate = new Date(launchTime * 1000);

  // Update the count down every 1 second
  var x = setInterval(function() {
    // Get todays date and time
    var now = new Date().getTime();

    // Find the distance between now an the count down date
    var distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Output the result in an element with id="demo"
    document.getElementById("launchCountdown").innerHTML =
      days + "d " + hours + "h " + minutes + "m " + seconds + "s ";

    // If the count down is over, write some text
    if (distance < 0) {
      clearInterval(x);
      document.getElementById("launchCountdown").innerHTML = "Estimated Launch Time Reached";
    }
    $("#launchCountdown").css("opacity", "1");
  }, 1000);
}
// End Countdown Function

// Remove loading icon
function removeLoad(loadId) {
  loadId = "#" + loadId;
  $(loadId).remove();
}
// End remove loading icon

// Scroll to top
$(document).ready(function() {
  //Check to see if the window is top if not then display button
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $(".scrollToTop").fadeIn();
    } else {
      $(".scrollToTop").fadeOut();
    }
  });

  //Click event to scroll to top
  $(".scrollToTop").click(function() {
    $("html, body").animate({ scrollTop: 0 }, 800);
    return false;
  });
});
// end scroll to top

// Add smooth scrolling to nav links
$(function() {
  $('a').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top-200
        }, 1000);
        return false;
      }
    }
  });
});
// End Smooth Scrolling

// Mobile nav menu functionality
$('#menuTab').on('click', function() {
  $('#navigation').toggleClass('responsive');
  $(this).children().toggleClass('fa-bars');
  $(this).children().toggleClass('fa-times');
});
// End nav menu functions

/****
Thanks to https://github.com/r-spacex/SpaceX-API for creating the following APIs

https://api.spacexdata.com/v2/launches
https://api.spacexdata.com/v2/launches/upcoming

Company: https://api.spacexdata.com/v2/info
Rockets: https://api.spacexdata.com/v2/rockets
Capsules: https://api.spacexdata.com/v2/capsules
Launchpads: https://api.spacexdata.com/v2/launchpads
Capsule Detail: https://api.spacexdata.com/v2/parts/caps
Core Detail: https://api.spacexdata.com/v2/parts/cores
****/

// Project by BrennanButler.com
