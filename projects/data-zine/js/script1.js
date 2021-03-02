console.log("script for cover page loaded!")

//Create the SVG
var svg = d3.select("#container").append("svg")
    .attr("width", 1200)
    .attr("height", 800)
    .style("background-color", "lavender");

//Create an SVG arc starting at location [0,300], ending at [800,300] with a radius of 400 (circle)			
var path = svg.append("path")
    .attr("id", "wavy") //A unique ID to reference later
    .attr("d", "M0,300 A400,400 0 0,1 800,300")  //Notation for an SVG path
    .style("fill", "none")
    .style("stroke", "#AAAAAA")
    .style("stroke-dasharray", "5,5");

path.attr("transform", "translate(200, 300)")

//Create an SVG text element and append a textPath element
var textArc = svg.append("text")
    .style("text-anchor", "middle")
    .append("textPath")				//append a textPath to the text element
    .attr("xlink:href", "#wavy") 	//place the ID of the path here
    .attr("startOffset", "50%")		//place the text halfway on the arc
    // .style("font-family", "'Pacifico', sans-serif")
    .style("font-family", "'Krona One', sans-serif")
    .style("font-size", 50)
    .style("fill", "#333333")
    .text("Round-shaped food I ate in two weeks");

let pathGroup = svg.append("g")
    .attr("id", "groupOfPaths");

pathGroup.append("path")
    .attr("class", "myPath")
    .attr("d", "M511.3 513.2m-501.8 0a501.8 501.8 0 1 0 1003.6 0 501.8 501.8 0 1 0-1003.6 0Z")
    // .attr("stroke", "blue")
    // .attr("stroke-width", 2)
    .attr("fill", "#F9C273")
    ;

pathGroup.append("path")
    .attr("class", "myPath")
    .attr("d", "M856 437.8l-344.5 75 75-344.5c-120.5-26.2-252.1 11.1-341 112.2-116.1 132.1-115.9 334 0.5 465.9C382.1 900.5 617.6 906 760.8 762.8c88.2-88.2 119.9-211.5 95.2-325z")
    .attr("fill", "#F99958")
    ;

pathGroup.append("path")
    .attr("class", "myPath")
    .attr("d", "M511.3 874.1c-3.8 0-7.7-0.1-11.5-0.2-48.7-1.5-95.7-12.6-139.7-32.8-45.8-21.1-86.2-51.2-120-89.5-57.6-65.2-89.3-149.7-89.4-238-0.1-88.3 31.5-172.9 88.9-238.2 43.7-49.7 99.8-86.4 162.2-106.1 60.1-19 124.6-22 186.4-8.5 2 0.4 3.8 1.7 4.9 3.4 1.1 1.7 1.5 3.9 1.1 5.9l-72.4 332.6 332.6-72.4c2-0.4 4.1-0.1 5.9 1.1 1.7 1.1 3 2.9 3.4 4.9 12.6 58 10.8 118.8-5.4 175.8-16.7 58.9-48.5 113-92 156.5-35.9 35.9-77.8 63.2-124.7 81.4-41.7 15.9-85.5 24.1-130.3 24.1zM511 168c-35.3 0-70.6 5.4-104.5 16.1-59.7 18.9-113.3 54-155.1 101.6-54.9 62.4-85.1 143.4-85 227.8 0.1 84.5 30.4 165.3 85.5 227.7 32.4 36.7 71 65.5 114.8 85.7 42.1 19.4 87.1 29.9 133.6 31.4 46.7 1.5 92.3-6.3 135.6-23.1 44.9-17.4 85-43.6 119.3-77.9 41.6-41.6 72-93.4 88-149.7 14.7-52 17-107.4 6.7-160.5l-336.7 73.3c-2.6 0.6-5.3-0.2-7.2-2.1-1.9-1.9-2.7-4.6-2.1-7.2l73.3-336.7c-21.9-4.3-44-6.4-66.2-6.4z")
    .attr("fill", "#161616")
    ;

pathGroup.append("path")
    .attr("class", "myPath")
    .attr("d", "M840.3 398c-11-50.7-36.2-99-75.6-138.4S677 195 626.3 184l-59.6 273.6L840.3 398z")
    .attr("fill", "#F99958")
    ;

pathGroup.append("path")
    .attr("class", "myPath")
    .attr("d", "M566.7 465.4c-2.1 0-4.1-0.8-5.5-2.3-1.9-1.9-2.7-4.6-2.1-7.2l59.6-273.6c0.9-4.2 5.1-6.9 9.3-6 54 11.7 103.2 38.6 142.3 77.7 39.1 39.1 66 88.3 77.7 142.3 0.9 4.2-1.8 8.4-6 9.3l-273.6 59.6c-0.5 0.1-1.1 0.2-1.7 0.2z m65.6-272L577 447.3 830.9 392c-11.9-48-36.6-91.8-71.7-126.9-35.1-35.1-78.9-59.8-126.9-71.7z")
    .attr("fill", "#161616")
    ;

pathGroup.append("path")
    .attr("class", "myPath")
    .attr("d", "M371.9 570.4m-55.9 0a55.9 55.9 0 1 0 111.8 0 55.9 55.9 0 1 0-111.8 0Z")
    .attr("fill", "#E45544")
    ;

pathGroup.append("path")
    .attr("class", "myPath")
    .attr("d", "M371.8 634.2c-9.5 0-19-2.2-27.8-6.4-15.3-7.4-26.8-20.4-32.4-36.5-11.5-33.2 6.2-69.6 39.4-81.1 33.2-11.5 69.6 6.2 81.1 39.4 3.3 9.5 4.3 19.7 2.9 29.6-0.6 4.3-4.6 7.3-8.8 6.7-4.3-0.6-7.3-4.6-6.7-8.8 1.1-7.6 0.3-15.1-2.2-22.3-8.7-25.1-36.1-38.4-61.2-29.7s-38.4 36.1-29.7 61.2c4.2 12.1 12.9 21.9 24.4 27.5 11.6 5.6 24.6 6.4 36.7 2.2 4.1-1.4 8.5 0.7 10 4.8 1.4 4.1-0.8 8.5-4.8 10-6.8 2.2-13.8 3.4-20.9 3.4z")
    .attr("fill", "#161616")
    ;

pathGroup.append("path")
    .attr("class", "myPath")
    .attr("d", "M533.7 718.4m-45.4 0a45.4 45.4 0 1 0 90.8 0 45.4 45.4 0 1 0-90.8 0Z")
    .attr("fill", "#E45544")
    ;

pathGroup.append("path")
    .attr("class", "myPath")
    .attr("d", "M533.7 771.7c-8 0-15.9-1.8-23.2-5.4-12.8-6.2-22.4-17-27.1-30.5-4.7-13.4-3.8-27.9 2.4-40.7s17-22.4 30.5-27.1c7.9-2.7 16.5-3.6 24.8-2.4 4.3 0.6 7.3 4.6 6.7 8.8s-4.6 7.3-8.8 6.7c-5.9-0.8-11.8-0.2-17.5 1.7-19.6 6.8-30 28.3-23.2 47.9 6.8 19.6 28.3 30 47.9 23.2 19.6-6.8 30-28.3 23.2-47.9-1.4-4.1 0.8-8.5 4.8-10 4.1-1.4 8.5 0.8 10 4.8 9.6 27.8-5.2 58.2-32.9 67.8-5.9 2.1-11.8 3.1-17.6 3.1z")
    .attr("fill", "#161616")
    ;

pathGroup.append("path")
    .attr("class", "myPath")
    .attr("d", "M452.8 256.5m-36.3 0a36.3 36.3 0 1 0 72.6 0 36.3 36.3 0 1 0-72.6 0Z")
    .attr("fill", "#FFCC00")
    ;

pathGroup.append("path")
    .attr("class", "myPath")
    .attr("d", "M452.8 300.6c-22.7 0-42-17.5-43.9-40.5-2-24.2 16.1-45.5 40.3-47.5 6.9-0.6 14 0.5 20.3 3.2 4 1.6 5.9 6.2 4.3 10.2-1.6 4-6.2 5.9-10.2 4.3-4.2-1.7-8.6-2.4-13.1-2-7.6 0.6-14.4 4.1-19.4 9.9-4.9 5.8-7.3 13.1-6.7 20.7 1.3 15.6 15 27.3 30.6 26 15.6-1.3 27.3-15 26-30.6-0.4-4.3 2.9-8.1 7.2-8.4 4.3-0.4 8.1 2.9 8.4 7.2 2 24.2-16.1 45.5-40.3 47.5h-3.5z")
    .attr("fill", "#161616")
    ;

pathGroup.append("path")
    .attr("class", "myPath")
    .attr("d", "M376.3 744.3m-25.7 0a25.7 25.7 0 1 0 51.4 0 25.7 25.7 0 1 0-51.4 0Z")
    .attr("fill", "#FFCC00")
    ;

pathGroup.append("path")
    .attr("class", "myPath")
    .attr("d", "M376.3 777.9c-8.7 0-16.9-3.3-23.2-9.3-6.5-6.2-10.1-14.5-10.3-23.5-0.2-9 3.1-17.4 9.3-23.9 6.2-6.5 14.5-10.1 23.5-10.3 18.5-0.4 33.8 14.3 34.3 32.8 0.1 5.3-1 10.6-3.3 15.3-1.9 3.9-6.6 5.5-10.5 3.6-3.9-1.9-5.5-6.6-3.6-10.5 1.2-2.5 1.8-5.3 1.8-8.1-0.2-9.7-8.2-17.5-17.9-17.5h-0.4c-4.8 0.1-9.2 2.1-12.5 5.5-3.3 3.4-5.1 8-5 12.7 0.1 4.8 2.1 9.2 5.5 12.5 3.4 3.3 8 5 12.7 5 4.3-0.1 7.9 3.3 8 7.7 0.1 4.3-3.3 7.9-7.7 8h-0.7z")
    .attr("fill", "#161616")
    ;

pathGroup.append("path")
    .attr("class", "myPath")
    .attr("d", "M323.5 397.9m-36.3 0a36.3 36.3 0 1 0 72.6 0 36.3 36.3 0 1 0-72.6 0Z")
    .attr("fill", "#6FC439")
    ;

pathGroup.append("path")
    .attr("class", "myPath")
    .attr("d", "M323.5 437.5c-6.2 0-12.5-1.5-18-4.3-3.9-2-5.4-6.7-3.4-10.5 2-3.9 6.7-5.4 10.5-3.4 3.4 1.7 7 2.6 10.9 2.6 13.2 0 24-10.7 24-24 0-13.2-10.7-24-24-24s-24 10.7-24 24c0 4.3-3.5 7.8-7.8 7.8s-7.8-3.5-7.8-7.8c0-21.8 17.8-39.6 39.6-39.6s39.6 17.8 39.6 39.6-17.8 39.6-39.6 39.6z")
    .attr("fill", "#161616")
    ;

pathGroup.append("path")
    .attr("class", "myPath")
    .attr("d", "M720.5 564.5m-40.6 0a40.6 40.6 0 1 0 81.2 0 40.6 40.6 0 1 0-81.2 0Z")
    .attr("fill", "#6FC439")
    ;

pathGroup.append("path")
    .attr("class", "myPath")
    .attr("d", "M720.5 607.9c-6.8 0-13.6-1.6-19.7-4.7-3.9-2-5.4-6.7-3.4-10.5 2-3.9 6.7-5.4 10.5-3.4 3.9 2 8.2 3 12.6 3 15.3 0 27.7-12.4 27.7-27.7 0-15.3-12.4-27.7-27.7-27.7-15.3 0-27.7 12.4-27.7 27.7 0 4.3-3.5 7.8-7.8 7.8s-7.8-3.5-7.8-7.8c0-23.9 19.5-43.4 43.4-43.4s43.4 19.5 43.4 43.4-19.6 43.3-43.5 43.3z")
    .attr("fill", "#161616")
    ;
pathGroup.append("path")
    .attr("class", "myPath")
    .attr("d", "M443.7 413.7m-15.9 0a15.9 15.9 0 1 0 31.8 0 15.9 15.9 0 1 0-31.8 0Z")
    .attr("fill", "#111111")
    ;
pathGroup.append("path")
    .attr("class", "myPath")
    .attr("d", "M231.6 523.9m-15.9 0a15.9 15.9 0 1 0 31.8 0 15.9 15.9 0 1 0-31.8 0Z")
    .attr("fill", "#111111")
    ;
pathGroup.append("path")
    .attr("class", "myPath")
    .attr("d", "M533.7 600.1m-15.9 0a15.9 15.9 0 1 0 31.8 0 15.9 15.9 0 1 0-31.8 0Z")
    .attr("fill", "#111111")
    ;

pathGroup.attr("transform", "translate(240, 230)scale(0.7)")