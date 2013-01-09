
/*
 * GET users listing.
 */

var numUsers = 1;

exports.list = function(req, res){
  //get a random list of users
  var users = [];
  for (var i=0;i<numUsers ;++i){
    users.push({id:i});
  }
  numUsers += 1;
  res.send(users);
};

exports.delete = function(req, res){
  res.send('OK');
}
