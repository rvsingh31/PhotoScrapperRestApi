var mongoose=require('mongoose');

var photos=require('./photosobj');

function store(data)
{
	mongoose.connect('mongodb://rvsingh:3112@ds137100.mlab.com:37100/photos');
		var db = mongoose.connection;
			db.on('error', console.error.bind(console, 'connection error:'));
			db.once('open', function() {
				console.log("connected..");
		});
		
		var d_sent={
			img:'',
			date:'',
			title:'',
			author:''
		};
		
		var incoming_data=JSON.parse(data);
			
		d_sent.img=incoming_data.img;
		d_sent.date=incoming_data.date;
		d_sent.title=incoming_data.title;
		d_sent.author=incoming_data.auth;

		var new_reg=photos(d_sent);
		
		new_reg.save(function (err) {
			if (err) {console.error(err);}
			else{console.log("stored...");}
		});
		mongoose.connection.close();
		
}

module.exports=store;