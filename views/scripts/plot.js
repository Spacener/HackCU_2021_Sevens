var socket = io();

var satData = {};



var scatterSatData;

var scatterUserLocation;

var dmapboxSatData;

var dmapboxUserLocation;

function formArrayFromObj(inData) {
    for(let i in inData) {
        if(inData[i][2] < 100000000000) {
            scatterSatData['x'].push(inData[i][0]);
            scatterSatData['y'].push(inData[i][1]);
            scatterSatData['z'].push(inData[i][2]);
            scatterSatData['text'].push(inData[i][3]);
            dmapboxSatData['text'].push(inData[i][3]);
        }
        dmapboxSatData['lon'] = scatterSatData['y'];
        dmapboxSatData['lat'] = scatterSatData['x'];
        dmapboxSatData['z'] = 1;
    }
}

var layout = {
    margin: {
        l: 0,
        r: 0,
        b: 0,
        t: 0,
    },
    scene: {
        zaxis: {
            type: 'log',
            autorange: true,
            title: 'Kilometers from surface'
        },
        xaxis: {
            title: 'Longitude'
        },
        yaxis: {
            title: 'Latitude'
        }
    }

};



var layout1 = {
    mapbox: {
        style: 'stamen-terrain'
    }
};

function resetAll() {
    scatterSatData = {
        type: "scatter3d",
        text: [],
        x: [],
        y: [],
        z: [],
        mode: 'markers',
        hoverinfo: "text",
        //surfacecolor: 'rgb(126,201,216)',
        marker: {
            symbol: 'circle',
            size: 3,
            line: {
                color: 'rgba(40, 40, 40, 0.14)',
                width: 0.5
            },
            opacity: 0.8
        }
    }

    scatterUserLocation = {
        type: "scatter3d",
        x: [],
        y: [],
        z: [1],
        text: ['Your location', 'test'],
        mode: 'markers',
        hoverinfo: "text",
        surfacecolor: 'rgb(255,0,0)',
        marker: {
            symbol: 'circle',
            size: 3,
            line: {
                color: 'rgba(40, 40, 40, 0.14)',
                width: 0.5
            },
            opacity: 0.8
        }
    }

    dmapboxSatData = {
        type: 'densitymapbox',
        lon: [],
        lat: [],
        text: [],
        hoverinfo: 'lat+lon',
        radius: 15,
        autocolorscale: false,
        // colorscale: [[0, 'rgba(0,255,0,5)'], [1,'rgb(126,201,216)']],
        showscale: false
    };

    dmapboxUserLocation = {
        type: 'densitymapbox',
        lon: [],
        lat: [],
        name: "Your Location",
        hoverinfo: "name",
        radius: 30,
        showscale: false
        //colorscale: [[0, 'rgb(0,255,0)'], [1, 'rgb(0,255,0)']]
    }
}

function drawPlot() {
    var myPlot = document.getElementById('graph');
    // console.log([ourLocation])
    Plotly.newPlot('graph', [scatterSatData, scatterUserLocation], layout)
    Plotly.newPlot('heatmap', [dmapboxSatData, dmapboxUserLocation], layout1);
}

socket.on('satellite data array', function(data){
    resetAll();
    // console.log(userLat + " " + userLong)
    scatterUserLocation['x'].push(userLat);
    scatterUserLocation['y'].push(userLong);
    dmapboxUserLocation['lat'].push(userLat);
    dmapboxUserLocation['lon'].push(userLong);

    formArrayFromObj(data);
    drawPlot();
})

function sendData() {
    socket.emit('data requested')
}