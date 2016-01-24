/**
 * Created by jfujimaki on 2016-01-24.
 */
    //added to GIT
var express = require('express');
var app = express();
var PORT = process.env.PORT || 3030;

function todoItem(id, description, completed){
    this.id = id;
    this.description = description;
    this.completed = completed;
}
var todos = [];
todos.push(new todoItem(1,"Buy eggs", false));
todos.push(new todoItem(2,"Buy milk", false));
todos.push(new todoItem(3,"Take kids to shopping mall", false));

//routes
app.get("/", function(req, res){
   res.send('this is my api');
});

app.get("/todos", function(req, res){
    //res.send(JSON.stringify(todos));
    res.json(todos);
});

app.get("/todos/:id", function(req, res){
    var todoId = req.params.id;
    for(var i= 0; i <= todos.length -1 ; i++){
        if(todos[i].id == todoId){
            res.json(todos[i]);
        }
    }
    res.status(404).send("We could not find any todos based on your search criteria");
});

app.listen(PORT, function(){
    console.log('Express running on PORT: ' + PORT);
});