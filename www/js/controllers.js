angular.module('starter.controllers')

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('ChartsCtrl', function($scope,$location,$state) {
  $scope.charts = [
    { title: '折线图(Broken Line)', id: 1 },
    { title: '曲线图(Curve Line)', id: 2 },
    { title: '柱状图(Bar)', id: 3 },
    { title: '雷达图(Radar)', id: 4 },
    { title: '极地区域图(Polar area)', id: 5 },
    { title: '饼图(Pie)', id: 6 },
    { title: '环形图(Doughnut)', id: 7 }
  ];

  $scope.showChart = function(chart) {
    //$location.path("chart/"+chart);
    //console.log(path);
  }
});
