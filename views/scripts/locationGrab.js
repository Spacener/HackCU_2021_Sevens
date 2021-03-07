var userLat = 0
var userLong = 0;

function getLocation() {
    document.getElementById('locButton').disabled = true;
    if (navigator.geolocation) {
        document.getElementById('info-text').innerHTML = "obtaining data..."
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else{
        document.getElementById('info-text').innerHTML = "we couldn't get your location, please try again later."
    }
}

function showPosition(position) {
    userLat = position.coords.latitude;
    userLong = position.coords.longitude;

    document.getElementById('info-text').innerHTML = "location obtained! crunching numbers..."
    document.getElementById('dataButton').disabled = false;
    if(userLong !== 0 && userLat !== 0) {
        // console.log(userLat + " " + userLong + "543534")
        socket.emit('locationSent', [userLong, userLat]);
        sendData();
    }
}
function sendData() {
    $("#initial").fadeOut("slow"); // fade out inital text to prepare for graphs
    socket.emit('data requested')
}