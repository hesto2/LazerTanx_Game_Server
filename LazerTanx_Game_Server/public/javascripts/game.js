// Client side code for socket events
var socket = io.connect('http://localhost:3000');
console.log(socket)
console.log(123)
socket.emit('TEST', 'asdf');
