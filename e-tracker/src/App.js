import React, { Component } from 'react';
import AddExpense from './components/add-expense.js.jsx';
import './App.css';

class App extends Component {
  constructor(props) {
  super(props);
  this.state = {
    showAddExpenseComponent: false,
  };
  this._onButtonClick = this._onButtonClick.bind(this);
  }
  _onButtonClick() {
    this.setState({
      showAddExpenseComponent: true,
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to Expense Tracker</h2>
          <button className="main-button" onClick={this._onButtonClick}>add expense</button>
          <button className="main-button">view expense</button>
        </div>
        <div className="parent-div">
        <div id="left" className="left-div">
          {this.state.showAddExpenseComponent ?
            <AddExpense /> :
            null
          }
        </div>
        <div id="right" className="right-div"> This is right panel
        </div>
       </div>
      </div>
    );
  }
}

export default App;
