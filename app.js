let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let request = require('request');


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
  let sounds = {
    dog: 'woof',
    pig: 'oink',
    cat: 'meow',
    frog: 'croak'
  }
  let animal = req.params.animal;

  if(sounds.hasOwnProperty(animal)){
    res.send('The ' + animal + ' says ' + sounds[animal]);
  } else {
    res.send('We haven't heard of that animal');
  }
});
app.get('/repeat/:word/:num', function(req, res){
  let word = req.params.word + ' ';
  let num = req.params.num;
  res.send(word.repeat(num));
});
*/
let friends = ['Tony', 'Javi', 'Leti', 'Mora', 'Alex']

app.get('/', function(req, res){
  res.render('home');
});




app.get('/fallinlovewith/:thing', (req, res) => {
  let thing = req.params.thing.toUpperCase();
  res.render('love', {thinglet: thing});
});


app.get('/weather', (req, res) => {
  let city = req.query.city;
  let country = req.query.country;
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=3c0c4a8eaf38e51575c29511fb12fc13&units=metric`;
  request(url, (error, response, body) => {
    if(!error && response.statusCode === 200){
      let data = JSON.parse(body);
      function formatedDate(unix_timestamp){
        let date = new Date(unix_timestamp * 1000);
        // Hours part from the timestamp
        let hours = date.getHours();
        // Minutes part from the timestamp
        let minutes = '0' + date.getMinutes();
        // Seconds part from the timestamp
        let seconds = '0' + date.getSeconds();
      
        // Will display time in 10:30:23 format
        let formatedTime = hours + ':' + minutes.substr(-2);
        return formatedTime;
      }
      let namecity = data.name;
      let namecountry = data.sys.country;
      let description = data.weather[0].description;
      let mintemperature = data.main.temp_min;
      let temperature = data.main.temp;
      let maxtemperature = data.main.temp_max;
      let humidity = data.main.humidity;
      let timeshift = (data.timezone - 3600);
      let sunrise = (data.sys.sunrise + timeshift);
      let sunset = (data.sys.sunset + timeshift);
      let formatedSunrise = formatedDate(sunrise);
      let formatedSunset = formatedDate(sunset);

  
      res.render('weather', {
        data,
        namecity,
        namecountry,
        description,
        temperature,
        mintemperature,
        maxtemperature,
        humidity,
        formatedSunrise, 
        formatedSunset,
        timeshift,
      });
    }
  });
});

app.get('/search', (req, res) => {
  let city = req.body.city;
  let country = req.body.country;
  res.render('search')
});

app.get('/posts', (req, res) => {
  let posts = [
    {title: 'First Post', author: 'John'},
    {title: 'Pomeranian-Husky the Pomsky', author: 'Colt'},
    {title: 'RIP Kobe', author: 'Jordan'},
    {title: 'Last but not Least', author: 'Alex'}
  ];
  res.render('posts', {posts: posts});
});

app.get('*', (req, res) => {
  res.send('Error 404: Page not found');
});

// Tell express to listen for request
app.listen(3000, () => {
  console.log('Serving on port 3000')
});