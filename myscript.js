//Pull from local storage
getCity();

//When clicking on the button beside the text box it runs functions addCity and cityInfo
$("#search").click(function () {
    var nameOfCity = $("#cityName").val();
    addCity(nameOfCity);
    cityInfo(nameOfCity);
    
});
//When clicking on a class with city it gets the weather information from that city
$(document).on("click", ".city", function () {
    var getCity = $(this).text();
    
    cityInfo(getCity);
});
//Adds the city to an area for cityHistory and runs storeCity
function addCity(cityName) {
    var name = $("<button>");
    name.text(cityName);
    name.attr("class", "city");
    $(".addCity").append(name);
    storeCity(cityName);
}
//Gets information about the city using openweather API
function cityInfo(thisCity) {
    //Format date using dayjs() library
    var addHere = $("#displayName");
    var day = dayjs().format(" (MM/DD/YYYY)");
    addHere.text(thisCity + day);

    var queryURLCity = "https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/weather?q=" + thisCity + "&appid=3aedaa4c3534c982b48f6a82a6ddb305";
    var queryURL5Day = "https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/forecast?q=" + thisCity + "&appid=3aedaa4c3534c982b48f6a82a6ddb305";

    //CurrentDay Weather API
    $.ajax({
        url: queryURLCity,
        type: "GET"
    }).then(function (response) {
        var temperatureK = response.main.temp;
        var humidity = response.main.humidity;
        var windSpeed = response.wind.speed;
        
        //Temperature in API is in kelvin, converts to farenheight
        var temperatureF = ((temperatureK - 273.15) * 9 / 5 + 32).toFixed(1);

        //UV index uses latitude and longitude instead of city name, get lat + long here
        var latitude = response.coord.lat;
        var longitude = response.coord.lon;

        //Icon code saved in object, get that from here to put into link
        var cloud = response.weather[0].icon;
        var imageURL = "http://openweathermap.org/img/w/" + cloud + ".png";
        var cloudImage = $("<img>");
        cloudImage.attr("src", imageURL);

        //Puts information in appropriate places in HTML
        $("#displayName").append(cloudImage);
        $("#temperature").text("Temperature: " + temperatureF +  " F");
        $("#humidity").text("Humidity: " + humidity + " %");
        $("#windSpeed").text("Wind Speed: " + windSpeed + " MPH");

        var queryURLUV = "https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/uvi?lat=" + latitude + "&lon=" + longitude + "&appid=3aedaa4c3534c982b48f6a82a6ddb305";
        
        //UV Weather API
        $.ajax({
            url: queryURLUV,
            type: "GET"
        }).then(function (response) {
            var UVIndex = $("#UVIndex");
            var UV = response.value.toFixed(2);
            UVIndex.text("UV Index: " + UV);
            //Adds backgrond-color to UV depending on Severity
            if (UV < 3) {
                UVIndex.attr("class","low");
            } else if (UV < 6) {
                UVIndex.attr("class","moderate");
            } else if (UV < 8) {
                UVIndex.attr("class","high");
            } else {
                UVIndex.attr("class","sever");
            }
            //5-Day Forcast Weather API
            $.ajax({
                url: queryURL5Day,
                type: "GET"
            }).then(function (response) { 
                //3,11,19,27,35 are positions in weather array for 12:00 times
                for (var i=3;i<40;i=i+8) {
                    $("#time"+i).empty();
                    var humidPlace = $("<p>");
                    var tempPlace = $("<p>");
                    var iconPlace = $("<img>");
                    var datePlace = $("<p>");
                    
                    //Format date using dayjs() library
                    var futureDate = response.list[i].dt_txt;
                    thisDate = dayjs(futureDate).format(" (MM/DD/YYYY)");

                    //Get icon code and set that image
                    var iconToSet = response.list[i].weather[0].icon;
                    var futureImage = "http://openweathermap.org/img/w/" + iconToSet + ".png";
                    iconPlace.attr("src",futureImage);

                    var nextHumid = response.list[i].main.humidity;

                    //Temperature in Kevlin, converts to fahrenheit
                    var nextTempK = response.list[i].main.temp;
                    var nextTempF = ((nextTempK - 273.15) * 9 / 5 + 32).toFixed(1);

                    tempPlace.text("Temp: " + nextTempF + " F");
                    humidPlace.text("Humidity: " + nextHumid + " %");
                    datePlace.text(thisDate);
                    
                    //Give class for styling
                    tempPlace.attr("class","insideWeather");
                    humidPlace.attr("class","insideWeather");
                    datePlace.attr("class","insideWeather");

                    //Put places inside appropriate place in HTML
                    $("#time"+i).append(datePlace);
                    $("#time"+i).append(iconPlace);
                    $("#time"+i).append(tempPlace);
                    $("#time"+i).append(humidPlace);
                }
            });
        });
    });
}

//Saves the last City entered to Local Storage
function storeCity(cityName) {
    localStorage.setItem("cityName", JSON.stringify(cityName));
}

//Gets the last City entered from Local Storage
function getCity() {
    var lastCity = JSON.parse(localStorage.getItem("cityName"));
    if (lastCity !== null) {
        addCity(lastCity);
        cityInfo(lastCity);
    }

}
