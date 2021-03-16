console.log("hi, I'm js. I'm loaded...");
//data from https://towardsdatascience.com/how-to-build-animated-charts-like-hans-rosling-doing-it-all-in-r-570efc6ba382
// 54 data points (1962 - 2015) for each country
// "Country","year","life","fert","pop","continent"

let w = 1200;
let h = 800;
let xPadding = 50;
let yPadding = 50;

let viz = d3.select("#container")
  .append("svg")
  .attr("width", w)
  .attr("height", h)
  .style("background-color", "black")
  ;


function gotData(incomingData) {
  // console.log(incomingData);

  // min max fertility rate (for xScale)
  let fertExtent = d3.extent(incomingData, function (d, i) {
    return d.fert;
  });
  // console.log("fertExtent", fertExtent);  // ["0", "8.45"]

  // make the xscale which we use to locate points along the xaxis
  let xScale = d3.scaleLinear().domain(fertExtent).range([xPadding, w - xPadding]);


  // min max life expectancy
  let lifeExtent = d3.extent(incomingData, function (d, i) {
    return d.life;
  });
  // console.log("lifeExtent", lifeExtent);  // ["13.2", "83.73"]

  // make the yscale which we use to locate points along the yaxis
  let yScale = d3.scaleLinear().domain(lifeExtent).range([h - yPadding, yPadding]);

  // using the function defined at the bottom of this script to build two axis
  buildXAndYAxis(xScale, yScale);


  // min max Population
  let popExtent = d3.extent(incomingData, function (d, i) {
    return d.pop;
  });
  // console.log("popExtent", popExtent);  // ["0", "997.8"]

  // you may use this scale to define a radius for the circles
  let rScale = d3.scaleLinear().domain(popExtent).range([5, 50]);




  // the simple out put of this complicated bit of code,
  // is an array of all the years the data talks about.
  // the "dates" array looks like:
  // ["1962", "1963", "1964", "1965", ... , "2012", "2013", "2014", "2015"]
  let dates = incomingData.reduce(function (acc, d, i) {
    if (!acc.includes(d.year)) {
      acc.push(d.year)
    }
    return acc
  }, [])

  // console.log("dates", dates);

  // this block of code is needed to select a subsection of the data (by year)
  let currentYearIndex = 0;
  let currentYear = dates[currentYearIndex];
  function filterYear(d, i) {
    if (d.year == currentYear) {
      return true;
    } else {
      return false;
    }
  }


  // make a group for all things visualization:
  let vizGroup = viz.append("g").attr("class", "vizGroup");

  function assignKey(d, i) {
    return d.Country;
  }

  function getIncomingGroupLocation(d, i) {
    let x = xScale(d.fert);
    let y = -30;
    return "translate(" + x + "," + y + ")";
  }

  function getGroupLocation(d, i) {
    let x = xScale(d.fert);
    let y = yScale(d.life);
    return "translate(" + x + "," + y + ")";
  }


  // this function is called every second.
  // inside it is a data variable that always carries the "latest" data of a new year
  // inside it we want to draw shapes and deal wirth both updating and entering element.
  function drawViz() {

    let currentYearData = incomingData.filter(filterYear);
    console.log("---\nthe currentYearData array now carries the data for year", currentYear);


    // Below here is where your coding should take place! learn from lab 6:
    // https://github.com/leoneckert/critical-data-and-visualization-spring-2020/tree/master/labs/lab-6
    // the three steps in the comments below help you to know what to aim for here

    // bind currentYearData to elements
    let dataGroups = vizGroup.selectAll(".datagroup").data(currentYearData, assignKey);


    // take care of entering elements
    let enteringElements = dataGroups.enter()
      .append("g")
      .attr("class", "datagroup")
      ;

    enteringElements.append("circle")
      .attr("r", function (d, i) {
        return rScale(d.pop)
      })
      .style("opacity", 0.8)
      .style("fill", function (d, i) {
        if (d.continent == "Africa") {
          return "#c23129";
        } else if (d.continent == "Americas") {
          return "#f2b06e";
        } else if (d.continent == "Asia") {
          return "#fffec6";
        } else if (d.continent == "Europe") {
          return "#b5dba9";
        } else if (d.continent == "Oceania") {
          return "#4382b5";
        }
      })

    enteringElements.attr("transform", getIncomingGroupLocation).transition().delay(500).attr("transform", getGroupLocation);


    // take care of updating elements
    dataGroups.transition().duration(500).attr("transform", getGroupLocation);  // this is where we change the location









  }  // the end of drawViz




  // this puts the YEAR onto the visualization
  let year = viz.append("text")
    .text("")
    .attr("x", 100)
    .attr("y", h - 100)
    .attr("font-family", "sans-serif")
    .attr("font-size", "2.7em")

    ;

  // this called the drawViz function every second
  // and changes the year of interest
  // and updates the text element that displays the year.
  setInterval(function () {
    if (currentYearIndex > dates.length) {
      currentYearIndex = 0;
    }
    currentYear = dates[currentYearIndex];
    currentYearIndex++;
    year.text(currentYear).attr("fill", "white")
    drawViz();
  }, 1000);






}  // the end of gotData


// load data
d3.csv("data.csv").then(gotData);





// function to build x anc y axis.
// the only reasons these are down here is to make the code above look less polluted

function buildXAndYAxis(xScale, yScale) {
  let xAxisGroup = viz.append("g").attr("class", 'xaxis');
  let xAxis = d3.axisBottom(xScale);
  xAxisGroup.call(xAxis)
  xAxisGroup.attr("transform", "translate(0, " + (h - yPadding) + ")")
  xAxisGroup.attr("fill", "white");
  xAxisGroup.attr("stroke", "white");
  xAxisGroup.append("g").attr('class', 'xLabel')
    .attr("transform", "translate(" + w / 2 + ", 40)")
    .append("text")
    .attr("fill", "white")
    .text("fertility")
    .attr("font-family", "sans-serif")
    .attr("font-size", "1.7em")

    ;

  let yAxisGroup = viz.append("g").attr("class", 'yaxis');
  let yAxis = d3.axisLeft(yScale);
  yAxisGroup.call(yAxis)
  yAxisGroup.attr("transform", "translate(" + xPadding + ", 0)")
  yAxisGroup.attr("fill", "white");
  yAxisGroup.attr("stroke", "white");

  yAxisGroup.append("g").attr('class', 'xLabel')
    .attr("transform", "translate(-33, " + h / 2 + ") rotate(-90)")
    .append("text")
    .attr("fill", "white")
    .text("life expectancy")
    .attr("font-family", "sans-serif")
    .attr("font-size", "1.7em")

    ;

}

// create legend for continents

// create a list of keys
let keys = ["Africa", "Americas", "Asia", "Europe", "Oceania"]

// Add one dot in the legend for each name.
viz.selectAll("mydots")
  .data(keys)
  .enter()
  .append("circle")
  .attr("cx", 100)
  .attr("cy", function (d, i) { return 500 + i * 25 }) // 100 is where the first dot appears. 25 is the distance between dots
  .attr("r", 7)
  .style("opacity", 0.8)
  .style("fill", function (d) {
    if (d == "Africa") {
      return "#c23129";
    } else if (d == "Americas") {
      return "#f2b06e";
    } else if (d == "Asia") {
      return "#fffec6";
    } else if (d == "Europe") {
      return "#b5dba9";
    } else if (d == "Oceania") {
      return "#4382b5";
    }
  })

// Add one dot in the legend for each name.
viz.selectAll("mylabels")
  .data(keys)
  .enter()
  .append("text")
  .attr("x", 120)
  .attr("y", function (d, i) { return 500 + i * 25 }) // 100 is where the first dot appears. 25 is the distance between dots
  .style("fill", function (d) {
    if (d == "Africa") {
      return "#c23129";
    } else if (d == "Americas") {
      return "#f2b06e";
    } else if (d == "Asia") {
      return "#fffec6";
    } else if (d == "Europe") {
      return "#b5dba9";
    } else if (d == "Oceania") {
      return "#4382b5";
    }
  })
  .text(function (d) { return d })
  .attr("text-anchor", "left")
  .style("alignment-baseline", "middle")
