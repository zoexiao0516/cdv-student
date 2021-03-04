let w = 1200;
let h = 800;

let viz = d3.select("#container")
  .append("svg")
  .attr("width", w)
  .attr("height", h)
  .style("background-color", "lavender")
  ;


function gotData(incomingData) {
  // all the data:
  console.log("incoming data", incomingData);

  function filterFunction(datapoint) {
    // console.log(datapoint);
    if (datapoint.Code == "USA" || datapoint.Code == "CHN") {
      return true;
    } else {
      return false;
    }
  }

  let filteredData = incomingData.filter(filterFunction);
  console.log("filtered data", filteredData)

  // JS DATE OBJECTS
  // https://github.com/d3/d3-time-format#locale_format

  // convert year from a string to a data object
  let yearToDateObjectConverter = d3.timeParse("%Y");
  // let test = yearToDateObjectConverter("2019");
  // console.log(test);

  // "14:04"
  // let convertHoursAndMinutes = d3.timeParse("%H:%M");
  // let test2 = convertHoursAndMinutes("19:22");
  // console.log(test2);

  let valueKey = "Incidence - HIV/AIDS - Sex: Both - Age: All Ages (Number) (new cases of HIV)";

  // mapping function
  function mapFunction(datapoint) {
    datapoint.Year = yearToDateObjectConverter(datapoint.Year);
    datapoint[valueKey] = parseFloat(datapoint[valueKey]);
    return datapoint;
  }

  let filteredAndTimeAdjustedData = filteredData.map(mapFunction);
  console.log("filtered and time adjusted data", filteredAndTimeAdjustedData);

  function getTime(datapoint) {
    return datapoint.Year;
  }

  // X SCALE

  // MIN
  // let minTime = d3.min(filteredAndTimeAdjustedData, getTime);

  // MAX
  // let maxTime = d3.max(filteredAndTimeAdjustedData, getTime);

  // Alternative way to get the domain
  let alternativeXDomain = d3.extent(filteredAndTimeAdjustedData, getTime);

  // console.log("min time", minTime, "max time", maxTime, "extent", alternativeXDomain)

  let xPadding = 65;

  let xScale = d3.scaleTime().domain(alternativeXDomain).range([xPadding, w - xPadding * 2]);
  // console.log(xScale(yearToDateObjectConverter("2001")));

  // X AXIS
  let xAxisGroup = viz.append("g").attr("class", "xaxis");
  let xAxis = d3.axisBottom(xScale);
  xAxisGroup.call(xAxis);

  let xAxisPos = h - 30;
  xAxisGroup.attr("transform", "translate(0, " + xAxisPos + ")");

  // Y SCALE

  console.log(filteredAndTimeAdjustedData[0][valueKey]);

  function getCaseCount(datapoint) {
    return datapoint[valueKey];
  }

  let hivCaseCountExtent = d3.extent(filteredAndTimeAdjustedData, getCaseCount);
  console.log("hivCaseCountExtent", hivCaseCountExtent);

  let yPadding = 50;

  let yScale = d3.scaleLinear().domain(hivCaseCountExtent).range([h - yPadding, yPadding])

  // Y AXIS
  let yAxisGroup = viz.append("g").attr("class", "yaxis");
  let yAxis = d3.axisLeft(yScale);
  yAxisGroup.call(yAxis);
  yAxisGroup.attr("transform", "translate(" + (xPadding - 15) + ", 0)");

  let vizGroup = viz.append("g").attr("class", "vizGroup");

  let dataGroups = vizGroup.selectAll(".dataGroup").data(filteredData).enter()
    .append("g")
    .attr("class", "dataGroup")
    ;

  function getColor(d, i) {
    if (d.Code == "CHN") {
      return "red"
    } else {
      return "blue"
    }
  }

  let circles = dataGroups.append("circle")
    .attr("cx", 0)
    .attr("cy", 0)
    .attr("r", 5)
    .attr("fill", getColor)
    ;

  // Element.innerHTML = "<p>Hello</p>"

  // By default, we cannot use multiple line strings => use ``
  let shape = `<polygon points="61.93 108.58 54.08 196.51 165.57 218.49 297.64 253.04 200.11 168.25 335.16 180.81 335.16 135.27 272.35 108.58 229.95 33.2 176.56 97.58 61.93 108.58" style="fill: #231f20"/>
  <polygon points = "205.63 33.2 167.45 80.25 71.6 88.82 48.22 88.82 41.2 160.52 9.25 43.62 127.7 16.35 205.63 33.2" style = "fill: #231f20" />
  <polygon points="259.4 59.21 282 94.28 323.3 111.42 329.54 24.14 238.36 33.2 259.4 59.21" style="fill: #231f20"/>
  <path d="M62.24,244.68s330.15,49.94,205-56.11S36.78,14.1,178.89,71.68,360.71,38.17,360.71,38.17" style="fill: none;stroke: #44abe0;stroke-linecap: round;stroke-miterlimit: 10;stroke-width: 13px"/>`
  // in-line styling in path is stronger than .attr()

  let customShapes = dataGroups.append("g").attr("class", "customShape")
    .html(shape);

  customShapes.attr("transform", "scale(0.1)")
  // If we directly transfrom dataGroups, the later transform will overwrite it.

  // customShapes.select("path").attr("stroke", getColor);

  // function getCountryCode(d, i) {
  //   return d.Code;
  // }

  // let countryLabel = dataGroups.append("text")
  //   .attr("x", 7)
  //   .attr("y", 9)
  //   .text(getCountryCode)
  //   ;

  // function getYear(d, i) {
  //   return d.Year.getFullYear();
  // }

  // let yearLabel = dataGroups.append("text")
  //   .attr("x", 7)
  //   .attr("y", 23)
  //   .text(getYear)
  //   ;

  function getTranslate(d, i) {
    let x = xScale(d.Year);
    let y = yScale(d[valueKey]);
    return "translate(" + x + ", " + y + ")"
  }

  dataGroups.attr("transform", getTranslate);
}


d3.csv("new-cases-of-hiv-infection.csv").then(gotData);
