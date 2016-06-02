// // Client side code for socket events
// var socket = io.connect('http://localhost:3000');
// console.log(socket)
// console.log(123)
// socket.emit('TEST', 'asdf');
//
// var K_w=87
// var K_s=83
// var K_a=65
// var K_d=68
// var K_q=81
// var K_e=69
// var K_space=32
//
// var keys = [K_w,K_s,K_a,K_d,K_space,K_q,K_e]
// var downKeys = []
// document.body.onkeydown = function(event){
//     event = event || window.event;
//     var keycode = event.charCode || event.keyCode;
//     if(keys.indexOf(keycode) >= 0 && downKeys.indexOf(keycode) == -1){
//         console.log(keycode);
//         sendKeyDown(keycode)
//         downKeys.push(keycode)
//         console.log(downKeys);
//     }
// }
// document.body.onkeyup = function(event){
//     event = event || window.event;
//     var keycode = event.charCode || event.keyCode;
//     console.log(keycode);
//     if(keys.indexOf(keycode) >= 0){
//         var index = downKeys.indexOf(keycode);
//         downKeys.splice(index,1)
//         sendKeyUp(keycode)
//     }
// }
//
// function sendKeyDown(keycode){
//     socket.emit('keyDown',keycode)
// }
//
// function sendKeyUp(keycode){
//     socket.emit('keyUp',keycode)
// }
