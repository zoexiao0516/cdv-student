console.log("js loaded...");

let viz = d3.select("#viz-container")
  .append("svg")
    .attr("id", "viz")
    .attr("width", 800)
    .attr("height", 800)
;

let myData = d3.json("data.json").then(gotData);

function gotData(incomingData){
  console.log(incomingData);

  let group = viz.append("g")
      .attr("transform", "translate(400, 400)");

  var data = [
    {startAngle: 0, endAngle: Math.PI/4},
    {startAngle: Math.PI/4, endAngle: Math.PI/2},
    {startAngle: Math.PI/2, endAngle: Math.PI},
    {startAngle: Math.PI, endAngle: 2*Math.PI}
  ];

  group.selectAll("path").data(incomingData).enter()
    .append("path")
      .attr("class", "arc")
      .attr("d", chooseArc)
      .attr("fill", chooseColor)
      .attr("stroke", "gray")
      .attr("stroke-width", 1)
  ;
}

var r = 8;  // arc outer radius
var p = 6;  // arc perimeter

function chooseArc(datapoint){
  console.log(datapoint.diameter, datapoint.howLongHaveIUsedIt)
  // let arcGen = d3.arc()
  //     .innerRadius(20 * datapoint.diameter - 20)
  //     .outerRadius(20 * datapoint.diameter)
  //     .startAngle(0)
  //     .endAngle(Math.PI * 2 * datapoint.howLongHaveIUsedIt / 10);
  // return arcGen;

  return d3.arc()({
    innerRadius: 20 * datapoint.diameter - 20,
    outerRadius: 20 * datapoint.diameter,
    startAngle: 0,
    endAngle: Math.PI * 2 * datapoint.howLongHaveIUsedIt / 10
  })
}

function chooseColor(datapoint){
  console.log(datapoint.color)
  return datapoint.color;
}
