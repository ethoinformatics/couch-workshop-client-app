var PouchDb = require('pouchdb');
var db = new PouchDb('mike_demo');

var readline = require('readline-sync');
var answer = readline.question('what do you want to say?');

console.log('YOU SAID: ' + answer);

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
