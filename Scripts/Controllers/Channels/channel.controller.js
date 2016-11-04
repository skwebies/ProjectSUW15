/// <reference path="../../angular.js" />

angular.module("mainModule")
	.controller("ChannelController", [
		"$scope",
		"$routeParams",
		"chatsApi",

		function ($scope, $routeParams, chatsApi) {

		    $scope.newMessage = {}; // new message object defined

		    //Getting each channel
		    $scope.$watch("model.channels", function (channels) {
		        $scope.channel = $scope.model.channels.filter(function (channel) {
		            return channel.id == $routeParams.id;

		        })[0];

		    });

		   



		}
	]);