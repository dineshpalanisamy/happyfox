var model = require('../models/schema');
module.exports = function(app) {

	app.get('/', function(req, res){
	    res.end("Hello Happyfox");
	});
}
