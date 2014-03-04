'use strict';

angular.module('runs').factory('Runs', ['$resource', function ($resource) {
    return $resource('runs/:id', {
        id: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);