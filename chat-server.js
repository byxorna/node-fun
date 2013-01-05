var net = require('net');
var _ = require('./lib/underscore.js');

var server = net.createServer();
var clients = [];
server.listen(9000);
console.log("Server started");

server.on('connection',function(client){
  var clientName = client.remoteAddress + ":" + client.remotePort;
  console.log("Connection from " + clientName);
  clients.push(client);
  client.write("Welcome to the chat " + clientName + "\n");
  client.write("There are " + (clients.length-1) + " other users connected\n");
  broadcast({client: client, controlMessage: true, message: clientName + " joined\n"});

  client.on('data', function(data){
    broadcast({client: client, message: data});
  });

  client.on('end', function(data){
    console.log(clientName + " disconnected");
    clients.splice(clients.indexOf(client),1);
    broadcast({message: clientName + " quit\n"});
  });
});


function broadcast(args){
  var deadClients = [];
  if (args.client)
    var fromName = args.client.remoteAddress + ":" + args.client.remotePort;
  _.each(clients, function(c){
    if (c !== args.client){
      if (c.writable)
        if (fromName)
          c.write(fromName + " says: " + args.message);
        else
          c.write(args.message);
      else {
        console.log("Unable to contact " + c.remoteAddress + ":" + c.remotePort);
        c.destroy();
        deadClients.push(c);
      }
    }
  });
  _.each(deadClients, function(deadClient){
    clients.splice(clients.indexOf(deadClient),1);
  });
}

