import React, { Component } from 'react';
import AddExpense from './add-expense.js.jsx';
import AddedExpense from './added-expense.js.jsx';

export default class LeftDiv extends Component {
  constructor(props) {
    super(props);
  }
  render(){
    const {component} = this.props;
    console.log(component)
    return (
      component == 'add-expense' ?
        <AddExpense /> : <AddedExpense/>
    )
  }
}
