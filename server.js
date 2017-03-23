var cp=require('child_process');
var express=require('express');
var request=require('request');
var cheerio=require('cheerio');
var app=express();
var download=require('./download');
var CronJob = require('cron').CronJob;
var storedata=require('./storedata');
var cors=require('cors');

app.get('/',function(req,res){
	res.send("Hi THERE!!");
});
app.use(cors());

new CronJob('00 15 17 * * *', function() {
	
	url="http://www.dailydigitalphoto.com/cgi-bin/potd/potd.pl";
	request(url,function(error,response,html){
			if(!error)
			{
		
				var $=cheerio.load(html);
				
				source=$(".single > .image > img").attr('src');
				var fileExt = source.split('.').pop();
				date=$(" .single > .details > .date ").text();
				title=$(" .single > .details >.title > h3 ").html();
				author=$(" .single > .details > .title > .author ").html();

				console.log("SOURCE: "+source+ ", date :"+date+ ", title : "+title+ " , author : "+author);
				now=new Date();
				d=now.getDay()+'-'+now.getMonth()+'-'+now.getFullYear();
			
			
				download(source, "images/"+d+"."+fileExt, function (state) {
					console.log("progress", state);
					}, function (response) {
						console.log("status code", response.statusCode);
					}, function (error) {
						console.log("error", error);
					}, function () {
						console.log("done");
						console.log(d);
						data_to_store={img:d+fileExt,date:d,title:title,auth:author};
						storedata(JSON.stringify(data_to_store));
					});
					
		
			}
			
		});

}, null, true, 'Asia/Kolkata');



app.listen(process.env.PORT  || 5000,function(){
	console.log("Server running...");
});

app.get('/',function(req,res){	
console.log("in");	
});


app.get('/scrape',function(req,res){
	
	url="http://www.dailydigitalphoto.com/cgi-bin/potd/potd.pl";
	request(url,function(error,response,html){
			if(!error)
			{
		
				var $=cheerio.load(html);
				
				source=$(".single > .image > img").attr('src');
				var fileExt = source.split('.').pop();
				date=$(" .single > .details > .date ").text();
				title=$(" .single > .details >.title > h3 ").html();
				author=$(" .single > .details > .title > .author ").html();

				console.log("SOURCE: "+source+ ", date :"+date+ ", title : "+title+ " , author : "+author);
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
				console.log(today);
			
				download(source, "images/"+today+"."+fileExt, function (state) {
					console.log("progress", state);
					}, function (response) {
						console.log("status code", response.statusCode);
					}, function (error) {
						console.log("error", error);
					}, function () {
						console.log("done");
						console.log("DATE: "+today);
						data_to_store={img:today+"."+fileExt,date:today,title:title,auth:author};
						storedata(JSON.stringify(data_to_store),req,res);
					});
			
			}
			
		});

	

})
