 var mongoose=require('mongoose');

var photos=require('./photosobj');

function getAll(req,res)
{
	mongoose.connect('mongodb://rvsingh:3112@ds137100.mlab.com:37100/photos');
		var db = mongoose.connection;
			db.on('error', console.error.bind(console, 'connection error:'));
			db.once('open', function() {
				console.log("connected..");
		});
	
			photos.find({},function(err,doc){
				if(err)
				{
					res.send("ERROR");
				}
				else
				{
					res.send(doc);
				}
			});
}

module.exports=getAll;