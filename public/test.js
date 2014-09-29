var fingerprint = new Fingerprint({screen_resolution: true}).get();
var socket = io();
socket.emit('fingerprint', fingerprint)
socket.on('info', function(info){
    var name = info.split(',')[0]
    var count = info.split(',')[1]
    document.write("this browser's name is " + name + " and it's viewed the server " + count + " times");
});
