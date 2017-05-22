/**
 * Module dependencies.
 */
var express = require('express'),
	app = express(),
	morgan = require('morgan'),
	bodyParser = require('body-parser')

/**
 * Configuration
 */
var port     = process.env.PORT || 3000

app.use(morgan('dev'))
app.use(bodyParser.json())


 /**
 * Router
 */
require('./controllers/routes.js')(app);

app.listen(port);
console.log('The Server runs on port ' + port);
