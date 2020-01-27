var express = require("express");
var app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
/** 
 * **********
 * Exercises:
 * **********
 * "/" => "Hi there"
app.get("/", function(req, res){
  res.send("Hi there");
});

// "/bye" => "Goodbye"
app.get("/bye", function(req, res){
  res.send("Goodbye");
});

// dinamic ruting
app.get("/speak/:animal/", function(req, res){
  var sounds = {
    dog: "woof",
    pig: "oink",
    cat: "meow",
    frog: "croak"
  }
  var animal = req.params.animal;

  if(sounds.hasOwnProperty(animal)){
    res.send("The " + animal + " says " + sounds[animal]);
  } else {
    res.send("We haven't heard of that animal");
  }
});
app.get("/repeat/:word/:num", function(req, res){
  var word = req.params.word + " ";
  var num = req.params.num;
  res.send(word.repeat(num));
});
*/
app.get("/", function(req, res){
  res.render("home");
});

app.get("/fallinlovewith/:thing", function(req, res){
  var thing = req.params.thing.toUpperCase();
  res.render("love", {thingVar: thing});
});

app.get("/posts", function(req, res){
  var posts = [
    {title: "First Post", author: "John"},
    {title: "Pomeranian-Husky the Pomsky", author: "Colt"},
    {title: "RIP Kobe", author: "Jordan"},
    {title: "Last but not Least", author: "Alex"}
  ];
  res.render("posts", {posts: posts});
});

app.get("*", function(req, res){
  res.send("Error 404: Page not found");
});

// Tell express to listen for request
app.listen(3000, function(){
  console.log("Serving on port 3000")
});