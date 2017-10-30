var bodyParser = require('body-parser');
var mongoose = require('mongoose');
//connect to the database
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://<user>:<user>@ds139187.mlab.com:39187/todone');

//create schema
var todoSchema = new mongoose.Schema({
	item: String
});

//create model
var Todo = mongoose.model('Todo', todoSchema);

var itemFirst = Todo({item:'Run 10km'}).save(function(err){
	if (err) throw err;
	console.log('Item sucessfully saved');
});

// body parser middleware
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var data=[{item:'buy food'},{item:'play xbox'},{item:'milk cow'}];
module.exports = function (app) {

	app.get('/todo', function(req, res){
		res.render('todo',{todos:data});
	});

	app.post('/todo', urlencodedParser, function(req, res){

		data.push(req.body);
		res.json(data);
	});

	app.delete('/todo/:item', function(req, res){
		data = data.filter(function(todo){
			return todo.item.replace(/ /g,"-") !== req.params.item;
		});
		res.json(data);
	});


};