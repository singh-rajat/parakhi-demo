/*D3 Donut*/

var width = 200,
    height = 200,
    radius = Math.min(width, height) / 2;

var color = d3.scale.ordinal()
    .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

var arc = d3.svg.arc()
    .outerRadius(radius - 10)
    .innerRadius(radius - 50);

var pie = d3.layout.pie()
    .sort(null)
    .value(function(d) { return d.population; });

var svg = d3.select("#d3_donut").append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
    //.attr("data-legend",function(d) { return d.name});

d3.csv("js/d3/donut_data.csv", function(error, data) {

    data.forEach(function(d) {
        d.population = +d.population;
    });

    var g = svg.selectAll(".arc")
        .data(pie(data))
        .enter().append("g")
        .attr("class", "arc");

    g.append("path")
        .attr("d", arc)
        .style("fill", function(d) { return color(d.data.age); });

    legend = svg.append("g")
        .attr("class","legend")
        .attr("transform","translate(50,30)")
        .style("font-size","12px")
        .call(d3.legend);


    //g.append("text")
    //    .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
    //    .attr("dy", ".35em")
    //    .style("text-anchor", "middle")
    //    .text(function(d) { return d.data.age; });

});