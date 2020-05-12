google.charts.load('current', {
  'packages': ['corechart']
});

google.charts.setOnLoadCallback(function() {
  fetch('https://cors-anywhere.herokuapp.com/https://dl.google.com/android/studio/metadata/distributions.json')
    .then(readResponseAsJSON)
    .then(parseJsonIntoPieChartNames)
    .then(parseJsonIntoPieChartPercentages)
    .then(combineArrays)
    // .then(logValues) // checking output
    .then(drawChart)
});

var names = [];
var percentages = [];
var combinedArray = [];

function readResponseAsJSON(response) {
  return response.json();
}

function parseJsonIntoPieChartNames(json) {
  names = json.map(value => value.version + " API " + value.apiLevel)
  return json;
}

function parseJsonIntoPieChartPercentages(json) {
  percentages = json.map(value => (value.distributionPercentage * 100).toFixed(1))
  return json;
}

function logValues() {
  console.log(names);
  console.log(percentages);
  console.log(combinedArray);
}

function combineArrays() {
  combinedArray = names.map((value, i) => [value, parseFloat(percentages[i])])
  combinedArray.unshift(["Name", "Percentage"])
}

function drawChart() {
  console.log("Drawing chart with" + combinedArray);
  var data = google.visualization.arrayToDataTable(combinedArray, false);

  var options = {
    title: 'Android Distribution Chart',
    is3d: true,
    legend: {position: 'bottom'}
  };

  var chart = new google.visualization.ColumnChart(document.getElementById('piechart'));

  chart.draw(data, options);
}
