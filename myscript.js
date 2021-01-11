$("#lock").click(function(event) {
    event.preventDefault();
    var nameOfCity = $("#cityName").val();
    var name = $("<p>");
    name.text(nameOfCity);
    name.attr("class","city");
    $(".addCity").append(name);
});
