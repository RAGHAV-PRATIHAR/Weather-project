// jshint esversion:6
const express = require("express");
const app = express();
require('dotenv').config()
// native module
const https = require('node:https');
const bodyparser=require("body-parser");
app.use(bodyparser.urlencoded({extended:true}));


app.get("/", function (req, res) {
  res.sendFile(__dirname+"/index.html");
})
app.post("/",function(req,res){
    const city=req.body.Cityname;
    const appid=process.env.ID
    const url =
    "https://api.openweathermap.org/data/2.5/weather?appid="+appid+"&q=" + city + ",in&units=metric";
    //   external get requests
  https.get(url,function(response){
    console.log(response.statusCode)
    response.on("data",function(data){
        const weatherdata=JSON.parse(data)
        const icon= "http://openweathermap.org/img/wn/"+weatherdata.weather[0].icon+"@2x.png"
        res.write("<p>It feels like: "+weatherdata.weather[0].description+" <p>");
        res.write("<h1>The weather in "+city+" is: "+weatherdata.main.temp+" degree celsius</h1>");
        res.write("<img src="+icon+">");
        res.send();
    })
  })
})
app.listen(3000, function () {
  console.log("server is running");
});
