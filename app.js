var express = require("express");
var app = express();

// "/" => "Hi there"
app.get("/", function(req, res){
res.send("Hi there");
});
// "/bye" => "Goodbye"
app.get("/bye", function(req, res){
res.send("Goodbye");
});
// "/dog" => "Meow!"
app.get("/dog", function(req, res){
res.send("Meow!");
});
app.get("*", function(req, res){
res.send("Error 404: Page not found");
});

// Tell express to listen for request
app.listen(3000, function(){
  console.log("Serving on port 3000")
});