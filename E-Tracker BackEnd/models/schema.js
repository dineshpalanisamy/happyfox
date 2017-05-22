var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var expenseSchema = mongoose.Schema({
	title : String,
	amount : Number,
  notes : String,
  catagory : Array,
  added_date: { type: Date, default: Date.now },
});
mongoose.connect('mongodb://localhost:27017/etracker');
var Expense = mongoose.model('expenses', expenseSchema);
module.exports = {
	Expense: Expense
};
