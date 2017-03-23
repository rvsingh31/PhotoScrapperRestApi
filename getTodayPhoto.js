var mongoose=require('mongoose');

var photos=require('./photosobj');

function get(req,res)
{
	mongoose.connect('mongodb://rvsingh:3112@ds137100.mlab.com:37100/photos');
		var db = mongoose.connection;
			db.on('error', console.error.bind(console, 'connection error:'));
			db.once('open', function() {
				console.log("connected..");
		});
	
				var today = new Date();
				var dd = today.getDate();
				var mm = today.getMonth()+1; //January is 0!

				var yyyy = today.getFullYear();
				if(dd<10){
					dd='0'+dd;
				} 
				if(mm<10){
					mm='0'+mm;
				} 
				var today = dd+'-'+mm+'-'+yyyy;
			
			photos.findOne({date:today},function(err,doc){
				if(err)
				{
					res.send("ERROR");
				}
				else
				{
					res.send(doc.img);
				}
			});
}

module.exports=get;