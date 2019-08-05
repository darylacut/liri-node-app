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

 //assigns the user's input and searh process to variables;
 var userProcess = process.argv[2];
 var userInput;

 // we need to loop through the node array for all the words of the user's input;
 for (var i = 3; i < process.argv.length; i++) {
     if (i > 3 && i < process.argv.length) {
     userInput = userInput + "+" + process.argv[i];
     } else {
         userInput = process.argv[i];
     }
 }

//this declares a function with a switch case statement inside;
function switchProcess () {
    // var userInput = userInput;
    //this creates a switch case statement depending on what the user searches for;
// we also assign which function to run depending on the process;
    switch (userProcess) {
        case "concert-this": searchConcert(userInput);
            break;
        
        case "spotify-this-song": searchSong(userInput);
            break;

        case "movie-this": searchMovie(userInput);
            break;
    
        case "do-what-it-says": runRandom();
            break;
    }
}

// then we execute the switchProcess function;
switchProcess();


//---------      now we define each function;     ---------------;


function searchConcert (userInput) {
    console.log ("\nHere are the scheduled concerts for: " + userInput);
    //we create variable to hold the bands in town URL then run an axios request to Bands in Town API, then print the required details;
    var bandsURL = "https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp";
    
    axios.get( bandsURL ).then( function ( response ) {
        // we create a for loop so that every concert of the artist stored in the array of data is displayed;
        for (i = 0; i < response.data.length; i++){
            console.log( "\nConcert "+ i + 
                "\nVenue: " + response.data[i].venue.name + 
                "\nLocation: " + response.data[i].venue.city + ", " + response.data[i].venue.country +
                "\nDate: " + moment( response.data[i].datetime ).format( "MM/DD/YYYY" ));
        }
    });
};


function searchMovie (userInput) {

    if (userInput == null || userInput == "" || userInput == 0) {
        userInput = "Mr. Nobody";
    }
    console.log ("\nHere is the information for the movie: " + userInput);
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

};


function searchSong (userInput) {
    if (userInput == null || userInput == "" || userInput == 0) {
        userInput = "The Sign - Ace of Base";
    }

    console.log ("\nHere is the information for the song: " + userInput);
    spotify
        .search({ type: 'track', query: userInput })
            //album OR track OR album;
        .then( function( response ) {
             //console.log(response); 
            console.log("\nArtist: " + response.tracks.items[0].artists[0].name + 
                        "\nTitle: " + response.tracks.items[0].name + 
                        "\nAlbum: " + response.tracks.items[0].album.name + 
                        "\nPreview Link: " + response.tracks.items[0].preview_url);
        })
        .catch(function( err ) {
            console.log( err );
        });
    
};


function runRandom () {

//we run the readFile to access random.txt and store the output to "data";
    fs.readFile( "random.txt", "utf8", function ( error, data ) {
       
       //if code had errors, make it will log the error;
       if (error) {
           return console.log ( error );
       }

       //now we will print the contents of the data
        console.log( data );
  
        //now we split the data and and store it into a variable "output";
        var output = data.split( "," );

        // now we log the output to the console;
        console.log( output );

        //we assign the objects inside the output array as the search process and the user input;
        var userProcess = output[0];
        var userInput = output[1];
      
        // //then we call the function which goes through the switch statements, with the random output data to be used for the switch statement;
        // switchProcess(userInput);    

         // then check what to execute depending on the data written in random.txt; 
         if (userProcess == "concert-this") {
            searchConcert(userInput.slice(1, -1)); 
        } else if (userProcess == "spotify-this-song") {
            searchSong(userInput.slice(1, -1));
        } else if (userProcess == "movie-this") {
            searchMovie(userInput.slice(1, -1));
        } 
    });

};