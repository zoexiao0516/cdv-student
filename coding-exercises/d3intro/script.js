console.log("js loaded...");

// console.log( document.getElementById("viz-container") );

let viz = d3.select("#viz-container")  // # means we are select element by // ID
  .append("svg")  // svg: code that describes shapes in relation to their surrounding
    .attr("id", "viz")  // the current selction is the svg
    .attr("width", 600)
    .attr("height", 600)
;
// the returned value of d3 selection is always the last selection
// <div id="viz-container"> <svg> <circle> </circle> </svg> </div>

// variable viz is a shortcut to the selction svg
viz.attr("height", 400);

let myCircle = viz.append("circle")
    .attr("cx", 250)  // center x - top left origin
    .attr("cy", 200)  // center y
    .attr("r", 20)  // radius
;

myCircle.attr("fill", "white");

let myRect = viz.append("rect")
    .attr("x", 100)
    .attr("y", 200)
    .attr("width", 40)
    .attr("height", 30)
;

let myEllipse = viz.append("ellipse")
    .attr("cx", 400)
    .attr("cy", 300)
    .attr("rx", 40)
    .attr("ry", 20)
;

let myLine = viz.append("line")
    .attr("x1", 250)
    .attr("x2", 200)
    .attr("y1", 100)
    .attr("y2", 150)
;

myLine.attr("stroke", "yellow");
myLine.attr("stroke-width", 10);
