var map = d3.select(".map");

var states = map.selectAll('path');
var circles = d3.select(".state-circles")
  .attr("height", 30)
  .attr("width", 900)
  .append("g");
var superCircles = d3.select(".state-circles");

var xCircleOffset = d3.scaleLinear()
  .domain([0, 50])
  .range([10, 890]);

var selected = null;

d3.json("data/states.json", function(error, data) {

  var color = d3.scaleLinear()
    .domain([0, 1])
    .range(["#e7f2e7", "green"]);

  function colorState(d, i, hover) {
    if (i === selected) {
      return hover ? d3.rgb(255, 236, 180) : d3.rgb(255, 198, 71);
    } else {
      return color(d.score);
    }
  }

  states.attr('fill', function(d, i) {
    return color(data.states[i].score);
  });

  var circle = circles.selectAll("g").append("g")
      .data(data.states)
      .enter();

  var cir = circle.append("circle")
      .attr("r", 8)
      .attr("cy", 10)
      .attr("fill", function(d, i) {
        return color(data.states[i].score);
      })
      .attr("cx", function(d, i) { return xCircleOffset(data.states[i].rank); })
      .attr("id", function(d, i) {
        return data.states[data.states[i].rank].abbreviation;
      });

  states.on("mouseover", function(d, i) {
    var stateUnderMouse = this;
    var number = i;
    d3.selectAll('path').transition().style('fill', function(d, i) {
      return (this === stateUnderMouse) ? d3.rgb(255, 198, 71) : colorState(data.states[i], i, true);
    });

    d3.selectAll('circle').transition().style('fill', function(d, i) {
      if (number === i) {
        return d3.rgb(255, 198, 71)
      } else {
        return colorState(data.states[i], i, true);
      }
    });

    d3.select(".state-name").text(data.states[i].name).style("color", "black");
    d3.select("#electoral-votes").text(data.states[i].votes);
    d3.select("#trump-poll").text((data.states[i].trump * 100).toFixed(1) + "%");
    d3.select("#clinton-poll").text((data.states[i].clinton * 100).toFixed(1) + "%");
    d3.select("#undecided").text((data.states[i].undecided * 100).toFixed(1) + "%");

  });

  // circles.on("mouseover", function(d, i) {
  //   console.log(d);
  //   var rank = i;
  //   d3.selectAll('circle').transition().style('fill', function(d, i) {
  //     return (data.states[i].rank == i) ?  d3.rgb(255, 198, 71) : colorState(data.states[i], true);
  //   });
  // });

  states.on("mouseout", function() {
    states.transition().style('fill', function(d, i) {
      return colorState(data.states[i], i, false);
    });

    d3.selectAll("circle").transition().style('fill', function(d, i) {
      return colorState(data.states[i], i, false);
    });


    if (selected == null) {
      d3.select(".state-name")
          .text("Select A State")
          .style("color", "grey");
      d3.select("#electoral-votes").text("/");
      d3.select("#trump-poll").text("");
      d3.select("#clinton-poll").text("");
      d3.select("#undecided").text("");
    } else {
      d3.select(".state-name")
          .text(data.states[selected].name)
          .style("color", "black");
      d3.select("#electoral-votes").text(data.states[selected].votes);
      d3.select("#trump-poll").text((data.states[selected].trump * 100).toFixed(1) + "%");
      d3.select("#clinton-poll").text((data.states[selected].clinton * 100).toFixed(1) + "%");
      d3.select("#undecided").text((data.states[selected].undecided * 100).toFixed(1) + "%");
    }
  });

  states.on("click", function(d, i) {
    selected = i;
    d3.select("#trump-poll").text((data.states[i].trump * 100).toFixed(1) + "%");
    d3.select("#clinton-poll").text((data.states[i].clinton * 100).toFixed(1) + "%");
    d3.select("#undecided").text((data.states[i].undecided * 100).toFixed(1) + "%");
    d3.select("#electoral-votes").text(data.states[i].votes);

    states.transition().style('fill', function(d, i) {
      return colorState(data.states[i], i, false);
    });

    d3.selectAll("circle").transition().style('fill', function(d, i) {
      return colorState(data.states[i], i, false);
    });
  });
});
