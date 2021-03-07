var userLat = 0
var userLong = 0;

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    }
}



function showPosition(position) {
    userLat = position.coords.latitude;
    userLong = position.coords.longitude;
    document.getElementById('dataButton').disabled = false;
    if(userLong !== 0 && userLat !== 0) {
        // console.log(userLat + " " + userLong + "543534")
        socket.emit('locationSent', [userLong, userLat]);
    }
}