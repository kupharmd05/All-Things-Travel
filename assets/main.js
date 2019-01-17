
$(document).ready(function () {

    $("#outgoingDate").datepicker({
        dateFormat: 'yy-mm-dd'
    });
    
    $("#returnDate").datepicker({
        dateFormat: 'yy-mm-dd'
    });


    function getDestination() {
        var userInput = $("#userDestination").val().trim();


        var destCity = userInput;
        console.log(userInput)
        var location = $("#location").val().trim();
        var outgoingDate = $("#outgoingDate").val().trim();

        var returnDate = $("#returnDate").val().trim();

        // var bags = $("bags").val().trim();

        // var adults = $("#adults").val().trim();

        $.ajax({
            url: "https://apidojo-kayak-v1.p.rapidapi.com/flights/create-session?origin1=" + location + "&destination1=" + destCity + "&departdate1=" + outgoingDate + "=e&currency=USD&adults=1&bags=0&departdate2=" + returnDate + "",
            method: "GET",
            headers: {
                "X-RapidAPI-Key": "95faa2613dmsh9cf38f16b3fd33bp1f9e0djsnbdbe12d99b9f"
            },

            // origin1: location,
            // destination1: destCity,
            // departuredate1: outgoingDate,
            // departuredate2: returnDate,
            // cabin: "e",
            // currency: "USD",
            // adults: adults,
            // bags: bags,

        }).then(function (response) {
            console.log(response)



        });

    }
    //Zomato api
    function getFood() {
        var userInput = $("#userDestination").val().trim();
        let destCity = userInput
        console.log(userInput)
        let radius = 2000;
        let no_of_resturants = 20

        let urlQuery = "https://developers.zomato.com/api/v2.1/search?entity_type=city&q=" + destCity
            + "&start=01&count=" + no_of_resturants + "&radius=" + radius + "M&sort=rating"

        $.ajax({
            url: urlQuery,
            method: "GET",
            headers: {
                "user-key": "b485d5465e4552f6c7357bacb40808dc"
            }
        }).then(function (response) {
            console.log(response.restaurants)
            let len = response.restaurants.length
            for (let i = 0; i < len; i++) {

                let result = response.restaurants
                console.log(result[i].restaurant)
                console.log("name : " + result[i].restaurant.name)
                console.log("cuisines : " + result[i].restaurant.cuisines)
                console.log("Location : " + result[i].restaurant.location.address)
                console.log("Rating : " + result[i].restaurant.user_rating.aggregate_rating)
                console.log("Image_url : " + result[i].restaurant.photos_url)
            }
        });
    }

    $("#submit").on("click", event => {
        event.preventDefault()
        getFood(),
            getDestination()
    })


});
