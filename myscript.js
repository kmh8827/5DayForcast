getCity();

$("#search").click(function() {
    var nameOfCity = $("#cityName").val();
    addCity(nameOfCity);
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
    var addHere = $(".forcast");
    addHere.text(thisCity);
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
