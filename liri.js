//grabs the axios package;
var axios = require( "axios" );

//reading and setting variables with the dotenv package;
require( "dotenv" ).config();

// for the moment.js
var moment = require("moment");

//imports keys.js file and stores it as a variable;
var keys = require( "./keys.js" );

//enables access to Spotify keys;
var Spotify = require( 'node-spotify-api' );
var spotify = new Spotify( keys.spotify );

//includes the FS package for reading outside random text file;
var fs = require ("fs");

//assigns the user's input and searh process to global variables;
var Process = process.argv[2];
var userInput;

// we need to loop through the node array for all the words of the user's input;
for (var i = 3; i < process.argv.length; i++) {
    if (i > 3 && i < process.argv.length) {
    userInput = userInput + "+" + process.argv[i];
    } else {
        userInput = process.argv[i];
    }
}

//this creates a switch case statement depending on what the user searches for;
// we also assign which function to run depending on the process;
//function searchProcess (SearchProcess) {
function switchProcess (userProcess) {
    switch (userProcess) {
        case "concert-this": searchConcert();
            break;
        
        case "spotify-this-song": searchSong();
            break;

        case "movie-this": searchMovie();
            break;
    
        case "do-what-it-says": runRandom();
            break;
    }
}

// then we execute the switchProcess function;
runRandom(Process);


//---------      now we define each function;     ---------------;


function searchConcert () {
  
    //we create variable to hold the bands in town URL then run an axios request to Bands in Town API, then print the required details;
    var bandsURL = "https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp";
    
    axios.get( bandsURL ).then( function ( response ) {
        
        // we create a for loop so that every concert of the artist stored in the array of data is displayed;
        for (i = 0; i < response.data.length; i++){
            console.log( "\nVenue: " + response.data[i].venue.name + 
                "\nLocation: " + response.data[i].venue.city + ", " + response.data[i].venue.country +
                "\nDate: " + moment( response.data[i].datetime ).format( "MM/DD/YYYY" ));
        }
    });
};


function searchMovie () {
    
    // we  create variable for movie url then run axios request ;
    var movieURL = "http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=trilogy";

    axios.get( movieURL ).then( function ( response ) {
        //console.log(response.data)
        console.log( "\nTitle: " + response.data.Title + 
        "\nYear: " + response.data.Year + 
        "\nCountry: " + response.data.Country +
        "\nLanguage: " + response.data.Language +
        "\nPlot: " + response.data.Plot +
        "\nCast: " + response.data.Actors +
        "\nRatings: ");
        console.log(response.data.Ratings[0]);
        console.log(response.data.Ratings[1]);
    });

    if (userInput == null) {
        userInput = "Mr. Nobody";
    }

};


function searchSong () {
    spotify
        .search({ type: 'track', query: userInput })
            //album OR track OR album;
        .then( function( response ) {
             //console.log(response); 
            console.log( "\nArtist: " + response.tracks.items[0].artists[0].name + 
                        "\nTitle: " + response.tracks.items[0].name + 
                        "\nAlbum: " + response.tracks.items[0].album.name + 
                        "\nPreview Link: " + response.tracks.items[0].preview_url);
        })
        .catch(function( err ) {
            console.log( err );
            if ( userInput == null ) {
                userInput = "The Sign";
              } 
        });
       
};




function runRandom () {

//we run the readFile to access random.txt and store the output to "data";
    fs.readFile( "random.txt", "utf8", function ( data ) {
        var output = data.split(",");
      //  console.log(output);
    //we loop through the created array
    //for (var i = 0; i < output.length; i++) {
        //we assign the objects inside the output array as the search process and the user input;
        var Process = output[0];
        var userInput = output[1];
    });

         //then check what to execute depending on the data written in random.txt; 
        //  if (SearchProcess == "concert-this") {
        //     searchConcert(); 
        // } else if (SearchProcess == "spotify-this-song") {
        //     searchSong();
        // } else if (SearchProcess == "movie-this") {
        //     searchMovie();
        // } else if (SearchProcess == "do-what-it-says") {
        //     runRandom();
        // }
     
    //then we call the function which goes through the switch statements, with the random output data to be used for the switch statement;
   // switchProcess( Process );
    
};
