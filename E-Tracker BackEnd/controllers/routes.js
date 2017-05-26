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

	function filterByDate(req,res){
		var date = req.body.value;
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
				return res.status(200).send(JSON.stringify({"expense":total}))
			})
		}
	}

	function filterByWeek(req,res){
		var catagory = req.body.catagory;
		var startdate = getDateOfWeek(req.body.value.substring(6,8), req.body.value.substring(0,4))
		var endDate=new Date(startdate.getFullYear(),startdate.getMonth(),startdate.getDate()+7)
		if(catagory.length > 0){
			model.Expense.find({"added_date": {"$gte": startdate, "$lt": endDate},
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
			model.Expense.find({ "added_date": {"$gte": startdate, "$lt": endDate}}, function(err,docs){
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
	}

	function filterByMonth(req,res){
		var catagory = req.body.catagory;
		var monthdate = new Date(req.body.value.substring(0,4)+"-"+req.body.value.substring(6,8)+"-"+01)
		var startdate = new Date(monthdate.getFullYear(), monthdate.getMonth(), 1);
		var endDate = new Date(monthdate.getFullYear(), monthdate.getMonth() + 1, 0);
		if(catagory.length > 0){
			model.Expense.find({"added_date": {"$gte": startdate, "$lt": endDate},
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
			model.Expense.find({ "added_date": {"$gte": startdate, "$lt": endDate}}, function(err,docs){
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
	}

	function getDateOfWeek(w, y) {
    var d = (1 + (w - 1) * 7); // 1st of January + 7 days for each week

    return new Date(y, 0, d);
}
function addDays(dateObj, numDays) {
  return dateObj.setDate(dateObj.getDate() + numDays);
}

	app.post('/view_expense', function (req, res) {
		var filterBy = req.body.filterBy;
		console.log(req.body)

		if(filterBy=='date'){
			filterByDate(req,res)
		}
		else if(filterBy=='week'){
			filterByWeek(req,res)
		}
		else if(filterBy=='month'){
			filterByMonth(req,res)
		}
	})

app.get('/get_catagory',function(req,res){
	model.Expense.distinct('catagory', function(err, catagories) {
		if(err){
			console.log(err)
		}
		var result = [];
		catagories.forEach(function(cat){
			if(cat != 'new'){
				result.push({value:cat,label:cat})
			}
		})
		return res.status(200).send(result)
})
})

}
