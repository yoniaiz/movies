var movieArrey = []
$('#searchMovie').on('focus', function () {
    $("#searchIcon").css("color", "rgb(212, 63, 58)");
});
$('#searchMovie').focusout(function () {
    $("#searchIcon").css("color", "white");
});
$("#datepicker").datepicker({
    format: "yyyy",
    viewMode: "years",
    minViewMode: "years"
});

$('.dropdown-item').on('click', function () {
    if ($(this).html() == 'Reset') {
        $('.dropdown-toggle').html('Type')
    } else
        $('.dropdown-toggle').html($(this).html())
})

createUrl = () => {
    url = "http://www.omdbapi.com/?apikey=5413d309"
    if ($('#searchMovie').val() != '') {
        url += `&s=${$('#searchMovie').val()}`
        if ($('.dropdown-toggle').html() != 'Type') {
            url += `&type=${$('.dropdown-toggle').html()}`
        }
        if ($('#datepicker').val() != '') {
            url += `&y=${$('#datepicker').val()}`
        }
    }
    return url;
}

searchMovie = () => {
    url = createUrl()
    $.ajax({
        type: 'GET',
        datatype: 'json',
        url: url,
        async: false,
        success: function (data) {
            movieArrey = data.Search
            showResult()
        },
        error: function (error) {
            console.log("error : ", error);
        }
    });
}

showResult = () => {
    $('#movies').html('')
    $.each(movieArrey, function (i, pic) {
        createImage(pic)
    })
}

createImage = (movie) => {
    $('#movies').append(`
    <div class="m-4 col-2">
    <div class="description"> <strong style="color:#3AD48C">${movie.Title}</strong> <h2>Year : ${movie.Year}</h2> <h2>imdbID : ${movie.imdbID}</h2> <h2>Type : ${movie.Type}</h2> </div>
    <div class="scrollbar" id="style-9"> <div class="force-overflow"></div> </div>
    <img src="${movie.Poster}"  class="img-thumbnail">
    </div>`)
}