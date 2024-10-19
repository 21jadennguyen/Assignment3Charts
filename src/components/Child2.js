import React, { Component } from 'react';
import * as d3 from 'd3';

class Child2 extends Component {
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

    var margin = { top: 50, right: 10, bottom: 90, left: 70 },
      width = 500 - margin.left - margin.right,
      height = 300 - margin.top - margin.bottom;

    var container = d3.select(".child2_svg")
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .select('.g_2')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    var dayData = d3.groups(data, d => d.day).map(([key, values]) => ({
      day: key,
      averageTip: d3.mean(values, d => d.tip)
    }));

    const x_scale = d3.scaleBand()
      .domain(dayData.map(d => d.day))
      .range([0, width])
      .padding(0.2);

    container.selectAll(".x_axis_g").data([0]).join('g')
      .attr("class", 'x_axis_g')
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x_scale));

    const y_scale = d3.scaleLinear()
      .domain([0, d3.max(dayData, d => d.averageTip)])
      .range([height, 0]);

    container.selectAll(".y_axis_g").data([0]).join('g')
      .attr("class", 'y_axis_g')
      .call(d3.axisLeft(y_scale));

    container.selectAll("rect")
      .data(dayData)
      .join("rect")
      .attr("x", d => x_scale(d.day))
      .attr("y", d => y_scale(d.averageTip))
      .attr("width", x_scale.bandwidth())
      .attr("height", d => height - y_scale(d.averageTip))
      .style("fill", "#69b3a2");

    container.append('text')
      .attr('x', width / 2)
      .attr('y', height + 50)
      .attr('text-anchor', 'middle')
      .text('Day');

    container.append('text')
      .attr('x', -height / 2)
      .attr('y', -40)
      .attr('transform', 'rotate(-90)')
      .attr('text-anchor', 'middle')
      .text('Average Tip');

    container.selectAll(".chart_title").data([0]).join('text')
      .attr("class", "chart_title")
      .attr("x", width / 2)
      .attr("y", -20)
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .style("font-weight", "bold")
      .text("Average Tip by Day");
  }

  render() {
    return (
      <div className="child2_container">
        <svg className="child2_svg">
          <g className="g_2"></g>
        </svg>
      </div>
    );
  }
}

export default Child2;
