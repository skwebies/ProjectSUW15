/// <reference path="../../angular.js" />

angular.module("mainModule")
    .component("sendMessage", {
        templateUrl: "Scripts/Components/SendMessageComponent/SendMessage.html",
        controller: SendMessageController,
        bindings: {
           routeParamsId:"@"
        }

    });

function SendMessageController($routeParams, chatsApi) {
    this.$onInit = function () {
        var _this = this;
        _this.routeParamsId = $routeParams.id;
        //console.log(_this.routeParamsId);

        _this.newMessage = {};

        //Get Messages
        chatsApi.getMessages()
            .then(function (messages) {
                _this.messages = messages;
            });

        //Sending a Message
        _this.sendMessage = function () {
            chatsApi.addMessage(_this.newMessage)
                .then(function (data) {
                    _this.messages.push(data);
                    _this.newMessage = {};
                });

        };
    };

}
SendMessageController.$inject = ['$routeParams','chatsApi'];