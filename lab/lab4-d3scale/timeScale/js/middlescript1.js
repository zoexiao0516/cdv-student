let w = 2400;
let h = 800;

let viz = d3.select("#container")
  .append("svg")
  .attr("class", "viz")
  .attr("width", w)
  .attr("height", h)
  .style("background-color", "lightpink")
  ;

function filterFunction(datapoint) {
  if (datapoint.fame_score > 150) {
    return true
  } else {
    return false
  }
}

let timeParseFunction = d3.timeParse("%Y");

function mapFunction(datapoint) {
  datapoint.death_year = timeParseFunction(datapoint.death_year);
  return datapoint;
}

function transformData(dataToTransform) {
  let newData = dataToTransform.filter(filterFunction);

  let timeCorrected = newData.map(mapFunction);

  return timeCorrected;
}

function gotData(incomingData) {
  console.log("the original data is", incomingData);

  let transformedData = transformData(incomingData);
  console.log("the transformed data is", transformedData);

  function getYear(datapoint) {
    return datapoint.death_year;
  }

  let minYear = d3.min(transformedData, getYear);
  let maxYear = d3.max(transformedData, getYear);
  console.log(minYear, maxYear);

  let padding = 100;
  let timeScale = d3.scaleTime().domain([minYear, maxYear]).range([padding, w - padding]);

  let datagroups = viz.selectAll('.datagroup').data(transformedData).enter()
    .append('g')
    .attr("class", "datagroup")
    ;

  let circles = datagroups.append('circle')
    .attr("cx", 0)
    .attr("cy", 0)
    .attr("r", 10)
    .attr("fill", "white")
    ;

  function getText(d, i) {
    return d.name + " " + d.death_year.getFullYear();
  }

  let labels = datagroups.append("text")
    .attr("x", 0)
    .attr("y", 0)
    .text(getText)
    ;

  function positionGroup(d, i) {
    let x = timeScale(d.death_year);
    let y = padding + Math.random() * (h - padding * 2);
    return "translate(" + x + ", " + y + ")";
  }

  datagroups.attr("transform", positionGroup)
}


d3.json("celebrity_deaths.json").then(gotData);
