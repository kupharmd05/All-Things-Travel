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

    });

    $("#dropdown-2").on("click", "a", function () {
        $(this).parents(".dropdown").find(".btn").html($(this).text());
        $(this).parents(".dropdown").find(".btn").val($(this).data("value"));
    });
    


    function getDestination() {
        var destCity = $("#userDestination").val().trim();
       

        console.log(destCity)

        var location = $("#location").val().trim();
        var outgoingDate = $("#outgoingDate").val().trim();
      
      console.log(typeof outgoingDate);
        console.log('Date Leaving: ' + outgoingDate);
        var returnDate = $("#returnDate").val().trim();
            var bags = $("#bags").val().trim();

        var adults = $("#adults").val().trim();

        $.ajax({
            url: "https://apidojo-kayak-v1.p.rapidapi.com/flights/create-session?origin1=" + location + "&destination1=" + destCity + "&departdate1=" + outgoingDate + "&cabin=e&currency=USD&adults=1&bags=1&departdate2=" + returnDate,
            method: "GET",
            headers: {
                "X-RapidAPI-Key": "95faa2613dmsh9cf38f16b3fd33bp1f9e0djsnbdbe12d99b9f"
            },


        }).then(function (response) {
            console.log(response)
           
        
            //Could not get the flight time from API
            let  fTime = response.departDate;
            console.log("flight Time: "+fTime)

            //Loop through the tripset
            let len = 1;
            for(let i = 0 ; i < len; i++){
            let fDuration = response.tripset[i].duration;
            console.log("flight Duration: "+fDuration)
            // let fAccessories = [];
            // console.log("flight Accessories: "+fAccessories)
            // let Airlineicon = response.tripset[0].airlineLogos;
            // console.log("Airline Icon: "+Airlineicon)
            let provider = response.tripset[i].cheapestProviderName;
            console.log("Provider name: "+provider)
            let fTerminal = `${response.tripset[i].flightRoutes[0].originAirport} to ${response.tripset[i].flightRoutes[0].destinationAirport}`;
            console.log("flight Terminal: "+fTerminal)
            //could not get rating from API
            let fAirline = response.tripset[i].airlines;        
            console.log("Airline: "+fAirline)
            let fcurrency  = response.tripset[i].currencyCode;
            console.log("flight Currency: "+fcurrency)
            let fPrice = response.tripset[i].displayLowTotal;
            console.log("flight Price: "+fPrice)
            // let pBaggage = "";
            // console.log("Passager Baggage: "+pBaggage)

        
            //link the button to the kayak pag
           let kayakURL  ='https://www.kayak.com'+ response.tripset[i].shareURL;
                 
        //Main section for the display result
        $(".display-result").addClass("d-inline")
        //  response container
        let displayDiv = $("<div>").addClass("result-div  border border-top border-primary").appendTo(".display-result-middle")
        //    Time  duration  and Accessorie (TDA) div 
        let TDA = $("<div>").addClass("time-duration-accessories-row").appendTo(displayDiv)
        // Set the responsiveness of the TDA 
        let TDAresponsive = $("<div>").addClass("time-duration-accessories col-7 order-first").appendTo(TDA)
        let TDArow = $("<div>").addClass("row time-duration-accessories").appendTo(TDAresponsive)
        //add flight time here...
        let dTime = $("<div>").addClass("time col-4").appendTo(TDArow).text(fTime)
         //add flight duration here...
         let dDuration = $("<div>").addClass("duration col-4").appendTo(TDArow).text()
         //add flight Accessories here...     
        // let dAccessories = $("<div>").addClass("accessories col-4").appendTo(TDArow).text("wifi")
        //takes the response image
            // dAccessories.prepend('<img id="theImg" src="' + theImg.png+ ' />')

        // get the airline infomation
        let airlineInfo = $("<div>").addClass(" row airline bg- primary").appendTo(displayDiv)
        // let airlineIcon = $("<div>").addClass(" flight-icon col-1").appendTo(airlineInfo).text("icon") 
        let airlineName = $("<div>").addClass("airline-name col-4").appendTo(airlineInfo).text(provider)  
        let terminalName = $("<div>").addClass(" terminal-name col-5").appendTo(airlineInfo).text(fTerminal) 
        let priceandbutton = $("<div>").addClass(" priceandbutton col-2 text-danger").appendTo(airlineInfo).text(fPrice)

       //Redirect to the kayak Website
        let searchBtn =    $("<button>").addClass("btn-price").css("margin-left","10px").text("Submit").appendTo(priceandbutton)

        $( ".btn-price" ).click(function() {
            window.location.replace(kayakURL)
          });
        
        // Rating infomation
        let ratinginfo = $("<div>").addClass("rating-info mt-2").appendTo(displayDiv) 
        let rating = $("<div>").addClass("col-2 rating ").appendTo(ratinginfo);
       
 
        //baggage info
        let baggagesinfo = $("<div>").addClass("row baggages-info").appendTo(displayDiv).css("marginBottom", "20px")
        let baggages = $("<div>").addClass("baggages col-4 text-primary").appendTo(baggagesinfo)
        $(baggages).html(bags)
    }  
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
                
                let rest = response.restaurants
                console.log(rest);
                // Checking to make sure API is pulling something back
                console.log(rest[0].restaurant.name);
             
                console.log(rest[0].restaurant.location.address);
               
                console.log(rest[0].restaurant.url);
                
                console.log(rest[0].restaurant.menu_url);
                
                console.log(rest[0].restaurant.user_rating.aggregate_rating);
                
                console.log(rest[0].restaurant.thumb);
                
                // Looping over response to limit it to 3, applying HTML to empty restaurants div with results
                for (var i = 0; i < 3; i++) {
                    let name = (rest[i].restaurant.name);
                    let address = (rest[i].restaurant.location.address);
                    let url = (rest[i].restaurant.url);
                    let menu = (rest[i].restaurant.menu_url);
                    let rating = (rest[i].restaurant.user_rating.aggregate_rating);
                    let image = (rest[i].restaurant.thumb);


                let restaurantInfo = '<div class="card"><div class="row p-3"><div class="col-5"><img src="'+image+'" class="img-fluid img-thumbnail alt=""></div><div class="col-5"><h6>'+name+'</h6><p>'+address+'</p></div><div class="col-1"><div class="badge badge-success">'+rating+'</div></div></div><hr><div class="row text-center no-gutters pb-3"><div class="col-6"><a href="'+menu+'" target="_blank" class="btn btn-danger">Menu</a></div><div class="col-6"><a href="'+url+'" target="_blank" class="btn btn-danger">Website</a></div></div></div>';
                
                $("#restaurants").append(restaurantInfo);
                }

                

                });

            }); 

        }
    

        $("#submit").on("click", event => {
            event.preventDefault()
            getFood()
             getDestination()
           
            });

});



