var app = angular.module('lazerTanx',['ngRoute','btford.socket-io'])

app.config(['$routeProvider','$locationProvider',
    function($routeProvider,$locationProvider){
        $routeProvider.
            when('/home',{
                templateUrl: 'partials/home.html',
                controller: 'homeCtrl',
            }).
            when('/game',{
                templateUrl: 'partials/game.html',
                controller: 'gameCtrl',
            }).
            otherwise({
                redirectTo: '/home'
            })
        $locationProvider.html5Mode(true)
    }
])
app.run(['$http',function($http){
    console.log('initialized');
}])
