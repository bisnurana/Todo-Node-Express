var bodyParser = require('body-parser');
var mongoose = require('mongoose');
//connect to the database
var uri = 'mongodb://localhost:27017/todos';
mongoose.Promise = global.Promise;
mongoose.connect(uri);
var db = mongoose.connection;

//check connection
db.once('open', function(){
  console.log('Connected to mongo db');
});

//check db for error
db.on('error', function(err){
  console.log(err);
});

//create schema
var todoSchema = new mongoose.Schema({
	item: String
});

//create model
var Todo = mongoose.model('Todo', todoSchema);

/*Dummy data
var itemFirst = Todo({item:'Run 10km'}).save(function(err){
	if(err) throw err;
	console.log('Sucessfully item added');
});*/

// body parser middleware
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

//var data=[{item:'buy food'},{item:'play xbox'},{item:'milk cow'}];
module.exports = function (app) {

	app.get('/todo', function(req, res){
		Todo.find({}, function(err,data){
			if (err) throw err;
			res.render('todo',{todos:data});
		});
		
	});

	app.post('/todo', urlencodedParser, function(req, res){
		var newTodo = Todo(req.body).save(function(err,data){
			if (err) throw err;
			res.json(data);

		});
		
	});

	app.delete('/todo/:item', function(req, res){
		Todo.find({item:req.params.item.replace(/\-/g, ' ')}).remove(function(err, data){
			if(err) throw err;
			res.json(data);

		});
		
	});


};