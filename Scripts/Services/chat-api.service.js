/// <reference path="../angular.js" />

angular.module("mainModule")
	.service("chatsApi", [

		"$http",
		"$q",

		function ($http, $q) {
			var api = "http://code.webonmaster.com/api";  //defining the API URL
			var channels = api + "/channels";            // Defining the channels api url
			var messages = api + "/messages";



			//Get Channels
			this.getChannels = function () {
				var deferred = $q.defer();

				$http.get(channels)
					.then(function (response) {
						this.channels = response.data;
						deferred.resolve(response.data);

					}, function () {
						deferred.resolve([]);

					});

				return deferred.promise;
			};



			//Adding Channel
			this.addChannel = function (newChannel) {
				var deferred = $q.defer();

				$http.post(channels, newChannel)
					.then(function (response) {
						deferred.resolve(response.data);
					}, function () {
						deferred.resolve([]);

					});
			return deferred.promise;
			};



			//Deleting Channel
			this.deleteChannel = function (id) {
				var deferred = $q.defer();

				$http.delete(channels + '/' + id)
					.then(function (response) {
						deferred.resolve(response.data);
					}, function () {
						deferred.resolve([]);

					});
			return deferred.promise;
			};



			//Adding messages to the channel
			this.addMessage = function (newMessage) {

				var deferred = $q.defer();

				$http.post(messages, newMessage)
					.then(function (response) {
						deferred.resolve(response.data);

					}, function () {
						deferred.resolve([]);

					});
				return deferred.promise;

			};

			//Get Messages
			this.getMessages = function () {
			    var deferred = $q.defer();

			    $http.get(messages)
			        .then(function (response) {
			            this.messages = response.data;
			            deferred.resolve(response.data)
			        }, function () {

			            deferred.resolve([]);

			        });
			    return deferred.promise;

			}




		}


	]);