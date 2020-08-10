// @TODO: YOUR CODE HERE!

var svgWidth = 900;
var svgHeight = 620;

var chartMargin = {
    top: 30,
    right: 30,
    bottom: 50,
    left: 50,
};

var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom; 

    var svg = d3.select("#scatter")
      .append("svg")
      .attr("height", svgHeight)
      .attr("width", svgWidth);

    var chartGroup = svg.append("g")
      .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);

    d3.csv("data.csv").then(function(data){
      console.log(data);   

    data.forEach(function(data) {
    data.poverty = +data.poverty;
    data.healthcare = +data.healthcareLow;
  });


var xBandScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.healthcare)])
    .range([0, chartWidth]);

var yLinearScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.poverty)])
    .range([chartHeight, 0])


var bottomAxis = d3.axisBottom(xBandScale);
var leftAxis = d3.axisLeft(yLinearScale);

    chartGroup.append("g")
        .attr("transform", `translate(0, ${chartHeight})`)
        .call(bottomAxis);

    chartGroup.append("g")
        .call(leftAxis)


    chartGroup.selectAll(".scatter")
      .data(data)
      .enter()
      .append('circle')
      .attr("cx", d => xBandScale(d.healthcare))
      .attr("cy", d => yLinearScale(d.poverty))
      .attr("r", "10")
      .attr("fill", "#89bdd3")
      .attr("opacity", "0.5");


    chartGroup.selectAll(".scatter")
      .data(data)
      .enter()
      .append('text')
      .text(d => d.abbr)
      .attr('x', d => xBandScale(d.healthcare))
      .attr('y', d => yLinearScale(d.poverty));

  
    svg.append("text")
      .attr("x", 450)
      .attr("y", 600)
      .style('font-weight', 'bold')
      .style("text-anchor", "")
      .text("In Poverty (%)");



    svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 10)
      .attr("x", 0 - (chartHeight / 2))
      .attr("dy", "1em")
      .style('font-weight', 'bold')
      .style("text-anchor", "middle")
      .text("Lacks Healthcare (%)");
});
