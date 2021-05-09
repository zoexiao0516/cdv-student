let dataset, svg
let salarySizeScale, salaryXScale, categoryColorScale
let simulation, nodes
let categoryLegend, salaryLegend

const categories = ['Data Scientist', 'Software Engineer', 'Data Analyst', 'Research Scientist', 'Machine Learning Engineer', 'Business Analyst', 'Product/Project Manager', 'Data Engineer', 'Statistician', 'DBA/Database Engineer']

const education = ['Doctoral degree', 'Master’s degree', 'Bachelor’s degree', 'Professional degree', 'Some college/university study without earning a bachelor’s degree', 'I prefer not to answer', 'No formal education past high school']

const categoriesXY = {'Data Scientist': [0, 400, 35000, 16.37],
                        'Software Engineer': [0, 600, 22500, 13.21],
                        'Data Analyst': [0, 800, 17500, 23.59],
                        'Research Scientist': [0, 200, 27500, 20.36],
                        'Machine Learning Engineer': [200, 400, 17500, 12.57],
                        'Business Analyst': [200, 600, 35000, 19.59],
                        'Product/Project Manager': [200, 800, 55000, 11.27],
                        'Data Engineer': [200, 200, 45000, 13.73],
                        'Statistician': [400, 400, 17500, 23.79],
                        'DBA/Database Engineer': [400, 600, 27500, 12.8]}

const margin = {left: 170, top: 50, bottom: 50, right: 20}
const width = 1000 - margin.left - margin.right
const height = 950 - margin.top - margin.bottom

//Read Data, convert numerical categories into floats
//Create the initial visualisation

d3.csv('data/sample.csv', function(d){
    return {
        origin: +d.origin,
        age: d.age,
        gender: d.gender,
        education: d.education,
        job_title: d.job_title,
        coding_experience: d.coding_experience,
        salary: d.salary,
        Q23_1: +d.Q23_1, 
        Q23_2: +d.Q23_2,
        Q23_3: +d.Q23_3,
        Q23_4: +d.Q23_4,
        Q23_5: +d.Q23_5,
        Q23_6: +d.Q23_6,
        Q23_7: +d.Q23_7,
    };
}).then(data => {
    dataset = data
    console.log(dataset)
    createScales()
    setTimeout(drawInitial(), 100)
})

const colors = ['#ccadb2', '#ffc5bf', '#97c1a9', '#a7d9c9', '#9eddef', '#f7e5b7', '#d7e2ea', '#96b3c2', '#ffdad1',  '#ffc8a2']

//Create all the scales and save to global variables

function createScales(){
    salaryDomain = ["$0-999", "1,000-1,999", "2,000-2,999", "3,000-3,999", "4,000-4,999", "5,000-7,499", "7,500-9,999", "10,000-14,999", "15,000-19,999", "20,000-24,999", "25,000-29,999", "30,000-39,999", "40,000-49,999", "50,000-59,999", "60,000-69,999", "70,000-79,999", "80,000-89,999", "90,000-99,999", "100,000-124,999", "125,000-149,999", "150,000-199,999", "200,000-249,999", "250,000-299,999", "300,000-500,000", "> $500,000", "NaN"]
    salarySizeScale = d3.scaleBand(salaryDomain, [5, 15])
    salaryXScale = d3.scaleBand(salaryDomain, [margin.left, margin.left + width+250])
    salaryYScale = d3.scaleBand(salaryDomain, [margin.top + height, margin.top])
    categoryColorScale = d3.scaleOrdinal(categories, colors)
    educationXScale = d3.scaleBand(education, [margin.left, margin.left + width])
    enrollmentScale = d3.scaleLinear(d3.extent(dataset, d => d.Total), [margin.left + 120, margin.left + width - 50])
    enrollmentSizeScale = d3.scaleLinear(d3.extent(dataset, d=> d.Total), [10,60])
    histXScale = d3.scaleBand(categories, [margin.left, margin.left + width])
    histYScale = d3.scaleLinear(d3.extent(dataset, d => d.origin), [margin.top + height, margin.top])
}

function createLegend(x, y){
    let svg = d3.select('#legend')

    svg.append('g')
        .attr('class', 'categoryLegend')
        .attr('transform', `translate(${x},${y})`)

    categoryLegend = d3.legendColor()
                            .shape('path', d3.symbol().type(d3.symbolCircle).size(150))
                            .shapePadding(10)
                            .scale(categoryColorScale)
    
    d3.select('.categoryLegend')
        .call(categoryLegend)
}

function createSizeLegend(){
    let svg = d3.select('#legend2')
    svg.append('g')
        .attr('class', 'sizeLegend')
        .attr('transform', `translate(100,50)`)

    sizeLegend2 = d3.legendSize()
        .scale(salarySizeScale)
        .shape('circle')
        .shapePadding(15)
        .title('Salary Scale')
        .labelFormat(d3.format("$,.2r"))
        .cells(7)

    d3.select('.sizeLegend')
        .call(sizeLegend2)
}

function createSizeLegend2(){
    let svg = d3.select('#legend3')
    svg.append('g')
        .attr('class', 'sizeLegend2')
        .attr('transform', `translate(50,100)`)

    sizeLegend2 = d3.legendSize()
        .scale(enrollmentSizeScale)
        .shape('circle')
        .shapePadding(55)
        .orient('horizontal')
        .title('Enrolment Scale')
        .labels(['1000', '200000', '400000'])
        .labelOffset(30)
        .cells(3)

    d3.select('.sizeLegend2')
        .call(sizeLegend2)
}

// All the initial elements should be create in the drawInitial function
// As they are required, their attributes can be modified
// They can be shown or hidden using their 'opacity' attribute
// Each element should also have an associated class name for easy reference

function drawInitial(){
    createSizeLegend()
    createSizeLegend2()

    let svg = d3.select("#vis")
                    .append('svg')
                    .attr('width', 1000)
                    .attr('height', 950)
                    .attr('opacity', 1)

    let xAxis = d3.axisBottom(salaryXScale)
                    .ticks(4)
                    .tickSize(height + 80)

    let xAxisGroup = svg.append('g')
        .attr('class', 'first-axis')
        .attr('transform', 'translate(0, 0)')
        .call(xAxis)
        .call(g => g.select('.domain')
            .remove())
        .call(g => g.selectAll('.tick line'))
            .attr('stroke-opacity', 0.2)
            .attr('stroke-dasharray', 2.5)
    
    xAxisGroup.selectAll("text")
        .attr("transform", `translate(${margin.left + 430}, 200)rotate(40)`)
        .attr('font-size', 7)

    // Instantiates the force simulation
    // Has no forces. Actual forces are added and removed as required

    simulation = d3.forceSimulation(dataset)

     // Define each tick of simulation
    simulation.on('tick', () => {
        nodes
            .attr('cx', d => d.x)
            .attr('cy', d => d.y)
    })

    // Stop the simulation until later
    simulation.stop()

    // Selection of all the circles 
    nodes = svg
        .selectAll('circle')
        .data(dataset)
        .enter()
        .append('circle')
            .attr('fill', 'black')
            .attr('r', 3)
            .attr('cx', (d, i) => salaryXScale(d.salary) + 5)
            .attr('cy', (d, i) => i * 5.2 + 30)
            .attr('opacity', 0.8)
        
    // Add mouseover and mouseout events for all circles
    // Changes opacity and adds border
    svg.selectAll('circle')
        .on('mouseover', mouseOver)
        .on('mouseout', mouseOut)

    function mouseOver(d, i){

        console.log('hi')
        d3.select(this)
            .transition('mouseover').duration(100)
            .attr('opacity', 1)
            .attr('stroke-width', 5)
            .attr('stroke', '#50B4DB')
            
        d3.select('#tooltip')
            .style('left', (d3.event.pageX + 10)+ 'px')
            .style('top', (d3.event.pageY - 25) + 'px')
            .style('display', 'inline-block')
            .html(`<strong>Job Title:</strong> ${d.job_title} 
                <br> <strong>Salary:</strong> $${d.salary} 
                <br> <strong>Age:</strong> ${d.age}
                <br> <strong>Gender:</strong> ${d.gender}
                <br> <strong>Education:</strong> ${d.education}`)
    }
    
    function mouseOut(d, i){
        d3.select('#tooltip')
            .style('display', 'none')

        d3.select(this)
            .transition('mouseout').duration(100)
            .attr('opacity', 0.8)
            .attr('stroke-width', 0)
    }

    //Small text label for first graph
    svg.selectAll('.small-text')
        .data(dataset)
        .enter()
        .append('text')
            .text((d, i) => d.job_title)
            .attr('class', 'small-text')
            .attr('x', margin.left)
            .attr('y', (d, i) => i * 5.2 + 30)
            .attr('font-size', 7)
            .attr('text-anchor', 'end')
    
    //All the required components for the small multiples charts
    //Initialises the text and rectangles, and sets opacity to 0 
    svg.selectAll('.cat-rect')
        .data(categories).enter()
        .append('rect')
            .attr('class', 'cat-rect')
            .attr('x', d => categoriesXY[d][0] + 120 + 1000)
            .attr('y', d => categoriesXY[d][1] + 30)
            .attr('width', 160)
            .attr('height', 30)
            .attr('opacity', 0)
            .attr('fill', 'grey')


    svg.selectAll('.lab-text')
        .data(categories).enter()
        .append('text')
        .attr('class', 'lab-text')
        .attr('opacity', 0)
        .raise()

    svg.selectAll('.lab-text')
        .text(d => `Median: $${d3.format(",.2r")(categoriesXY[d][2])}`)
        .attr('x', d => categoriesXY[d][0] + 200 + 1000)
        .attr('y', d => categoriesXY[d][1] - 500)
        .attr('font-family', 'Domine')
        .attr('font-size', '12px')
        .attr('font-weight', 700)
        .attr('fill', 'black')
        .attr('text-anchor', 'middle')       

    svg.selectAll('.lab-text')
            .on('mouseover', function(d, i){
                d3.select(this)
                    .text(d)
            })
            .on('mouseout', function(d, i){
                d3.select(this)
                    .text(d => `Median: $${d3.format(",.2r")(categoriesXY[d][2])}`)
            })


    // Best fit line for gender scatter plot

    const bestFitLine = [{x: 'Doctoral degree', y: '125,000-149,999'}, {x: 'Bachelor’s degree', y: '30,000-39,999'}]
    const lineFunction = d3.line()
                            .x(d => educationXScale(d.x))
                            .y(d => salaryYScale(d.y))

    // Axes for Scatter Plot
    svg.append('path')
        .transition('best-fit-line').duration(430)
            .attr('class', 'best-fit')
            .attr('d', lineFunction(bestFitLine))
            .attr('stroke', 'grey')
            .attr('stroke-dasharray', 6.2)
            .attr('opacity', 0)
            .attr('stroke-width', 3)

    let scatterxAxis = d3.axisBottom(educationXScale)
    let scatteryAxis = d3.axisLeft(salaryYScale).tickSize([width])

    scatterxAxisGroup = svg.append('g')
        .call(scatterxAxis)
        .attr('class', 'scatter-x')
        .attr('opacity', 0)
        .attr('transform', `translate(0, ${height + margin.top})`)
        .call(g => g.select('.domain')
            .remove())
    
    scatterxAxisGroup.selectAll("text")
        .attr("transform", `translate(0, -50)rotate(40)`)
        // .attr('font-size', 7)

            
    
    svg.append('g')
        .call(scatteryAxis)
        .attr('class', 'scatter-y')
        .attr('opacity', 0)
        .attr('transform', `translate(${margin.left - 20 + width}, 0)`)
        .call(g => g.select('.domain')
            .remove())
        .call(g => g.selectAll('.tick line'))
            .attr('stroke-opacity', 0.2)
            .attr('stroke-dasharray', 2.5)
    
    

    // Axes for Histogram 

    let histxAxis = d3.axisBottom(enrollmentScale)

    svg.append('g')
        .attr('class', 'enrolment-axis')
        .attr('transform', 'translate(0, 700)')
        .attr('opacity', 0)
        .call(histxAxis)
}

//Cleaning Function
//Will hide all the elements which are not necessary for a given chart type 

function clean(chartType){
    let svg = d3.select('#vis').select('svg')
    if (chartType !== "isScatter") {
        svg.select('.scatter-x').transition().attr('opacity', 0)
        svg.select('.scatter-y').transition().attr('opacity', 0)
        svg.select('.best-fit').transition().duration(200).attr('opacity', 0)
    }
    if (chartType !== "isMultiples"){
        svg.selectAll('.lab-text').transition().attr('opacity', 0)
            .attr('x', 1800)
        svg.selectAll('.cat-rect').transition().attr('opacity', 0)
            .attr('x', 1800)
    }
    if (chartType !== "isFirst"){
        svg.select('.first-axis').transition().attr('opacity', 0)
        svg.selectAll('.small-text').transition().attr('opacity', 0)
            .attr('x', -200)
    }
    if (chartType !== "isHist"){
        svg.selectAll('.hist-axis').transition().attr('opacity', 0)
    }
    if (chartType !== "isBubble"){
        svg.select('.enrolment-axis').transition().attr('opacity', 0)
    }
}

//First draw function

function draw1(){
    //Stop simulation
    simulation.stop()
    
    let svg = d3.select("#vis")
                    .select('svg')
                    .attr('width', 1000)
                    .attr('height', 950)
    
    clean('isFirst')

    d3.select('.categoryLegend').transition().remove()

    svg.select('.first-axis')
        .attr('opacity', 1)
    
    svg.selectAll('circle')
        .transition().duration(500).delay(100)
        .attr('fill', 'black')
        .attr('r', 3)
        .attr('cx', (d, i) => salaryXScale(d.salary)+5)
        .attr('cy', (d, i) => i * 5.2 + 30)

    svg.selectAll('.small-text').transition()
        .attr('opacity', 1)
        .attr('x', margin.left)
        .attr('y', (d, i) => i * 5.2 + 30)
}


function draw2(){
    let svg = d3.select("#vis").select('svg')
    
    clean('none')

    svg.selectAll('circle')
        .transition().duration(300).delay((d, i) => i * 5)
        .attr('r', d => salarySizeScale(d.salary) * 1.2)
        .attr('fill', d => categoryColorScale(d.job_title))

    simulation  
        .force('charge', d3.forceManyBody().strength([2]))
        .force('forceX', d3.forceX(d => categoriesXY[d.job_title][0] + 200))
        .force('forceY', d3.forceY(d => categoriesXY[d.job_title][1] - 50))
        .force('collide', d3.forceCollide(d => salarySizeScale(d.salary) + 4))
        .alphaDecay([0.02])

    //Reheat simulation and restart
    simulation.alpha(0.9).restart()
    
    createLegend(20, 50)
}

function draw3(){
    let svg = d3.select("#vis").select('svg')
    clean('isMultiples')
    
    svg.selectAll('circle')
        .transition().duration(400).delay((d, i) => i * 5)
        .attr('r', d => salarySizeScale(d.salary) * 1.2)
        .attr('fill', d => categoryColorScale(d.job_title))

    svg.selectAll('.cat-rect').transition().duration(300).delay((d, i) => i * 30)
        .attr('opacity', 0.2)
        .attr('x', d => categoriesXY[d][0] + 120)
        
    svg.selectAll('.lab-text').transition().duration(300).delay((d, i) => i * 30)
        .text(d => `Median: $${d3.format(",.2r")(categoriesXY[d][2])}`)
        .attr('x', d => categoriesXY[d][0] + 200)   
        .attr('y', d => categoriesXY[d][1] + 50)
        .attr('opacity', 1)

    svg.selectAll('.lab-text')
        .on('mouseover', function(d, i){
            d3.select(this)
                .text(d)
        })
        .on('mouseout', function(d, i){
            d3.select(this)
                .text(d => `Median: $${d3.format(",.2r")(categoriesXY[d][2])}`)
        })

    simulation  
        .force('charge', d3.forceManyBody().strength([2]))
        .force('forceX', d3.forceX(d => categoriesXY[d.job_title][0] + 200))
        .force('forceY', d3.forceY(d => categoriesXY[d.job_title][1] - 50))
        .force('collide', d3.forceCollide(d => salarySizeScale(d.salary) + 4))
        .alpha(0.7).alphaDecay(0.02).restart()

}

function colorByGender(d, i){
    if (d.gender == "Woman"){
        return '#e5c1cd'
    } else if (d.gender == "Man") {
        return '#aac9ce'
    } else {
        return '#c9bbc8'
    }
}


function draw4(){
    let svg = d3.select('#vis').select('svg')

    clean('isHist')

    simulation.stop()

    function selectRole1(){
        
        svg.selectAll('circle')
        .transition().duration(600).delay((d, i) => i * 2).ease(d3.easeBack)
            .attr('r', function(d){
                if (d.Q23_1 == 1){
                    return 10
                }else{
                    return 1
                }

            })
            .attr('cx', d => histXScale(d.job_title))
            .attr('cy', d => histYScale(d.origin))
            .attr('fill', d => categoryColorScale(d.job_title))

    }

    function selectRole2(){
        
        svg.selectAll('circle')
        .transition().duration(600).delay((d, i) => i * 2).ease(d3.easeBack)
            .attr('r', function(d){
                if (d.Q23_2 == 1){
                    return 10
                }else{
                    return 1
                }

            })
            .attr('cx', d => histXScale(d.job_title))
            .attr('cy', d => histYScale(d.origin))
            .attr('fill', d => categoryColorScale(d.job_title))

    }

    function selectRole3(){
        
        svg.selectAll('circle')
        .transition().duration(600).delay((d, i) => i * 2).ease(d3.easeBack)
            .attr('r', function(d){
                if (d.Q23_3 == 1){
                    return 10
                }else{
                    return 1
                }

            })
            .attr('cx', d => histXScale(d.job_title))
            .attr('cy', d => histYScale(d.origin))
            .attr('fill', d => categoryColorScale(d.job_title))

    }

    function selectRole4(){
        
        svg.selectAll('circle')
        .transition().duration(600).delay((d, i) => i * 2).ease(d3.easeBack)
            .attr('r', function(d){
                if (d.Q23_4 == 1){
                    return 10
                }else{
                    return 1
                }

            })
            .attr('cx', d => histXScale(d.job_title))
            .attr('cy', d => histYScale(d.origin))
            .attr('fill', d => categoryColorScale(d.job_title))

    }

    function selectRole5(){
        
        svg.selectAll('circle')
        .transition().duration(600).delay((d, i) => i * 2).ease(d3.easeBack)
            .attr('r', function(d){
                if (d.Q23_5 == 1){
                    return 10
                }else{
                    return 1
                }

            })
            .attr('cx', d => histXScale(d.job_title))
            .attr('cy', d => histYScale(d.origin))
            .attr('fill', d => categoryColorScale(d.job_title))

    }

    function selectRole6(){
        
        svg.selectAll('circle')
        .transition().duration(600).delay((d, i) => i * 2).ease(d3.easeBack)
            .attr('r', function(d){
                if (d.Q23_6 == 1){
                    return 10
                }else{
                    return 1
                }

            })
            .attr('cx', d => histXScale(d.job_title))
            .attr('cy', d => histYScale(d.origin))
            .attr('fill', d => categoryColorScale(d.job_title))

    }

    selectRole1()

    let selection = document.querySelector('select');
    selection.addEventListener('change', () => {
        console.log(selection.selectedIndex)
        if (selection.selectedIndex == 1){
            selectRole1()
        }else if (selection.selectedIndex == 2){
            selectRole2()
        }else if (selection.selectedIndex == 3){
            selectRole3()
        }else if (selection.selectedIndex == 4){
            selectRole4()
        }else if (selection.selectedIndex == 5){
            selectRole5()
        }else if (selection.selectedIndex == 6){
            selectRole6()
        }
    })

    let xAxis = d3.axisBottom(histXScale)
    let histxAxisGroup = svg.append('g')
        .attr('class', 'hist-axis')
        .attr('transform', `translate(0, ${height + margin.top + 10})`)
        .call(xAxis)

    histxAxisGroup.selectAll('text')
        .attr('transform', `translate(0, -10)rotate(40)`)

    svg.selectAll('.lab-text')
        .on('mouseout', )
}

function draw5(){
    
    let svg = d3.select('#vis').select('svg')
    clean('isMultiples')

    simulation
        .force('forceX', d3.forceX(d => categoriesXY[d.job_title][0] + 200))
        .force('forceY', d3.forceY(d => categoriesXY[d.job_title][1] - 50))
        .force('collide', d3.forceCollide(d => salarySizeScale(d.salary) + 4))

    simulation.alpha(1).restart()
   
    svg.selectAll('.lab-text').transition().duration(300).delay((d, i) => i * 30)
        .text(d => `Women Ratio: ${(categoriesXY[d][3])}%`)
        .attr('x', d => categoriesXY[d][0] + 200)   
        .attr('y', d => categoriesXY[d][1] + 50)
        .attr('opacity', 1)
    
    svg.selectAll('.lab-text')
        .on('mouseover', function(d, i){
            d3.select(this)
                .text(d)
        })
        .on('mouseout', function(d, i){
            d3.select(this)
                .text(d => `Women Ratio: ${(categoriesXY[d][3])}%`)
        })
   
    svg.selectAll('.cat-rect').transition().duration(300).delay((d, i) => i * 30)
        .attr('opacity', 0.2)
        .attr('x', d => categoriesXY[d][0] + 120)

    svg.selectAll('circle')
        .transition().duration(400).delay((d, i) => i * 4)
            .attr('fill', colorByGender)
            .attr('r', d => salarySizeScale(d.salary))

}


function draw6(){
    simulation.stop()
    
    let svg = d3.select("#vis").select("svg")
    clean('isScatter')

    svg.selectAll('.scatter-x').transition().attr('opacity', 0.7).selectAll('.domain').attr('opacity', 1)
    svg.selectAll('.scatter-y').transition().attr('opacity', 0.7).selectAll('.domain').attr('opacity', 1)

    svg.selectAll('circle')
        .transition().duration(800).ease(d3.easeBack)
        .attr('cx', d => educationXScale(d.education))
        .attr('cy', d => salaryYScale(d.salary))
    
    svg.selectAll('circle').transition(1600)
        .attr('fill', colorByGender)
        .attr('r', 10)
        // .attr('transform', `translate(${margin.left - 100}, 0)`)

    // svg.select('.best-fit').transition().duration(300)
        // .attr('opacity', 0.5)
   
}


function draw8(){
    clean('none')

    let svg = d3.select('#vis').select('svg')
    svg.selectAll('circle')
        .transition()
        .attr('r', d => salarySizeScale(d.salary))
        .attr('fill', d => categoryColorScale(d.job_title))

    simulation 
        .force('forceX', d3.forceX(500))
        .force('forceY', d3.forceY(500))
        .force('collide', d3.forceCollide(d => salarySizeScale(d.salary) * 1.6 + 4))
        .alpha(0.6).alphaDecay(0.05).restart()
        
}

//Array of all the graph functions
//Will be called from the scroller functionality

let activationFunctions = [
    draw1,
    draw2,
    draw3,
    draw4,
    draw5, 
    draw6, 
    draw8
]

//All the scrolling function
//Will draw a new graph based on the index provided by the scroll


let scroll = scroller()
    .container(d3.select('#graphic'))
scroll()

let lastIndex, activeIndex = 0

scroll.on('active', function(index){
    d3.selectAll('.step')
        .transition().duration(500)
        .style('opacity', function (d, i) {return i === index ? 1 : 0.1;});
    
    activeIndex = index
    let sign = (activeIndex - lastIndex) < 0 ? -1 : 1; 
    let scrolledSections = d3.range(lastIndex + sign, activeIndex + sign, sign);
    scrolledSections.forEach(i => {
        activationFunctions[i]();
    })
    lastIndex = activeIndex;

})

scroll.on('progress', function(index, progress){
    if (index == 2 & progress > 0.7){

    }
})