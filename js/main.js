//Document Ready Function...
$(() => {
    $("#Warn").hide();
    $("#searchForm").on("submit", (e) => {
        let searchText = $("#searchText").val(); //store value of search

        if (searchText) {
            console.log(searchText); //output searched value
            getMovies(searchText); // pass the value to the function
            e.preventDefault(); //preventing defeault actions to occur...
        } else {
            console.error(e); //prints error Messing around with Warning message.
            if (err) {
                $("#Warn").show();
            } else {
                $("#Warn").hide();
            }

        }
    })
});

function getMovies(searchText) {
    axios.get('http://www.omdbapi.com?s=' + searchText)
        .then((res) => {
            console.dir(res); //logging response
            let movies = res.data.Search; //The object that has the data.
            let output = ''; //Used to concatenate output
            //Begin iterating through array of objects, storing 
            var result = movies.map((movie) => {
                //console.log(JSON.parse(JSON.stringify(movies))); (Test)
                output += `
                            <div class="col-md-3">
                            <div class="well text-center">
                            <img src="${movie.Poster}" alt="Movie from omdb"> 
                                <h5>${movie.Title}</h5> 
                                <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#">Movie Details</a>
                                </div>
                            </div>
                        `
            });
            $("#movies").html(output);
        })
        .catch((err) => {
            console.error(err); //catching any errors.
        })
}

function movieSelected(id) {
    sessionStorage.setItem('movieId', id); //(key, value)
    window.location = 'movie.html';
    return false;
}

function getMovie() {
    let movieID = sessionStorage.getItem('movieId'); //retriving ID
    axios.get('http://www.omdbapi.com?i=' + movieID)
        .then((res) => {
            console.log(res); //logging response
            let movie = res.data; //Why does this work?
            let output = `
        <div class="row">
        <div class="col-md-4">
        
        <img src="${movie.Poster}" class="thumbnail">
        
         </div>

         <div class="col-md-8">
         <h2>${movie.Title}</h2>
         <ul class="list-group">
                <li class="list-group-item">Genre:<strong>${movie.Genre}</strong></li>
                <li class="list-group-item">Released:<strong>${movie.Released}</strong></li>
                <li class="list-group-item">Rated:<strong>${movie.Rated}</strong></li>
                <li class="list-group-item">imdbRating:<strong>${movie.imdbRating}</strong></li>
                <li class="list-group-item">Director:<strong>${movie.Director}</strong></li> 
                <li class="list-group-item">Writer:<strong>${movie.Writer}</strong></li> 
                <li class="list-group-item">Writer:<strong>${movie.Actors}</strong></li> 
          </ul>
         </div>
        </div>
         <div class="row">
          <div class="well">
            <h3>Plot</h3>
             ${movie.Plot}
           <hr>
             <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">View IMDB</a>
             <a href="index.html" target="_blank" class="btn btn-info">Go Home Roger</a>
          </div>
        </div>
        `;

            $("#movie").html(output); //Placing the output into a div.
        })
        .catch((err) => {
            console.error(err); //catching any errors.
        });
}