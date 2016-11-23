var myApp = angular.module('myApp');
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
    console.log("Hello World from controller");


var refresh = function() {
  $http.get('/account').success(function(response) {
    console.log("I got the data I requested");
    $scope.account = response;
    $scope.acc = "";
  });
};

refresh();

$scope.addacc = function() {
  console.log($scope.acc);
  $http.post('/account', $scope.acc).success(function(response) {
    console.log(response);
    refresh();
  });
};

$scope.remove = function(id) {
  console.log(id);
  $http.delete('/account/' + id).success(function(response) {
    refresh();
  });
};

$scope.edit = function(id) {
  console.log(id);
  $http.get('/account/' + id).success(function(response) {
    $scope.acc = response;
  });
};  

$scope.update = function() {
  console.log($scope.acc._id);
  $http.put('/account/' + $scope.acc._id, $scope.acc).success(function(response) {
    refresh();
  })
};

$scope.deselect = function() {
  $scope.acc = "";
}

}]);﻿