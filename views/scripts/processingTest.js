var socket = io();

let sketch = function(p) {
    p.setup = function () {
        p.createCanvas(400,400);
        p.background(0);
    }

    p.draw = function () {
        if(satData.length === 0) {
            return;
        }
        p.fill(255,0,0);
        p.circle(userLat-(p.width/2), userLong-(p.height/2));
        p.fill(255);
        for(let i = 0; i < satData.length; i++) {
            let normalized = normalizeToUser(userLat, userLong, satData[i]);
            p.circle(normalized[0], normalized[1], 3);
        }
    }

    function normalizeToUser(userLat, userLong, satCoords) {
        return [satCoords[0]-userLat+(p.width/2),satCoords[1]-userLong+(p.height/2)];
    }

};


new p5(sketch, 'container');

var satData = [];



socket.on('satellite data array', function(data){
    // whatever
    console.log(data)
    satData = data;
})

function sendData() {
    socket.emit('data requested')
}