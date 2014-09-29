var fingerprint = new Fingerprint({screen_resolution: true}).get();
var socket = io();
socket.emit('fingerprint', fingerprint)
socket.on('info', function(info){
    var name = info.split(',')[0]
    var count = info.split(',')[1]
    var times_tense = ''
    if(Number(count) == 1){times_tense = " time."}else{times_tense = " times."}
    document.write("This browser's name is " + name + " and it's viewed the server " + count + times_tense);
});
