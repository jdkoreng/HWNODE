require("dotenv").config();
var keys = require("./keys.js");
var request = require('request');
var omdb = require('omdb');
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');


class TwitterObject {
    constructor(keys) {
        this.keys = keys;
        
    }
        getLastTweets() {


            }

        };


        class SpotifyObject {
            constructor(keys) {
                this.keys = keys;
                
                
            }
                getSongData() {

                    console.log('getting song data now');
        
                    spotify.search({ type: 'track', query: SongOrMovieName }, function(err, data) {
                        if (err) {
                          return console.log('Error occurred: ' + err);
                        }
                       
                      console.log(data); 
                      });
                    }
        
                      noSongProvided() {
                  
                         
                          }

                };





                class IMDB {
                    constructor() {
                        
                        
                        
                    }
                        getMovieData() {


                            console.log('getting movie data now');


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
                                // Saw II (2005) 
                                // Saw III (2006) 
                                // Saw IV (2007) 
                                // ... 
                            });

                            
                
                
                            }
                
                              noMovieProvided() {
                          
                                 
                                  }
        
                        };




















// Hold the value for the type of request, (my-tweets, spotify, movie, dowhatissays)
var requestType = process.argv[2];

// The name of the song or movie they are requesting
var SongOrMovieName = process.argv[3];



var spotify = new SpotifyObject(keys.spotify);
var client = new TwitterObject(keys.twitter);
var movie1 = new IMDB();



// determines the request type and executes the appropriate functions
if (requestType === "my-tweets") {
    console.log('Showing your last 20 tweets');
  
} else if (requestType === "spotify-this-song") {
    console.log('Showing song info for: ' + SongOrMovieName);
    spotify.getSongData();
    // if (SongOrMovieName === '') {
    //     spotify.noSongProvided();
    // }
    
} else if (requestType === "movie-this") {
    console.log('Showing movie info for: ' + SongOrMovieName);
    movie1.getMovieData();
    //     if (SongOrMovieName === '') {
    //     movie1.noMovieProvided();
    // } 
   
} else if (requestType === "do-what-it-says") {
    console.log('doing what it says');
    
} 












