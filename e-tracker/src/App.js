import React, { Component } from 'react';
import AddExpense from './components/add-expense.js.jsx';
import LeftDiv from './components/left-div.js.jsx';
import RightDiv from './components/right-div.js.jsx';
import './App.css';

class App extends Component {
  constructor(props) {
  super(props);
  this.state = {
    showAddExpenseComponent: false,
    showViewExpenseComponent: false,
  };
  this._onButtonClick = this._onButtonClick.bind(this);
  this._onViewButtonClick = this._onViewButtonClick.bind(this);
  }
  _onButtonClick() {
    this.setState({
      showAddExpenseComponent: true,
    });
  }
  _onViewButtonClick(){
    this.setState({
      showViewExpenseComponent: true,
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to Expense Tracker</h2>
          <button className="main-button" onClick={this._onButtonClick}>add expense</button>
          <button className="main-button" onClick={this._onViewButtonClick}>view expense</button>
        </div>
        <div className="parent-div">
        <div id="left" className="left-div">
          {this.state.showAddExpenseComponent ?
             <LeftDiv
             component = "add-expense"/>:
            null
          }
        </div>
        <div id="right" className="right-div">
          {this.state.showViewExpenseComponent ?
             <RightDiv
             component = "view-expense"/>:
            null
          }
        </div>
       </div>
      </div>
    );
  }
}

export default App;
