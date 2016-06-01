app.factory('userService',['$http','$window',function($http,$window){
    localStorage_username = 'lazerTanx_username'
    localStorage_ipAddress = 'lazerTanx_ipAddress'

    var user = {
        username: null,
        ipAddress:null
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
    return user
}])
