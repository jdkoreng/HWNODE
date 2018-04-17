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
var SongOrMovieName = process.argv[3];
 var client = new Twitter(keys.twitter);


function getLatestTweets() {

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
                            omdb.search(SongOrMovieName, function(err, movies) {
                                if(err) {
                                    return console.error(err);
                                }
                             
                                if(movies.length < 1) {
                                    return console.log('No movies were found!');
                                }
                             
                                movies.forEach(function(movie) {
                                    console.log('%s (%d)', movie.title, movie.year);
                                });
                             
                                // Saw (2004)  
                            });
                        }



                        function noMovieProvided() {
                            omdb.search('Mr. Nobody', function(err, movies) {
                                if(err) {
                                    return console.error(err);
                                }
                             
                                if(movies.length < 1) {
                                    return console.log('No movies were found!');
                                }
                             
                                movies.forEach(function(movie) {
                                    console.log('%s (%d)', movie.title, movie.year);
                                });
                             
                                // Saw (2004)  
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












