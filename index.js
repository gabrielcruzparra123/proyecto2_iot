// Dependencias

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var redis = require("redis");

 


// Servicio GET (usando express)

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

// Al momento de existir conexión se ejecuta la función de callback
io.on('connection', function(socket){

        
/** io.emit('temperature',{value:'10'})
    io.emit('temperature',{value:'15'})
    io.emit('temperature',{value:'8'})
    
    io.emit('light',{value:'34'})
    io.emit('light',{value:'20'})
    io.emit('light',{value:'12'})
    
    io.emit('peso',{value:'23'})
    io.emit('peso',{value:'12'})
    io.emit('peso',{value:'15'})*/
    
    // Emite (publica) en el tópico 'stream' los datos que se publican en redis
        var sub = redis.createClient();
        
        sub.subscribe("temperature");
        sub.on("message", function (channel, message) {
               
                console.log('recepcion SocketIO -temperatura: ' + message);
                var jsonObj = JSON.parse(message);
                io.emit('temperature',{value:jsonObj["value"]});
                        // Executed after 200 milliseconds 
                
                
        });
        
        sub = redis.createClient();
        sub.subscribe("light");
        sub.on("message", function (channel, message) {
            
                console.log('recepcion SocketIO -luz: ' + message);
                var jsonObj = JSON.parse(message);
                io.emit('light',{value:jsonObj["value"]});
                       

        });

        sub = redis.createClient();
        sub.subscribe("weight");
        sub.on("message", function (channel, message) {
            
                console.log('recepcion SocketIO -peso: ' + message); 
                var jsonObj = JSON.parse(message);               
                io.emit('weight',{value:jsonObj["value"]});
                    
        });

        sub = redis.createClient();
        sub.subscribe("distance");
        sub.on("message", function (channel, message) {
            
                console.log('recepcion SocketIO -distancia: ' + message);
                var jsonObj = JSON.parse(message);                
                io.emit('distance',{value:jsonObj["value"]});
                    
        });
});

http.listen(3000, function(){
  console.log('Servidor en el puerto 3000');
});