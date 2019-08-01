//grabs the axios package
var axios = require( "axios" );

//reading and setting variables with the dotenv package;
require( "dotenv" ).config();

//imports keys.js file and stores it as a variable;
var keys = require( "./keys.js" );

//enables access to Spotify keys
var spotify = new Spotify( keys.spotify );

//assigns the user's input and searh process to global variables
    //var UserInput = process.argv[3];
    //var SearchProcess = process.argv[2];

//this creates a switch case statement depending on what the user searches for
// we also assign which function to run depending on the process
switch (process.argv[2]) {
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

searchConcert () {

}