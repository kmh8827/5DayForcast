getCity();

$("#search").click(function() {
    var nameOfCity = $("#cityName").val();
    addCity(nameOfCity);
    cityInfo(nameOfCity);
});
$(document).on("click",".city",function() {
    var getCity = $(this).text();
    cityInfo(getCity);
});
function addCity(cityName) {
    var name = $("<button>");
    name.text(cityName);
    name.attr("class","city");
    $(".addCity").append(name);
    storeCity(cityName);
}
function cityInfo(thisCity) {
    var addHere = $("#displayName");
    addHere.text(thisCity);

    var queryURLCity = "https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?q="+thisCity+"&appid=3aedaa4c3534c982b48f6a82a6ddb305";
    var queryURL5Day = "https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/forecast?q="+thisCity+"&appid=3aedaa4c3534c982b48f6a82a6ddb305";

    $.ajax({
        url: queryURLCity,
        type: "GET"
    }).then(function(response) {
        console.log(response);
        var temperatureK = response.main.temp;
        var humidity = response.main.humidity;
        var windSpeed = response.wind.speed;
        var temperatureF = ((temperatureK-273.15)*9/5+32).toFixed(2);
        $("#temperature").text("Temperature: " + temperatureF);
        $("#humidity").text("Humidity: " + humidity + " %");
        $("#windSpeed").text("Wind Speed: " + windSpeed + " MPH");
    
    });

    $.ajax({
        url: queryURL5Day,
        type: "GET"
    }).then(function(response) {
        console.log(response);
    })
}
function storeCity(cityName) {
    localStorage.setItem("cityName",JSON.stringify(cityName));
}

function getCity() {
    var lastCity = JSON.parse(localStorage.getItem("cityName"));
    if (lastCity !== null) {
    addCity(lastCity);
    }

}
