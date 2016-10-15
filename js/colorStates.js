var map = d3.select(".map");
var states = map.selectAll('path');

var color = d3.scale.category20();

states.attr('fill', function(d, i) {
  return color(i);
});

states.on("mouseover", function(d) {
  var stateUnderMouse = this;
  d3.selectAll('path').transition().style('opacity', function() {
    return (this === stateUnderMouse) ? 1.0 : 0.5;
  });
});

states.on("mouseout", function(d) {
  d3.selectAll('path').transition().style('opacity', function() {
    return 1.0;
  });
});
