var name = "";
var socket = io();
$('form').submit(function(){
    var m = $('#talk').val();
    if (m !== '' && m !== undefined) {
        socket.emit('message', {name:name, msg:m});
        $('#messages').append(
            $('<div class="frame-right">').append(
                $('<div class="me">').text(m)
            )
        );
        $('#talk').val('');
        bottom();
    }
    return false;
});

function bottom() {
    var d = document.getElementById('messages');
    d.scrollTop = d.scrollHeight;
}

socket.on('name', function(msg){
    name = msg;
    $('#name').val(msg);
    bottom();
});

socket.on('info', function(msg){
    $('#messages').append(
        $('<div class="info">').text(msg)
    );
    bottom();
});

socket.on('message', function(msg){
    $('#messages').append(
        $('<div class="frame-left">').append(
            $('<div class="text">').text(msg)
        )
    );
    bottom();
});

socket.on('bot', function(msg){
    $('#messages').append(
        $('<div class="frame-left">').append(
            $('<div class="text">').text(msg)
        )
    );
    bottom();
});
