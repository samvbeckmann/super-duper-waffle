var map = d3.select(".map");
var states = map.selectAll('path');
var circles = d3.select(".state-circles")
  .attr("height", 30)
  .attr("width", 900);

var xCircleOffset = d3.scaleLinear()
  .domain([0, 50])
  .range([10, 890]);

d3.json("data/states.json", function(error, data) {

  var color = d3.scaleLinear()
    .domain([0, d3.max(data.states, function(d) {
      return d.trump;
    })])
    .range(["white", "green"]);

  states.attr('fill', function(d, i) {
    return color(data.states[i].trump);
  });

  var circle = circles.selectAll("circle").data(data.states);

  circle.enter().append("circle")
      .attr("r", 8)
      .attr("cy", 10)
      .attr("cx", function(d, i) { return xCircleOffset(i); })
      .style("fill", "black");

});

states.on("mouseover", function() {
  var stateUnderMouse = this;
  d3.selectAll('path').transition().style('opacity', function() {
    return (this === stateUnderMouse) ? 1.0 : 0.5;
  });
});

states.on("mouseout", function() {
  states.transition().style('opacity', function() {
    return 1.0;
  });
});

states.on("click", function(d) {
  var id = d3.select(this).attr("id");
  d3.select(".state-name").text(id);
});
