/// <reference path="../../angular.js" />

angular.module("mainModule")
	.controller("AdminController", [
		"$scope",
		"chatsApi",
		"$uibModal",
		"toaster",
		function ($scope, chatsApi, $uibModal, toaster) {
			$scope.title = "Administration";

			$scope.newChannel = {};

			//Creating a channel
			$scope.addChannel = function () {
				chatsApi.addChannel($scope.newChannel)
					.then(function (data) {
						if (data != null) {
							$scope.model.channels.push(data);
							$scope.pop();
							$scope.newChannel = {};

						}

					});

			};

			$scope.pop = function () {
				toaster.pop('success', "Success", "New Channel " + $scope.newChannel.name +   " is Added!");
			};


			//Deleting a channel
			$scope.deleteChannel = function (channel) {
				chatsApi.deleteChannel(channel.id)
					.then(function () {
						var index = $scope.model.channels.map(function (channel) {
							return channel.id;
						}).indexOf(parseInt(channel.id));
						$scope.model.channels.splice(index, 1);
						alert("Channels will be deleted from favorites too!");

						var favChannelIndex = $scope.model.favChannels.indexOf(channel);

						$scope.model.favChannels.splice(favChannelIndex);



					});


			};


			/**********************************************************
			 *        Drag and Drop Favorite Channels
			 *
			 **********************************************************/


			//Hide initial text that shows inside favorite channels area!
			$scope.hideMe = function () {
				$scope.saveFavChannels();
				return $scope.model.favChannels.length > 0;


			};


			//Modal Related functions
			$scope.beforeDrop = function () {
				var modalInstance = $uibModal.open({
					templateUrl: 'Scripts/Components/Modal/ModalInstance.html',
					controller: 'ModalController'
				});
				return modalInstance.result;


			};



			// Deleting favorite channels from the list
			$scope.removeFavChannel = function (favChannel) {

				var index = $scope.model.favChannels.indexOf(favChannel);

				$scope.model.favChannels.splice(index, 1);
				$scope.saveFavChannels();



			};

			//Initially load the favChannels when its available!
			$scope.loadFavChannels = function () {

				var dataString = localStorage.getItem("favChannels");
				if (dataString)
					$scope.model.favChannels = JSON.parse(dataString);


			};

			//save favorite channels
			$scope.saveFavChannels = function () {
				var jsonString = JSON.stringify($scope.model.favChannels);
				localStorage.setItem("favChannels", jsonString);

			};


			$scope.loadFavChannels(); //Initially loading the favorite channels


		}
	]);