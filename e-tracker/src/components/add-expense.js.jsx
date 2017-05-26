import React, { Component } from 'react';
import '../styles/add-expense.css';
import 'react-select/dist/react-select.css';
import LeftDiv from './left-div.js.jsx'
var Select = require('react-select');

export default class AddExpense extends Component {
  constructor(props) {
  super(props);
  this.state = {
    multi: true,
    multiValue: [],
    options: [
      { value: 'fuel', label: 'Fuel' },
      { value: 'food', label: 'Food' },
      { value: 'electronics', label: 'Electronics' },
      { value: 'shopping', label: 'Shopping'},
      { value: 'new', label: 'Other'}
    ],
    showAddCatagory: false,
    title:'',
    amount:'',
    notes:'',
    addCatagory:'',
    addedSuccess: '',
    responseSuccess:false,
    value: undefined
  };
  this.handleOnChange = this.handleOnChange.bind(this);
  this.handleTitleChange = this.handleTitleChange.bind(this);
  this.handleAmountChange = this.handleAmountChange.bind(this);
  this.handleNotesChange = this.handleNotesChange.bind(this);
  this.handleAddCatagoryChange = this.handleAddCatagoryChange.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
}
shouldComponentUpdate(nextProps, nextState) {
    return true
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

  handleTitleChange(e) {
    this.setState({title : e.target.value, responseSuccess : false})
  }
  handleAmountChange(e) {
    this.setState({amount : e.target.value, responseSuccess : false})
  }
  handleNotesChange(e) {
    this.setState({notes : e.target.value, responseSuccess : false})

  }
  handleAddCatagoryChange(e) {
    this.setState({addCatagory: e.target.value, responseSuccess : false})
  }

  handleSubmit(e) {
    var catArray = this.state.multiValue
    if(this.state.addCatagory.length > 0){
      catArray.push(this.state.addCatagory)
    }
    fetch('http://127.0.0.1:3000/add_expense', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title:this.state.title,
        amount:this.state.amount,
        notes : this.state.notes,
        catagory : this.state.multiValue
      })
    }).then(function(response) {
      if(response.ok){
        this.setState({responseSuccess: true})
      }
      this.forceUpdate()
      return response.json();
    }.bind(this)).then(function(data) {
      console.log(data)
    }.bind(this));
    console.log("hi")
    console.log(this.state.responseSuccess)
    e.preventDefault();
  }

  render() {
    return(
      <div>
        <form onSubmit={this.handleSubmit} method="post">
          <div className="add-expense">
            <p>Expense Adder Widget</p>
            <br/>
            <div className="expense-properties">
              <label>Title: </label> <input className="input-title" value={this.state.title} onChange={this.handleTitleChange} type="text" name="title" />
            </div>
              <div className="expense-properties">
            <label>Amount: </label> <input className="input-amount" value={this.state.amount} onChange={this.handleAmountChange} type="text" name="amount" /><br/>
              </div>
            <div className="expense-properties">
              <label>Notes: </label> <input className="input-notes" value={this.state.notes} onChange={this.handleNotesChange} type="text" name="notes" /><br/>
            </div>
            <div className="expense-properties">
              <div><label>Catagory: </label> <div className="input-catagory"> {this.multiSelectDropdown()}</div></div>
            </div>
            <div className="">
              {this.state.showAddCatagory ?
                <div>
                  <input className="add-input-catagory" value={this.state.addCatagory} onChange={this.handleAddCatagoryChange} type="text" name="add-catagory" placeholder="add catagory" /><br/>
                </div> :
                null
              }
            </div>
          </div>
          <div className="input-submit">
            <input  type="submit" value="Submit" />
          </div>
        </form>
        {this.state.responseSuccess ? <p>{this.state.title} Added Successfully</p>:null}
      </div>
    )
  }
}
