/// <reference path="../../../angular.js" />

angular.module("mainModule")
	.component("trashCan", {
		templateUrl: "Scripts/Components/Admin/TrashCanComponent/TrashCan.html",
		controller: TrashCanController,

		bindings: {
			id: "<",
			onDrop: "&",
			deleteChannel: "&"

		}
	});
function TrashCanController(chatsApi,toaster) {

	this.$onInit = function () {

		var _this = this;



		chatsApi.getChannels()
			.then(function (channels) {
				_this.channels = channels;

				angular.forEach(_this.channels, function (channel) {
					_this.channel = channel;

				});

			});

		_this.onDrop = function (elem, ui) {
			ui.draggable.effect("explode", {}, 200, function () {
				_this.deleteChannel(ui.draggable.attr("removeId"));

			});
			chatsApi.deleteChannel(ui.draggable.attr("removeId"));
			_this.confirmDelete();
		};

		//Success message for drag to trashcan
		_this.confirmDelete = function () {
			toaster.pop('success', 'Confirmation', 'Channel is successfully deleted');
		};
	};


}

TrashCanController.$inject = ['chatsApi','toaster'];