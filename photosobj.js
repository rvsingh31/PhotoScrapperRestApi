var mongoose=require('mongoose');
var es6=require("es6-promise");
mongoose.Promise=es6.Promise;

	var new_table=mongoose.Schema({
		img:String,
		date:String,
		title:String,
		author:String
	});
	
module.exports= mongoose.model('photo_data',new_table);	
