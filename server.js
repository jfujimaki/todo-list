/**
 * Created by jfujimaki on 2016-01-24.
 */

var express = require('express');
var app = express();
var PORT = process.env.PORT || 3030;

app.get("/", function(req, res){
   res.send('this is my api');
});

app.listen(PORT, function(){
    console.log('Express running on PORT: ' + PORT);
});