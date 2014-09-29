var express = require('express');
var fs = require('fs');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var first_names = []
var last_names = []
var count = {}
fs.readFile('last_names.txt', {encoding: 'utf-8'}, function(err, data){
    last_names = data.split('\n');
    last_names = last_names.slice(0, last_names.length - 1)
    last_names = last_names.map(function(element){
        return element.split(' ')[0]
    })
})
fs.readFile('first_names.txt', {encoding: 'utf-8'}, function(err, data){
    first_names = data.split('\n');
    first_names = first_names.slice(0, first_names.length - 1)
    first_names = first_names.map(function(element){
        return element.split(' ')[0]
    })
})


app.use(express.static(__dirname + '/public'));


io.on('connection', function(socket){
    socket.on('fingerprint', function(fingerprint){
        if(count[fingerprint]){count[fingerprint] += 1}else{count[fingerprint] = 1}
        var name = first_names[fingerprint % first_names.length] + ' ' + last_names[fingerprint % last_names.length]
        console.log(name + " view count: " + count[fingerprint])
        socket.emit('info', name + ',' + count[fingerprint]);
    });

});


http.listen(3000);
