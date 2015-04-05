// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('stockApp', ['ionic', 'stockInfo', 'stockCharts', 'stockSearch'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
  .config(function($stateProvider, $urlRouterProvider){
    $stateProvider
      .state('stockApp', {
        url: '/app',
        abstract: true,
        templateUrl: 'partials/menu.html',
        controller: 'StockAppCtrl'
      })
      .state('stockApp.stockInfo', {
        url: '/stockInfo',
        views: {
          'menu-content': {
            templateUrl: 'partials/stockInfo.html',
            controller: 'StockInfoCtrl'
          }
        }
      })
        .state('stockApp.stockCharts', {
          url: '/stockCharts',
          views: {
            'menu-content': {
              templateUrl: 'partials/stockCharts.html',
              controller: 'StockChartsCtrl'
            }
          }
        })
        .state('stockApp.stockSearch', {
          url: '/stockSearch',
          views: {
            'menu-content': {
              templateUrl: 'partials/stockSearch.html',
              controller: 'StockSearchCtrl'
            }
          }
        });;
      $urlRouterProvider
        .otherwise('/app/stockInfo')
  });
