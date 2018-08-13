var mymap;
$(document).ready(function () {
    // =================================================================================================================
    // configure map
    // =================================================================================================================
    mymap = L.map('map').setView([3.139003, 101.686855], 10);
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.streets',
        accessToken: 'pk.eyJ1IjoicmFmaXphbi1iYWhhcnVtIiwiYSI6ImNqa2kyc3VudDEwanAzdm1sa2hrbXljaGoifQ.3OBKi3hcYVUCD7jrJ76tYw'
    }).addTo(mymap);


    // =================================================================================================================
    // retrieve json
    // =================================================================================================================

    $.ajax({
        dataType: "json",
        url: 'futsals.json'

    }).done(function (data) {
        for (var i = 0; i < data.length; i++) {
            var id = data[i].id;
            var name = data[i].name;
            var price = data[i].price;
            var latitude = data[i].latitude;
            var longitude = data[i].longitude;

            $('#futsal-list').append('<li class="list-group-item d-flex justify-content-between align-items-center"><a><p id="' + id +
                '" data-name="' + name +
                '" data-price="' + price +
                '" data-latitude="' + latitude +
                '" data-longitude="' + longitude +
                '">' + name + '</p></a></tr>')

            // function click on <p>
            $('#' + id).on('click', function () {
                var name = $(this).data('name');
                $(".modal-body #futsalName").text(name);
                var name = $(this).data('price');
                $(".modal-body #futsalPrice").text(price);

                    var latitude = $(this).data('latitude');
                    // $(".modal-body #futsalLatitude").text(latitude);
                    var longitude = $(this).data('longitude');
                    // $(".modal-body #futsalLongitude").text(longitude);
                    mymap.flyTo(new L.LatLng(latitude, longitude), 18);
                });


            console.log(name);
            console.log(latitude);
            console.log(longitude);

            // create marker
            // and add it to map
            var marker = L.marker([latitude, longitude], {futsal: data[i]});
            marker.addTo(mymap);

            marker.on('click', markerOnClick);


            // bind tooltip to marker
            marker.bindTooltip('<p>' + name + '</p>');
        }


    });
    // =================================================================================================================
    // configure function search
    // =================================================================================================================
    $("#myInput").keyup(function () {
        let val = $(this).val();
        console.log(val);
        filter = $(this).val().toUpperCase();
        var ul = $('#futsal-list')[0];
        lis = ul.children;
        for (i = 0; i < lis.length; i++) {
            console.log(lis[i]);
            a = lis[i].firstChild;
            console.log(a);
            if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
                lis[i].style.display = "";
            } else {
                lis[i].style.display = "none";
            }
        }
    });


});


function markerOnClick(e) {
    // alert(e);
    console.log(e.target.options.futsal);
    // $('#futsalname').text(e.target.options.futsal.futsal);
    // $('#futsallat').text(e.target.options.futsal.latitude);
    // $('#futsallog').text(e.target.options.futsal.longitude);
    // $("#featureModal").modal("show");

    mymap.flyTo(new L.LatLng(e.target.options.futsal.latitude, e.target.options.futsal.longitude), 17);

}

//
// function (e){
//     // display data list
//     $('#futsal-list')
//         .append('<div class="card card-outline-secondary my-4">' +
//             '<div class=card-header>' + e.target.options.futsal.futsal + '</div>' +
//             '<div class=card-body><p>' + e.target.options.futsal.latitude + '</p></div>' +
//             '</div>');
// }

