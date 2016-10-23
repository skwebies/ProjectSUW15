/// <reference path="../../angular.js" />

angular.module("mainModule")
	.controller("ChannelController", [
		"$scope",
		"$routeParams",
		"chatsApi",

		function ($scope, $routeParams, chatsApi) {

			$scope.newMessage = {}; // new message object defined

			//Getting each channel
			$scope.$watch("model.messages", function (channels) {
				$scope.channel = $scope.model.channels.filter(function (channel) {
					return channel.id == $routeParams.id;

				})[0];

			});


			//initially Load the Messages
			chatsApi.getMessages()
				.then(function (data) {
					if (data != null) {

						$scope.model.messages = data;
					}
				});

			//Sending messages to the channel
			$scope.sendMessage = function () {
				chatsApi.addMessage($scope.newMessage)
				.then(function (data) {
					if (data != null) {

					    $scope.model.messages = data;

					}

				});
			};




			//Getting the messages by channel
			angular.forEach($scope.model.channels, function (channel) {



			});




		}
	]);