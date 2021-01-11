getCity();
var latitude = 0;
var longitude = 0;

$("#search").click(function () {
    var nameOfCity = $("#cityName").val();
    addCity(nameOfCity);
    cityInfo(nameOfCity);
});
$(document).on("click", ".city", function () {
    var getCity = $(this).text();
    cityInfo(getCity);
});
function addCity(cityName) {
    var name = $("<button>");
    name.text(cityName);
    name.attr("class", "city");
    $(".addCity").append(name);
    storeCity(cityName);
}
function cityInfo(thisCity) {
    var addHere = $("#displayName");
    addHere.text(thisCity);

    var queryURLCity = "https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?q=" + thisCity + "&appid=3aedaa4c3534c982b48f6a82a6ddb305";
    var queryURL5Day = "https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/forecast?q=" + thisCity + "&appid=3aedaa4c3534c982b48f6a82a6ddb305";
    

    $.ajax({
        url: queryURLCity,
        type: "GET"
    }).then(function (response) {
        console.log(response);
        var temperatureK = response.main.temp;
        var humidity = response.main.humidity;
        var windSpeed = response.wind.speed;
        var temperatureF = ((temperatureK - 273.15) * 9 / 5 + 32).toFixed(2);
        var cityLat = response.coord.lat;
        var cityLong = response.coord.lon;
        var cloud = response.weather[0].icon;
        var imageURL = "http://openweathermap.org/img/w/" + cloud + ".png";
        var cloudImage = $("<img>");
        cloudImage.attr("src",imageURL);
        $("#displayName").append(cloudImage);
        latitude = cityLat;
        longitude = cityLong;
        $("#temperature").text("Temperature: " + temperatureF);
        $("#humidity").text("Humidity: " + humidity + " %");
        $("#windSpeed").text("Wind Speed: " + windSpeed + " MPH");
        console.log(latitude);

        $.ajax({
            url: queryURL5Day,
            type: "GET"
        }).then(function (response) {
            console.log(response);

            var queryURLUV = "https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/uvi?lat=" + latitude + "&lon=" + longitude + "&appid=3aedaa4c3534c982b48f6a82a6ddb305";

            $.ajax({
                url: queryURLUV,
                type: "GET"
            }).then(function (response) {
                console.log(response);
                console.log(latitude);
                var UV = response.value;
                $("#UVIndex").text("UV Index: " + UV);
            });
            
        });

    
    });

    


}
function storeCity(cityName) {
    localStorage.setItem("cityName", JSON.stringify(cityName));
}

function getCity() {
    var lastCity = JSON.parse(localStorage.getItem("cityName"));
    if (lastCity !== null) {
        addCity(lastCity);
    }

}
