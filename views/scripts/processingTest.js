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
        p.fill(255);
        p.square(Math.abs(userLat), Math.abs(userLong), 50)
        p.fill(150);
        for(let i = 0; i < satData.length; i++) {
            p.square(satData[i][0], satData[i][1], 50)
        }
    }
};
new p5(sketch, 'container');

var satData = [];



socket.on('satellite data array', function(data){
    // whatever
    satData = data;
})

function sendData() {
    socket.emit('data requested')
}