const express = require('express')
const path = require('path')
const app = express();
const PORT = process.env.PORT || 3000;
const unirest = require("unirest");
const http = require('http').createServer(app);
// http.listen(process.env.PORT || 3000)
const io = require('socket.io')(http)

if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

app.use(express.static(path.join(__dirname,"views")))

app.get('/home', function(req, res) {
    res.sendFile('views/home.html', {root: __dirname })

});

app.get('/', function(req,res){
    res.sendFile('views/home.html', {root: __dirname })
})
app.get('/socket.io/socket.io.js', (req,res)=>{
    res.sendFile('node_modules/socket.io/client-dist/socket.io.js',{root: __dirname });
})
app.get('/test', function(req,res){
    res.redirect('p5Test.html')
})

io.on('connection', function(socket) {
    console.log("client connected! client id: " + socket.id);
    socket.on('data requested', function() {
        console.log("data has been requested")
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

        let response;
        reqa.end(function (resa) {
            if (resa.error) throw new Error(resa.error);
            response = resa.body;

            let myReturn = [];

            // const ResponseAsJson = JSON.parse(response)

            console.log("Length:" + response.info.satcount);
            let coordsToRespondWith = [[50,50],[100,100]];
            socket.emit('satellite data array', coordsToRespondWith);
        })
    })
})

const run = http.listen(PORT, () => {
    console.log("server is running!");
})



app.get('/aboutus', function(req, res) {
    res.sendFile('views/aboutus.html', {root: __dirname })
});

