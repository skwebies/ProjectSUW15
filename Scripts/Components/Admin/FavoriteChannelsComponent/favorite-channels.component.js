/// <reference path="../../../angular.js" />

angular.module("mainModule")
	.component("favoriteChannel", {
		templateUrl: "Scripts/Components/Admin/FavoriteChannelsComponent/FavoriteChannels.html",
		controller: FavoriteChannelController,
		bindings: {
			beforeDrop: "&",
			hideMe: "&",
			removeFavChannel: "&",
			loadFavChannels: "&",
			saveFavChannels: "&",
			favChannels: "@"
		}
	});
function FavoriteChannelController($uibModal) {
	this.$onInit = function () {
		var _this = this;
		_this.favChannels = [];

		//Hide initial text that shows inside favorite channels area!
		_this.hideMe = function () {
			_this.saveFavChannels();
			return _this.favChannels.length > 0;


		};


		//Modal Related functions
		_this.beforeDrop = function () {

			var modalInstance = $uibModal.open({
				templateUrl: 'ModalInstance.html', //<--Modal Located in Admin Page-->
				controller: 'ModalController'
			});
			return modalInstance.result;


		};


		// Deleting favorite channels from the list
		_this.removeFavChannel = function (favChannel) {

			var index = _this.favChannels.indexOf(favChannel);

			_this.favChannels.splice(index, 1);
			_this.saveFavChannels();



		};

		//Initially load the favChannels when its available!
		_this.loadFavChannels = function () {

			var dataString = localStorage.getItem("favChannels");
			if (dataString)
				_this.favChannels = JSON.parse(dataString);


		};

		//save favorite channels
		_this.saveFavChannels = function () {
			var jsonString = JSON.stringify(_this.favChannels);
			localStorage.setItem("favChannels", jsonString);

		};


		_this.loadFavChannels(); //Initially loading the favorite channels
		//_this.loadChannels();
	};

}
FavoriteChannelController.$inject = ['$uibModal'];