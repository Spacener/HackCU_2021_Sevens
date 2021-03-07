function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    if(userLong !== 0 && userLat !== 0) {
        socket.emit('locationSent', [userLong, userLat]);
    }
}

var userLat, userLong;

function showPosition(position) {
    userLat = position.coords.latitude;
    userLong = position.coords.longitude;
    document.getElementById('dataButton').disabled = false;
}