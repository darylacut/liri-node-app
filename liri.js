//grabs the axios package;
var axios = require( "axios" );

//reading and setting variables with the dotenv package;
require( "dotenv" ).config();

//imports keys.js file and stores it as a variable;
var keys = require( "./keys.js" );

//enables access to Spotify keys;
var spotify = new Spotify( keys.spotify );

//assigns the user's input and searh process to global variables;
    var SearchProcess = process.argv[2];
    var UserInput;
    // we need to loop through the node array for all the words of the artist's name;
    for (var i = 3; i < process.argv.length; i++) {
        if (i > 3 && i < process.argv.length) {
        UserInput = UserInput + "%20" + process.argv[i];
        } else {
            UserInput = process.argv[i];
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

//now we define each function;

function searchConcert () {
  
    //we create variable to hold the bands in town URL then run an axios request to Bands in Town API, then print the required details;
    var bandsURL = "https://rest.bandsintown.com/artists/" + UserInput + "/events?app_id=codingbootcamp";

    axios.get( bandsURL ).then( function ( response ) {
       console.log( response );
        // console.log( "Venue: " + response.venue)
    })


};


// function searchMovie () {
//     // we run axios request 
// }