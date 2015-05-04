'use strict';

angular.module('stockSearch', [])
    .constant('urls', {
        search: 'http://d.yimg.com/autoc.finance.yahoo.com/autoc?query={{value}}&callback=YAHOO.Finance.SymbolSuggest.ssCallback'
    });