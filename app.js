const express = require("express");
const https= require("https");
const bodyParser= require("body-parser");
const { allowedNodeEnvironmentFlags } = require("process");
const app=express();
app.use(bodyParser.urlencoded({extended: true}));
app.get("/",function(req,res){
   res.sendFile(__dirname+"/index.html");
})
app.post("/", function(req,res){
    var city=req.body.city;
    const url="https://api.openweathermap.org/data/2.5/weather?q="+city +"&appid=de2adf2a7a9f2f226757ea99f31c1747&units=metric";
    https.get(url, function(response){
    //console.log(response);
    response.on("data", function(data){
        const weatherData=JSON.parse(data);
        const temprature=weatherData.main.temp;
        //console.log(weatherData.weather[0].description);
        res.write("<h1>Temperature in "+ city +" is "+ temprature+ " degree celcius</h1>");
        res.write("with "+weatherData.weather[0].description);
        res.write("<br><img src='http://openweathermap.org/img/wn/"+ weatherData.weather[0].icon +"@2x.png'>")
        res.send();

    })
})
})

app.listen(3000);