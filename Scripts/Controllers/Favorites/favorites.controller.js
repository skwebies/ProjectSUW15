/// <reference path="../../angular.js" />

angular.module("mainModule")
    .controller("FavoritesController", [
        "$scope",
        function ($scope) {
            $scope.title = "Favorite Channels";
        }
    ]);