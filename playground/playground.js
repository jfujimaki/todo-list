var Sequelize = require('sequelize');
var sequelize = new Sequelize(undefined, undefined, undefined, {
	'dialect': 'sqlite',
	'storage': 'todo-sqlite-db.sqlite'
});


var Todo = sequelize.define('todo', {
	description: {
		type: Sequelize.STRING,
		allowNull: false,
		validade: {
			notEmpty: true,
			len: [8, 250]
		}
	},
	completed: {
		type: Sequelize.BOOLEAN,
		allowNull: false,
		defaultValue: false

	}
});

sequelize.sync().then(function() {
	console.log("all good");
	Todo.create({
		description: 'Take trash out 2'
			//completed: false
	}).then(function(todo) {
		//return Todo.findById(1).then(function(todo){
		return Todo.findAll({
			where: {
				description: {
					$like : '%2%' 
				}
			}
		});
	}).then(function(todos) {
		if (todos) {
			todos.forEach(function(todo) {
				console.log(todo.toJSON());
			});
		}
	}).catch(function(e) {
		console.log(e);
	});
});