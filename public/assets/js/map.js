var typeArray = [];
var typeHospital = 0;
var typeEntertainment = 0;
var typeSports = 0;
var typeEducation = 0;

var config = {
  apiKey: "AIzaSyDTi0mqr4lFFFzOum07o2hjZQcdeisUt50",
  authDomain: "ziptellall.firebaseapp.com",
  databaseURL: "https://ziptellall.firebaseio.com",
  projectId: "ziptellall",
  storageBucket: "ziptellall.appspot.com",
  messagingSenderId: "383885543793"
};
// firebase.initializeApp(config);

// Create a variable to reference the database.
// var database = firebase.database();

var uluru;



// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">
$(document).ready(function () {


  var long = "";
  var lat = "";
  var zip = "";
  var metricZip = "";
  var filter = [];

// Rotate arrow back to original position if filter parameters are altered/clicked
  $(".filter").click(function(){
    $("#arrowRotate").removeClass("fa-rotate-90");
    $("#map-canvas").empty();
  });
//*********************************** */



//Select/deselect hospital parameter
  $("#hospitalChecked").on("click", function(){
    if(hospital.checked){
      hospital.checked = false;
      console.log("hospital.checked" + hospital.checked);
      $(this).css(
        
        {
          "background": "rgba(0, 0, 0, 0.5)",
        });
    } else {
      hospital.checked = true;
      console.log("hospital.checked" + hospital.checked);    
      $(this).css(
        "background-color", "black",
        {
        opacity: "0.5"
    });  
    }
  });
//*********************************** */


//Select/deselect school parameter
  $("#schoolChecked").on("click", function(){
    if(school.checked){
      school.checked = false;
      console.log("school.checked" + school.checked);
      $(this).css(
        {
          "background": "rgba(0, 0, 0, 0.5)",
        });
    } else {
      school.checked = true;
      console.log("school.checked" + school.checked);    
      $(this).css(
        "background-color", "black",
        {
        opacity: "0.5"
    });  
    }
  });
//*********************************** */



//Select/Deselect park parameter
  $("#parkChecked").on("click", function(){
    if(park.checked){
      park.checked = false;
      console.log("park.checked" + park.checked);
      $(this).css(     
        {
          "background": "rgba(0, 0, 0, 0.5)",
        });
    } else {
      park.checked = true;
      console.log("park.checked" + park.checked);    
      $(this).css(
        "background-color", "black",
        {
        opacity: "0.5"
    });  
    }
  });
//*********************************** */


//Select/Deselect entertainment parameter
$("#entertainmentChecked").on("click", function(){
  if(entertainment.checked){
    entertainment.checked = false;
    console.log("entertianment.checked" + entertainment.checked);
    $(this).css(     
      {
        "background": "rgba(0, 0, 0, 0.5)",
      });
  } else {
    entertainment.checked = true;
    console.log("entertainment.checked" + entertainment.checked);    
    $(this).css(
      "background-color", "black",
      {
      opacity: "0.5"
  });  
  }
});
//*********************************** */


//Execute getData() when arrow is clicked
  $("#zipArrow").on("click", getData);

//Establis getData function
  function getData() {
    console.log("zip-finder has been clicked... getData executed")

    $("#map-canvas").empty();
    $("#arrowRotate").addClass("fa-rotate-90");
    zip = $("#zipCode").val().trim();


    var url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + zip + "&key=AIzaSyDaPZ5HfKbDDaPol5zPsE7-zvfUopTe41I";
 
    $.ajax({
      url: url,
      method: "GET"
    }).done(function (payload) {
      console.log(payload);
      lat = payload.results[0].geometry.location.lat;
      long = payload.results[0].geometry.location.lng;
 
      initMap(lat, long, zip);

            // getAndPopulateWeather();
      
    }).fail(function () {

    }) // end ajax
    
  } // end getData
//******************************************************** */
var hospitalRequest;
var schoolRequest;
var entertainmentRequest;
var amusementRequest
var clubRequest;
var theaterRequest;
var musicRequest;
var mallRequest;
var venueRequest;
var parkRequest;

function Filter(name, checked, parameters) {
  this.name = name;
  this.checked = checked;
  this.parameters = parameters;
};

const hospital = new Filter("hospital", false, [hospitalRequest]);
const school = new Filter("school", false, [schoolRequest]);
const entertainment = new Filter("entertainment", false, [entertainmentRequest, amusementRequest, clubRequest, theaterRequest, musicRequest, mallRequest, venueRequest]);
const park = new Filter("park", false, [parkRequest]);

const filterList = [hospital, school, entertainment, park];

//********************************************************* */
var map;
var service;
var infowindow;


//initMap function
function initMap(passLat, passLong, passZip) {
  console.log("initMap executed");

  const uluru = {
    lat: passLat,
    lng: passLong
  };
  const hospitalRequest = {
    location: uluru,
    radius: '500',
    query: "hospital"
  };
  
  const schoolRequest = {
    location: uluru,
    radius: '500',
    query: "school"
  };
  
  const entertainmentRequest = {
    location: uluru,
    radius: '500',
    query: "entertainment"
  };
  
  const amusementRequest = {
    location: uluru,
    radius: '500',
    query: "amusement"
  };
  
  const clubRequest = {
    location: uluru,
    radius: '500',
    query: "club"
  };
  
  const theaterRequest = {
    location: uluru,
    radius: '500',
    query: "cinema"
  };
  
  const musicRequest = {
    location: uluru,
    radius: '500',
    query: "music"
  };
  
  const mallRequest = {
    location: uluru,
    radius: '500',
    query: "mall"
  };
  
  const venueRequest = {
    location: uluru,
    radius: '500',
    query: "venue"
  };
  
  const parkRequest = {
    location: uluru,
    radius: '500',
    query: "parks"
  };
  map = new google.maps.Map(document.getElementById("map-canvas"), {
    center: uluru,
    zoom: 12
  });

  service = new google.maps.places.PlacesService(map);

  if (hospital.checked) {
    console.log("hospital.checked === true");
    console.log("Hospital Parameters" + hospital.parameters);
    console.log("hospital parameters.length" + hospital.parameters.length)
    service.textSearch(hospitalRequest, callback);
    typeHospital = 1;
  };

  if (school.checked) {
    console.log("school.checked === true");
    console.log("school Parameters" + school.parameters);
    console.log("school parameters.length" + school.parameters.length)
    service.textSearch(schoolRequest, callback);
    typeschool = 1;
  };

  if (park.checked) {
    console.log("park.checked === true");
    console.log("park Parameters" + park.parameters);
    console.log("park parameters.length" + park.parameters.length)
    service.textSearch(parkRequest, callback);
    typepark = 1;
  };

  if (entertainement.checked) {
    console.log("entertainement.checked === true");
    console.log("entertainement Parameters" + entertainement.parameters);
    console.log("entertainement parameters.length" + entertainement.parameters.length)
    service.textSearch(entertainementRequest, callback);
    typeentertainement = 1;
  };


} // end initMap
//************************************************************************************* */



function callback(results, status) {
  console.log("callback function hit");
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    console.log("callback function was executed/ status was OK ")
    for (var i = 0; i < results.length; i++) {

      createMarker(results[i]);
      console.log("createMarker executed for: " + results[i]);
    }
  }
} // end callBack

function createMarker(place) {
  var placeLoc = place.geometry.location;
  var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
  console.log("search is:" + service.textSearch);
  console.log("type is:" + place.types.indexOf("hospital"));
  if (place.types.indexOf("hospital") > -1 || place.types.indexOf("health") > -1) {
    var marker = new google.maps.Marker({
      map: map,
      position: place.geometry.location,
      icon: iconBase + 'hospitals_maps.png'
    });
  };
  if (place.types.indexOf("park") > -1) {
    var marker = new google.maps.Marker({
      map: map,
      position: place.geometry.location,
      icon: iconBase + 'picnic_maps.png'
    });
  };
  if (place.types.indexOf("school") > -1) {
    var marker = new google.maps.Marker({
      map: map,
      position: place.geometry.location,
      icon: iconBase + 'schools_maps.png'
    });
  };
  if (place.types.indexOf("amusement_park") > -1) {
    console.log("entertainment works");
    console.log(place);
    var marker = new google.maps.Marker({
      map: map,
      position: place.geometry.location,
      icon: iconBase + 'arts_maps.png'
    });
  };
  if (place.types.indexOf("night_club") > -1) {
    console.log("entertainment works");
    console.log(place);
    var marker = new google.maps.Marker({
      map: map,
      position: place.geometry.location,
      icon: iconBase + 'arts_maps.png'
    });
  };
  if (place.types.indexOf("bar") > -1) {
    console.log("entertainment works");
    console.log(place);
    var marker = new google.maps.Marker({
      map: map,
      position: place.geometry.location,
      icon: iconBase + 'arts_maps.png'
    });
  };


  google.maps.event.addListener(marker, 'click', function () {
    infowindow.setContent(place.name + '<br>' + place.formatted_address);
    console.log(place);
    infowindow.open(map, this);
  });
} //end createMarker()


}) // end ready