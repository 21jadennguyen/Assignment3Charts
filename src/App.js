import React, { Component } from 'react';
import * as d3 from 'd3';
import Child1 from './components/Child1';
import Child2 from './components/Child2';
import './App.css'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    fetch('/tips.csv')
      .then((response) => response.text())
      .then((csvText) => {
        const parsedData = d3.csvParse(csvText);
        const formattedData = parsedData.map(row => ({
          totalBill: +row['total_bill'],
          tip: +row['tip'],
          day: row['day'],
        }));
        this.setState({ data: formattedData });
      });
  }

  render() {
    const { data } = this.state;
    return (
      <div className="App">
        <div className="container-class">
          <Child1 data={data} />
          <Child2 data={data} />
        </div>
      </div>
    );
  }
}

export default App;
