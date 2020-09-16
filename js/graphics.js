google.charts.load('current', {'packages':['bar']});
google.charts.setOnLoadCallback(drawStuff);

function drawStuff() {
  var data = new google.visualization.arrayToDataTable([
    ['', ''],
    ["Governo", 75],
    ["Carnaval", 50],
    ["Esporte", 45],
    ["Férias", 30],
    ['Outros', 25]
  ]);

  var options = {
    width: "100%",
    height: 320,
    legend: { position: 'none' },
    bar: {groupWidth: "50%"},
    colors: ['#000']
  };

  var chart = new google.charts.Bar(document.getElementById('chart'));
  // Convert the Classic options to Material options.
  chart.draw(data, google.charts.Bar.convertOptions(options));
};