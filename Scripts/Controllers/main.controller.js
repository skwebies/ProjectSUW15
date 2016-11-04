/// <reference path="../angular.js" />

angular.module("mainModule")
	.controller("MainController",
	[
		"$scope",
		"$location",
		"$route",
		"chatsApi",

		function ($scope, $location, $route, chatsApi) {
			$scope.$route = $route;
			var path = 'http://code.webonmaster.com/signalr'; //SignalR root path assigned

			$scope.model = {
				channels: [],
				favChannels: [],
				messages: [],

			};

			//Initially Loading the channels
			$scope.loadChannels = function () {
				chatsApi.getChannels()
					  .then(function (data) {
						  if (data != null) {
							  $scope.model.channels = data;


						  }
					  });
			};


			//function that gives the access to the url path
			$scope.go = function (url) {
				$location.path(url);
			};

			$scope.loadChannels();

		}
	]);