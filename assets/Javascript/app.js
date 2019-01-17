
// // 
//  let url = "https://maps.googleapis.com/maps/api/geocode/json?address=lenexa&key=AIzaSyDATDQ4r-tgTi_SAM6ToK0XPNTKrhJwBz4"

// $.ajax({
// url: url,
// method: "GET",
// })
// .then(function (response) {
//   console.log(response)
//   let location = response.results[0].geometry.location
//   console.log(location.lat);
//   console.log(location.lng);

// })




//Zomato api
 
let cityName = "lenexa"
let cityId = 11171;



let urlQuery =  "https://developers.zomato.com/api/v2.1/geocode?lat=40.742051&lon=-74.004821&"

                "https://developers.zomato.com/api/v2.1/cities?q=new%20york&city_ids=280&count=20 "
$.ajax({
url: urlQuery,
method: "GET",
headers: {
"user-key": "b485d5465e4552f6c7357bacb40808dc"
}
}).then(function(response) {
  console.log(response)
let result = response.restaurants
console.log(result[0].restaurant)
console.log( "name : " +result[0].restaurant.name)
console.log( "cuisines : " +result[0].restaurant.cuisines)
console.log( "Location : " +result[0].restaurant.location.address)
console.log( "Rating : " +result[0].restaurant.user_rating.aggregate_rating)
console.log( "Image_url : " +result[0].restaurant.photos_url)
});


//Flight Search
$("search").on("click",e => {
  //prevent Default
  e.preventDefault()
  $("<div>")
})