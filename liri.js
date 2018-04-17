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

// // Create an empty variable for holding the movie name
 var SongOrMovieName = "";

// // Loop through all the words in the node argument
// // And do a little for-loop magic to handle the inclusion of "+"s
 for (var i = 3; i < nodeArgs.length; i++) {

   if (i > 3 && i < nodeArgs.length) {

     SongOrMovieName = SongOrMovieName + "+" + nodeArgs[i];

   }

   else {

     SongOrMovieName += nodeArgs[i];

   }
 }

 var queryUrl = "http://www.omdbapi.com/?t=" + SongOrMovieName + "&y=&plot=short&apikey=trilogy&tomatoes=true";
 var queryUrlRandom = "http://www.omdbapi.com/?t=" + 'Mr.Nobody' + "&y=&plot=short&apikey=trilogy&tomatoes=trues";








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
                            request(queryUrl, function(error, response, body) {

                                // If the request is successful
                                if (!error && response.statusCode === 200) {
                              
                                  // Parse the body of the site and recover just the imdbRating
                                  // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
                                  console.log("Release Year: " + JSON.parse(body).Year);
                                  console.log("Plot: " + JSON.parse(body).Plot);
                                  console.log("Cast: " + JSON.parse(body).Actors);
                                  console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
                                  console.log("Tomato Rating: " + JSON.parse(body).tomatoRating);


                                  
                                }
                              });
                              
                        }



                        function noMovieProvided() {
                            request(queryUrlRandom, function(error, response, body) {

                                // If the request is successful
                                if (!error && response.statusCode === 200) {
                              
                                  // Parse the body of the site and recover just the imdbRating
                                  // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
                                  
                                  console.log("Release Year: " + JSON.parse(body).Year);
                                  console.log("Plot: " + JSON.parse(body).Plot);
                                 
                                }
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
    
     if (SongOrMovieName === '') {
         noSongProvided();
     } else getSongData();
    
} else if (requestType === "movie-this") {
    console.log('Showing movie info for: ' + SongOrMovieName);
         if (SongOrMovieName === '') {
         noMovieProvided();
     } else getMovieData();
   
} else if (requestType === "do-what-it-says") {
    console.log('doing what it says');
    
} 












