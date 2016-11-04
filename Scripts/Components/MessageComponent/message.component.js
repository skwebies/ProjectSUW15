/// <reference path="../../angular.js" />

angular.module("mainModule")
	.component("messageBox", {
		templateUrl: "Scripts/Components/MessageComponent/MessageComponent.html",
		controller: MessageBoxController,

		bindings: {
			routeParamsId: "@"
		}

	});

function MessageBoxController($routeParams, $rootScope, Hub, chatsApi) {
	this.$onInit = function () {
		var _this = this;

		_this.routeParamsId = $routeParams.id;
		_this.messages = [];

		//Get Messages
		chatsApi.getMessages()
			.then(function (messages) {
				_this.messages = messages;

			});


		//SignalR initial setup and hub instantiated

		var path = 'http://code.webonmaster.com/signalr'; //SignalR root path assigned
		var hub = new Hub('chatHub', {

			rootPath: path,

			listeners: {
				'recieveMessage': function (message) {
					$rootScope.message = message;
					_this.messages.push(message);
					$rootScope.$apply();
					//console.log("recieved recieveMessage: " + $rootScope.message);
				}

			},

			methods: ['recieveMessage'],

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




	};

}

MessageBoxController.$inject = ['$routeParams', '$rootScope', 'Hub', 'chatsApi'];