//grabs the axios package;
var axios = require( "axios" );

//reading and setting variables with the dotenv package;
require( "dotenv" ).config();

//imports keys.js file and stores it as a variable;
var keys = require( "./keys.js" );

//enables access to Spotify keys;
var Spotify = require( 'node-spotify-api' );
var spotify = new Spotify( keys.spotify );

//assigns the user's input and searh process to global variables;
var SearchProcess = process.argv[2];
var UserInput;
// we need to loop through the node array for all the words of the artist's name;
for (var i = 3; i < process.argv.length; i++) {
    if (i > 3 && i < process.argv.length) {
    UserInput = UserInput + "+" + process.argv[i];
    } else {
        UserInput = process.argv[i];
    }
}



//this creates a switch case statement depending on what the user searches for;
// we also assign which function to run depending on the process;
switch (SearchProcess) {
    case "concert-this": searchConcert();
        break;
    
    case "spotify-this-song": searchSong();
        break;

    case "movie-this": searchMovie();
        break;
 
    case "do-what-it-says": runRandom();
        break;
}



//---------      now we define each function;     ---------------;

function searchConcert () {
  
    //we create variable to hold the bands in town URL then run an axios request to Bands in Town API, then print the required details;
    var bandsURL = "https://rest.bandsintown.com/artists/" + UserInput + "/events?app_id=codingbootcamp";

    axios.get( bandsURL ).then( function ( response ) {
        //console.log( response );
        console.log( "Venue: " + response.data.description + 
            "\nLocation: " + response.data.venue + 
            "\nDate: " + response.data.datetime.format( "MM/DD/YYYY" ));
    });
};


function searchMovie () {
    
    // we  create variable for movie url then run axios request ;
    var movieURL = "http://www.omdbapi.com/?t=" + UserInput + "&y=&plot=short&apikey=trilogy";

    axios.get( movieURL ).then( function ( response ) {
        console.log( "Title: " + response.data.Title + 
        "\nYear: " + response.data.Year + 
        "\nIMDB Rating: " + response.data.imdbRating + 
        "\nRotten Tomatoes Rating: " + response.data.Ratings + 
        "\nCountry: " + response.data.Country +
        "\nLanguage: " + response.data.Language +
        "\nPlot: " + response.data.Plot +
        "\nCast: " + response.data.Actors);

    if (UserInput = null) {
        UserInput == "Mr. Nobody";
    }
    });
};


function searchSong () {
    spotify
        .search({ type: 'track', query: UserInput })
        .then( function( response ) {
            console.log( response );
        })
        .catch(function( err ) {
            console.log( err );
        });
    
    if ( UserInput = null ) {
        UserInput == "The Sign - Ace of Base";
    }
};


function runRandom () {

}

