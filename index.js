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

var quotelist;
try {
  quotelist = JSON.parse(fs.readFileSync('quotelist.json').toString());
}
catch (e) {
  quotelist = [];
  fs.writeFile('quotelist.json', '[]');
}

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
    quotelist.push({
      'name': name,
      'quote': quote
    });
    fs.writeFile('quotelist.json', JSON.stringify(quotelist));
    var body = {
      response_type: "in_channel",
      text: '"' + quote.replace(/^\"/, '').replace(/\"$/, '') + '" -' + name
    };
    res.send(body);
  }
  else {
    var name = command.toLowerCase();
    var quotes = quotelist.filter(function(x) { return (x.name == name); });
    
    console.log('Looking up for', name, command, quotelist, quotes);
    
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
    }
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
