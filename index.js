/*var express = require('express');
var app = express();
var url = require('url');
var request = require('request');

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('port', (process.env.PORT || 9001));

app.get('/', function(req, res){
  res.send('It works!');
});

app.post('/post', function(req, res){
  var temp = ["I am asleep", "perhaps I am awake", "I'm so cute!", "I'm hungry"];
  var body = {
    response_type: "in_channel",
    text: temp[Math.floor((Math.random() * 4) + 1)]
  };

  res.send(body);
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
*/

var express = require('express');
var app = express();
var url = require('url');
var fs = require('fs');
var request = require('request');
var mongodb = require('mongodb');
var assert = require('assert');

// var quotelist;
// try {
//   quotelist = JSON.parse(fs.readFileSync('quotelist.json').toString());
// }
// catch (e) {
//   quotelist = [];
//   fs.writeFile('quotelist.json', '[]');
// }

var mongoose = require('mongoose');
mongoose.connect('mongodb://elphaba:elphaba@ds047802.mlab.com:47802/quotelist');

var db = mongoose.connection;

var quoteschema = mongoose.Schema({
    name      : String,
    quote     : String
});

var Quote = mongoose.model('quotes', quoteschema);

var testpotato = new Quote({ name: 'potato', quote: 'I am an egg'});
console.log(testpotato.name);
// save potato to database
testpotato.save(function(err, testpotato) {
  if (err) return console.error(err);
});
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('port', (process.env.PORT || 9001));

app.get('/', function(req, res){
  res.send('It works!');
});

app.post('/post', function(req, res){
  var command = req.body.text;
  
  if (command.match(/^add/) != null) {
    var name = command.split(' ')[1].toLowerCase();
    var quote = command.split(' ').slice(2).join(' ');
    // quotelist.push({
    //   'name': name,
    //   'quote': quote
    // });
    // fs.writeFile('quotelist.json', JSON.stringify(quotelist));
    /*
    mongodb.MongoClient.connect(url, function(err, db) {
      assert.equal(null, err);
      console.log("Connected correctly to server.");
      db.collection('quotes').insertOne( {
          'name': name,
          'quote': quote
        });
      db.close();
    });
    */
    var body = {
      response_type: "in_channel",
      text: '"' + quote.replace(/^\"/, '').replace(/\"$/, '') + '" -' + name[0].toUpperCase() + name.slice(1).toLowerCase()
    };
    res.send(body);
  }
  else {
    var name = command.toLowerCase();
    // var quotes = quotelist.filter(function(x) { return (x.name == name); });
    
    mongodb.MongoClient.connect(url, function(err, db) {
      assert.equal(null, err);
      console.log("Connected correctly to server.");
      quotes = db.collection('quotes').find({
          'name': name,
        });
        
        if (quotes.length == 0) {
      var body = {
        response_type: "in_channel",
        text: name + " has no quotes!"
      };
      res.send(body);
    
    }
    else {
      var body = {
        response_type: "in_channel",
        text: '"' + quotes[Math.floor(Math.random() * quotes.length)].quote.replace(/^\"/, '').replace(/\"$/, '') + '" -' + name[0].toUpperCase() + name.slice(1).toLowerCase()
      };
      res.send(body);
    }
      
      db.close();
    });
    
    // console.log('Looking up for', name, command, quotelist, quotes);
    
    // if (quotes.length == 0) {
    //   var body = {
    //     response_type: "in_channel",
    //     text: name + " has no quotes!"
    //   };
    //   res.send(body);
    
    // }
    // else {
    //   var body = {
    //     response_type: "in_channel",
    //     text: '"' + quotes[Math.floor(Math.random() * quotes.length)].quote.replace(/^\"/, '').replace(/\"$/, '') + '" -' + name[0].toUpperCase() + name.slice(1).toLowerCase()
    //   };
    //   res.send(body);
    // }
    }
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
