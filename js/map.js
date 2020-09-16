function initMap() {

  var iconBase = '../public/mark.png';

  var location = {
    lat: 51.5214058, 
    lng: -0.1574535
  };

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 17, center: location
  });

  new google.maps.Marker({
    position: location,
    icon: iconBase,
    map: map
  });

}