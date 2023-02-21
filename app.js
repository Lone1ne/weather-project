
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {

  res.sendFile(__dirname + "/index.html");

});

app.post("/", function(req, res) {
  
  const query = req.body.cityName;
  const apiKey = "";
  const units = "imperial";

  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + units;

  https.get(url, function(response) {
    console.log(response.statusCode);

    response.on("data", function(data) {
      // The data comes back from site as hexadecimal so we have to convert it to javascript with this
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp
      const description = weatherData.weather[0].description
      const name = weatherData.name
      const icon = weatherData.weather[0].icon
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"


      res.write("<p>The weather is currently " + description + "</p>");
      res.write("<h1>The temp in " + name + " is " + temp + " degrees fahrenheit.</h1>");
      res.write("<img src=" + imageURL + ">");

      res.send()

    })
  })
})

app.listen(3000, function() {
  console.log("server running");
});
