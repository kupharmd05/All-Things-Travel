$(document).ready(function() {
	$('#outgoingDate').datepicker({
		dateFormat: 'yy-mm-dd',
	});

	$('#returnDate').datepicker({
		dateFormat: 'yy-mm-dd',
	});

	$('#dropdown-1').on('click', 'a', function() {
		$(this)
			.parents('.dropdown')
			.find('.btn')
			.html($(this).text());
		$(this)
			.parents('.dropdown')
			.find('.btn')
			.val($(this).data('value'));
	});

	$('#dropdown-2').on('click', 'a', function() {
		$(this)
			.parents('.dropdown')
			.find('.btn')
			.html($(this).text());
		$(this)
			.parents('.dropdown')
			.find('.btn')
			.val($(this).data('value'));
	});

	function getDestination() {
		var destCity = $('#userDestination')
			.val()
			.trim();

		console.log(destCity);

		var location = $('#location')
			.val()
			.trim();
		var outgoingDate = $('#outgoingDate')
			.val()
			.trim();

		console.log(typeof outgoingDate);
		console.log('Date Leaving: ' + outgoingDate);
		var returnDate = $('#returnDate')
			.val()
			.trim();
		var bags = $('#bags')
			.val()
			.trim();

		var adults = $('#adults')
			.val()
			.trim();

		$.ajax({
			url:
				'https://apidojo-kayak-v1.p.rapidapi.com/flights/create-session?origin1=' +
				location +
				'&destination1=' +
				destCity +
				'&departdate1=' +
				outgoingDate +
				'&cabin=e&currency=USD&adults=1&bags=0&departdate2=' +
				returnDate,
			method: 'GET',
			headers: {
				'X-RapidAPI-Key': '95faa2613dmsh9cf38f16b3fd33bp1f9e0djsnbdbe12d99b9f',
			},
		}).then(function(response) {
			console.log(response);
			//Could not get the flight time from API
			// let  fTime = "";
			// console.log("flight Time: "+fTime)
			// let fDuration = tripset[0].duration;
			// console.log("flight Duration: "+fDuration)
			// let fAccessories = [];
			// console.log("flight Accessories: "+fAccessories)
			// let Airlineicon = "";
			// console.log("Airline Icon: "+Airlineicon)
			// let Airline = tripset[0].cheapestProviderName;
			// console.log("AirLine Name: "+Airline)
			// let fTerminal = `${tripset[0].flightRoutes[0].originAirport} to ${tripset[0].flightRoutes[0].destinationAirport}`;
			// console.log("flight Terminal: "+fTerminal)
			// //could not get rating from API
			// let fRating = "4.6";
			// console.log("flight Time: "+fRating)
			// let currency  = tripset[0].currencyCode;
			// console.log("flight Currency: "+fcurrency)
			// let fPrice = tripset[0].displayLowTotal;
			// console.log("flight Price: "+fPrice)
			// let pBaggage = "";
			// console.log("Passager Baggage: "+pBaggage)
		});
	}

	// //Zomato api
	function getFood() {
		var destCity = $('#userDestination')
			.val()
			.trim();

		console.log(destCity);

		const cityurlQuery = 'https://developers.zomato.com/api/v2.1/cities?q=' + "lenexa";

		$.ajax({
			url: cityurlQuery,
			method: 'GET',
			headers: {
				'user-key': 'b485d5465e4552f6c7357bacb40808dc',
			},
		}).then(function(cityInfo) {
			let cityID = cityInfo.location_suggestions[0];
			let city = cityID;

			$.ajax({
				url:
					'https://developers.zomato.com/api/v2.1/search?entity_id=' + city + '&entity_type=city&sort=rating',
				method: 'GET',
				headers: {
					'user-key': 'b485d5465e4552f6c7357bacb40808dc',
				},
			}).then(function(response) {
				console.log(response);
			});
		});
	}

	function displayResult() {
		//main section for the display result
		$('.display-result').addClass('d-inline');
		//  response container
		let displayDiv = $('<div>')
			.addClass('result-div  border border-top border-primary')
			.appendTo('.display-result-middle ');
		 //  Time  duration  and Accessorie (TDA) div
		let TDA = $('<div>')
			.addClass('time-duration-accessories-row')
			.appendTo(displayDiv);
		// set the responsiveness of the TDA
		let TDAresponsive = $('<div>')
			.addClass('time-duration-accessories col-7 order-first')
			.appendTo(TDA);
		let TDArow = $('<div>')
			.addClass('row time-duration-accessories')
			.appendTo(TDAresponsive);
		//add flight time here...
		let dTime = $('<div>')
			.addClass('time col-4')
			.appendTo(TDArow)
			.text('12:04 - 3.20pm');
		//add flight duration here...
		let dDuration = $('<div>')
			.addClass('duration col-4')
			.appendTo(TDArow)
			.text('25h 8m(2 stops)');
		//add flight Accessories here...
		let dAccessories = $('<div>')
			.addClass('accessories col-4')
			.appendTo(TDArow)
			.text('wifi');
		//takes the response image
		// dAccessories.prepend('<img id="theImg" src="' + theImg.png+ ' />')

		// get the airline infomation
		let airlineInfo = $('<div>')
			.addClass(' row airline mt-2')
			.appendTo(displayDiv);
		let airlineIcon = $('<div>')
			.addClass(' flight-icon col-1')
			.appendTo(airlineInfo)
			.text('icon');
		let airlineName = $('<div>')
			.addClass(' airline-name col-4 ')
			.appendTo(airlineInfo)
            .text('American Airlines')
           ;
		let terminalName = $('<div>')
			.addClass(' terminal-name col-5')
			.appendTo(airlineInfo)
			.text('DFW  - MCI');
		let priceandbutton = $('<div>')
			.addClass(' priceandbutton col-2 text-danger')
			.appendTo(airlineInfo)
			.text('$1,450.00');
		let searchBtn = $('<button>')
			.addClass('btn-price')
            .css({
                 marginleft:'10px',
               })
			.text('Submit')
			.appendTo(priceandbutton);

		// Rating infomation
		let ratinginfo = $('<div>')
			.addClass('rating-info mt-2')
			.appendTo(displayDiv);
		let rating = $('<div>')
            .addClass('col-2 rating')           
			.appendTo(ratinginfo);
		$(rating).html(
			'<a href="http://www.google.com" ><span class="text-success">Excellent Flight (8.7/10)</span></a>'
		);
		let operator = $('<div>')
			.addClass('col.6 operator')			
			.text('American Airlines 8497 operated by Japan Airlines ')
            .appendTo(ratinginfo)
		//baggage info
		let baggagesinfo = $('<div>')
			.addClass('row baggages-info')
			.appendTo(displayDiv)
			.css('marginBottom', '20px');
		let baggages = $('<div>')
			.addClass('baggages col-4 text-primary')
			.appendTo(baggagesinfo);
		$(baggages).html('<a href="http://www.google.com">Details & baggage fees v</a>');
    }

	$('#submit').on('click', event => {
		event.preventDefault();
		//getFood();
		getDestination();
		displayResult();
	});
});
let url = "https://api.travelpayouts.com/v1/prices/cheap?origin=MOW&destination=HKT&depart_date=2019-02&return_date=2019-02&token=fd97bdfe7eb46a7a1dca88d506ac5568"
$.ajax({
    url:url,
    method:"get"
}).then(function(response){
console.log(response)
})