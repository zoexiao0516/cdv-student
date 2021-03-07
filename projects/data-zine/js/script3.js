console.log("script for back page loaded!")


let viz = d3.select("#container").append("svg")
    .attr("class", "viz")
    .attr("width", 1200)
    .attr("height", 800)
    .style("background-color", "#fae3d9")
    ;

// //Append a defs (for definition) element to your SVG
// let defs = viz.append("defs");

// //Append a linearGradient element to the defs and give it a unique id
// let linearGradient = defs.append("linearGradient")
//     .attr("id", "linear-gradient");

// //Draw the rectangle and fill with gradient
// viz.append("rect")
//     .attr('x', 100)
//     .attr('y', 200)
//     .attr("width", 400)
//     .attr("height", 50)
//     .style("fill", "url(#linear-gradient)");

// //A color scale
// var colorScale = d3.scaleLinear()
//     .range(["#2c7bb6", "#00a6ca", "#00ccbc", "#90eb9d", "#ffff8c",
//         "#f9d057", "#f29e2e", "#e76818", "#d7191c"]);

// //Append multiple color stops by using D3's data/enter step
// linearGradient.selectAll("stop")
//     .data(colorScale.range())
//     .enter().append("stop")
//     .attr("offset", function (d, i) { return i / (colorScale.range().length - 1); })
//     .attr("stop-color", function (d) { return d; });

// viz.append("text")
//     .attr('x', 530)
//     .attr('y', 230)
//     .style("font-family", "'Krona One', sans-serif")
//     .text("color legend")
//     ;

let exampleR = 130;

function gotData(incomingData) {
    function filterFunction(datapoint) {
        // console.log(datapoint);
        if (datapoint.category == "protein" || datapoint.category == "nuts") {
            return true;
        } else {
            return false;
        }
    }

    let filteredData = incomingData.filter(filterFunction);
    console.log("filtered data", filteredData);

    let radiusScale = d3.scaleLinear().domain([1, 12]).range([exampleR / 2.5, exampleR]);

    function chooseRadius(datapoint) {
        return radiusScale(datapoint.diameter);
    }

    function chooseKey(datapoint) {
        if (datapoint.diameter == 12) {
            return "key"
        }
    }

    let node = viz.selectAll(".node").data(filteredData).enter()
        .append("circle")
        .attr("r", chooseRadius)
        .attr("fill", "#fff591")
        .attr("stroke", "black")
        .attr("stroke-width", 5)
        ;

    let exampleGroup = viz.selectAll(".example").data(filteredData).enter()
        .append("g")
        .attr("class", "examplegroup")
        .attr("id", chooseKey)
        ;

    let keyGroup = d3.select("#key").append("g").attr("class", "keygroup");

    let arc1 = d3.arc()({
        innerRadius: exampleR - 10,
        outerRadius: exampleR - 15,
        cornerRadius: 15,
        startAngle: 0,
        endAngle: 3 / 4 * Math.PI * 2
    })

    keyGroup.append("path")
        .attr("class", "arc1")
        .attr("d", arc1)
        .attr("fill", "#7B3B8C")
        ;

    let arc2 = d3.arc()({
        innerRadius: exampleR - 25,
        outerRadius: exampleR - 30,
        cornerRadius: 15,
        startAngle: 0,
        endAngle: 6 / 14 * Math.PI * 2
    })

    keyGroup.append("path")
        .attr("class", "arc2")
        .attr("d", arc2)
        .attr("fill", "#00ccbc")
        ;

    let Icon1 = ["M789.003772 0a309.359066 309.359066 0 0 0-231.618488 104.757051A314.23704 314.23704 0 0 0 325.766797 0C146.168662 0 0.034112 156.436286 0.034112 348.655752a357.388349 357.388349 0 0 0 12.860113 95.13755h221.555534a1792.638401 1792.638401 0 0 0 84.221803-174.856608c31.996781-64.812242 98.002933-51.508677 111.442945 20.467024l47.926948 256.65648 47.756389-108.031775c29.540738-65.051024 95.512778-57.068885 113.114419 13.371789l16.714736 66.449605 46.801261-61.401072 13.098896-18.317987h188.637737a51.16756 51.16756 0 0 1 0 100.970652h-146.066327l-58.910918 80.503627c-37.795771 52.907257-99.299178 38.37567-115.979802-27.562259l-10.642852-42.298516-1.19391-4.877974-52.190911 124.780623c-30.461754 67.131838-97.252475 55.329188-110.931269-17.840423l-48.029283-257.202267-64.812243 124.746511-12.587219 25.447333H55.670305c12.109656 21.490375 24.696876 40.934048 35.98785 58.433353 113.9331 176.289299 400.062094 393.751428 412.444644 401.699456a90.123129 90.123129 0 0 0 53.248374 18.556768 84.835814 84.835814 0 0 0 53.282485-18.556768c12.382549-9.278384 297.249411-226.706401 412.444644-401.699456a452.662345 452.662345 0 0 0 91.624043-254.541554c0-192.117131-146.134551-348.553417-325.664462-348.553417"]
    let Icon2 = `<path d="M101.2 467c-8.7 13.6-16.2 27.4-21.3 37.2h151.5c-3.7-4.8-8.1-10.7-13.5-18-11.1-15.2-23.8-32.3-36.6-45.9-16.7-17.6-26.3-21.3-31.5-21.3-4.2 0-20.1 3.5-48.6 48zM822 504.2c6.1-1.8 10.7-3.3 14.2-4.5-12.7-12.4-42-36.9-76.9-61.9-49.7-35.6-89.4-56.9-106.1-56.9-24.1 0-65.3 51.2-92.6 85.1-14 17.5-24.3 30-32.5 38.2H822zM279 504.2h203.2c-4.4-3.7-9-8.1-14-12.9-22.2-21.1-49.9-47.3-87-47.3-41.3 0-75.6 33.9-98.3 56.3l-3.9 3.9z" fill="#ED6F00" p-id="6329"></path>
                        <path d="M858.4 524.2H73.9c2.6 99.1 44.2 189.9 117.8 256.7 36.5 33.1 79.2 59.1 127 77.1 48.7 18.4 100.6 27.7 154.1 27.7 197.5 0 350.5-123.7 380.5-307.8l1.4-8.4h95.1v-38h-91.5l0.1-7.3z" fill="#FFE632" p-id="6330"></path>
                        <path d="M878.5 511.5v-7.3h-16.8c0-0.3 0.1-0.6 0.1-0.9 0-4.5-2.4-8.4-9.5-15.7-4.5-4.6-10.7-10.3-18.4-17-16.2-13.9-37.3-30.5-57.9-45.5-73.1-53.1-107.1-64.2-122.7-64.3h-0.1c-33.7 0-73.3 49.2-108.2 92.6-13.6 16.9-32.2 40-38.5 42.7-4.3-0.3-16.4-11.8-24.5-19.4-23.5-22.3-55.7-52.8-100.8-52.8-49.6 0-88.9 38.9-112.4 62.1-5.1 5-11.1 11-14.8 13.8-4.6-4.7-13-16.2-20-25.7-24.6-33.5-55.3-75.3-84.2-75.3-19.3 0-40.7 18.7-65.4 57.2-12.5 19.5-22.3 38.7-26.9 48h-3.7v7.8l-4.3 9.2 4.4 1C56 627.7 100 724.6 178.2 795.6c38.4 34.8 83.3 62.1 133.4 81 51 19.2 105.2 29 161.2 29 50.4 0 98.9-7.8 144.2-23 44.6-15.1 85.1-37.1 120.6-65.5 35.7-28.6 65.4-63.1 88.2-102.5 22.1-38.1 37.5-80.1 45.8-125.1h98.1v-78h-91.2z m71.3 58h-95.1l-1.4 8.4c-30.1 184.1-183 307.8-380.5 307.8-53.5 0-105.4-9.3-154.1-27.7-47.8-18-90.5-44-127-77.1-73.6-66.8-115.2-157.6-117.8-256.7h784.5l-0.1 7.3h91.5v38zM181.2 440.2c12.9 13.6 25.5 30.8 36.6 45.9 5.4 7.4 9.8 13.3 13.5 18H79.9c5.1-9.8 12.6-23.5 21.3-37.2 28.5-44.5 44.4-48 48.5-48 5.3 0.1 14.9 3.8 31.5 21.3zM560.4 466c27.3-33.9 68.5-85.1 92.6-85.1 16.8 0 56.4 21.3 106.1 56.9 34.9 25 64.2 49.5 76.9 61.9-3.4 1.2-8 2.6-14.2 4.5H528c8.2-8.2 18.4-20.7 32.4-38.2z m-92.2 25.3c5 4.8 9.7 9.1 14 12.9H279c1.2-1.2 2.5-2.5 3.9-3.8 22.7-22.4 56.9-56.3 98.3-56.3 37-0.1 64.7 26.1 87 47.2zM342.5 371.9l14-14.3c-0.3-0.3-34.7-34.3-41.1-64.9-5.1-24.6 14.7-63.7 22.8-76.7l-17-10.6c-1.4 2.2-33.3 53.8-25.4 91.3 7.7 36.7 45.1 73.7 46.7 75.2zM453 371.9l14-14.3c-0.3-0.3-34.7-34.3-41.1-64.9-5.1-24.6 14.7-63.7 22.8-76.7l-8.5-5.3-8.5-5.3c-1.4 2.2-33.3 53.8-25.4 91.3 7.6 36.7 45.1 73.7 46.7 75.2z" fill="#820404" p-id="6331"></path>
                        <path d="M551.7 371.9l14-14.3c-0.3-0.3-34.7-34.3-41.1-64.9-5.1-24.6 14.7-63.7 22.8-76.7l-8.5-5.3-8.5-5.3c-1.4 2.2-33.3 53.8-25.4 91.3 7.7 36.7 45.1 73.7 46.7 75.2z" fill="#820404" p-id="6332"></path>`
    let Icon3 = `<path d="M741.4 267.6l-9.2-6.8 4.7-10.4c5.2-11.4 7.8-23.6 7.8-36.2 0-48.4-39.4-87.8-87.8-87.8-36.9 0-70 23.3-82.6 57.9l-3.9 10.8-21.2-3.1-2.9-7.9c-12.6-34.3-45.7-57.3-82.2-57.3-42.1 0-78.3 30-86.1 71.4l-1.5 8.3-8 2.6c-4.8 1.5-9.4 3.1-13.9 4.7l-7.1 2.6-6.1-4.5c-13.9-10.2-30.4-15.6-47.7-15.6-44.5 0-80.8 36.2-80.8 80.8 0 4.8 0.5 9.8 1.4 14.7l1.3 7.3-5.3 5.2C142.1 371.8 104.5 460 104.5 552.5c0 96.9 40.7 188.1 114.7 256.7 74.3 68.9 173.1 106.9 278.2 106.9s204-37.9 278.2-106.9c74-68.6 114.7-159.8 114.7-256.7 0.1-111.6-54.2-215.5-148.9-284.9zM255.5 485.2l-27.5-6.5c8.8-37.4 74.6-98 82-104.8l19 20.9c-25.6 23.4-68.4 68.6-73.5 90.4z m173.6 40.2c-0.1-0.6-1-2.5-3.1-4.1l-17.2 22.4c-10.3-7.9-12.7-24.1 4.3-86.6 8.8-32.7 19.1-63.5 19.6-64.8l26.8 9c-17.1 50.6-33.3 112.5-30.4 124.1z m195.4 17.1L603.2 524c-1.4 1.6-1.8 3.1-1.8 3.6 0.1-1.2 0.3-13-25.9-62.3-14.2-26.6-28.8-50.6-29-50.9l24.1-14.8c0.7 1.2 17.5 28.6 33 58.4 9.3 17.8 16.1 32.7 20.4 44.4 5.1 14.2 9.3 30.1 0.5 40.1z m130.9-72.6c0.3-21-46.9-62.6-79-84.1l15.7-23.4c0.9 0.6 22.5 15.2 44.4 34.8 32 28.7 47.4 52.6 47.1 73.1l-28.2-0.4z" fill="#ED6F00" p-id="10917"></path>
                        <path d="M874.9 378.6c-25.9-48.6-63.1-92.4-108-127.2 4.1-12 6.1-24.5 6.1-37.3 0-64-52-116-116-116-39.3 0-75.4 20-96.6 51.8-21.2-31.5-57.2-51.4-96.2-51.4-52.9 0-98.6 35.7-111.9 86.1-0.1 0-0.2 0.1-0.4 0.1-17.4-11-37.3-16.8-58.1-16.8-60.1 0-109 48.9-109 109 0 4.1 0.2 8.2 0.7 12.3C115 361.5 76.2 454.7 76.2 552.5c0 104.9 43.9 203.4 123.7 277.4 79.5 73.8 185.1 114.4 297.4 114.4 112.3 0 217.9-40.6 297.4-114.4 79.8-74 123.7-172.6 123.7-277.4 0.2-61.1-14.5-119.6-43.5-173.9z m-99.3 430.6c-74.3 68.9-173.1 106.9-278.2 106.9s-204-37.9-278.2-106.9c-74-68.6-114.7-159.8-114.7-256.7 0-92.5 37.6-180.7 105.9-248.3l5.3-5.2-1.3-7.3c-0.9-4.9-1.4-9.9-1.4-14.7 0-44.5 36.2-80.8 80.8-80.8 17.3 0 33.8 5.4 47.7 15.6l6.1 4.5 7.1-2.6c4.5-1.6 9.2-3.2 13.9-4.7l8-2.6 1.5-8.3c7.7-41.4 43.9-71.4 86.1-71.4 36.6 0 69.6 23 82.2 57.3l2.9 7.9 21.2 3.1 3.9-10.8c12.5-34.6 45.7-57.9 82.6-57.9 48.4 0 87.8 39.4 87.8 87.8 0 12.6-2.6 24.8-7.8 36.2l-4.7 10.4 9.2 6.8c94.6 69.5 148.9 173.3 148.9 285 0 96.9-40.8 188.1-114.8 256.7z" fill="#820404" p-id="10918"></path>
                        <path d="M228 478.7l27.5 6.5c5.2-21.8 47.9-67 73.6-90.5l-19-20.9c-7.5 6.9-73.2 67.5-82.1 104.9zM432.6 392.3c-0.4 1.3-10.7 32.1-19.6 64.8-16.9 62.5-14.6 78.7-4.3 86.6l17.2-22.4c2.1 1.6 2.9 3.5 3.1 4.1-2.9-11.6 13.4-73.5 30.3-124.1l-26.7-9zM603.6 458c-15.5-29.8-32.3-57.3-33-58.4l-24.1 14.8c0.1 0.2 14.8 24.2 29 50.9 26.3 49.4 26 61.2 25.9 62.3 0-0.5 0.5-2 1.8-3.6l21.3 18.5c8.8-10 4.6-25.9-0.6-40.1-4.2-11.6-11.1-26.6-20.3-44.4zM736.6 397.2c-21.9-19.6-43.5-34.2-44.4-34.8l-15.7 23.4c32 21.5 79.3 63.1 79 84.1l28.2 0.4c0.3-20.5-15.1-44.4-47.1-73.1z" fill="#820404" p-id="10919"></path>`

    keyGroup.append("path")
        .attr("class", "icon1")
        .attr("d", Icon1)
        .attr("fill", "darkgreen")
        .attr("stroke-width", 20)
        .attr("transform", "translate(-20, -30)scale(0.03)")
        ;

    let icon2Group = keyGroup.append("g").attr("class", "icon2")
        .html(Icon2);
    icon2Group.attr("transform", "translate(1, 3)scale(0.04)");

    let icon3Group = keyGroup.append("g").attr("class", "icon3")
        .html(Icon3);
    icon3Group.attr("transform", "translate(-50, 3)scale(0.04)");

    var simulation = d3.forceSimulation()
        .force("collide",
            d3.forceCollide()
                .radius(chooseRadius)
                .strength(0.9)
                .iterations(8))
        .force("charge", d3.forceManyBody().strength(-200))
        .force("x", d3.forceX().strength(0.2).x(250))
        .force("y", d3.forceY().strength(0.2).y(400));

    function ticked() {
        exampleGroup.attr("transform", function (d, i) {
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
        .nodes(filteredData)
        .on("tick", ticked);

    //arrow
    // viz.append("svg:defs").append("svg:marker")
    //     .attr("id", "triangle")
    //     .attr("refX", 6)
    //     .attr("refY", 6)
    //     .attr("markerWidth", 30)
    //     .attr("markerHeight", 30)
    //     .attr("markerUnits", "userSpaceOnUse")
    //     .attr("orient", "auto")
    //     .append("path")
    //     .attr("d", "M 0 0 12 6 0 12 3 6")
    //     .style("fill", "grey");

    // path
    // viz.append("path")
    //     .attr("marker-end", "url(#triangle)")
    //     .attr("d", "M10 80 C 40 10, 65 10, 95 80 S 150 150, 180 80")
    //     .attr("stroke", "grey")
    //     .attr("stroke-width", "1.5")
    //     .attr("fill", "transparent")
    //     .attr("class", "edges");

    // Source node position of the link must account for radius of the circle
    // const linkSource = {
    //     x: 485,
    //     y: 380
    // };

    // Target node position of the link must account for radius + arrow width
    // const linkTarget = {
    //     x: 600,
    //     y: 300
    // };

    // Define a horizontal link from the first circle to the second
    // const link = d3
    //     .linkHorizontal()
    //     .x(d => d.x)
    //     .y(d => d.y)({
    //         source: linkSource,
    //         target: linkTarget
    //     });

    // Add the link with arrowhead at the end
    // viz.append('path')
    //     .attr('d', link)
    //     .attr('marker-end', 'url(#triangle)')
    //     .attr("stroke", "grey")
    //     .attr("stroke-width", "1.5")
    //     .attr("fill", "transparent");

    //line              
    // viz.append("line")
    //     .attr("x1", 470)
    //     .attr("y1", 400)
    //     .attr("x2", 600)
    //     .attr("y2", 400)

    //     .attr("stroke-width", 1.5)
    //     .attr("stroke", "grey")
    //     .attr("marker-end", "url(#triangle)");

    let colorCircleGroup1 = viz.append("g")

    colorCircleGroup1.append("circle")
        // .attr("cx", 600)
        // .attr("cy", 100)
        .attr("r", 40)
        .attr("fill", "#fdc23e")
        .attr("stroke", "black")
        .attr("stroke-width", 5)
        ;

    colorCircleGroup1.append("text")
        .attr('x', -23)
        .attr('y', 0)
        .style("font-family", "'Krona One', sans-serif")
        .style("font-size", "14px")
        .text("fruits")
        ;

    colorCircleGroup1.attr("transform", "translate(600, 100)")

    let colorCircleGroup2 = viz.append("g")

    colorCircleGroup2.append("circle")
        // .attr("cx", 700)
        // .attr("cy", 100)
        .attr("r", 40)
        .attr("fill", "#b2de81")
        .attr("stroke", "black")
        .attr("stroke-width", 5)

    colorCircleGroup2.append("text")
        .attr('x', -30)
        .attr('y', 0)
        .style("font-family", "'Krona One', sans-serif")
        .style("font-size", "14px")
        .text("veggie")
        ;

    colorCircleGroup2.attr("transform", "translate(700, 100)")

    let colorCircleGroup3 = viz.append("g")

    colorCircleGroup3.append("circle")
        // .attr("cx", 800)
        // .attr("cy", 100)
        .attr("r", 40)
        .attr("fill", "lightsalmon")
        .attr("stroke", "black")
        .attr("stroke-width", 5)

    colorCircleGroup3.append("text")
        .attr('x', -25)
        .attr('y', 0)
        .style("font-family", "'Krona One', sans-serif")
        .style("font-size", "14px")
        .text("carbs")
        ;

    colorCircleGroup3.attr("transform", "translate(800, 100)")

    let colorCircleGroup4 = viz.append("g")

    colorCircleGroup4.append("circle")
        // .attr("cx", 900)
        // .attr("cy", 100)
        .attr("r", 40)
        .attr("fill", "lightpink")
        .attr("stroke", "black")
        .attr("stroke-width", 5)

    colorCircleGroup4.append("text")
        .attr('x', -33)
        .attr('y', 0)
        .style("font-family", "'Krona One', sans-serif")
        .style("font-size", "14px")
        .text("sweets")
        ;

    colorCircleGroup4.attr("transform", "translate(900, 100)")

    let colorCircleGroup5 = viz.append("g")

    colorCircleGroup5.append("circle")
        // .attr("cx", 1000)
        // .attr("cy", 100)
        .attr("r", 40)
        .attr("fill", "#fff591")
        .attr("stroke", "black")
        .attr("stroke-width", 5)

    colorCircleGroup5.append("text")
        .attr('x', -27)
        .attr('y', -10)
        .style("font-family", "'Krona One', sans-serif")
        .style("font-size", "12px")
        .text("protein")
        ;
    colorCircleGroup5.append("text")
        .attr('x', -26)
        .attr('y', 10)
        .style("font-family", "'Krona One', sans-serif")
        .style("font-size", "12px")
        .text("& nuts")
        ;

    colorCircleGroup5.attr("transform", "translate(1000, 100)")

    iconGroup = viz.append("g")

    let iconGroupIcon1 = iconGroup.append("path")
        .attr("class", "icon1")
        .attr("d", Icon1)
        .attr("fill", "darkgreen")
        .attr("stroke-width", 20)
        .attr("transform", "translate(570, 520)scale(0.05)")
        ;

    let iconGroupIcon2 = iconGroup.append("g").attr("class", "icon2")
        .html(Icon2);
    iconGroupIcon2.attr("transform", "translate(570, 600)scale(0.06)");

    let iconGroupIcon3 = iconGroup.append("g").attr("class", "icon3")
        .html(Icon3);
    iconGroupIcon3.attr("transform", "translate(570, 690)scale(0.06)");

}

d3.json("rounds.json").then(gotData);

//Create an SVG arc starting at location [0,300], ending at [800,300] with a radius of 400 (circle)			
var path = viz.append("path")
    .attr("id", "wavy") //A unique ID to reference later
    .attr("d", "M0,100 A300,300 0 0,1 400,100")  //Notation for an SVG path
    .style("fill", "none")
    .style("stroke", "#AAAAAA")
    .style("stroke-dasharray", "5,5");

path.attr("transform", "translate(60, 150)")

//Create an SVG text element and append a textPath element
var textArc = viz.append("text")
    .style("text-anchor", "middle")
    .append("textPath")				//append a textPath to the text element
    .attr("xlink:href", "#wavy") 	//place the ID of the path here
    .attr("startOffset", "50%")		//place the text halfway on the arc
    // .style("font-family", "'Pacifico', sans-serif")
    .style("font-family", "'Krona One', sans-serif")
    .style("font-size", 30)
    .style("fill", "#333333")
    .text("How to read the circles");

let textGroup1 = viz.append("text")
    .attr("id", "text")
    .style("font-family", "'Krona One', sans-serif")
    .style("font-size", 18)
    .text("Each food is represented by a circle, and they are")
    ;
textGroup1.attr("transform", "translate(565, 200)");

let textGroup2 = viz.append("text")
    .attr("id", "text")
    .style("font-family", "'Krona One', sans-serif")
    .style("font-size", 18)
    .text("clustered and color-coded into the same category.")
    ;
textGroup2.attr("transform", "translate(565, 230)");

let textGroup3 = viz.append("text")
    .attr("id", "text")
    .attr("fill", "#7B3B8C")
    .style("font-family", "'Krona One', sans-serif")
    .style("font-size", 18)
    .text("The purple arc")
    ;
textGroup3.attr("transform", "translate(565, 300)");

let textGroup4 = viz.append("text")
    .attr("id", "text")
    .style("font-family", "'Krona One', sans-serif")
    .style("font-size", 18)
    .text("represents how much I like the food.")
    ;
textGroup4.attr("transform", "translate(740, 300)");

let textGroup5 = viz.append("text")
    .attr("id", "text")
    .style("font-family", "'Krona One', sans-serif")
    .style("font-size", 18)
    .text("The longer the arc, the more I like it!")
    ;
textGroup5.attr("transform", "translate(565, 330)");

let textGroup6 = viz.append("text")
    .attr("id", "text")
    .attr("fill", "#00ccbc")
    .style("font-family", "'Krona One', sans-serif")
    .style("font-size", 18)
    .text("The blue arc")
    ;
textGroup6.attr("transform", "translate(565, 400)");

let textGroup7 = viz.append("text")
    .attr("id", "text")
    .style("font-family", "'Krona One', sans-serif")
    .style("font-size", 18)
    .text("represents how many times I had")
    ;
textGroup7.attr("transform", "translate(715, 400)");

let textGroup8 = viz.append("text")
    .attr("id", "text")
    .style("font-family", "'Krona One', sans-serif")
    .style("font-size", 18)
    .text("the food in the past two weeks. The maximum")
    ;
textGroup8.attr("transform", "translate(565, 430)");

let textGroup9 = viz.append("text")
    .attr("id", "text")
    .style("font-family", "'Krona One', sans-serif")
    .style("font-size", 18)
    .text("frequency is 14!")
    ;
textGroup9.attr("transform", "translate(565, 460)");

let textGroup10 = viz.append("text")
    .attr("id", "text")
    .style("font-family", "'Krona One', sans-serif")
    .style("font-size", 18)
    .text("The food will have this sign if it is generally")
    ;
textGroup10.attr("transform", "translate(645, 540)");

let textGroup11 = viz.append("text")
    .attr("id", "text")
    .style("font-family", "'Krona One', sans-serif")
    .style("font-size", 18)
    .text("considered as healthy.")
    ;
textGroup11.attr("transform", "translate(645, 570)");

let textGroup12 = viz.append("text")
    .attr("id", "text")
    .style("font-family", "'Krona One', sans-serif")
    .style("font-size", 18)
    .text("The food will have this sign if it is cooked")
    ;
textGroup12.attr("transform", "translate(645, 630)");

let textGroup13 = viz.append("text")
    .attr("id", "text")
    .style("font-family", "'Krona One', sans-serif")
    .style("font-size", 18)
    .text("or processed.")
    ;
textGroup13.attr("transform", "translate(645, 660)");

let textGroup14 = viz.append("text")
    .attr("id", "text")
    .style("font-family", "'Krona One', sans-serif")
    .style("font-size", 18)
    .text("The food will have this sign if it is a Chinese")
    ;
textGroup14.attr("transform", "translate(645, 720)");

let textGroup15 = viz.append("text")
    .attr("id", "text")
    .style("font-family", "'Krona One', sans-serif")
    .style("font-size", 18)
    .text("specialty. e.g. tangyuan")
    ;
textGroup15.attr("transform", "translate(645, 750)");

let textGroup16 = viz.append("text")
    .attr("id", "text")
    .style("font-family", "'Krona One', sans-serif")
    .style("font-size", 18)
    .text("The size of the circle is proportionate")
    ;
textGroup16.attr("transform", "translate(50, 650)");

let textGroup17 = viz.append("text")
    .attr("id", "text")
    .style("font-family", "'Krona One', sans-serif")
    .style("font-size", 18)
    .text("to the actual diameter of the food")
    ;
textGroup17.attr("transform", "translate(60, 680)");