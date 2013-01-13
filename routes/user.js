var _ = require('underscore');

var users = [
  {id:1,name:"Heinrik Smörgas"},
  {id:2,name:"Annika Englund"},
  {id:3,name:"Dietrich Svelthem"}
];

exports.list = function(req, res){
  console.log(req.params);
  switch(req.params.format){
    case 'html': res.render('users',{users: users});
    case 'json':
    default: res.send(users);
  }
};

exports.delete = function(req, res){
  users = _.reject(users,function(u){return u.id == req.params.id-0;});
  switch(req.params.format){
    case 'html': res.render('users');
    case 'json':
    default: res.send({message: 'OK'});
  }
  res.send('OK');
};

exports.create = function(req, res){
  console.log(req.params);
  user = {id: req.params.id, name: req.params.name};
  users.push(user);
  switch(req.params.format){
    case 'html': res.render('users');
    case 'json':
    default: res.send(user);
  }
};
