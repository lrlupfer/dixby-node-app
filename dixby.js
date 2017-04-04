// global variables
var Twitter = require("twitter");
var spotify = require("spotify");
var request = require("request");
var fs = require("fs");
var keys = require("./keys.js");
var twitterObj = new Twitter({
	consumer_key: keys.twitterKeys.consumer_key,
	consumer_secret: keys.twitterKeys.consumer_secret,
	access_token_key: keys.twitterKeys.access_token_key,
	access_token_secret: keys.twitterKeys.access_token_secret
});

// function for pulling my tweets

function myTweets() {

	var parameters = {
		screen_name: "linds_lup", 
		count: 20
	};

	twitterObj.get("statuses/user_timeline", parameters, function(err, tweets, response) {

		if (err) {
			console.log("An error occurred: " + err);
			return;
		} else if (!err) {
			tweets.forEach(function(tweet) {
				console.log("Tweet: " + tweet.text + " --created at: " + tweet.created_at + "\n");
			});
		}
	});
}

// function for Spotify search

function searchSpotify(song) {

	var song = process.argv[3];

	spotify.search({
		type: "track",
		query: song
	},
	function(err, data) {
		if (err) {

			console.log("An error occurred: " + err);
			return;

		} else {

			var track = data.tracks.items[0];

			var logSpotify = "Artist: " + track.artists[0].name + "\nSong name: " + track.name + "\nPreview link: " + track.preview_url + "\nAlbum title: " + track.album.name;

			console.log(logSpotify);
		}
	});
}

// function for OMDB search

function searchOMDB(movie) {

	var movieName = process.argv[3];

	var searchReady = movieName.split(" ").join("+");

	request("http://www.omdbapi.com/?t=" + searchReady + "&y=&plot=full&tomatoes=true&r=json", function(err, response, body) {

		if (err) {
			console.log("An error occurred: " + err);
			return;
		} else if (!err && response.statusCode === 200) {
			var logOMDB = "Title: " + JSON.parse(body).Title +
		    "\nYear: " + JSON.parse(body).Year +
		    "\nIMDB Rating: " + JSON.parse(body).imdbRating +
		    "\nCountry: " + JSON.parse(body).Country +
		    "\nLanguage: " + JSON.parse(body).Language +
		    "\nPlot: " + JSON.parse(body).Plot +
		    "\nCast: " + JSON.parse(body).Actors +
		    "\nRotten Tomatoes Rating: " + JSON.parse(body).tomatoRating +
		    "\nRotten Tomatoes URL: " + JSON.parse(body).tomatoURL;

		  console.log(logOMDB);
		}
	})
}

// logging user input to log.txt
// I broke it :(

// Dixby's overall logic
function dixbyLogic() {

	var command = process.argv[2];

	if (command === "my-tweets") {
		myTweets();
		return;
	} else if (command === "spotify") {
	// console.log("test");
		searchSpotify();
		return;
	} else if (command === "movie") {
		searchOMDB();
		return;
	} 

}

dixbyLogic();





