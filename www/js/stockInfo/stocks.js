/**
 * Created by ovidio on 3/28/15.
 */
'use strict';

angular.module("stockInfo")
.service('stocks', function($q, $http) {

        var query = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quote%20where%20symbol%3D%22{{symbol}}%22&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=",

            getStock = function(symbol) {

                var
                    defer = $q.defer(),
                    url = query.replace(/\{\{symbol}}/,symbol);

                $http.get(url)
                    .success(function(data) {
                        if (data.query.results.quote.Name === null &&
                            data.query.results.quote.LastTradePriceOnly  === null &&
                            data.query.results.quote.YearHigh  === null &&
                            data.query.results.quote.YearLow  === null &&
                            data.query.results.quote.MarketCapitalization  === null &&
                            data.query.results.quote.Volume === null ) {
                            defer.reject("No data found");
                        } else {
                            defer.resolve({
                                companyName: data.query.results.quote.Name,
                                stockPrice: data.query.results.quote.LastTradePriceOnly,
                                yearHigh: data.query.results.quote.YearHigh,
                                yearLow: data.query.results.quote.YearLow,
                                marketCapitalization: data.query.results.quote.MarketCapitalization,
                                stockVolume: data.query.results.quote.Volume
                            })
                        }
                    })
                    .error(function() {
                        defer.reject("Bad data request");
                    });

                return defer.promise;
            };



        return {
            getStock: getStock
        }
    })