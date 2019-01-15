
$(document).ready( function(){
    function getWeather(){

        var userCity = $("#userDestination").val().trim();

        var openweathermapAPIKEY = "376fffcd91763ad35ed350f2f78f8296";

        var openweathermapQueryURL = "https://api.openweathermap.org/data.2.5/weather?q=" + userCity +"$appid=" + openweathermapAPIKEY;

        $.ajax({
            url: openweathermapQueryURL,
            method: "GET"
        }).then(function(response) {
            console.log(response);
        })
    }
    function getDestination(){

        var destCity =$("#userDestination").val().trim();

    $.ajax({
        url: "https://apidojo-kayak-v1.p.rapidapi.com/locations/search?where=" + destCity,
        method: "GET",
        headers: {
            "X-RapidAPI-Key": "95faa2613dmsh9cf38f16b3fd33bp1f9e0djsnbdbe12d99b9f"
            },
            origin1: "Kansas City",
            destination1: "Dallas",
            departuredate1: "2019-01-20",
            cabin: "e",
            currency: "USD",
            adults: 1,
            bags: 0,
        
            }).then(function(response) {
            console.log(response)
            var results = response.data;
            var cheapest = results.cheapestPrice
            console.log(cheapest);
           
            
        });

    }
    $("#submit").on("click",getDestination())

   
});
