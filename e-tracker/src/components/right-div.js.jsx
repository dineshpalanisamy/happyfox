import React, { Component } from 'react';
import ViewExpense from './view-expense.js.jsx'

export default class RightDiv extends Component {
  constructor(props) {
    super(props);
  }
  render(){
    const {component} = this.props;
    return (
      component === 'view-expense' ?
        <ViewExpense /> : null
    )
  }
}
