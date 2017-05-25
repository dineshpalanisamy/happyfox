import React, { Component } from 'react';
import '../styles/view-expense.css'
var Select = require('react-select');

export default class ViewExpense extends Component {
  constructor(props) {
  super(props);
  this.state = {
    filterBy: 'date',
    dateValue: '',
    weekValue: '',
    monthValue: '',
    addCatagory: '',
    multi: true,
    showAddCatagory: false,
    multiValue: [],
    options: [
      { value: 'fuel', label: 'Fuel' },
      { value: 'food', label: 'Food' },
      { value: 'electronics', label: 'Electronics' },
      { value: 'shopping', label: 'Shopping'},
      { value: 'new', label: 'Other'}
    ],
    value: undefined
  };
  this._onDropdownSelect = this._onDropdownSelect.bind(this)
  this._onDateSelect = this._onDateSelect.bind(this)
  this._onWeekSelect = this._onWeekSelect.bind(this)
  this._onMonthSelect = this._onMonthSelect.bind(this)
  this.handleOnChange = this.handleOnChange.bind(this)
  this.handleAddCatagoryChange = this.handleAddCatagoryChange.bind(this)
  this.handleSubmit = this.handleSubmit.bind(this)
}
_onDropdownSelect(e) {
  this.setState({filterBy:e.target.value})
}
handleOnChange (value) {
  this.setState({showAddCatagory: false});
  var catArray = [];
  value.map((val)=>{
    catArray.push(val.value)
    if(val.value === 'new'){
      this.setState({showAddCatagory: true})
    }
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
_onWeekSelect(e) {
  this.setState({weekValue:e.target.value})
}
_onMonthSelect(e) {
  this.setState({monthValue:e.target.value})
}
handleAddCatagoryChange(e){
  this.setState({addCatagory:e.target.value})
}
handleSubmit(e) {
  var catArray = this.state.multiValue
  if(this.state.addCatagory.length > 0){
    catArray.push(this.state.addCatagory)
  }
  fetch('http://127.0.0.1:3000/view_expense', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      filterBy:this.state.filterBy,
      date:this.state.dateValue,
      catagory : this.state.multiValue
    })
  }).then(function(response) {
    if (response.ok) {
      console.log(response.ok)
      return response;
    }
    throw Error(response.statusText);
  }).then(function(response) {
    return response.json();
  }).then(function(json) {
    console.log('Request succeeded with JSON response:', json);
  }).catch(function(error) {
    console.log('Request failed:', error.message);
  });
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
          {this.state.filterBy === 'date' ?
            <div>
            <input type="date" className="input-type" value={this.state.dateValue} onChange={this._onDateSelect}/>
            </div> :
            (this.state.filterBy === 'week' ?
            <div>
            <input type="week" className="input-type" value={this.state.weekValue} onChange={this._onWeekSelect}/>
            </div> :
            <div>
            <input type="month" className="input-type" value={this.state.monthValue} onChange={this._onMonthSelect}/>
            </div>
          )
          }
          </div>
        </div>
        <div>
          <div><p className="dropdown-label">Select Catagory</p></div>
          <div className="multi-dropdown">
            {this.multiSelectDropdown()}
          </div>
          <div className="">
            {this.state.showAddCatagory ?
              <div>
                <input className="input-add-catagory" value={this.state.addCatagory} onChange={this.handleAddCatagoryChange} type="text" name="add-catagory" placeholder="add catagory" /><br/>
              </div> :
              null
            }
          </div>
          <input type="submit" className="view-expense-button"></input>
        </div>
        </form>
      </div>
    )
  }
}
