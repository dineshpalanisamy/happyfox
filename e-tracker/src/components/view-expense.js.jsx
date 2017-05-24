import React, { Component } from 'react';
import '../styles/view-expense.css'

export default class ViewExpense extends Component {
  constructor(props) {
  super(props);
  this.state = {
    filterBy: 'date',
    dateValue: '',
  };
  this._onDropdownSelect = this._onDropdownSelect.bind(this)
  this._onDateSelect = this._onDateSelect.bind(this)
}
_onDropdownSelect(e) {
  this.setState({filterBy:e.target.value})
}

_onDateSelect(e) {
  this.setState({dateValue:e.target.value})
}

  render(){
    return (
      <div className="child-right-div">
        <label className="header-label">Filter By:</label>
        <select className="dropdown" value={this.state.filterBy} onChange={this._onDropdownSelect}>
          <option value="date"> Date </option>
          <option value="week"> Weekly </option>
          <option value="month"> Monthly </option>
        </select>
        <div className="filter-area">
          <p className="filter-label"> Select {this.state.filterBy}</p>
          <div>
            <input type="date" className="input-type" value={this.state.dateValue} onChange={this._onDateSelect}/>
          </div>
        </div>
      </div>
    )
  }
}
