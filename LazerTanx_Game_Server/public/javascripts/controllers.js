var app = angular.module('lazerTanx');

app.controller('homeCtrl', ['$scope','$location','userService',function($scope,$location,userService) {
  $scope.submitForm = function(){
      if(!$scope.userForm.$valid)return;
      userService.setIpAddress($scope.ipAddress)
      userService.setUsername($scope.username)
      $location.path('/game')
  }

}]);

app.controller('gameCtrl', ['$scope','$location','userService','$interval',function($scope,$location,userService,$interval) {
    var baseUrl = 'http://10.0.0.23:12345/html/cam_pic.php?time='
    $scope.feedUrl = ''

    var reloadImage =  function(){
        var currentTime = new Date().getTime()
        $scope.feedUrl = baseUrl+currentTime
    }
    $interval(reloadImage,100)
}]);
