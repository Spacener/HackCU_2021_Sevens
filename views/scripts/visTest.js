var socket = io();

var satData = {};

var data = [];
var graph = null;

function formArrayFromObj(inData) {
    for(let i in inData) {
        data.push([parseInt(inData[i][0]), parseInt(inData[i][1]), parseInt(inData[i][2])])
    }
}

const getName = function(x, y, z) {
    return satData[x.toString()+y.toString()][3]
};

// Called when the Visualization API is loaded.
function drawVisualization() {
    // Create and populate a data table.
    formArrayFromObj(satData);

    // specify options
    var options = {
        width: '600px',
        height: '600px',
        style: 'dot',
        showPerspective: true,
        showGrid: true,
        showShadow: false,
        keepAspectRatio: true,
        verticalRatio: 0.5,
        showYAxis: false,
        tooltip: getName,
    };

    // Instantiate our graph object.
    var container = document.getElementById('myGraph');

    graph = new vis.Graph3d(container, data, options);

}


socket.on('satellite data array', function(data){
    // whatever
    satData = data;
    console.log("gotData")
    drawVisualization();
})

function sendData() {
    socket.emit('data requested')
}