let viz = d3.select("#viz-container")
  .append("svg")
    .attr("id", "viz")
    .attr("width", 600)
    .attr("height", 400)
    .attr("background-color", "lavendar")
;

function randomX(){
  return Math.random() * 600;
}

function randomY(){
  return Math.random() * 400;
}

function randomTranslate(){
  let x = Math.random() * 600;
  let y = Math.random() * 400;
  return "translate(" + x + "," + y + ")";
}

function gotData(incomingData){
  console.log("the incoming data is", incomingData);

  // viz.selectAll("circle").data(incomingData).enter()
  //   .append("circle")
  //     .attr("cx", randomX)
  //     .attr("cy", randomY)
  //     .attr("r", 20)
  //     .attr("fill", "white")
  //     .attr("class", "class1")
  // ;
  //
  // viz.selectAll(".class2").data(incomingData).enter()  // nothing is entered here
  //   .append("circle")
  //     .attr("cx", randomX)
  //     .attr("cy", randomY)
  //     .attr("r", 20)
  //     .attr("fill", "pink")
  //     .attr("class", "class2")
  // ;

  // viz.selectAll(".food").data(incomingData).enter()
  //   .append("rect")
  //     .attr("x", randomX)
  //     .attr("y", randomY)
  //     .attr("width", 20)
  //     .attr("height", 20)
  //     .attr("class", "food")
  //
  // ;
  //
  // viz.selectAll(".foodtext").data(incomingData).enter()
  //   .append("text")
  //     .attr("x", randomX)
  //     .attr("y", randomY)
  //     .text("food")
  //     .attr("fill", "blue")
  // ;

  let datagroups = viz.selectAll(".datagroup").data(incomingData).enter()
    .append("g")  // the selection is all groups now
      .attr("class", "datagroup")
  ;

  datagroups.append("circle") // apply to each one in the datagroups
    .attr("cx", 0)
    .attr("cy", 0)
    .attr("r", 20)
  ;

  datagroups.append("text")
    .attr("x", 20)
    .attr("y", 10)
    .text("Hello")
  ;

  datagroups.attr("transform", randomTranslate);
}

d3.json("data.json").then(gotData);

// why groups?
  // clean structure
  // complex shapes / more expressive
  // move multiple shapes at the same time
  // link text to your shapes
