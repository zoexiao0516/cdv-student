console.log("script for middle spread loaded!")

let w = 2400;
let h = 800;
let r = 130;

let viz = d3.select("#container").append("svg")
    .attr("class", "viz")
    .attr("width", w)
    .attr("height", h)
    .style("background-color", "lavender")
    ;

// create a path
let myPoints = [{ x: 0, y: 100 }, { x: 500, y: 500 }, { x: 900, y: 400 }, { x: 1400, y: 150 }, { x: 1800, y: 400 }, { x: 2100, y: 500 }, { x: 2400, y: 400 }]

// prepare a helper function
let curveFunc = d3.line()
    .curve(d3.curveBasis)  // This is where you define the type of curve. Try curveStep for instance.
    .x(function (d) { return d.x })
    .y(function (d) { return d.y })

// Add the path using this helper function
viz.append('path')
    .attr("id", "wavy")
    .attr('d', curveFunc(myPoints))
    .attr('fill', 'none')
    // .attr('stroke', 'black')
    .style("stroke", "#AAAAAA")
    .style("stroke-dasharray", "5,5");

//Create an SVG text element and append a textPath element
textArc = viz.append("text")
    .style("text-anchor", "middle")
    .append("textPath")				//append a textPath to the text element
    .attr("xlink:href", "#wavy") 	//place the ID of the path here
    .attr("startOffset", "50%")		//place the text halfway on the arc
    // .style("font-family", "'Pacifico', sans-serif")
    .style("font-family", "'Krona One', sans-serif")
    .style("font-size", 62)
    .style("fill", "#333333")
    .text("Hey y'all, here are two weeks of round-shaped food I ate...");

function gotData(incomingData) {
    // console.log("incoming data is", incomingData);

    function getDiameter(datapoint) {
        return datapoint.diameter;
    }

    let minDiameter = d3.min(incomingData, getDiameter);
    let maxDiameter = d3.max(incomingData, getDiameter);

    let radiusScale = d3.scaleLinear().domain([minDiameter, maxDiameter]).range([r / 4, r]);

    function chooseRadius(datapoint) {
        console.log(radiusScale(datapoint.diameter));
        return radiusScale(datapoint.diameter);
    }

    function chooseNodeColor(d, i) {
        var nodeColor;
        if (d.category == "fruit") {
            nodeColor = "orange";
        } else if (d.category == "veggie") {
            nodeColor = "lightgreen";
        } else if (d.category == "carbs") {
            nodeColor = "yellow";
        } else if (d.category == "sweets") {
            nodeColor = "lightpink";
        } else if (d.category == "protein" || d.category == "nuts") {
            nodeColor = "lightsalmon";
        }
        return nodeColor;
    }

    var node = viz.selectAll("circle").data(incomingData).enter()
        .append("circle")
        .attr("r", chooseRadius)
        .attr("fill", chooseNodeColor)
        .attr("stroke", "black")
        ;

    let groups = viz.selectAll(".group").data(incomingData).enter()
        .append("g")
        .attr("class", "group")
        ;

    groups.append("circle")
        .attr("r", chooseRadius)
        .attr("fill", "none")
        .attr("stroke", "black")
        .attr("stroke-width", 5)
        ;

    function chooseArc1(d, i) {
        let innerR = radiusScale(d.diameter) - 10;
        let endAngle = (d.fondness) * 60 / 360 * Math.PI * 2;
        console.log("end angle is", endAngle);
        return d3.arc()({
            innerRadius: innerR,
            outerRadius: innerR + 5,
            cornerRadius: 15,
            startAngle: 0,
            endAngle: endAngle
        })
    }

    let colorScale1 = d3.scaleLinear()
        .domain([0, 5])
        .range(["#f9d057", "#f29e2e", "#e76818", "#d7191c"])
        ;

    function chooseArc1Color(d, i) {
        return colorScale1(d.fondness);
    }

    groups.append("path")
        .attr("class", "arc1")
        .attr("d", chooseArc1)
        .attr("fill", chooseArc1Color)
        .attr("stroke", "gray")
        .attr("stroke-width", 1)
        ;

    function chooseArc2(d, i) {
        let innerR = radiusScale(d.diameter) - 20;
        let endAngle = (d.frequency) * 25 / 360 * Math.PI * 2;
        console.log("end angle is", endAngle);
        return d3.arc()({
            innerRadius: innerR,
            outerRadius: innerR + 5,
            cornerRadius: 15,
            startAngle: 0,
            endAngle: endAngle
        })
    }

    let colorScale2 = d3.scaleLinear()
        .domain([1, 14])
        .range(["#2c7bb6", "#00a6ca", "#00ccbc", "#90eb9d"]);

    function chooseArc2Color(d, i) {
        return colorScale2(d.frequency);
    }

    groups.append("path")
        .attr("class", "arc2")
        .attr("d", chooseArc2)
        .attr("fill", chooseArc2Color)
        .attr("stroke", "gray")
        .attr("stroke-width", 1)
        ;

    function chooseIcon1(d, i) {
        Icon1 = ["M789.003772 0a309.359066 309.359066 0 0 0-231.618488 104.757051A314.23704 314.23704 0 0 0 325.766797 0C146.168662 0 0.034112 156.436286 0.034112 348.655752a357.388349 357.388349 0 0 0 12.860113 95.13755h221.555534a1792.638401 1792.638401 0 0 0 84.221803-174.856608c31.996781-64.812242 98.002933-51.508677 111.442945 20.467024l47.926948 256.65648 47.756389-108.031775c29.540738-65.051024 95.512778-57.068885 113.114419 13.371789l16.714736 66.449605 46.801261-61.401072 13.098896-18.317987h188.637737a51.16756 51.16756 0 0 1 0 100.970652h-146.066327l-58.910918 80.503627c-37.795771 52.907257-99.299178 38.37567-115.979802-27.562259l-10.642852-42.298516-1.19391-4.877974-52.190911 124.780623c-30.461754 67.131838-97.252475 55.329188-110.931269-17.840423l-48.029283-257.202267-64.812243 124.746511-12.587219 25.447333H55.670305c12.109656 21.490375 24.696876 40.934048 35.98785 58.433353 113.9331 176.289299 400.062094 393.751428 412.444644 401.699456a90.123129 90.123129 0 0 0 53.248374 18.556768 84.835814 84.835814 0 0 0 53.282485-18.556768c12.382549-9.278384 297.249411-226.706401 412.444644-401.699456a452.662345 452.662345 0 0 0 91.624043-254.541554c0-192.117131-146.134551-348.553417-325.664462-348.553417"]
        if (d.category == "veggie" || d.category == "fruit" || d.category == "protein" || d.category == "nuts") {
            return Icon1;
        }
    }

    groups.append("path")
        .attr("class", "icon1")
        .attr("d", chooseIcon1)
        .attr("fill", "darkgreen")
        .attr("stroke-width", 20)
        .attr("transform", "scale(0.02)")
        ;

    groups.append("text")
        .attr('x', 7)
        .attr('y', 5)
        .style("font-family", "'Krona One', sans-serif")
        .text(function (d, i) {
            return `food ${i}`;
        })
        ;

    function chooseForceX(d) {
        var forceX;
        if (d.category == "fruit") {
            forceX = 300;
        } else if (d.category == "veggie") {
            forceX = 700;
        } else if (d.category == "carbs") {
            forceX = 1400;
        } else if (d.category == "sweets") {
            forceX = 1900;
        } else if (d.category == "protein" || d.category == "nuts") {
            forceX = 2100;
        }
        console.log("forceX", forceX, "food category:", d.category);
        return forceX;
    }

    function chooseForceY(d) {
        var forceY;
        if (d.category == "fruit") {
            forceY = 600;
        } else if (d.category == "veggie") {
            forceY = 200;
        } else if (d.category == "carbs") {
            forceY = 550;
        } else if (d.category == "sweets") {
            forceY = 200;
        } else if (d.category == "protein" || d.category == "nuts") {
            forceY = 600;
        }
        console.log("forceY:", forceY, "food category:", d.category);
        return forceY;
    }

    var simulation = d3.forceSimulation()
        .force("collide",
            d3.forceCollide()
                .radius(chooseRadius)
                .strength(0.7)
                .iterations(16))
        .force("charge", d3.forceManyBody().strength(-20))
        .force("x", d3.forceX().strength(0.1).x(chooseForceX))
        .force("y", d3.forceY().strength(0.1).y(chooseForceY));

    function ticked() {
        groups.attr("transform", function (d, i) {
            if (i == 0) {
                // console.log(d)
            }
            return "translate(" + d.x + "," + d.y + ")"
        })

        node
            .attr("cx", function (d) { return d.x; })
            .attr("cy", function (d) { return d.y; });
    }

    simulation
        .nodes(incomingData)
        .on("tick", ticked);

    // console.log("after simulation:", incomingData);
}

d3.json("rounds.json").then(gotData);
