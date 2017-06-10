var express = require('express');
var compression = require('compression');
var PORT = 9004;

var http = express();
http.use(compression());

http.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/html/index2.html');
});

http.use(express.static(__dirname + '/public'));

http.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('You broke it!');
});

http.listen(PORT);
console.log('Tetons server listening on port: ' + PORT);
