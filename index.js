var express = require('express');
var app = express();
const PORT = process.env.PORT || 3000;
var unirest = require("unirest");


if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

app.get('/', function(req,res){
    let request = "https://api.n2yo.com/rest/v1/satellite/above/41.702/-76.014/0/70/18/&apiKey=https://api.n2yo.com/" +
        "rest/v1/satellite/above/41.702/-76.014/0/70/18/&apiKey=" +
        process.env.SAT_KEY;
    let hi_api = unirest.get(request);

    res.send(request)
})

const run = app.listen(PORT, () => {
    console.log("server is running!");
})

app.get('/home', (req, res,next)=>{
    res.send(home.html);
});

