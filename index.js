var express = require('express');
var app = express();
const PORT = process.env.PORT || 3000;
var unirest = require("unirest");

app.get('/', function(req,res){
    var reqa = unirest("GET", "https://uphere-space1.p.rapidapi.com/user/visible");

    reqa.query({
        "lng": "122.374199",
        "lat": "47.6484346"
    });

    reqa.headers({
        "x-rapidapi-key": "8ffab72fe1msh1d8c4b5b79c829bp1f9ae7jsn89b1caa76282",
        "x-rapidapi-host": "uphere-space1.p.rapidapi.com",
        "useQueryString": true
    });

    let response;
    reqa.end(function (resa) {
        if (res.error) throw new Error(resa.error);
        response = resa.body;
        console.log(response);
    })

})

const run = app.listen(PORT, () => {
    console.log("server is running!");
})



