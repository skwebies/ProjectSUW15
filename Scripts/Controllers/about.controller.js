/// <reference path="../angular.js" />

angular.module("mainModule")
    .controller("AboutController",
    [
        "$scope",
        function($scope) {
            $scope.title = "About";
        }
    ]);