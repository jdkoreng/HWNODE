require("dotenv").config();
var keys = require("./keys.js");
var request = require('request');
var omdb = require('omdb');
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var spotify = new Spotify(keys.spotify);
// Hold the value for the type of request, (my-tweets, spotify, movie, dowhatissays)
var requestType = process.argv[2];
// The name of the song or movie they are requesting
//var SongOrMovieName = process.argv[3];
 var client = new Twitter(keys.twitter);

 // Store all of the arguments in an array
var nodeArgs = process.argv;

// Create an empty variable for holding the movie name
var SongOrMovieName = "";

// Loop through all the words in the node argument
// And do a little for-loop magic to handle the inclusion of "+"s
for (var i = 2; i < nodeArgs.length; i++) {

  if (i > 2 && i < nodeArgs.length) {

    SongOrMovieName = SongOrMovieName + "+" + nodeArgs[i];

  }

  else {

    SongOrMovieName += nodeArgs[i];

  }
}








function getLatestTweets() {
    var params = {screen_name: 'bikerightback', count: 20};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    console.log(tweets);
  }
});

}



               function getSongData() {

                    console.log('getting song data now');
        
                    spotify.search({ type: 'track', query: SongOrMovieName }, function(err, data) {
                        if (err) {
                          return console.log('Error occurred: ' + err);
                        }
                       
                      console.log(data); 
                      });
                    }



                    function noSongProvided() {
                        console.log('no song provided so going random');
        
                        spotify.search({ type: 'track', query: 'The Sign' }, function(err, data) {
                            if (err) {
                              return console.log('Error occurred: ' + err);
                            }
                           
                          console.log(data); 
                          });


                        }
        






                        function getMovieData() {
                            omdb.get(SongOrMovieName, true, function(err, movie) {
                                if(err) {
                                    return console.error(err);
                                }
                             
                                if(!movie) {
                                    return console.log('Movie not found!');
                                }
                             
                                console.log('%s (%d) %d/10', movie.title, movie.year, movie.imdb.rating);
                                console.log(movie.plot);
                             

                            });
                        }



                        function noMovieProvided() {
                            omdb.get('Mr. Nobody', true, function(err, movie) {
                                if(err) {
                                    return console.error(err);
                                }
                             
                                if(!movie) {
                                    return console.log('Movie not found!');
                                }
                             
                                console.log('%s (%d) %d/10', movie.title, movie.year, movie.imdb.rating);
                                console.log(movie.plot);
                             

                            });
                        }



                       
function doWhatItSays() {
    fs.readFile("log.txt", "utf8", function (error, data) {

        //need to read the command part and what they want to query as seperate vars
        //then I need to store those to argv2 and 3
        // then It should function

        //requestType = ;
        //SongOrMovieName = ;



        // If the code experiences any errors it will log the error to the console.
        if (error) {
            return console.log(error);
        }
        // We will then print the contents of data
        console.log(data);

      });
}























// determines the request type and executes the appropriate functions
if (requestType === "my-tweets") {
    console.log('Showing your last 20 tweets');
    getLatestTweets();
  
} else if (requestType === "spotify-this-song") {
    console.log('Showing song info for: ' + SongOrMovieName);
    getSongData();
     if (SongOrMovieName === '') {
         noSongProvided();
     }
    
} else if (requestType === "movie-this") {
    console.log('Showing movie info for: ' + SongOrMovieName);
    getMovieData();
         if (SongOrMovieName === '') {
         noMovieProvided();
     } 
   
} else if (requestType === "do-what-it-says") {
    console.log('doing what it says');
    
} 












