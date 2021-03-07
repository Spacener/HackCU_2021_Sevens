var userLat = 0
var userLong = 0;

function getLocation() {
    if (navigator.geolocation) {
        document.getElementById('info-text').innerHTML = "obtaining data..."
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else{
        document.getElementById('info-text').innerHTML = "we couldn't get your location, please try again later."
    }
}

function showPosition(position) {
    document.getElementById('info-text').innerHTML = 'we are ready to go, hit "send data" to start crunching the numbers';
    userLat = position.coords.latitude;
    userLong = position.coords.longitude;
    document.getElementById('dataButton').disabled = false;
    if(userLong !== 0 && userLat !== 0) {
        // console.log(userLat + " " + userLong + "543534")
        socket.emit('locationSent', [userLong, userLat]);
    }
}