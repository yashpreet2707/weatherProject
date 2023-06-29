const express = require("express") ;
// const { log } = require("node:console");
const https = require("node:https") ;
const bodyParser = require("body-parser") ;

const app = express() ;


app.use(bodyParser.urlencoded({extended: true})) ;

app.get("/", function(req, res){

    res.sendFile(__dirname + "/index.html") ;
    
}) ;


app.post("/", function(req, res){

    // const cityName = req.body.cityName ;
    // console.log("post request received.") ;

    const query = req.body.cityName ; 
    const apiKey = "0aa486370187ef34e05071b43d8a7905" ;
    const unit = "metric" ;
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query +"&appid=" + apiKey + "&units=" + unit ;

    https.get(url, function(response){

        // console.log(response.statusCode) ;
        
        response.on("data", function(data){
            const weatherData = JSON.parse(data) ;
            const temp = weatherData.main.temp ;
            const desc = weatherData.weather[0].description ;
            const icon = weatherData.weather[0].icon ;

            const imgURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png"

            // console.log(desc) ;

            res.write("<h1>The Temperature in " + query + " is : " + temp + " degree Celcius.</h1>") ;
            res.write("<p>The description in " + query + " is : " + desc +".</p>") ;
            res.write("<img src=" + imgURL + ">") ;
            res.send() ;
        }) ;

    }) ;

}) ;





app.listen(3000, function(){
    console.log("Server is running on port 3000.") ;
}) ;