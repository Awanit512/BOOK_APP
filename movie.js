 var mongoose = require("mongoose");

 // 
mongoose.set('useNewUrlParser',true);
mongoose.set('useUnifiedTopology',true);
mongoose.connect("mongodb://localhost/movie_DB");
var movieschema = mongoose.Schema(
						{
							title:String,
							year :Number,
							time:Number,
							language:String,rating:Number

						});
var movie = mongoose.model("movie",movieschema);

// var x = new movie({
// 	title:"X-Men",
// 	year :2005,
// 		time:154,
// 	language:"English"					
// });

// x.save(function(err,movie)
// {
// if(err)
// 	console.log("ERROR SOMETHING WENT WRONG");
// else{
// console.log("movie from db ",movie);
// console.log("\n\n");
// console.log("movie created in our js file == movie ==",x);
// }
// });

movie.create({
	title:"h-Men",
	year :2015,
		time:114,
	language:"JAPANESE",
	rating:8.2	
},function(err,movie)
{
if(err)
	console.log("ERROR SOMETHING WENT WRONG");
else
console.log("movie from db ",movie);


});
