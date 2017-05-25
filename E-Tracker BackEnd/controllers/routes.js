var model = require('../models/schema');
module.exports = function(app) {

	app.get('/', function(req, res){
	    res.send(JSON.stringify({"msg":"hello"}));
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

	app.post('/view_expense', function (req, res) {
		var filterBy = req.body.filterBy;
		console.log(req.body)

		if(filterBy=='date'){
			var date = req.body.date;
			var catagory = req.body.catagory;
			if(catagory.length > 0){
				model.Expense.find({ '$where': "this.added_date.toJSON().slice(0, 10) == '"+date+"'",
															catagory: {  "$in" : catagory }}, function(err,docs){
					if(err){
						return res.status(400).send(JSON.stringify({"msg":"failed"}));
					}
					var total = 0;
					docs.forEach(function(doc){
						total += doc.amount
					})

					return res.status(200).send(JSON.stringify({"expense":total}))
				})
			}
			else {
				model.Expense.find({ '$where': "this.added_date.toJSON().slice(0, 10) == '"+date+"'"}, function(err,docs){
					if(err){
						return res.status(400).send(JSON.stringify({"msg":"failed"}));
					}
					var total = 0;
					docs.forEach(function(doc){
						total += doc.amount
					})
					console.log(total)
					return res.status(200).send(JSON.stringify({"expense":total}))
				})
			}
		}
	})
}
