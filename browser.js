var PouchDb = require('pouchdb');
var db = new PouchDb('mike_demo');

var answer = window.prompt('what do you want to say?');
window.alert('YOU SAID: ' + answer);

db.put({_id: Date.now().toString(), message: answer})
	.then(function(){
		db.replicate.to('http://104.236.9.143:5984/mike_demo', {live: false})
			.on('complete', function(){
				console.log('sync successful!');
			})
			.on('error', function(err){
				console.error('errror: ' + err.message);
				console.error(err);
			});
	});
