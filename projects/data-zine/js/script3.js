console.log("script for back page loaded!")


let viz = d3.select("#container").append("svg")
    .attr("class", "viz")
    .attr("width", 1200)
    .attr("height", 800)
    .style("background-color", "lavender")
    ;

//Append a defs (for definition) element to your SVG
let defs = viz.append("defs");

//Append a linearGradient element to the defs and give it a unique id
let linearGradient = defs.append("linearGradient")
    .attr("id", "linear-gradient");

//Draw the rectangle and fill with gradient
viz.append("rect")
    .attr('x', 100)
    .attr('y', 200)
    .attr("width", 400)
    .attr("height", 50)
    .style("fill", "url(#linear-gradient)");

//A color scale
var colorScale = d3.scaleLinear()
    .range(["#2c7bb6", "#00a6ca", "#00ccbc", "#90eb9d", "#ffff8c",
        "#f9d057", "#f29e2e", "#e76818", "#d7191c"]);

//Append multiple color stops by using D3's data/enter step
linearGradient.selectAll("stop")
    .data(colorScale.range())
    .enter().append("stop")
    .attr("offset", function (d, i) { return i / (colorScale.range().length - 1); })
    .attr("stop-color", function (d) { return d; });

viz.append("text")
    .attr('x', 530)
    .attr('y', 230)
    .style("font-family", "'Krona One', sans-serif")
    .text("color legend")
    ;