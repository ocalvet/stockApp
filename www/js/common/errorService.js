/**
 * Created by ovidio on 3/28/15.
 */


'use strict';

angular
    .module('common')
    .service('errorService', function($ionicPopup) {

        var showError = function (error) {
            $ionicPopup
                .alert({
                    title: 'Error',
                    template: error
                });
        };

        return {
            showError: showError
        };
    })