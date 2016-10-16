var map = d3.select(".map");
var states = map.selectAll('path');
var circles = d3.select(".state-circles")
  .attr("height", 30)
  .attr("width", 900);

var xCircleOffset = d3.scaleLinear()
  .domain([0, 50])
  .range([10, 890]);

var selected = null;

d3.json("data/states.json", function(error, data) {

  var color = d3.scaleLinear()
    .domain([0, 1])
    .range(["#e7f2e7", "green"]);

  function colorState(d, hover) {
    if (d.name === selected) {
      return hover ? d3.rgb(255, 236, 180) : d3.rgb(255, 198, 71);
    } else {
      return color(d.score);
    }
  }

  states.attr('fill', function(d, i) {
    return color(data.states[i].score);
  });

  var circle = circles.selectAll("circle").data(data.states);

  circle.enter().append("circle")
      .attr("r", 8)
      .attr("cy", 10)
      .attr("cx", function(d, i) { return xCircleOffset(d.rank); })
      .style("fill", color(.3));

  states.on("mouseover", function(d, i) {
    var stateUnderMouse = this;
    d3.selectAll('path').transition().style('fill', function(d, i) {
      return (this === stateUnderMouse) ? d3.rgb(255, 198, 71) : colorState(data.states[i], true);
    });
    d3.selectAll('circle').transition().style('fill', function(d, i) {
      return (stateUnderMouse.rank === i) ? d3.rgb(255, 198, 71) : color(.3);
    });
    d3.select(".state-name").text(data.states[i].name);
  });

  states.on("mouseout", function() {
    states.transition().style('fill', function(d, i) {
      return colorState(data.states[i], false);
    });
    if (selected == null) {
      d3.select(".state-name")
          .text("Select A State")
          .style("color", "grey");
    } else {
      d3.select(".state-name")
          .text(selected)
          .style("color", "black");
    }
  });

  states.on("click", function(d, i) {
    selected = data.states[i].name;
  });
});
