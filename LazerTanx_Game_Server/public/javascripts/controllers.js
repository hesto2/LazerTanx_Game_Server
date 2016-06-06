// var app = angular.module('lazerTanx');

app.controller('homeCtrl', ['$scope','$location','userService',function($scope,$location,userService) {
  $scope.submitForm = function(){
      if(!$scope.userForm.$valid)return;
      userService.setIpAddress($scope.ipAddress)
      userService.setUsername($scope.username)
      $location.path('/game')
  }

}]);

app.controller('gameCtrl', ['$scope','$location','userService','$interval','socketService','$window','gameService',function($scope,$location,userService,$interval,socketService,$window,gameService) {
    if(userService.getIpAddress() === null || userService.getUsername() === null){
        $location.path('/home')
    }
    console.log(1);
    socketService.connect()
    var baseUrl = 'http://'+userService.getIpAddress()+':12345/html/cam_pic.php?time='
    $scope.feedUrl = ''

    var reloadImage =  function(){
        var currentTime = new Date().getTime()
        $scope.feedUrl = baseUrl+currentTime
    }

    $interval(reloadImage,100)

    // Socket commands for game
    var K_w=87
    var K_s=83
    var K_a=65
    var K_d=68
    var K_q=81
    var K_e=69
    var K_space=32
    var keys = [K_w,K_s,K_a,K_d,K_space,K_q,K_e]
    var downKeys = []

    $scope.player = null
    angular.element($window).on('keydown', function(event) {
        var keycode = event.charCode || event.keyCode;
        if(keys.indexOf(keycode) >= 0 && downKeys.indexOf(keycode) == -1){
            console.log(keycode);
            sendKeyDown(keycode)
            downKeys.push(keycode)
            console.log(downKeys);
        }
    });
    angular.element($window).on('keyup', function(event) {
        var keycode = event.charCode || event.keyCode;
        console.log(keycode);
        if(keys.indexOf(keycode) >= 0){
            var index = downKeys.indexOf(keycode);
            downKeys.splice(index,1)
            sendKeyUp(keycode)
        }
    });

    function sendKeyDown(keycode){
        socketService.emit('keyDown',keycode)
    }

    function sendKeyUp(keycode){
        socketService.emit('keyUp',keycode)
    }

    $scope.$on('socket:initRequest',function(request,id){
        userService.setSocketId(id)
        var player = {
            'username':userService.getUsername(),
            'tankIp':userService.getIpAddress()
        }

        socketService.emit('initResponse',player)
        player.id = id

        $scope.player = player
    })

    $scope.$on('socket:initPlayers',function(request,players){
        gameService.init(players)
    })

    $scope.$on('socket:playerConnected',function(request,player){
        console.log(13);
        gameService.playerConnected(player)
    })

    $scope.$on('socket:playerDisconnected',function(request,id){
        gameService.playerDisconnected(id)
    })

    $scope.$on('game:playersUpdated',function(request,players){

        $scope.players = players
    })

    $scope.$on('$locationChangeStart', function( event ) {
        angular.element($window).unbind('keydown')
        angular.element($window).unbind('keyup')
        socketService.disconnect()
        console.log('disconnected');
    });
}]);
