var model = require('../models/schema');
module.exports = function(app) {

	app.get('/', function(req, res){
	    res.end("Hello Happyfox");
	});

  app.post('/add_expense', function(req, res){
      var title = req.body.title;
      var amount = req.body.amount;
      var notes = req.body.notes;
      var catagory = req.body.catagory;

      var newexpense = new model.Expense();
      newexpense.title = title;
      newexpense.amount = amount;
      newexpense.notes = notes;
      newexpense.catagory = catagory;

      newexpense.save(function(err, savedExpense){
        if(err){
          console.log(err);
        }
        return res.status(200).send();
      })
  });
}
