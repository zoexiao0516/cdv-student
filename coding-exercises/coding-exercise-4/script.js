groupContSize = 100;

let viz = d3.select("#viz-container")
  .append("svg")
    .attr("id", "viz")
    .attr("width", groupContSize * 16)
    .attr("height", groupContSize * 10)
    // .attr("background-color", "lavendar")
;

// myPath = ['M 0,0 L 10,-15 L -8,-40 L 0,-50 L 8,-40 L -10,-15 L 0,0'];
myPath = ['M 50,50 L 60,35 L 42,10 L 50,0 L 58,10 L 40,35 L 50,50'];

// myPath.attr("transform", "translate(50, 50)");

let data = d3.json("data.json").then(gotData);

var dataPointLength;

function gotData(incomingData){
  console.log("the incoming data is", incomingData);
  // var dataPointLength = incomingData.length;
  // console.log("the length of incoming data is", dataPointLength);

  let groups = viz.selectAll(".group").data(incomingData).enter()
    .append("g")
      .attr("class", "group")
      .attr('transform', createGroup)
  ;

  groups.append("circle")
    .attr("cx", groupContSize / 2)
    .attr("cy", groupContSize / 2)
    .attr("r", groupContSize / 2)
    .attr("fill", "none")
    .attr("stroke", "gray")
    .attr("stroke-width", 3)

  groups.append("circle")
    .attr("cx", groupContSize / 2)
    .attr("cy", groupContSize / 2)
    .attr("r", 2)
    .attr("fill", "gray")

  groups.append("path")
    .attr("d", myPath)
    .attr('transform', pathRotate)
    .attr("fill", chooseColor)
  ;
}

var i = 0;

function createGroup(datapoint) {
  let x = (i % 8 * groupContSize * 2 + 100);
  let y = (Math.floor(i / 8) * groupContSize * 2 + 100);
  console.log(i, x, y);
  i += 1;
  let groupSize = datapoint.diameter * 0.1;
  return "translate(" + x + "," + y + ")scale(" + groupSize + ")";
}

function pathRotate(datapoint){
  let howLong = datapoint.howLongHaveIUsedIt;
  let angle = howLong * 36
  console.log("how long: ", howLong, "angle:", angle);
  return "rotate(" + angle + " " + groupContSize / 2 + " " + groupContSize / 2 + ")";
}

function chooseColor(datapoint){
  let howLong = datapoint.howLongHaveIUsedIt;
  let angle = howLong * 36
  return d3.interpolateWarm(angle / 360);
}
