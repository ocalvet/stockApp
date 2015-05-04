'use strict';

angular.module('stockSearch')
    .controller('StockSearchCtrl', ['$scope', 'urls', '$http', function($scope, urls, $http) {

        $scope.comapnies = [];

        $scope.searchCompany = function(term) {

            var url = urls.search.replace('{{value}}', term);
            $http
                .get(url)
                .success(function(companies) {
                    console.log("Companies", companies);
                    $scope.companies = companies;
                })
                .error(function(error) {
                    console.log("There was an error retrieving company with term ", term);
                });

        }

    }]);