$(document).ready( function(){
    function getWeather(){

        var userCity = "";

        var APIKEY = "376fffcd91763ad35ed350f2f78f8296";

        var queryURL = "https://api.openweathermap.org/data.2.5/weather?q=" + userCity +"$appid=" + APIKEY;

        $.ajax((
            url: queryURL,
            method: "GET"
        )).then(function(response) {
            console.log(response);
        })
    }
})