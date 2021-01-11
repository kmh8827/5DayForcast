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
    var day = dayjs().format(" (MM/DD/YYYY)");
    addHere.text(thisCity + day);

    var queryURLCity = "https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/weather?q=" + thisCity + "&appid=3aedaa4c3534c982b48f6a82a6ddb305";
    var queryURL5Day = "https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/forecast?q=" + thisCity + "&appid=3aedaa4c3534c982b48f6a82a6ddb305";


    $.ajax({
        url: queryURLCity,
        type: "GET"
    }).then(function (response) {
        console.log(response);
        var temperatureK = response.main.temp;
        var humidity = response.main.humidity;
        var windSpeed = response.wind.speed;
        var temperatureF = ((temperatureK - 273.15) * 9 / 5 + 32).toFixed(1);
        var cityLat = response.coord.lat;
        var cityLong = response.coord.lon;
        var cloud = response.weather[0].icon;
        var imageURL = "http://openweathermap.org/img/w/" + cloud + ".png";
        var cloudImage = $("<img>");

        latitude = cityLat;
        longitude = cityLong;

        cloudImage.attr("src", imageURL);
        $("#displayName").append(cloudImage);
        $("#temperature").text("Temperature: " + temperatureF +  " F");
        $("#humidity").text("Humidity: " + humidity + " %");
        $("#windSpeed").text("Wind Speed: " + windSpeed + " MPH");

        var queryURLUV = "https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/uvi?lat=" + latitude + "&lon=" + longitude + "&appid=3aedaa4c3534c982b48f6a82a6ddb305";
    
        $.ajax({
            url: queryURLUV,
            type: "GET"
        }).then(function (response) {
            console.log(response);
            console.log(latitude);
            var UV = response.value.toFixed(2);
            $("#UVIndex").text("UV Index: " + UV);

            $.ajax({
                url: queryURL5Day,
                type: "GET"
            }).then(function (response) { 
                //4,12,20,28,36
                for (var i=4;i<40;i=i+8) {
                    $("#time"+i).empty();
                    var humidPlace = $("<p>");
                    var tempPlace = $("<p>");
                    var iconPlace = $("<img>");
                    var datePlace = $("<p>");

                    var futureDate = response.list[i].dt_txt;
                    thisDate = dayjs(futureDate).format(" (MM/DD/YYYY)");

                    var iconToSet = response.list[i].weather[0].icon;
                    var futureImage = "http://openweathermap.org/img/w/" + iconToSet + ".png";
                    iconPlace.attr("src",futureImage);

                    var nextTempK = response.list[i].main.temp;
                    var nextHumid = response.list[i].main.humidity;
                    var nextTempF = ((nextTempK - 273.15) * 9 / 5 + 32).toFixed(1);

                    tempPlace.text("Temp: " + nextTempF + " F");
                    humidPlace.text("Humidity: " + nextHumid + " %");
                    datePlace.text(thisDate);

                    tempPlace.attr("class","insideWeather");
                    humidPlace.attr("class","insideWeather");
                    datePlace.attr("class","insideWeather");

                    $("#time"+i).append(datePlace);
                    $("#time"+i).append(iconPlace);
                    $("#time"+i).append(tempPlace);
                    $("#time"+i).append(humidPlace);
                }

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
