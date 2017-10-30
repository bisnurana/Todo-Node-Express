//require modules
var express = require('express');
var todoController = require('./controllers/todoController');
var app = express();
var port=3000;

// set template engine ejs
app.set('view engine','ejs');

//static files
app.use(express.static('./public'));

//init controller
todoController(app);

//listening port
app.listen(port);
console.log('Listening at port ' + port);


