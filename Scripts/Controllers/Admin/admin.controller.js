/// <reference path="../../angular.js" />

angular.module("mainModule")
    .controller("AdminController", [
        "$scope",
        "chatsApi",
        function ($scope, chatsApi) {
            $scope.title = "Administration";



            //Creating a channel
            $scope.addChannel = function () {
                chatsApi.addChannel($scope.newChannel)
                    .then(function (data) {
                        if (data != null) {
                            $scope.model.channels.push(data);
                            $scope.newChannel = {};
                        }

                    });

            };


            //Deleting a channel
            $scope.deleteChannel = function (channel) {
                chatsApi.deleteChannel(channel.id)
                    .then(function () {
                        var index = $scope.model.channels.map(function (channel) {
                            return channel.id;
                        }).indexOf(parseInt(channel.id));
                        $scope.model.channels.splice(index, 1);
                    });


            }

        }
    ]);