import React, { Component } from 'react';
import '../styles/view-expense.css'
var Select = require('react-select');

export default class ViewExpense extends Component {
  constructor(props) {
  super(props);
  this.state = {
    filterBy: 'date',
    dateValue: '',
    multi: true,
    responseSuccess: false,
    totalExpense: '',
    multiValue: [],
    options: [],
    value: undefined
  };
  this._onDropdownSelect = this._onDropdownSelect.bind(this)
  this._onDateSelect = this._onDateSelect.bind(this)
  this.handleOnChange = this.handleOnChange.bind(this)
  this.handleSubmit = this.handleSubmit.bind(this)
}
_onDropdownSelect(e) {
  this.setState({filterBy:e.target.value})
}
shouldComponentUpdate(nextProps, nextState) {
    return true
}
componentWillMount() {
  fetch('http://127.0.0.1:3000/get_catagory', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  }).then(function(response) {
    if(response.ok){
      console.log("ok")
    }
    return response.json();
  }.bind(this)).then(function(data) {
    this.setState({options: data})
  }.bind(this));
}
handleOnChange (value) {
  var catArray = [];
  value.map((val)=>{
    catArray.push(val.value)
  })
  const { multi } = this.state;
	if (multi) {
		this.setState({ multiValue: catArray });
	} else {
		this.setState({ value });
	}
}

multiSelectDropdown() {
  const { multi, multiValue, options } = this.state;
  return (
  <Select multi={multi}
          value={multiValue}
          placeholder="Select"
          options={options}
          onChange={this.handleOnChange} />
  )
}

_onDateSelect(e) {
  console.log(e.target.value)
  this.setState({dateValue:e.target.value})
}

handleSubmit(e) {
  fetch('http://127.0.0.1:3000/view_expense', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      filterBy:this.state.filterBy,
      value:this.state.dateValue,
      catagory : this.state.multiValue
    })
  }).then(function(response) {
    if(response.ok){
      this.setState({responseSuccess: true})
    }
    return response.json();
  }.bind(this)).then(function(data) {
    console.log(data)
    this.setState({totalExpense: data.expense})
  }.bind(this));

  e.preventDefault();
}

  render(){
    return (
      <div className="child-right-div">
      <form onSubmit={this.handleSubmit} method="post">
        <label className="header-label">Filter By:</label>
        <select className="dropdown" value={this.state.filterBy} onChange={this._onDropdownSelect}>
          <option value="date"> Date </option>
          <option value="week"> Weekly </option>
          <option value="month"> Monthly </option>
        </select>
        <div className="filter-area">
          <p className="filter-label"> Select {this.state.filterBy}</p>
          <div>
            <input type={this.state.filterBy} className="input-type" value={this.state.dateValue} onChange={this._onDateSelect}/>
          </div>
        </div>
        <div>
          <div><p className="dropdown-label">Select Catagory</p></div>
          <div className="multi-dropdown">
            {this.multiSelectDropdown()}
          </div>
          <input type="submit" className="view-expense-button"></input>
        </div>
        </form>
        <div className="result-div">
          {this.state.responseSuccess ? <p>you have spent {this.state.totalExpense}</p> : null}
        </div>
      </div>
    )
  }
}
