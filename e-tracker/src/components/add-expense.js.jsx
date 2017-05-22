import React, { Component } from 'react';
import '../styles/add-expense.css';


export default class AddExpense extends Component {
  render() {
    return(
      <div>
        <form onSubmit={this.handleSubmit} method="post">
          <div className="add-expense">
            <p>Expense Adder Widget</p>
            <br/>
            <div className="expense-properties">
              <label>Title: </label> <input type="text" name="title" />
            </div>
              <div className="expense-properties">
            <label>Amount: </label> <input type="text" name="amount" /><br/>
              </div>
            <div className="expense-properties">
              <label>Notes: </label> <input type="text" name="notes" /><br/>
            </div>
            <div className="expense-properties">
              <label>Catagory: </label> <input type="text" name="title" />
            </div>
          </div>
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}
