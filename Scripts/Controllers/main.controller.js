/// <reference path="../angular.js" />

angular.module("mainModule")
    .controller("MainController",
    [
        "$scope",
        "$location",
        "$route",
        "chatsApi",
        function($scope,  $location, $route, chatsApi) {
            $scope.$route = $route;

            $scope.model = {
                channels: []
            };


            //Initially Loading the channels
            chatsApi.getChannels()
                .then(function (data) {
                    if (data != null) {
                        $scope.model.channels = data;

                    }
                });


            //function that gives the access to the url path
            $scope.go = function(url) {
                $location.path(url);
            };
        }
    ]);