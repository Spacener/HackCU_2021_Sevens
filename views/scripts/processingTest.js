var socket = io();

function setup() {
    createCanvas(500,500);
    background(0);
}

var satData = [];

function draw() {
    if(satData.length === 0) {
        return;
    }
    fill(255);
    for(let i = 0; i < satData.length; i++) {
        point(satData[i][0], satData[i][1])
    }
}

socket.on('satellite data array', function(data){
    // whatever
    satData = data;
    draw();
})

function sendData() {
    socket.emit('data requested')
}