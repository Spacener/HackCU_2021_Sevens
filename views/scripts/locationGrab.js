function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    }
}

var userLat, userLong;

function showPosition(position) {
    userLat = position.coords.latitude;
    userLong = position.coords.longitude;
}