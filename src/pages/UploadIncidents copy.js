
import React, { Component , useMemo} from 'react'
import { useCSVReader ,usePapaParse } from 'react-papaparse'

console.log(useMemo);

export default class CSVReader1 extends Component {
  
  constructor() {
    super();
    this.state = {
      csvfile: undefined
    };
    this.updateData = this.updateData.bind(this);
  }

  handleChange = event => {
    this.setState({
      csvfile: event.target.files[0]
    });
  };

  importCSV = () => {
    const { csvfile } = this.state;
    usePapaParse(csvfile, {
      complete: this.updateData,
      header: true
    });
  };

  updateData(result) {
    var data = result.data;
    console.log(data);
  }

  render() {
    console.log(this.state.csvfile);
    return (
      <div className="App">
        <h2>Import CSV File!</h2>
        <input
          className="csv-input"
          type="file"
          ref={input => {
            this.filesInput = input;
          }}
          name="file"
          placeholder={null}
          onChange={this.handleChange}
        />
        <p />
        <button onClick={this.importCSV}> Upload now!</button>
      </div>
    );
  }
  }