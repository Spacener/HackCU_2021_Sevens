var express = require('express');
var app = express();
const PORT = process.env.PORT || 3000;
var unirest = require("unirest");


if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

app.get('/', function(req,res){

    let observer_lat, observer_lng, observer_alt, search_radius, category_id;

    observer_lat = 41.702;
    observer_lng = -76.014;
    observer_alt = 0;
    search_radius = 70;
    category_id = 0;

    var reqa = unirest("GET", "https://api.n2yo.com/rest/v1/satellite/above/" +
        observer_lat +
        "/" +
        observer_lng +
        "/" +
        observer_alt +
        "/" +
        search_radius +
        "/" +
        category_id +
        "/&apiKey=" +
        process.env.SAT_KEY);

    // reqa.query({
    //     "lng": "122.374199",
    //     "lat": "47.6484346"
    // });


    let response;
    reqa.end(function (resa) {
        if (res.error) throw new Error(resa.error);
        response = resa.body;
        res.send(response);
    })

})

const run = app.listen(PORT, () => {
    console.log("server is running!");
})

app.get('/home', function(req, res) {
    res.sendFile('views/home.html', {root: __dirname })
});

