'use strict';

angular
    .module("stockInfo")
    .controller('StockInfoCtrl', function($scope, stocks, errorService){

        function resetStockInfo () {
            $scope.stockInfo = {};
            $scope.showInfo = false;
        }

        $scope.searchPrice = function (symbol){
            stocks.getStock(symbol)
                .then(function(stockInfo) {
                    $scope.showInfo = true;
                    $scope.stockInfo = stockInfo;
                }, function(error) {
                    $scope.showInfo = false;
                    resetStockInfo();
                    errorService.showError(error);
                });
        };
        // Initialize scope
        resetStockInfo();
    });
