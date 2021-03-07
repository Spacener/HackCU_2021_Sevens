var socket = io();

var satData = {};

var data = new vis.DataSet();
var graph = null;

function formArrayFromObj(inData) {
    for(let i in inData) {
        if(inData[i][2] < 1000000) {
            data.add({x: inData[i][0], y: inData[i][1], z: inData[i][2]})
        }
    }
}

const getName = function(obj) {
    return satData[obj['x'].toString()+obj['y'].toString()][3]
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
        tooltip: getName
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