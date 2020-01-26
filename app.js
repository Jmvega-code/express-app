var express = require("express");
var app = express();

app.get("*", function(req, res){
  res.send("Error 404: Page not found");
});
// "/" => "Hi there"
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
    res.send("We haven't herad of that animal");
  }
});
app.get("/repeat/:word/:num", function(req, res){
  var word = req.params.word + " ";
  var num = req.params.num;
  res.send(word.repeat(num));
});

app.get("*", function(req, res){
  res.send("Error 404: Page not found");
});


// Tell express to listen for request
app.listen(3000, function(){
  console.log("Serving on port 3000")
});