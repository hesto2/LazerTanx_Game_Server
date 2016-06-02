app.factory('userService',['$http','$window',function($http,$window){
    localStorage_username = 'lazerTanx_username'
    localStorage_ipAddress = 'lazerTanx_ipAddress'

    var user = {
        username: null,
        ipAddress:null,
        socketId:null
    }

    user.setUsername = function(username){
        $window.localStorage[localStorage_username] = username
    }

    user.getUsername = function(){
        return $window.localStorage[localStorage_username]
    }

    user.setIpAddress = function(ipAddress){
        $window.localStorage[localStorage_ipAddress] = ipAddress
    }

    user.getIpAddress = function(){
        return $window.localStorage[localStorage_ipAddress]
    }
    user.setSocketId = function(id){
        user.id = id
    }
    user.getSocketId = function(){
        return user.id
    }
    return user
}])

app.factory('socketService',function (socketFactory) {
    // var myIoSocket = io.connect('/some/path');

    var socket = socketFactory();
    socket.forward('initRequest')
    socket.forward('initPlayers')
    socket.forward('playerConnected')
    socket.forward('playerDisconnected')
    return socket;
});

app.factory('gameService',['$rootScope',function($rootScope){
    var game = {
        players:[]
    }
    game.init = function(players){
        game.players = []
        players.forEach(function(player){
            game.playerConnected(player);
        })
    }

    game.playerConnected = function(player){
        game.players.push(player)
        console.log('connected: ' +player.id);
        $rootScope.$broadcast('game:playersUpdated',game.players)
    }

    game.playerDisconnected = function(id){
        console.log('disconnected: ' + id);
        game.players = _.without(game.players,_.findWhere(game.players,{id:id}))
        $rootScope.$broadcast('game:playersUpdated',game.players)

    }

    game.getPlayers = function(){
        return game.players
    }

    game.getPlayerByUsername = function(searchName){
        players.forEach(function(player,index,ar){
            if(value.username === searchName){
                return player
            }
        })
        return null
    }

    game.getPlayerById = function(searchId){
        console.log('disconnected: ' + searchId);
        var targetPlayer = null
        game.players.forEach(function(player,index,ar){
            console.log(player.id);
            if(player.id == searchId){
                console.log('hit');
                targetPlayer =  player
            }
        })
        return targetPlayer
    }
    return game
}])
