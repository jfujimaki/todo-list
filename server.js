/**
 * Created by jfujimaki on 2016-01-24.
 */
//requires
var express = require('express');
var bodyParser = require('body-parser');
var _ = require("underscore");
var app = express();
var PORT = process.env.PORT || 3030;
var todos = [];
var todoNextId = 1;

app.use(bodyParser.json());

function todoItem(id, description, completed, date){
    this.id = id;
    this.description = description;
    this.completed = completed;
    this.date = date;
}


//routes
app.get("/", function(req, res){
   res.send('this is my api');
});

app.get("/todos", function(req, res){
    //res.send(JSON.stringify(todos));
    res.json(todos);
});

app.get("/todos/:id", function(req, res){
    var todoId = parseInt(req.params.id);
    var _todoItem = _.findWhere(todos, {id : todoId});
    console.log(_todoItem);
    
    if(_todoItem){
        res.json(_todoItem);
    }else{
        res.status(404).send("We could not find any todos based on your search criteria");
    }
});

app.post("/todos",function(req, res){
    var body = req.body;
    var myTodo = new todoItem(todos.length + 1, body.description, body.completed, new Date);
    todos.push(myTodo);
    console.log("NEW todo logged " + JSON.stringify(myTodo));
    res.json(myTodo);
});

app.delete("/todos/:id", function(req, res){
   var todoId = parseInt(req.params.id);
    var _todoItem = _.findWhere(todos, {id : todoId});
    console.log(_todoItem);
    
    if(_todoItem){
        todos = _.without(todos, _todoItem);
        console.log("DELETE todo item:" + JSON.stringify(_todoItem)) ;
        res.json(_todoItem);
    }else{
        res.status(404).send("We could not find any todos based on your search criteria");
    } 
});

app.listen(PORT, function(){
    console.log('Express running on PORT: ' + PORT);
});