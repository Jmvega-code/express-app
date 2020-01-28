var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var request = require('request');


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.set('view engine', 'ejs');
/** 
 * **********
 * Exercises:
 * **********
 * '/' => 'Hi there'
app.get('/', function(req, res){
  res.send('Hi there');
});

// '/bye' => 'Goodbye'
app.get('/bye', function(req, res){
  res.send('Goodbye');
});

// dinamic ruting
app.get('/speak/:animal/', function(req, res){
  var sounds = {
    dog: 'woof',
    pig: 'oink',
    cat: 'meow',
    frog: 'croak'
  }
  var animal = req.params.animal;

  if(sounds.hasOwnProperty(animal)){
    res.send('The ' + animal + ' says ' + sounds[animal]);
  } else {
    res.send('We haven't heard of that animal');
  }
});
app.get('/repeat/:word/:num', function(req, res){
  var word = req.params.word + ' ';
  var num = req.params.num;
  res.send(word.repeat(num));
});
*/
var friends = ['Tony', 'Javi', 'Leti', 'Mora', 'Alex']

app.get('/', function(req, res){
  res.render('home');
});




app.get('/fallinlovewith/:thing', function(req, res){
  var thing = req.params.thing.toUpperCase();
  res.render('love', {thingVar: thing});
});


app.get('/weather', function(req, res){
  var city = req.query.city;
  var country = req.query.country;
  var url = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + ',' + country + '&appid=3c0c4a8eaf38e51575c29511fb12fc13&units=metric'
  request(url, function (error, response, body){
    if(!error && response.statusCode == 200){
      var data = JSON.parse(body);
      function formatedDate(unix_timestamp){
        var date = new Date(unix_timestamp * 1000);
        // Hours part from the timestamp
        var hours = date.getHours();
        // Minutes part from the timestamp
        var minutes = '0' + date.getMinutes();
        // Seconds part from the timestamp
        var seconds = '0' + date.getSeconds();
      
        // Will display time in 10:30:23 format
        var formatedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
        return formatedTime;
      }
      var namecity = data.name;
      var namecountry = data.sys.country;
      var description = data.weather[0].description;
      var mintemperature = data.main.temp_min;
      var maxtemperature = data.main.temp_max;
      var humidity = data.main.humidity;

      var sunrise = formatedDate(data.sys.sunrise);
      var sunset = formatedDate(data.sys.sunset);
  
      res.render('weather', {
        data,
        namecity,
        namecountry,
        description,
        mintemperature,
        maxtemperature,
        humidity,
        sunrise, 
        sunset

      });
    }
  });
});

app.get('/search', function(req, res){
  var city = req.body.city;
  var country = req.body.country;
  res.render('search')
  //res.redirect('/weather');
});

app.get('/posts', function(req, res){
  var posts = [
    {title: 'First Post', author: 'John'},
    {title: 'Pomeranian-Husky the Pomsky', author: 'Colt'},
    {title: 'RIP Kobe', author: 'Jordan'},
    {title: 'Last but not Least', author: 'Alex'}
  ];
  res.render('posts', {posts: posts});
});

app.get('*', function(req, res){
  res.send('Error 404: Page not found');
});

// Tell express to listen for request
app.listen(3000, function(){
  console.log('Serving on port 3000')
});