
//TODO
// posting users doesnt send full model
// use client side router to change state of application

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , _ = require('underscore')
  , http = require('http')
  , path = require('path');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

// get main page
app.get('/', routes.index);

// routes for handling model interaction
app.get('/users', user.list);
app.delete('/users/:id', user.delete);
app.put('/users/:id', user.create);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
