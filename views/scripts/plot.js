var socket = io();

var satData = {};

var data = {
    type: "scatter3d",
    x: [],
    y: [],
    z: [],
    mode: 'markers',
    marker: {
        symbol: 'circle',
        color: 'rgb(127, 127, 127)',
        size: 6,
        line: {
            color: 'rgba(217, 217, 217, 0.14)',
            width: 0.5
        },
        opacity: 0.8
    }
}

function formArrayFromObj(inData) {
    for(let i in inData) {
        if(inData[i][2] < 40000) {
            data['x'].push(inData[i][0]);
            data['y'].push(inData[i][1]);
            data['z'].push(inData[i][2]);
        }
        data1['lon'] = data['y']
        data1['lat'] = data['x']
        data1['z'] = 1
    }
}

var layout = {
    margin: {
        l: 0,
        r: 0,
        b: 0,
        t: 0,
        zaxis: {
            type: 'log',
            autorange: true
        }
    }
};

var data1 = {
    type: 'densitymapbox',
    lon: [],
    lat: [],
    z: []};

var layout1 = {
    radius: 1,
    mapbox: {
        style: 'stamen-terrain'
    }
};



function drawPlot() {
    var myPlot = document.getElementById('graph');
    Plotly.newPlot('graph', [data], layout)
    Plotly.newPlot('heatmap', [data1], layout1);
}


socket.on('satellite data array', function(data){
    // whatever
    satData = data;
    console.log("gotData");
    formArrayFromObj(data);
    drawPlot();
})

function sendData() {
    socket.emit('data requested')
}