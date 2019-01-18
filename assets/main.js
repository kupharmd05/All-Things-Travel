
$(document).ready(function () {

    $("#outgoingDate").datepicker({
        dateFormat: 'yy-mm-dd'
    });

    $("#returnDate").datepicker({
        dateFormat: 'yy-mm-dd'
    });

    $("#dropdown-1").on("click", "a", function () {
        $(this).parents(".dropdown").find(".btn").html($(this).text());
        $(this).parents(".dropdown").find(".btn").val($(this).data("value"));

    })

    $("#dropdown-2").on("click", "a", function () {
        $(this).parents(".dropdown").find(".btn").html($(this).text());
        $(this).parents(".dropdown").find(".btn").val($(this).data("value"));

    })

    function getDestination() {
        var destCity = $("#userDestination").val().trim();

        console.log(destCity)

        var location = $("#location").val().trim();
        var outgoingDate = $("#outgoingDate").val().trim();

        var returnDate = $("#returnDate").val().trim();

        var bags = $("#bags").val().trim();

        var adults = $("#adults").val().trim();

        $.ajax({
            url: "https://apidojo-kayak-v1.p.rapidapi.com/flights/create-session?origin1=" + location + "&destination1=" + destCity + "&departdate1=" + outgoingDate + "&cabin=e&currency=USD&adults="+adults+"&bags="+bags+"&departdate2=" + returnDate + "",
            method: "GET",
            headers: {
                "X-RapidAPI-Key": "95faa2613dmsh9cf38f16b3fd33bp1f9e0djsnbdbe12d99b9f"
            },

           

        }).then(function (response) {
            console.log(response)



        });

    }
    // //Zomato api
    function getFood() {
        var destCity = $("#userDestination").val().trim();

        console.log(destCity)


        const cityurlQuery = "https://developers.zomato.com/api/v2.1/cities?q=" + destCity;

        $.ajax({
            url: cityurlQuery,
            method: "GET",
            headers: {
                "user-key": "b485d5465e4552f6c7357bacb40808dc"
            },
            
        }).then(function (cityInfo) {
           
                let cityID = cityInfo.location_suggestions[0].id;

                
            $.ajax({
                url: "https://developers.zomato.com/api/v2.1/search?entity_id=" + cityID + "&entity_type=city&sort=rating",
                method: "GET",
                headers: {
                    "user-key": "b485d5465e4552f6c7357bacb40808dc"
                }
            }).then(function (response) {
                console.log(response);
                });

            }); 

        }
    

    $("#submit").on("click", event => {
        event.preventDefault()
        getFood()
    // getDestination()
    });

});

