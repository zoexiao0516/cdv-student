console.log("js loaded...");

// console.log( document.getElementById("viz-container") );

// stuff we do regardless of what the data is
let viz = d3.select("#viz-container")  // # means we are select element by // ID
  .append("svg")  // svg: code that describes shapes in relation to their surrounding
    .attr("id", "viz")  // the current selction is the svg
    .attr("width", 600)
    .attr("height", 600)
;
// the returned value of d3 selection is always the last selection
// <div id="viz-container"> <svg> <circle> </circle> </svg> </div>

// load the data, and do things with the data
d3.json("data.json").then(gotData);  // gotData is self-defined

function gotData(incomingData){
  console.log(incomingData);

  viz.selectAll("circle").data(incomingData).enter()
    .append("circle")
}


// variable viz is a shortcut to the selction svg
viz.attr("height", 400);

// let myCircle = viz.append("circle")
//     .attr("cx", 250)  // center x - top left origin
//     .attr("cy", 200)  // center y
//     .attr("r", 20)  // radius
// ;
//
// myCircle.attr("fill", "white");
//
// let myRect = viz.append("rect")
//     .attr("x", 100)
//     .attr("y", 200)
//     .attr("width", 40)
//     .attr("height", 30)
// ;
//
// let myEllipse = viz.append("ellipse")
//     .attr("cx", 400)
//     .attr("cy", 300)
//     .attr("rx", 40)
//     .attr("ry", 20)
// ;
//
// let myLine = viz.append("line")
//     .attr("x1", 250)
//     .attr("x2", 200)
//     .attr("y1", 100)
//     .attr("y2", 150)
// ;

// myLine.attr("stroke", "yellow");
// myLine.attr("stroke-width", 10);

let myData = [4, 6, 8, 2, 9];

function randomNumber(whatIsD3Passing){
  // check what is d3 passing
  console.log(whatIsD3Passing);
  return Math.random()*500;  // random number between 0 and 500
}

function xLocation(datapoint){
  console.log(datapoint);
  return datapoint * 40;
}

function chooseColor(datapoint){
  if (datapoint % 2 == 0){
    return "white";
  }
  else{
    return "black";
  }
}

viz.selectAll("circle").data(myData)  // empty selection
  // five placeholders elements bound to the 5 datapoints are created
  .enter()  // do something
  // d3 does the looping for us
  .append("circle")
    .attr("cx", xLocation)  // 如果用randomNumber（）这个5个element的attr都会相同
    .attr("cy", randomNumber)
    .attr("r", 20)
    .attr("fill", "none")
    .attr("stroke", "black")
;
