var states = d3.select(".map").selectAll('path');

var xCircleOffset = d3.scaleLinear()
  .domain([0, 49])
  .range([10, 890]);

var selected = null;

function updateText(stateData, considerNull) {
  if (considerNull && selected == null) {
    d3.select(".state-name")
        .text("Select A State")
        .style("color", "grey");
    d3.select("#electoral-votes").text("/");
    d3.select("#trump-poll").text("—");
    d3.select("#clinton-poll").text("—");
    d3.select("#undecided").text("—");
  } else {
    d3.select(".state-name")
        .text(stateData.name)
        .style("color", "black");
    d3.select("#electoral-votes").text(stateData.votes);
    d3.select("#trump-poll").text((stateData.trump * 100).toFixed(1) + "%");
    d3.select("#clinton-poll").text((stateData.clinton * 100).toFixed(1) + "%");
    d3.select("#undecided").text((stateData.undecided * 100).toFixed(1) + "%");
  }
}

d3.json("data/states.json", function(error, data) {

  var color = d3.scaleLinear()
    .domain([0, 1])
    .range(["#e7f2e7", "green"]);

  function colorState(d, i, hover) {
    if (i === selected) {
      return hover ? "#ffecb4" : "#ffc647";
    } else {
      return color(d.score);
    }
  }

  states.attr('fill', function(d, i) {
    return color(data.states[i].score);
  });

  var circle = d3.select(".state-circles").append("g").selectAll("g").append("g")
      .data(data.states)
      .enter();

  circle.append("circle")
      .attr("r", 8)
      .attr("cy", 10)
      .attr("fill", function(d, i) {
        return color(data.states[i].score);
      })
      .attr("cx", function(d, i) { return xCircleOffset(data.states[i].rank); })
      .attr("id", function(d, i) {
        return data.states[data.states[i].rank].abbreviation;
      });

  var circles = d3.select(".state-circles").selectAll('circle');

  var mouseover = function(d, number) {
    states.transition().style('fill', function(d, i) {
      return (number === i) ? "#ffc647" : colorState(data.states[i], i, true);
    });

    circles.transition().style('fill', function(d, i) {
      return (number === i) ? "#ffc647" : colorState(data.states[i], i, true);
    });

    updateText(data.states[number], false);
  }

  states.on("mouseover", function(d, i) { mouseover(d, i) });
  circles.on("mouseover", function(d, i) { mouseover(d, i) });

  var mouseout = function() {
    states.transition().style('fill', function(d, i) {
      return colorState(data.states[i], i, false);
    });

    circles.transition().style('fill', function(d, i) {
      return colorState(data.states[i], i, false);
    });

    updateText(data.states[selected], true);
  };

  states.on("mouseout", function() { return mouseout() });
  circles.on("mouseout", function() { return mouseout() });

  var click = function(d, i) {
    selected = i;
    updateText(data.states[i], false);

    states.transition().style('fill', function(d, i) {
      return colorState(data.states[i], i, false);
    });

    circles.transition().style('fill', function(d, i) {
      return colorState(data.states[i], i, false);
    });
  }

  states.on("click", function(d, i) { click(d, i) });
  circles.on("click", function(d, i) { click(d, i) });
});
