import React, { Component } from 'react';
import * as d3 from 'd3';

class Child1 extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    this.renderChart();
  }

  componentDidUpdate() {
    this.renderChart();
  }

  renderChart() {
    var data = this.props.data;

    var margin = { top: 50, right: 10, bottom: 90, left: 30 },
      width = 500 - margin.left - margin.right,
      height = 300 - margin.top - margin.bottom;

    var container = d3.select(".child1_svg")
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .select('.g_1')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    var x_data = data.map(item=>item.totalBill)
    const x_scale = d3.scaleLinear()
      .domain([0, d3.max(x_data)])
      .range([margin.left, width]);
    container.selectAll(".x_axis_g").data([0]).join('g')
      .attr("class", 'x_axis_g')
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x_scale));

    var y_data = data.map(item=>item.tip)
    const y_scale = d3.scaleLinear()
      .domain([0, d3.max(y_data)])
      .range([height, 0]);
    container.selectAll(".y_axis_g").data([0]).join('g')
      .attr("class", 'y_axis_g')
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y_scale));

    container.append('text')
      .attr('x', width / 2 + 30)
      .attr('y', height + 40)
      .attr('text-anchor', 'middle')
      .text('Total Bill');

    container.append('text')
      .attr('x', -height / 2 + 20)
      .attr('y', 0)
      .attr('transform', 'rotate(-90)')
      .attr('text-anchor', 'middle')
      .text('Tips');

    container.selectAll("circle")
      .data(data)
      .join("circle")
      .attr("cx", function(d) {
        return x_scale(d.totalBill);
      })
      .attr("cy", function(d) {
        return y_scale(d.tip);
      })
      .attr("r", 3)
      .style("fill", "#69b3a2");

      container.selectAll(".chart_title").data([0]).join('text')
        .attr("class", "chart_title")
        .attr("x", width / 2)
        .attr("y", -20)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .style("font-weight", "bold")
        .text("Total Bill vs Tips");
  }

  render() {
    return (
      <div className="child1_container">
        <svg className="child1_svg">
          <g className="g_1"></g>
        </svg>
      </div>
    );
  }
}

export default Child1;