let viz = d3.select("#viz-container")
  .append("svg")
    .attr("id", "viz")
    .attr("width", 600)
    .attr("height", 400)
    .attr("background-color", "lavendar")
;


function gotData(incomingData){
  console.log("the incoming data is", incomingData);

}

d3.json("data.json").then(gotData);
