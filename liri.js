//reading and setting variables with the dotenv package;
require( "dotenv" ).config();

//imports keys.js file and stores it as a variable;
var keys = require( "./keys.js" );

//enables access to Spotify keys
var spotify = new Spotify( keys.spotify );

//assigns the user's input and searh process to global variables
    //var UserInput = process.argv[3];
    //var SearchProcess = process.argv[2];

switch (process.argv[2]) {
    case "concert-this"
}