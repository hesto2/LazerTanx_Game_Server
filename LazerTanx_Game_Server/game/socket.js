var _ = require('underscore-node')
// Server side code for socket events
module.exports = function(io){
    clients = []
    var K_w=87
    var K_s=83
    var K_a=65
    var K_d=68
    var K_q=81
    var K_e=69
    var K_space=32
    var keys = [K_w,K_s,K_a,K_d,K_space,K_q,K_e]
    io.on('connection',function(socket){
        // Request the username and info for the socket
        console.log('connected');
        socket.emit('initRequest',socket.id)
        socket.emit('initPlayers',clients)

        socket.on('initResponse',function(msg){
            var client = {}
            client.username = msg.username
            client.tankIp = msg.tankIp
            client.id = socket.id
            client.tankSocket = require('socket.io-client')('http://'+client.tankIp+':12344');
            clients.push(client)
            msg = {
                username:client.username,
                tankIp:client.tankIp,
                id:client.id
            }
            io.sockets.emit('playerConnected',msg)
            console.log(clients.length)
        })
        socket.on("keyDown",function(key){
            console.log(key + ' down')
            // Send Key/client to keydown script
            var client = _.findWhere(clients,{id:socket.id})
            client.tankSocket.emit('keyDown',key)
        })
        socket.on("keyUp",function(key){
            console.log(key + ' up')
            // Send key/client to keyup script
            var client = _.findWhere(clients,{id:socket.id})
            client.tankSocket.emit('keyUp',key)
        })

        socket.on('disconnect', function() {
            var client = _.findWhere(clients,{id:socket.id})
            client.tankSocket.disconnect()
            clients = _.without(clients,_.findWhere(clients,{id:socket.id}))
            io.sockets.emit('playerDisconnected',socket.id)
            console.log('disconnected');
        });

    })
}
