var socket = io();

var scatterSatData;

var scatterUserLocation;

var dmapboxSatData;

var dmapboxUserLocation;

var sat_count = 0;

var sat_light = 0;

function formArrayFromObj(inData) {
    for(let i in inData) {
        if (inData[i][2] < 1000000000 && (Math.abs(inData[i][1] - scatterUserLocation['y'][0])) < 70) {
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
    sat_count = scatterSatData['x'].length;
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
            title: 'Kilometers from surface',
            color: '#fff'
        },
        xaxis: {
            autorange: false,
            range: [-90, 90],
            title: 'Latitude',
            color: '#fff'
        },
        yaxis: {
            autorange: false,
            range: [-180, 180],
            title: 'Longitude',
            color: '#fff'
        }
    },
    showlegend: false,
    paper_bgcolor: "#343a40",           //background color of the whole plot
    colorway: ["#1f77b4", "#ff0e0e"]    //color of the dots for satellites and for our location (in that order)

};



var layout1 = {
    margin: {
        l: 0,
        r: 0,
        b: 0,
        t: 0,
    },
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
            opacity: 0.6
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
        // colorscale: [[0, 'rgba(0,255,0,5)'], [1,'rgb(126,201,216)']],        //color scale for the heatmap. 0 is outer color, 1 is inner
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
        //colorscale: [[0, 'rgb(0,255,0)'], [1, 'rgb(0,255,0)']]            //color scale for the heatmap. 0 is outer color, 1 is inner
    }
}

function drawPlot() {
    sat_light = sat_count * 2.5
    document.getElementById('sat_count').innerHTML = sat_count
    // document.getElementsByClassName('sat_light').innerHTML = sat_light

    var myPlot = document.getElementById('graph');
    Plotly.newPlot('graph', [scatterSatData, scatterUserLocation], layout)
    Plotly.newPlot('heatmap', [dmapboxSatData, dmapboxUserLocation], layout1);
    $("#graph-objs").fadeIn("slow"); // fade them in when they're done drawing
}

socket.on('satellite data array', function(data){

    resetAll();
    scatterUserLocation['x'].push(userLat);
    scatterUserLocation['y'].push(userLong);
    dmapboxUserLocation['lat'].push(userLat);
    dmapboxUserLocation['lon'].push(userLong);

    formArrayFromObj(data);
    drawPlot();
})

