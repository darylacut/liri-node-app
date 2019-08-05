# liri-node-app


This is a project that creates LIRI. LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a _Language_ Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives data back to the user. This app can be used to easily search information about upcoming concerts of artists, songs, and movies.

First, open your terminal / bash window.

LIRI can take in one of the following commands:

   * concert-this
   * spotify-this-song
   * movie-this
   * do-what-it-says
   
   
1. Entering this in the command line: 

node liri.js concert-this <artist/band name here>

will search the Bands in Town Artist Events API for an artist and render the following information about each event to the terminal:

     * Name of the venue
     * Venue location
     * Date of the Event (using moment to format it as: "MM/DD/YYYY")
     
     
2. Entering this in the command line: 

node liri.js spotify-this-song <song name here>
  
will show the following information about the song in your terminal/bash window

     * Artist(s)
     * The song's name
     * A preview link of the song from Spotify
     * The album that the song is from

If no song is provided then the program will default to "The Sign" by Ace of Base. The [node-spotify-api](https://www.npmjs.com/package/node-spotify-api) package is utilized in order to retrieve song information from the Spotify API.

3. Entering this in the command line:

node liri.js movie-this <movie name here>

will output the following information to your terminal/bash window:

       * Title of the movie.
       * Year the movie came out.
       * IMDB Rating of the movie.
       * Rotten Tomatoes Rating of the movie.
       * Country where the movie was produced.
       * Language of the movie.
       * Plot of the movie.
       * Actors in the movie.

If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.' The `axios` package is used to retrieve data from the OMDB API.

4. Entering this in the command line: 

node liri.js do-what-it-says

will take the text inside of random.txt and then use it to call one of LIRI's commands, depending on what is written in the random.txt file. The `fs` Node package is used to read the contents of the random.txt file.


This is a project developed by me as a required homework.


See it in action here: https://github.com/darylacut/liri-node-app/blob/master/liri-node-app.gif
