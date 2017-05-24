var model = require('../models/schema');
module.exports = function(app) {

	app.get('/', function(req, res){
	    res.send(JSON.stringify({"msg":"hello"}));
	});

	app.options('/', (req, res) => {
	    res.header("Access-Control-Allow-Origin", "*");
	    res.header("Access-Control-Allow-Methods", "GET,POST,OPTIONS,PUT,PATCH,DELETE");
	    res.header("Access-Control-Allow-Headers", "Content-Type");
	    res.setHeader('Content-Type', 'application/json');
		res.status(200).send('');
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
          return res.status(400).send(JSON.stringify({"msg":"failed"}));
        }
        return res.status(200).send(JSON.stringify({"msg":"Successfully saved"}));
      })
  });
}
