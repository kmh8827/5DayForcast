getCity();

$("#search").click(function(event) {
    event.preventDefault();
    var nameOfCity = $("#cityName").val();
    addCity(nameOfCity);
});
function addCity(cityName) {
    var name = $("<p>");
    name.text(cityName);
    name.attr("class","city");
    $(".addCity").append(name);
    storeCity(cityName);
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
