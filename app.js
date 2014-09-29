var express = require('express');
var fs = require('fs');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var names = []
var count = {}
fs.readFile('names.txt', {encoding: 'utf-8'}, function(err, data){
    names = data.split('\n');
    names = names.slice(0, names.length - 1)
    names = names.map(function(element){
        return element.split(' ')[0]
    })
})


app.use(express.static(__dirname + '/public'));


io.on('connection', function(socket){
    socket.on('fingerprint', function(fingerprint){
        if(count[fingerprint]){count[fingerprint] += 1}else{count[fingerprint] = 1}
        socket.emit('info', names[fingerprint % names.length] + ',' + count[fingerprint]);
    });

});


http.listen(3000);
