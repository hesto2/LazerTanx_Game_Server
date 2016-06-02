// Server side code for socket events
module.exports = function(io){
    io.on('connection',function(socket){
        socket.on("TEST",function(test){
            console.log(test);
        })
    })
}
