/// <reference path="../angular.js" />

angular.module("mainModule")
	.controller("MainController",
	[
		"$scope",
		"$location",
		"$route",
		"$rootScope",
		"Hub",
		"chatsApi",

		function ($scope, $location, $route, $rootScope, Hub, chatsApi) {
			$scope.$route = $route;
			var path = 'http://code.webonmaster.com/signalr'; //SignalR root path assigned

			$scope.model = {
			    channels: [],
				favChannels: [],
				messages: []
			};

			//SignalR initial setup and hub instantiated
			var hub = new Hub('chatHub', {

				rootPath: path,

				listeners: {
					'recieveMessage': function (message) {
						$rootScope.message = message;

						angular.forEach($scope.model.channels, function (channel) {

							channel.messages.push(message);
							$rootScope.$apply();
						});
						//Sending messages to the channel
						//$scope.model.messages.push(message);

						console.log("recieved recieveMessage: " + $rootScope.message);
					}

				},

				methods: ['receiveMessage'],

				//handle connection error
				errorHandler: function (error) {
					console.error(error);
				},

				//SignalR connection status to the log.
				stateChanged: function (state) {
					switch (state.newState) {
						case $.signalR.connectionState.connecting:
							console.log("signalR.connectionState.connecting" + state.newState);
							break;
						case $.signalR.connectionState.connected:
							console.log("signalR.connectionState.connected" + state.newState);
							break;
						case $.signalR.connectionState.reconnecting:
							console.log("signalR.connectionState.reconnecting" + state.newState);
							break;
						case $.signalR.connectionState.disconnected:
							console.log("signalR.connectionState.disconnected" + state.newState);
							break;
					}


				}



			});

			//Initially Loading the channels
			chatsApi.getChannels()
				.then(function (data) {
					if (data != null) {
						$scope.model.channels = data;


					}
				});






			//function that gives the access to the url path
			$scope.go = function (url) {
				$location.path(url);
			};
		}
	]);