var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var request = require("request");


app.use(bodyParser.urlencoded({extended: true}));
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
var friends = ["Tony", "Javi", "Leti", "Mora", "Alex"]

app.get("/", function(req, res){
  res.render("home");
});

function formatedDate(unix_timestamp){
  var date = new Date(unix_timestamp * 1000);
  // Hours part from the timestamp
  var hours = date.getHours();
  // Minutes part from the timestamp
  var minutes = "0" + date.getMinutes();
  // Seconds part from the timestamp
  var seconds = "0" + date.getSeconds();
  
  // Will display time in 10:30:23 format
  var formatedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
  
  return formatedTime;
  }


request("http://api.openweathermap.org/data/2.5/weather?q=seville,spain&appid=3c0c4a8eaf38e51575c29511fb12fc13&units=metric", function (error, response, body){
  if(!error && response.statusCode == 200){
    var parsedData = JSON.parse(body);
    var sunriseTimestamp = parsedData.sys.sunrise;
    var sunsetTimestamp = parsedData.sys.sunset;
    var timesun = [
      {rise: sunriseTimestamp, set: sunsetTimestamp}
    ];
    console.log(formatedDate(sunriseTimestamp)+ " am");
    console.log(formatedDate(sunsetTimestamp)+ " pm");
  }
  res.render("friends", {timesun:timesun})
});

app.get("/fallinlovewith/:thing", function(req, res){
  var thing = req.params.thing.toUpperCase();
  res.render("love", {thingVar: thing});
});
app.get("/friends", function(req, res){
  res.render("friends", {friends:friends, timesun:timesun})
});

app.post("/addfriend", function(req, res){
  console.log(req.body.newfriend);
  var newFriend = req.body.newfriend;
  friends.push(newFriend);
  res.redirect("/friends");
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