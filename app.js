const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname + "/index.html");
    })


   app.post("/",function(req,res){
     //console.log(req.body.cityName);
    //console.log("Post request received.");
    const city = req.body.cityName;
    const apikey = "ac0855e1d519826a37815d4a7cd99e71";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+apikey+"&units="+unit;
    https.get(url,function(response){
        console.log(response.statusCode);

        response.on("data",function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
            //console.log(temp);
            //console.log(weatherDescription);
            //we can only use one res.send inside an app.get function but we can use res.write any number of time
            //so we can wwrap all res.write in res.send: for eg:
            res.write("<p>The Weather is currently " + weatherDescription+ "</p>")
           res.write("<h1>The temperature in "+city+" is " + temp + " degree Celcius.</h1>")
           res.write("<img src=" + imageURL +">");
           res.send()
    })
})
   })
   



app.listen(3000,function(){
    console.log("Server is running on port 3000.");
})