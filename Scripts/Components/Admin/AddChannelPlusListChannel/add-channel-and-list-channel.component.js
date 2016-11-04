/// <reference path="../../../angular.js" />
angular.module("mainModule")
	.component("addChannelPlusListChannel", {
		templateUrl: "Scripts/Components/Admin/AddChannelPlusListChannel/add-channel-and-list-channel.component.html",
		controller: AddChannelPlusListChannelController,
		bindings: {

			newChannel: "<",
			deleteChannel: "&",
			success: "&",
			confirmDelete: "&",
			loadChannels:"&"

		}

	});
function AddChannelPlusListChannelController(chatsApi, toaster) {

	this.$onInit = function () {
		 var _this = this;

		_this.channels = [];
		_this.newChannel = {};

		//Get Channels to assign into local variable.
		chatsApi.getChannels()
			.then(function (channels) {
				_this.channels = channels;

			});

		//Creating a channel
		_this.addChannel = function () {
			chatsApi.addChannel(_this.newChannel)
				.then(function (data) {
					_this.channels.push(data);

				});

			_this.success();
			_this.newChannel = {};

		};


		//Success Message when channel is created--> Toaster Module dependency Used!
		_this.success = function () {
			toaster.pop('success', "Success", "New Channel " + _this.newChannel.name + " is Added!");
		};


		//Delete Channel
		_this.deleteChannel = function (channel) {
			chatsApi.deleteChannel(channel.id)
				.then(function () {
					var index = _this.channels.map(function (channel) {
						return channel.id;
					}).indexOf(channel.id);
					_this.channels.splice(index, 1);
					_this.confirmDelete();


				});


		};

		//Success message for the deletion
		_this.confirmDelete = function () {
			toaster.pop('success', 'Confirmation', 'Channel is successfully deleted');
		};

	   _this.loadChannels();
	};


}
AddChannelPlusListChannelController.$inject = ['chatsApi', 'toaster'];