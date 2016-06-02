// Server side code for socket events
module.exports = function(io){
    sockets = []
    var K_w=87
    var K_s=83
    var K_a=65
    var K_d=68
    var K_q=81
    var K_e=69
    var K_space=32

    var keys = [K_w,K_s,K_a,K_d,K_space,K_q,K_e]
    io.on('connection',function(socket){
        sockets.push(socket)
        socket.on("TEST",function(test){
            console.log(test);
        })
        socket.on("keyDown",function(key){
            console.log(key + ' down');
        })
        socket.on("keyUp",function(key){
            console.log(key + ' up');
        })
    })
}
